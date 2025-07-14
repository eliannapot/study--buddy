import { useState } from 'react';
import { ActivityIndicator, Alert, FlatList, ScrollView, StyleSheet, Text, View } from 'react-native';

import BadgeItem from '../../components/BadgeItem';

import Icon from "react-native-vector-icons/Ionicons";
import colors from '../../app/config/colors';

import { useAuth } from '../../contexts/AuthContext';
import { useBadges } from '../../contexts/BadgeContext';
import { useUserBadges } from '../../contexts/UserBadgeContext';

const BadgesScreen = () => {

    const { user } = useAuth();
    const { badges: allBadges } = useBadges();
    const { userBadges, updateUserBadge, loading } = useUserBadges();
       
    const [activeBadgeId, setActiveBadgeId] = useState(null); 

    // Merge badges with user-specific data (isWon, isFavourite, etc.)
    const getMergedBadges = () => {
        return allBadges.map((badge) => {
            const userBadge = userBadges.find((ub) => ub.badge_id === badge.$id);
            return {
                ...badge,
                id: badge.$id, 
                isWon: !!userBadge,
                isActive: activeBadgeId === badge.$id,
                isFavourite: userBadge?.isFavourite || false,
                dateEarned: userBadge?.dateEarned || null,
                // Keep all original badge fields (type, title, criteriaKey)
            };
        });
    };

    
    const toggleFavourite = async (badgeId) => {
        try{
            const userBadge = userBadges.find((ub) => ub.badge_id === badgeId);
            const currentFavourites = userBadges.filter((b) => b.isFavourite).length;

            // Enforce max 3 favourites
            if (!userBadge?.isFavourite && currentFavourites >= 3) {
                Alert.alert("Max Favourites", "You can only have up to 3 favourite badges.");
            return;
            }

            await updateUserBadge(userBadge.$id, {
                isFavourite: !userBadge.isFavourite
            });
        
        } catch (error) {
            Alert.alert("Error", error.message);
        }
    };

    const groupedBadges = getMergedBadges().reduce((acc, badge) => {
        if (!acc[badge.type]) acc[badge.type] = [];
        acc[badge.type].push(badge);
        return acc;
    }, {});
    
    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color={colors.primary} />
            </View>
        );
    }

    
    return (
        <ScrollView style={styles.container}>
            
             {Object.entries(groupedBadges).map(([type, items]) => (
                <View key={type} style={{ marginBottom: 12 }}>
                    <View style={styles.titleContainer}>
                        <Icon name="caret-back" size={26} color={colors.primary} />
                        <Text style={styles.sectionTitle}>{type}</Text>
                        <Icon name="caret-forward" size={26} color={colors.primary} />
                    </View>
                    
                    <FlatList
                        horizontal
                        data={items}
                        keyExtractor={(item) => item.$id}
                        renderItem={({ item }) => 
                            <BadgeItem 
                                badge={item} 
                                isActive={activeBadgeId === item.$id} 
                                onPress={() => setActiveBadgeId(item.$id)} 
                                onToggleFavourite={() => toggleFavourite(item.$id)} 
                            />}
                        showsHorizontalScrollIndicator={false}
                    />
                </View>
            ))}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 16,
    },
    titleContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 5,
        alignItems: 'center',
    },
    sectionTitle: {
        fontSize: 23,
        fontFamily: "LailaSemiBold",
        textAlign: 'left',
    },

});

export default BadgesScreen;