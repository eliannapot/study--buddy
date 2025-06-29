import { ID, Query } from 'react-native-appwrite';
import databaseService from './databaseService.js';

const dbId = process.env.EXPO_PUBLIC_APPWRITE_DB_ID;
const colId = process.env.EXPO_PUBLIC_APPWRITE_COL_CATEGORIES_ID;

const categoryService = {

    // Get Categories 
    async getCategories(userId) {
        console.log("(Service) Fetching categories for user ID:", userId, "dbId:", dbId, "colId:", colId);
        if (!userId) {
            console.error("No user ID provided in getCategories");
            return { data: [], error: "No user ID provided" };
        }
        try {
            const response = await databaseService.listDocuments(dbId, colId, [
                Query.equal('user_id', userId),
            ]);
            console.log("(Service) Categories fetched:", response);
            return response; 
        } catch (error) {
            console.log("Error fetching categories:", error);
            return { data: [], error: error.message };
        }
    },

    // Create Category
    async addCategory(user_id, data) {
        console.log("(Service) Adding category with data:", data);
        if (!data) {
            return { error: "Missing data" };
        }
        const dataToSend = {
            ...data,
            user_id: user_id
        };
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
};

export default categoryService;