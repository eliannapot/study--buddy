import React from 'react';
import { useState } from 'react';
import { View, Text, StyleSheet, FlatList, ScrollView, Alert } from 'react-native';

import BadgeItem from '../../components/BadgeItem';

import Icon from "react-native-vector-icons/Ionicons";

import colors from '../../app/config/colors';
import { badges } from '../../data/badges';

const BadgesScreen = () => {
   
    const [allBadges, setAllBadges] = useState(badges);

    const groupedBadges = allBadges.reduce((acc, badge) => {
        if (!acc[badge.type]) acc[badge.type] = [];
        acc[badge.type].push(badge);
        return acc;
    }, {});

    
    const toggleFavourite = (id) => {
        setAllBadges((prevBadges) => {
            const favouriteCount = prevBadges.filter(b => b.isFavourite).length;

            return prevBadges.map(badge => {
                if (badge.id === id) {
                    if (!badge.isFavourite && favouriteCount >= 3) {
                        Alert.alert("Max Favourites", "You can only have up to 3 favourite badges.");
                        return badge;
                    }

                    return {
                        ...badge,
                        isFavourite: !badge.isFavourite
                    };
                }
                return badge;
            });
        });
    };

    const [activeBadgeId, setActiveBadgeId] = useState(null); 
    const toggleActiveBadge = (id) => {
        setActiveBadgeId(prev => (prev === id ? null : id)); 
    };

    
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
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => 
                            <BadgeItem 
                                badge={item} 
                                isActive={activeBadgeId === item.id} 
                                onPress={() => toggleActiveBadge(item.id)} 
                                onToggleFavourite={toggleFavourite}
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