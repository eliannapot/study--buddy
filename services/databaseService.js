import { database } from "./appwrite";

const databaseService = {

    //List Documents
    async listDocuments(dbId, colId) {
        try {
            const response = await database.listDocuments(dbId, colId); //Appwrite SDK function
            return response.documents || [];
        } catch (error) {
            console.error("Error fetching documents:", error.message);
            return {error: error.message}; 
        }
    },

    //Create Document
    async createDocument(dbId, colId, data, id = null) {
        try {
            return await database.createDocument(dbId, colId, id || undefined, data); //Appwrite SDK function
        } catch (error) {
            console.error("Error creating document:", error.message);
            return {error: error.message}; 
        };
    },

    //Delete Document
    async deleteDocument(diId, colId, id) {
        try {
            await database.deleteDocument(diId, colId, id); //Appwrite SDK function
            return { success: true };
        } catch (error) {
            console.error("Error deleting document:", error.message);
            return {error: error.message}; 
        }
    }

    
};

export default databaseService;