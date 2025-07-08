import { ID, Query } from 'react-native-appwrite';
import databaseService from './databaseService.js';

const dbId = process.env.EXPO_PUBLIC_APPWRITE_DB_ID;
const colId = process.env.EXPO_PUBLIC_APPWRITE_COL_USERS_ID;

const cleanAppwriteData = (data) => {
    return Object.fromEntries(
        Object.entries(data).filter(([key]) => !key.startsWith('$'))
    );
};

const userService = {

    // Get all users
    async getAllUsers() {
        try {
            const response = await databaseService.listDocuments(dbId, colId);
            return response;
        } catch (error) {
            console.error("Error getting all users:", error.message);
            return { data: [], error: error.message };
        }
    },

    // Get current user document by user_id
    async getUserByAuthId(user_id) {
        if (!user_id) {
            return { data: null, error: "No user_id provided" };
        }
        try {
            const response = await databaseService.listDocuments(dbId, colId, [
                Query.equal('user_id', user_id),
            ]);
            return { data: response.data[0] ?? null, error: null };
        } catch (error) {
            console.error("Error fetching user:", error.message);
            return { data: null, error: error.message };
        }
    },

    // Create user document
    async addUser(user_id, name) {
        if (!user_id || !name) {
            return { error: "user_id and name are required" };
        }
        const dataToSend = {
            user_id,
            name,
            isFocusing: null,
            streak: 0,
            xpLog: [],
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

    // Update name
    async updateName(docId, newName) {
        if (!docId || !newName) {
            return { error: "docId and newName are required" };
        }
        const response = await databaseService.updateDocument(dbId, colId, docId, {
            name: newName,
        });
        if (response?.error) {
            return { error: response.error };
        }
        return { data: response };
    },

    // Update streak (e.g., daily at midnight)
    async updateStreak(docId, newStreakValue) {
        if (!docId || typeof newStreakValue !== "number") {
            return { error: "docId and valid streak value required" };
        }
        const response = await databaseService.updateDocument(dbId, colId, docId, {
            streak: newStreakValue,
        });
        if (response?.error) {
            return { error: response.error };
        }
        return { data: response };
    },

    // Add entry to xpLog (array of strings)
    async addXPLogEntry(docId, entry) {
        if (!docId || !entry) {
            return { error: "docId and entry are required" };
        }

        try {
            const { data: userDoc, error } = await databaseService.listDocuments(dbId, colId, [
                Query.equal('$id', docId),
            ]);
            if (error || !userDoc?.[0]) {
                return { error: error || "User document not found" };
            }

            const existingLog = userDoc[0].xpLog || [];
            const updatedLog = [...existingLog, entry];

            const response = await databaseService.updateDocument(dbId, colId, docId, {
                xpLog: updatedLog,
            });
            if (response?.error) {
                return { error: response.error };
            }
            return { data: response };
        } catch (error) {
            return { error: error.message };
        }
    },

    // Flexible update
    async updateUser(docId, updatedData) {
        if (!docId || !updatedData) {
            return { error: "docId and updatedData are required" };
        }

        const response = await databaseService.updateDocument(dbId, colId, docId, updatedData);
        if (response?.error) {
            return { error: response.error };
        }
        return { data: response };
    },

    // Delete user document
    async deleteUser(docId) {
        const response = await databaseService.deleteDocument(dbId, colId, docId);
        if (response?.error) {
            return { error: response.error };
        }
        return { success: true };
    }
};

export default userService;
