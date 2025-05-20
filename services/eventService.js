import { ID } from 'react-native-appwrite';
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

    // Create Event
    async addEvent(data) {
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
};

export default eventService;