import { ID } from "react-native-appwrite";
import databaseService from './databaseService.js';

//Appwrite database and collection id
const dbId = process.env.EXPO_PUBLIC_APPWRITE_DB_ID;
const colId = process.env.EXPO_PUBLIC_APPWRITE_COL_TASKS_ID;

const taskService = {

    //Get Tasks
    async getTasks() {
        const response = await databaseService.listDocuments(dbId, colId); 
        if (response.error) {
            return {error: response.error};
        }
        return {data: response};
    },

    //Create Task
    async addTask(data) {
        if (!data) {
            return {error: "No data provided"};
        }
        const dataToSend = {
            ...data,
            createdAt: new Date().toISOString(),
        }
        const response = await databaseService.createDocument(
            dbId,
            colId,
            dataToSend,
            ID.unique(), // Generate a unique ID for the document
        );
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