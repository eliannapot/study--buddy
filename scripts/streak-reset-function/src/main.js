import { Client, Databases } from 'react-native-appwrite';


// This Appwrite function will be executed every time your function is triggered
export default async ({ req, res, log, error }) => {

  const config = {
    endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT, 
    projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID,
    db: process.env.EXPO_PUBLIC_APPWRITE_DB_ID,
    col: {
        users: process.env.EXPO_PUBLIC_APPWRITE_COL_USERS_ID,
    },
  }; 

  const client = new Client()
    .setEndpoint(config.endpoint) 
    .setProject(config.projectId); 
    
  const dbId = process.env.EXPO_PUBLIC_APPWRITE_DB_ID;
  const colId = process.env.EXPO_PUBLIC_APPWRITE_COL_USERS_ID;

  const database = new Databases(client);
  

  try {
  
    const users = await database.listDocuments(dbId, colId);

    for (const user of users.documents) {
      const updates = {};

      if (user.hasMetDailyGoal !== true) {
        updates.streak = 0;
      }
      updates.hasMetDailyGoal = false;

      await databases.updateDocument(dbId, colId, user.$id, updates);
    }
  
    return res.json({ success: true });

  } catch (err) {
    
    console.error(err);
    
    return res.json({ error: err.message });
  
  }
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
};
