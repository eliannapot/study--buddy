import { useLocalSearchParams } from "expo-router";
import { useMemo } from "react";
import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import StreakIndicator from '../../components/StreakIndicator';
import XPindicator from '../../components/XPIndicator';

import { useBadges } from "../../contexts/BadgeContext";
import { useUserBadges } from '../../contexts/UserBadgeContext';

import { getXPStats, parseXPLog } from '../../utils/statisticsUtils';
import colors from '../config/colors';

const BuddyProfileScreen = () => {
    const { userDoc } = useLocalSearchParams();
    const { badges: allBadges } = useBadges();
    const { fetchFavouriteBadges } = useUserBadges();

    // Safely parse userDoc with error handling
    const parsedUserDoc = useMemo(() => {
        try {
            return userDoc ? JSON.parse(userDoc) : null;
        } catch (error) {
            console.error("Error parsing userDoc:", error);
            return null;
        }
    }, [userDoc]);

    if (!parsedUserDoc) {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" />
                <Text>Loading profile data...</Text>
            </View>
        );
    }

    const userName = parsedUserDoc?.name ?? "Unknown";
    const userStreak = parsedUserDoc?.streak ?? 0;
    const parsedXPLog = parseXPLog(parsedUserDoc?.xpLog ?? []);
    const xpStats = getXPStats(parsedXPLog);

    // const [favouriteBadges, setFavouriteBadges] = useState([]);
    // const [loadingBadges, setLoadingBadges] = useState(true);

    // useEffect(() => {
    //     let isMounted = true;
    //     const fetchBadges = async () => {
    //         setLoadingBadges(true);
    //         console.log("Fetching favourite badges for user:", parsedUserDoc);
    //         try {
    //             if (parsedUserDoc?.user_id) {
    //                 const badges = await fetchFavouriteBadges(parsedUserDoc.user_id);
    //                 if (isMounted) setFavouriteBadges(badges || []);
    //             }
    //         } catch (e) {
    //             if (isMounted) setFavouriteBadges([]);
    //         } finally {
    //             if (isMounted) setLoadingBadges(false);
    //         }
    //     };
    //     fetchBadges();
    //     return () => { isMounted = false; };
    // }, [parsedUserDoc]);

    // // Add this block just before the return statement in the component
    // const renderFavouriteBadges = () => {
    //     if (loadingBadges) {
    //         return (
    //             <View style={{ alignItems: "center", marginVertical: 10 }}>
    //                 <ActivityIndicator size="small" />
    //                 <Text>Loading badges...</Text>
    //             </View>
    //         );
    //     }
    //     if (!favouriteBadges.length) {
    //         return (
    //             <Text style={{ textAlign: "center", marginVertical: 10, fontFamily: "InterLight" }}>
    //                 No favourite badges yet.
    //             </Text>
    //         );
    //     }
    //     return (
    //         <View style={{ flexDirection: "row", flexWrap: "wrap", justifyContent: "center", marginVertical: 10 }}>
    //             {favouriteBadges.map(badgeId => {
    //                 const badge = allBadges.find(b => b.id === badgeId);
    //                 if (!badge) return null;
    //                 return (
    //                     <BadgeItem key={badge.id} badge={badge} style={{ margin: 5 }} />
    //                 );
    //             })}
    //         </View>
    //     );
    // };

    return (
        <ScrollView style={styles.container}>
            <View style={styles.infoContainer}>
                <Icon name="person-circle" size={150} color={colors.black} style={styles.profileIcon} />
                <View>
                    <View style={styles.profileInfo}>
                        <XPindicator userXP={xpStats.total} candySize={70} color={colors.blueText}/>
                        <StreakIndicator userStreak={userStreak} flameSize={70} color={colors.blueText} />
                    </View>
                    <Text style={styles.name}>{userName}.</Text>
                </View>
            </View>

            <View style={styles.statisticsContainer}>
                <Text style={styles.statisticsTitle}>Experience Points (XP):</Text>
                <View style={styles.statisticsLine}>
                    <Text style={styles.statisticsDescription}>• Today:</Text>
                    <Text style={styles.statisticsText}>{xpStats.today}</Text>
                </View>
                <View style={styles.statisticsLine}>
                    <Text style={styles.statisticsDescription}>• This week:</Text>
                    <Text style={styles.statisticsText}>{xpStats.week}</Text>
                </View>
                <View style={styles.statisticsLine}>
                    <Text style={styles.statisticsDescription}>• Total:</Text>
                    <Text style={styles.statisticsText}>{xpStats.total}</Text>
                </View>
            </View>

            {/* {renderFavouriteBadges()} */}
            
            
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.lightbackground,
    },
    infoContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginVertical: 15,
        marginBottom: 5,
    },
    profileInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    name: {
        fontSize: 20,
        fontFamily: 'InterLight',
        marginVertical: 10,
        textDecorationLine: 'underline',
    },
    statisticsContainer: {
        backgroundColor: colors.hexToRGBA(colors.blueText, 0.05),
        padding: 10,
        borderRadius: 5,
        margin: 5,
        borderWidth: 1,
    },
    statisticsTitle: {
        fontSize: 18,
        fontFamily: 'InterBold',
        marginBottom: 5,
    },
    statisticsLine: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginBottom: 8,
    },
    statisticsDescription: {
        fontSize: 16,
        fontFamily: 'InterLight',
    },
    statisticsText: {
        fontSize: 16,
        fontFamily: 'InterSemiBold',
        color: colors.black,
        textAlign: 'right',
        minWidth: 35,
    },
});

export default BuddyProfileScreen;