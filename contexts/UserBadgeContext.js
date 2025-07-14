import { createContext, useContext, useEffect, useState } from 'react';
import { ActivityIndicator, Alert, StyleSheet, Text, View } from 'react-native';
import colors from '../app/config/colors';
import userBadgeService from '../services/userBadgeService';
import { useAuth } from './AuthContext';

const UserBadgeContext = createContext();

export const UserBadgeProvider = ({ children }) => {
  const { user } = useAuth();
  const [userBadges, setUserBadges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch badges on mount or when user changes
  useEffect(() => {
    if (user?.$id) {
      fetchUserBadges();
    } else {
      setLoading(false);
    }
  }, [user]);

  // Fetch all badges for the user
  const fetchUserBadges = async () => {
    setLoading(true);
    const response = await userBadgeService.getUserBadges(user.$id);
    if (response.error) {
      setError(response.error);
      Alert.alert("Error", response.error);
    } else {
      setUserBadges(response.data);
      setError(null);
    }
    setLoading(false);
  };

  // Fetch only favorite badges
  const fetchFavouriteBadges = async () => {
    setLoading(true);
    const response = await userBadgeService.getFavouriteUserBadges(user.$id);
    if (response.error) {
      setError(response.error);
    } else {
      return response.data; // Return directly for specific use cases
    }
    setLoading(false);
  };

  // Add a new badge
  const addUserBadge = async (badgeId, isFavourite = false) => {
    if (!badgeId) {
      Alert.alert("Error", "No badge ID provided");
      return;
    }
    const response = await userBadgeService.addUserBadge(user.$id, badgeId, isFavourite);
    if (response.error) {
      Alert.alert("Error", response.error);
    } else {
      setUserBadges([...userBadges, response.data]);
    }
  };

  // Update a badge (e.g., toggle isFavourite)
  const updateUserBadge = async (badgeDocId, updatedData) => {
    if (!badgeDocId || !updatedData) {
      Alert.alert("Error", "Missing badge ID or update data");
      return;
    }
    const response = await userBadgeService.updateUserBadge(badgeDocId, updatedData);
    if (response.error) {
      Alert.alert("Error", response.error);
    } else {
      setUserBadges(
        userBadges.map((badge) =>
          badge.$id === badgeDocId ? response.data : badge
        )
      );
    }
  };

  

  return (
    <UserBadgeContext.Provider
      value={{
        userBadges,
        fetchUserBadges,
        fetchFavouriteBadges,
        addUserBadge,
        updateUserBadge,
        loading,
        error,
      }}
    >
      {loading ? (
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      ) : (
        <>
          {error && <Text style={styles.errorText}>{error}</Text>}
          {children}
        </>
      )}
    </UserBadgeContext.Provider>
  );
}


const styles = StyleSheet.create({
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginBottom: 10,
    fontSize: 16,
  },
});

export const useUserBadges = () => useContext(UserBadgeContext);