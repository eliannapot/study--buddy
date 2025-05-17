import databaseService from './databaseService.js';

const dbId = process.env.EXPO_PUBLIC_APPWRITE_DB_ID;
const colId = process.env.EXPO_PUBLIC_APPWRITE_COL_CATEGORIES_ID;

const categoryService = {

    //Get Categories
    async getCategories() {
        const response = await databaseService.listDocuments(dbId, colId); 
        if (response.error) {
            return {error: response.error};
        }
        return {data: response};
    },
};

export default categoryService;