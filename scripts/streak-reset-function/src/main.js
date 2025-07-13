import { Client, Databases } from 'node-appwrite';


// This Appwrite function will be executed every time your function is triggered
export default async ({ req, res, log, error }) => {

  log("Function triggered: resetting daily goals");

  const client = new Client()
    .setEndpoint(process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT) 
    .setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID)
    .setKey(req.headers['x-appwrite-key'] || ""); 
    
  const dbId = process.env.EXPO_PUBLIC_APPWRITE_DB_ID;
  const colId = process.env.EXPO_PUBLIC_APPWRITE_COL_USERS_ID;

  const databases = new Databases(client);
  
  try {
    
    log(`Fetching users from DB: ${dbId}, collection: ${colId}`);

    const affectedUsers = [];
  
    const users = await databases.listDocuments(dbId, colId);

    for (const user of users.documents) {
      const updates = {};

      if (user.hasMetDailyGoal !== true) {
        updates.streak = 0;
        log(`Resetting streak for user ${user.$id}`);
      }
      updates.hasMetDailyGoal = false;

      await databases.updateDocument(dbId, colId, user.$id, updates);
    
      log(`Updated user ${user.$id} with: ${JSON.stringify(updates)}`);

      affectedUsers.push({
        id: user.$id,
        name: user.name || "Unnamed",
        updatedFields: updates,
      });
    }

    log(`Total users updated: ${affectedUsers.length}`);  
    return res.json({
      success: true,
      message: `${affectedUsers.length} users updated.`,
      updatedUsers: affectedUsers,
    });

  } catch (err) {
    
    error(`Error occurred: ${err.message}`);
    return res.json({ error: err.message });
  
  }

};
    // const people = new Users(client);

  // try {
  //   const response = await people.list();
  //   // Log messages and errors to the Appwrite Console
  //   // These logs won't be seen by your end users
  //   log(`Total users: ${response.total}`);
  // } catch(err) {
  //   error("Could not list users: " + err.message);
  // }

  // // The req object contains the request data
  // if (req.path === "/ping") {
  //   // Use res object to respond with text(), json(), or binary()
  //   // Don't forget to return a response!
  //   return res.text("Pong");
  // }

  // return res.json({
  //   motto: "Build like a team of hundreds_",
  //   learn: "https://appwrite.io/docs",
  //   connect: "https://appwrite.io/discord",
  //   getInspired: "https://builtwith.appwrite.io",
  // });

