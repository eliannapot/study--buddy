import databaseService from './databaseService.js';

const dbId = process.env.EXPO_PUBLIC_APPWRITE_DB_ID;
const colId = process.env.EXPO_PUBLIC_APPWRITE_COL_BADGES_ID;

const badgeService = {
    // Get Badges 
    async getBadges() {
        try {
            const response = await databaseService.listDocuments(dbId, colId);
            console.log("Badges fetched:", response);
            return response; 
        } catch (error) {
            console.log("Error fetching Badges:", error);
            return { data: [], error: error.message };
        }
    },
}

export default badgeService;