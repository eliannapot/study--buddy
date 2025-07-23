import { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

import colors from '../app/config/colors';
import { useBadges } from "../contexts/BadgeContext";
import { useUserBadges } from '../contexts/UserBadgeContext';

const FavoriteBadges = ({ parsedUserDoc }) => {
    const [favouriteBadges, setFavouriteBadges] = useState([]);
    const [loadingBadges, setLoadingBadges] = useState(true);

    const { badges: allBadges } = useBadges();
    const { fetchFavouriteBadges } = useUserBadges();

    const fetchBadges = async () => {
        setLoadingBadges(true);
        console.log("Fetching favourite badges for user:", parsedUserDoc);
        try {
            if (parsedUserDoc?.user_id) {
                const badges = await fetchFavouriteBadges(parsedUserDoc.user_id);
                console.log("Fetched favourite badges:", badges);
                setFavouriteBadges(badges);
            }
        } catch (e) {
            setFavouriteBadges([]);
        } finally {
            setLoadingBadges(false);
        }
    };

    useEffect(() => {
        fetchBadges();
    }, [parsedUserDoc?.user_id]);

    // Add this block just before the return statement in the component
    const renderFavouriteBadges = () => {
        console.log("Rendering favourite badges:", favouriteBadges);
        if (loadingBadges) {
            return (
                <View style={{ alignItems: "center", marginVertical: 10 }}>
                    <ActivityIndicator size="small" />
                    <Text>Loading badges...</Text>
                </View>
            );
        }
        if (!favouriteBadges.length) {
            return (
                <Text style={{ textAlign: "center", marginVertical: 10, fontFamily: "InterLight" }}>
                    No favourite badges yet.
                </Text>
            );
        }
        return (
            <View style={{ flexDirection: "row", flexWrap: "wrap", justifyContent: "center", marginVertical: 10 }}>
                {favouriteBadges.map(badgeId => {
                    const badge = allBadges.find(b => b.$id === badgeId);
                    if (!badge) return null;
                    return (
                        <BadgeItem key={badge.$id} badge={badge} style={{ margin: 5 }} />
                    );
                })}
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Favourite Badges</Text>
            {renderFavouriteBadges()}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.hexToRGBA(colors.blueText, 0.1),
        padding: 5,
        borderRadius: 5,
        borderColor: colors.black,
        borderWidth: 1,
    }
});

export default FavoriteBadges;