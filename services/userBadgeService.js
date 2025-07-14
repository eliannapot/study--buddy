import { ID, Query } from "react-native-appwrite";
import databaseService from './databaseService.js';

// Appwrite database and collection IDs
const dbId = process.env.EXPO_PUBLIC_APPWRITE_DB_ID;
const colId = process.env.EXPO_PUBLIC_APPWRITE_COL_USER_BADGES_ID; // Replace with your collection ID

// Helper to remove Appwrite system fields
const cleanAppwriteData = (data) => {
    return Object.fromEntries(
        Object.entries(data).filter(([key]) => !key.startsWith('$'))
    );
};

const userBadgeService = {

    // Get all badges for a user
    async getUserBadges(userId) {
        if (!userId) {
            console.error("No user ID provided in getUserBadges");
            return { data: [], error: "No user ID provided" };
        }
        try {
            const response = await databaseService.listDocuments(dbId, colId, [
                Query.equal('user_id', userId),
            ]);
            return response;
        } catch (error) {
            console.error("Error fetching user badges:", error);
            return { data: [], error: error.message };
        }
    },

    // Get only favorite badges for a user
    async getFavouriteUserBadges(userId) {
        if (!userId) {
            console.error("No user ID provided in getFavouriteUserBadges");
            return { data: [], error: "No user ID provided" };
        }
        try {
            const response = await databaseService.listDocuments(dbId, colId, [
                Query.equal('user_id', userId),
                Query.equal('isFavourite', true),
                Query.orderDesc('dateEarned')
            ]);
            return response;
        } catch (error) {
            console.error("Error fetching favorite badges:", error);
            return { data: [], error: error.message };
        }
    },

    // Add a new badge to a user
    async addUserBadge(userId, badgeId, isFavourite = false) {
        if (!userId || !badgeId) {
            return { error: "Missing user_id or badge_id" };
        }
        const dataToSend = {
            user_id: userId,
            badge_id: badgeId,
            dateEarned: new Date().toISOString(),
            isFavourite: isFavourite
        };
        const response = await databaseService.createDocument(
            dbId,
            colId,
            dataToSend,
            ID.unique()
        );
        if (response?.error) {
            return { error: response.error };
        }
        return { data: response };
    },

    // Update a user's badge (e.g., toggle isFavourite)
    async updateUserBadge(badgeDocumentId, data) {
        if (!badgeDocumentId || !data) {
            return { error: "No ID or data provided" };
        }
        const cleanedData = cleanAppwriteData(data);
        const response = await databaseService.updateDocument(
            dbId,
            colId,
            badgeDocumentId,
            cleanedData
        );
        if (response?.error) {
            return { error: response.error };
        }
        return { data: response };
    }
};

export default userBadgeService;