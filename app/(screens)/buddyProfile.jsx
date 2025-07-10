import { StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import { useLocalSearchParams } from "expo-router";

import colors from '../../app/config/colors';

import StreakIndicator from '../../components/StreakIndicator';
import XPindicator from '../../components/XPIndicator';

import { getXPStats, parseXPLog } from '../../utils/statisticsUtils';

const BuddyProfileScreen = () => {

    const { userDoc } = useLocalSearchParams();
    const parsedUserDoc = JSON.parse(userDoc);
    console.log("BuddyProfileScreen userDoc:", parsedUserDoc);

    const userName = parsedUserDoc?.name ?? "Unknown";
    const userStreak = parsedUserDoc?.streak ?? 0;

    const parsedXPLog = parseXPLog(parsedUserDoc?.xpLog ?? []);
    const xpStats = getXPStats(parsedXPLog);

    return (
        <View style={styles.container}>
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
        </View>
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
