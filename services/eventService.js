import databaseService from './databaseService.js';

// Appwrite database and collection id
const dbId = process.env.EXPO_PUBLIC_APPWRITE_DB_ID;
const colId = process.env.EXPO_PUBLIC_APPWRITE_COL_EVENTS_ID;

const eventService = {

    // Get Events
    async getEvents() {
        const response = await databaseService.listDocuments(dbId, colId);
        if (response.error) {
            return { error: response.error };
        }
        return { data: response };
    },

};

export default eventService;