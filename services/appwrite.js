import { Platform } from 'react-native';
import { Account, Client, Databases } from 'react-native-appwrite';

const config = {
    endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT, 
    projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID,
    db: process.env.EXPO_PUBLIC_APPWRITE_DB_ID,
    col: {
        tasks: process.env.EXPO_PUBLIC_APPWRITE_COL_TASKS_ID,
        categories: process.env.EXPO_PUBLIC_APPWRITE_COL_CATEGORIES_ID,
        badges: process.env.EXPO_PUBLIC_APPWRITE_COL_BADGES_ID,
        events: process.env.EXPO_PUBLIC_APPWRITE_COL_EVENTS_ID,
        users: process.env.EXPO_PUBLIC_APPWRITE_COL_USERS_ID,
    },
};

const client = new Client()
    .setEndpoint(config.endpoint) 
    .setProject(config.projectId); 

switch (Platform.OS) {
    case 'ios':
        client.setPlatform(process.env.EXPO_PUBLIC_APPWRITE_BUNDLE_ID);
        break;
    case 'android':
        client.setPlatform(process.env.EXPO_PUBLIC_APPWRITE_PACKAGE_NAME);
        break;
}

const database = new Databases(client);

const account = new Account(client);

export { account, client, config, database };

