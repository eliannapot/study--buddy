import { createContext, useContext, useEffect, useState } from 'react';
import { ActivityIndicator, Alert, StyleSheet, Text, View } from 'react-native';

import colors from '../app/config/colors';
import userService from '../services/userService';

import { checkStreakBadges } from '../utils/badgeUtils';

import { useAuth } from './AuthContext';
import { useBadges } from './BadgeContext';
import { useUserBadges } from './UserBadgeContext';

const UsersContext = createContext();

export const UsersProvider = ({ children }) => {
    const { user } = useAuth();
    const { badges: allBadges } = useBadges();
    const { userBadges, addUserBadge } = useUserBadges();

    const [users, setUsers] = useState([]);
    const [currentUserDoc, setCurrentUserDoc] = useState(null);
    const [initialLoading, setInitialLoading] = useState(true);
    const [error, setError] = useState(null);

    const [polling, setPolling] = useState(false);

    useEffect(() => {
        if (!user?.$id) {
            setInitialLoading(false);
            return;
        }
        
        const loadInitial = async () => {
            await fetchAllUsers();
            await fetchCurrentUser();
            setInitialLoading(false);
        }
        loadInitial();
        
        //Polling every 10 seconds
        const interval = setInterval( async () => {
            setPolling(true);
            await fetchAllUsers();
            // await fetchCurrentUser();
            setPolling(false);
        }, 10000); 
        
        //Cleanup on unmount
        return () => clearInterval(interval);
    }, [user]);

    const fetchAllUsers = async () => {
        const response = await userService.getAllUsers();
        // console.log("fetch all users context response:", response);
        if (response.error) {
            setError(response.error);
            Alert.alert("Error fetching users", response.error);
        } else {
            setUsers(response.data);
        }
    };

    const fetchCurrentUser = async () => {
        const response = await userService.getUserByAuthId(user.$id);
        if (response.error) {
            setError(response.error);
            console.warn("Could not fetch current user's document:", response.error);
        } else {
            setCurrentUserDoc(response.data);
        }
    };

    const updateCurrentUser = async (updatedData) => {
        console.log("Updating current user with data:", updatedData);
        if (!currentUserDoc?.$id) return;

        const response = await userService.updateUser(currentUserDoc.$id, updatedData);
        if (response.error) {
            Alert.alert("Update Error", response.error);
        } else {
            setCurrentUserDoc(response.data);
            setUsers(users.map(u => u.$id === response.data.$id ? response.data : u));
        }
    };

    const updateUserById = async (userId, updatedData) => {
        const response = await userService.updateUser(userId, updatedData);
        if (response.error) {
            Alert.alert("Update Error", response.error);
        } else {
            setUsers(prev => prev.map(u => u.$id === userId ? response.data : u));
        }
        return response;
    };

    const deleteCurrentUser = async () => {
        if (!currentUserDoc?.$id) return;

        const response = await userService.deleteUser(currentUserDoc.$id);
        if (response.error) {
            Alert.alert("Delete Error", response.error);
        } else {
            setCurrentUserDoc(null);
            setUsers(users.filter(u => u.$id !== currentUserDoc.$id));
        }
    };


    const handleUserActivity = async (userId) => {
        if (!userId) return;

        const userDoc = users.find(u => u.$id === userId);
        if (!userDoc) {
            console.warn("User not found in context for streak update:", userId);
            return;
        }

        const today = new Date().toISOString().split("T")[0];
        const lastActiveDate = userDoc.lastActiveDate || null;

        if (lastActiveDate !== today) {
            const updatedStreak = (userDoc.streak || 0) + 1;
            const updateData = {
                streak: updatedStreak,
                lastActiveDate: today,
                hasMetDailyGoal: true,
            };

            await updateUserById(userDoc.$id, updateData);

            if (userDoc.$id === currentUserDoc?.$id) {
                setCurrentUserDoc(prev => ({
                    ...prev,
                    ...updateData,
                }));
            }

            const earnedBadges = await checkStreakBadges(
                user.$id,
                updatedStreak,
                allBadges,
                userBadges,
                addUserBadge
            );
            if (earnedBadges.length > 0) {
                Alert.alert("New Badges Earned", `You earned: ${earnedBadges.map(b => b.title).join(', ')}`);
            }
        }
    };


    return (
        <UsersContext.Provider
            value={{
                users,
                currentUserDoc,
                updateCurrentUser,
                deleteCurrentUser,
                fetchCurrentUser,
                updateUserById,
                handleUserActivity,
            }}
        >
            {initialLoading ? (
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <ActivityIndicator size="large" color={colors.primary} />
                </View>
            ) : ( null )}
                <>
                    {error && <Text style={styles.errorText}>{error}</Text>}
                    {children}
                </>
        </UsersContext.Provider>
    );
};

const styles = StyleSheet.create({
    errorText: {
        color: colors.red,
        textAlign: 'center',
        marginBottom: 10,
        fontSize: 16,
    },
});

export const useUsers = () => useContext(UsersContext);
