import { ID, Query } from 'react-native-appwrite';
import databaseService from './databaseService.js';

const dbId = process.env.EXPO_PUBLIC_APPWRITE_DB_ID;
const colId = process.env.EXPO_PUBLIC_APPWRITE_COL_NOTIFICATIONS_ID;

const cleanAppwriteData = (data) => {
    return Object.fromEntries(
        Object.entries(data).filter(([key]) => !key.startsWith('$'))
    );
};

const notificationService = {

    // Get all notifications for user (newest first)
    async getNotifications(userId) {
        if (!userId) {
            console.error("Missing user ID in getNotifications");
            return { data: [], error: "Missing user ID" };
        }
        try {
            const [userRes, noneRes] = await Promise.all([
                databaseService.listDocuments(dbId, colId, [
                    Query.equal('user_id', userId),
                    Query.orderDesc('createdAt')
                ]),
                databaseService.listDocuments(dbId, colId, [
                    Query.equal('user_id', 'default-none'),
                ]),
            ]);
          
            // Extract documents from both responses
            const userDocs = userRes.data || [];
            const noneDocs = noneRes.data || [];
            
            // Combine and sort (none docs first, then user docs by date)
            const allDocs = [...noneDocs, ...userDocs];
            
            return { 
                data: allDocs.map(doc => ({
                    id: doc.$id,
                    ...cleanAppwriteData(doc)
                }))
            };
        } catch (error) {
            console.error("Error fetching notifications:", error);
            return { data: [], error: error.message };
        }
    },

    // Create new notification
    async addNotification(user_id, { message, iconType, relatedId }) {
        if (!user_id || !message) {
            return { error: "Missing required fields" };
        }
        
        const dataToSend = {
            user_id,
            message,
            iconType: iconType || 'system',
            relatedId: relatedId || '',
            unread: true,
            createdAt: new Date().toISOString()
        };

        try {
            const response = await databaseService.createDocument(
                dbId,
                colId,
                dataToSend,
                ID.unique()
            );
            return { data: cleanAppwriteData(response) };
        } catch (error) {
            console.error("Error creating notification:", error);
            return { error: error.message };
        }
    },

    // Mark notification as read/unread
    async setNotificationRead(id, readStatus = true) {
        if (!id) return { error: "Notification ID required" };
        
        try {
            const response = await databaseService.updateDocument(
                dbId,
                colId,
                id,
                { unread: !readStatus }
            );
            return { data: cleanAppwriteData(response) };
        } catch (error) {
            console.error("Error updating notification:", error);
            return { error: error.message };
        }
    },

    // Delete single notification
    async deleteNotification(id) {
        try {
            await databaseService.deleteDocument(dbId, colId, id);
            return { success: true };
        } catch (error) {
            console.error("Error deleting notification:", error);
            return { error: error.message };
        }
    },

    // Mark all notifications as read
    async markAllAsRead(userId) {
        try {
            const { data: notifications } = await this.getNotifications(userId);
            const updatePromises = notifications
                .filter(n => n.unread)
                .map(n => this.setNotificationRead(n.id, true));
            
            await Promise.all(updatePromises);
            return { success: true, count: updatePromises.length };
        } catch (error) {
            console.error("Error marking all as read:", error);
            return { error: error.message };
        }
    }
};

export default notificationService;