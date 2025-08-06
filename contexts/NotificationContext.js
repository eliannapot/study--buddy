import { createContext, useContext, useEffect, useState } from 'react';
import { ActivityIndicator, Alert, StyleSheet, Text, View } from 'react-native';

import colors from '../app/config/colors';
import notificationService from '../services/notificationService';
import { useAuth } from './AuthContext';

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {

    const { user } = useAuth();
    
    const [notifications, setNotifications] = useState([]);
    const [unreadCount, setUnreadCount] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        console.log("NotificationProvider mounted, user:", user?.$id);
        if (user?.$id) {{
            fetchNotifications();
        }} else {
            setLoading(false);
        }
    }, [user]);

    const fetchNotifications = async () => {
        setLoading(true);
        const response = await notificationService.getNotifications(user.$id);
        if (response.error) {
            setError(response.error);
            Alert.alert("Error", response.error);
        } else {
            setNotifications(response.data);
            setUnreadCount(response.data.filter(n => n.unread).length);
            setError(null);
        }
        setLoading(false);
        
    };

    const addNotification = async (notificationData) => {
        if (!notificationData?.message) {
            Alert.alert("Error", "Notification message is required");
            return;
        }

        const response = await notificationService.addNotification(
            user.$id, 
            notificationData
        );
        
        if (response.error) {
            Alert.alert("Error", response.error);
        } else {
            setNotifications([response.data, ...notifications]);
            setUnreadCount(unreadCount + 1);
        }
        return response;
    };

    const markAsRead = async (id) => {
        const response = await notificationService.setNotificationRead(id, true);
        if (response.error) {
            Alert.alert("Error", response.error);
        } else {
            setNotifications(notifications.map(n => 
                n.id === id ? { ...n, unread: false } : n
            ));
            setUnreadCount(unreadCount - 1);
        }
        return response;
    };

    const markAllAsRead = async () => {
        if (!user?.$id) return;
        
        const response = await notificationService.markAllAsRead(user.$id);
        if (response.error) {
            Alert.alert("Error", response.error);
        } else {
            setNotifications(notifications.map(n => ({ ...n, unread: false })));
            setUnreadCount(0);
        }
        return response;
    };

    const deleteNotification = async (id) => {
        Alert.alert("Delete Notification", "Are you sure?", [
            {
                text: "Cancel",
                style: "cancel",
            },
            {
                text: "Delete",
                style: "destructive",
                onPress: async () => {
                    const response = await notificationService.deleteNotification(id);
                    if (response.error) {
                        Alert.alert("Error", response.error);
                    } else {
                        const notificationToDelete = notifications.find(n => n.id === id);
                        setNotifications(notifications.filter(n => n.id !== id));
                        if (notificationToDelete?.unread) {
                            setUnreadCount(unreadCount - 1);
                        }
                    }
                },
            },
        ]);
    };

    return (
        <NotificationContext.Provider value={{ 
            notifications,
            unreadCount,
            loading,
            error,
            refreshNotifications: fetchNotifications,
            addNotification,
            markAsRead,
            markAllAsRead,
            deleteNotification
        }}>
            {loading ? (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color={colors.primary} />
                </View>
            ) : (
                <>
                    {error && <Text style={styles.errorText}>{error}</Text>}
                    {children}
                </>
            )}
        </NotificationContext.Provider>
    );
};

const styles = StyleSheet.create({
    loadingContainer: {
        justifyContent: 'center', 
        alignItems: 'center',
        flex: 1
    },
    errorText: {
        color: 'red',
        textAlign: 'center',
        marginBottom: 10,
        fontSize: 16,
    },
});

export const useNotifications = () => useContext(NotificationContext);