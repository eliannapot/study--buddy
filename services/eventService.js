import { ID, Query } from 'react-native-appwrite';
import databaseService from './databaseService.js';

// Appwrite database and collection id
const dbId = process.env.EXPO_PUBLIC_APPWRITE_DB_ID;
const colId = process.env.EXPO_PUBLIC_APPWRITE_COL_EVENTS_ID;

// Helper to remove Appwrite system fields
const cleanAppwriteData = (data) => {
    return Object.fromEntries(
        Object.entries(data).filter(([key]) => !key.startsWith('$'))
    );
};

const eventService = {

    // Get Events
    async getEvents(userId) {
        if (!userId) {
            console.error("No user ID provided in getEvents");
            return { data: [], error: "No user ID provided" };
        }
        try {
            const response = await databaseService.listDocuments(dbId, colId, [
                Query.equal('user_id', userId),
            ]);
            return response;
        } catch (error) {
            console.log("Error fetching events:", error);
            return { data: [], error: error.message };
        }
    },

    // Create Event
    async addEvent(user_id, data) {
        if (!data) {
            return {error: "No data provided"};
        }
        const dataToSend = {
            ...data,
            createdAt: new Date().toISOString(),
            user_id: user_id
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

    // Update Event
    async updateEvent(id, data) {
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

    //Delete Event
    async deleteEvent(id) {
        const response = await databaseService.deleteDocument(dbId, colId, id);
        if (response?.error) {
            return {error: response.error};
        }
        return {success: true};
    }
};

export default eventService;