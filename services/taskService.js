import { ID, Query } from "react-native-appwrite";
import databaseService from './databaseService.js';

//Appwrite database and collection id
const dbId = process.env.EXPO_PUBLIC_APPWRITE_DB_ID;
const colId = process.env.EXPO_PUBLIC_APPWRITE_COL_TASKS_ID;

// Helper to remove Appwrite system fields
const cleanAppwriteData = (data) => {
    return Object.fromEntries(
        Object.entries(data).filter(([key]) => !key.startsWith('$'))
    );
};

const taskService = {

    //Get Tasks
    async getTasks(userId, userName) {
        if (!userId || !userName) {
            console.error("No user ID or name provided in getTasks");
            return { data: [], error: "No user ID or name provided" };
        }
        try {
            const response = await databaseService.listDocuments(dbId, colId, [
                Query.or([
                    Query.equal('user_id', userId),
                    Query.contains('studyBuddy', userName),
            ])]);
            return response;
        } catch (error) {
            console.log("Error fetching tasks:", error);
            return { data: [], error: error.message };
        }
    },


    // Create Task
    async addTask(user_id, data) {
        if (!data) {
            return {error: "No data provided"};
        }
        const dataToSend = {
            ...data,
            createdAt: new Date().toISOString(),
            user_id: user_id,
        }
        const response = await databaseService.createDocument(
            dbId,
            colId,
            dataToSend,
            ID.unique()
        );
        if (response?.error) {
            return {error: response.error};
        }
        return {data: response};
    },


    //Update Task
    async updateTask(id, data) {
        if (!id || !data) {
            return {error: "No id or data provided"};
        }
        const cleanedData = cleanAppwriteData(data);
        const response = await databaseService.updateDocument(dbId, colId, id, cleanedData);
        if (response?.error) {
            return {error: response.error};
        }
        return {data: response};
    },

    //Delete Task
    async deleteTask(id) {
        const response = await databaseService.deleteDocument(dbId, colId, id);
        if (response?.error) {
            return {error: response.error};
        }

        return {success: true};
    },
};

export default taskService;