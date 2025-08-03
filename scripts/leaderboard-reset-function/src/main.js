import dayjs from 'dayjs';
import { Client, Databases, Query } from 'node-appwrite';

// Helper functions from your app
const parseXPLog = (xpLogStrings) => {
  return xpLogStrings.map(entry => {
    const timestamp = entry.slice(0, 24);           // 0–23 (inclusive)
    const xp = parseInt(entry.slice(25, 26), 10);    // 25th character
    return {
      timestamp,
      xp,
    };
  }).filter(entry => !isNaN(entry.xp));
};

const getXPStats = (xpEntries) => {
  const now = dayjs();
  const lastMonday = now.startOf('week').add(1, 'day'); 

  let thisWeekXP = 0;

  xpEntries.forEach(({ timestamp, xp }) => {
    const entryTime = dayjs(timestamp);
    if (isNaN(xp) || !entryTime.isValid()) return;

    if (entryTime.isAfter(lastMonday)) {
      thisWeekXP += xp;
    }
  });

  return thisWeekXP;
};

export default async ({ req, res, log, error }) => {
  log("Function triggered: creating weekly leaderboard notifications");

  const client = new Client()
    .setEndpoint(process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT) 
    .setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID)
    .setKey(req.headers['x-appwrite-key'] || ""); 
    
  const dbId = process.env.EXPO_PUBLIC_APPWRITE_DB_ID;
  const usersColId = process.env.EXPO_PUBLIC_APPWRITE_COL_USERS_ID;
  const notificationsColId = process.env.EXPO_PUBLIC_APPWRITE_COL_NOTIFICATIONS_ID;

  const databases = new Databases(client);
  
  try {
    // 1. Fetch all users with their XP logs
    log(`Fetching users with XP logs`);
    const users = await databases.listDocuments(dbId, usersColId, [
      Query.select(['$id', 'name', 'xpLog'])
    ]);

    // 2. Calculate weekly XP for each user
    const usersWithXP = users.documents.map(user => {
      const xpEntries = user.xpLog ? parseXPLog(user.xpLog) : [];
      const weeklyXP = getXPStats(xpEntries);
      return {
        id: user.$id,
        name: user.name || "Unnamed",
        weeklyXP
      };
    });

    // 3. Sort users by weekly XP (descending)
    const rankedUsers = usersWithXP.sort((a, b) => b.weeklyXP - a.weeklyXP);

    // 4. Create notifications for each user with their rank
    const notificationsCreated = [];
    
    for (let i = 0; i < rankedUsers.length; i++) {
      const user = rankedUsers[i];
      const place = i + 1;
      
      // Convert place number to ordinal (1st, 2nd, 3rd, etc.)
      let suffix = 'th';
      if (place === 1) suffix = 'st';
      else if (place === 2) suffix = 'nd';
      else if (place === 3) suffix = 'rd';
      else if (place % 10 === 1 && place % 100 !== 11) suffix = 'st';
      else if (place % 10 === 2 && place % 100 !== 12) suffix = 'nd';
      else if (place % 10 === 3 && place % 100 !== 13) suffix = 'rd';
            
      const message = `Leaderboard of the week: you got ${place}${suffix} place!`;
      
      try {
        await databases.createDocument(
          dbId,
          notificationsColId,
          ID.unique(),
          {
            user_id: user.id,
            message,
            iconType: 'buddy',
            unread: true,
            createdAt: new Date().toISOString()
          }
        );
        
        notificationsCreated.push({
          userId: user.id,
          name: user.name,
          place,
          weeklyXP: user.weeklyXP
        });
        
        log(`Created notification for ${user.name} (${place}${suffix} place)`);
      } catch (err) {
        error(`Failed to create notification for user ${user.id}: ${err.message}`);
      }
    }

    log(`Total notifications created: ${notificationsCreated.length}`);
    return res.json({
      success: true,
      message: `Created ${notificationsCreated.length} leaderboard notifications.`,
      notifications: notificationsCreated,
      leaderboard: rankedUsers.map(u => ({
        id: u.id,
        name: u.name,
        place: rankedUsers.findIndex(user => user.id === u.id) + 1,
        weeklyXP: u.weeklyXP
      }))
    });

  } catch (err) {
    error(`Error occurred: ${err.message}`);
    return res.json({ 
      success: false,
      error: err.message 
    });
  }
};