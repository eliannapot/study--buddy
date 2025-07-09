import { Picker } from '@react-native-picker/picker';
import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Icon from "react-native-vector-icons/Ionicons";

import colors, { adjustableColors } from '../../app/config/colors';

import StatisticsChart from '../../components/StatisticsChart';
import StreakIndicator from '../../components/StreakIndicator';
import XPindicator from '../../components/XPIndicator';

import { getXPStats, parseXPLog } from '../../utils/statisticsUtils';

import { useUsers } from '../../contexts/UserContext';


const ProfileScreen = () => {
    
    // const xpLog = [
    //     { xp: 3, timestamp: '2025-04-10T08:30:00Z' },
    //     { xp: 2, timestamp: '2025-04-09T14:12:00Z' },
    //     { xp: 5, timestamp: '2025-04-04T17:00:00Z' },
    //     { xp: 1, timestamp: '2025-04-03T09:45:00Z' },
    //     { xp: 4, timestamp: '2025-04-01T11:15:00Z' },
    //     { xp: 2, timestamp: '2025-03-28T13:30:00Z' },
    //     { xp: 3, timestamp: '2025-03-27T16:00:00Z' },
    //     { xp: 1, timestamp: '2025-03-25T10:00:00Z' },
    //     { xp: 4, timestamp: '2025-03-24T12:45:00Z' },
    //     { xp: 2, timestamp: '2025-03-20T15:30:00Z' },
    //     { xp: 3, timestamp: '2025-03-19T18:00:00Z' },
    //     { xp: 1, timestamp: '2025-04-27T09:00:00Z' },
    //     { xp: 4, timestamp: '2025-04-26T11:30:00Z' },
    //     { xp: 2, timestamp: '2025-04-25T14:15:00Z' },
    //     { xp: 3, timestamp: '2025-04-24T16:45:00Z' },
    //     { xp: 1, timestamp: '2025-04-23T10:30:00Z' },
    //     { xp: 4, timestamp: '2025-04-22T12:00:00Z' },
    //     { xp: 2, timestamp: '2025-04-21T13:45:00Z' },
    //     { xp: 3, timestamp: '2025-04-20T15:15:00Z' },
    //     { xp: 1, timestamp: '2025-04-19T09:15:00Z' },
    //     { xp: 4, timestamp: '2025-04-28T11:45:00Z' },
    //     { xp: 2, timestamp: '2025-04-29T14:30:00Z' },
    // ];

    const { currentUserDoc } = useUsers();

    const userName = currentUserDoc?.name ?? "Guest";
    const userStreak = currentUserDoc?.streak ?? 0;

    const [dropdown, setDropdown] = useState("week");

    const parsedXPLog = parseXPLog(currentUserDoc?.xpLog ?? []);
    const xpStats = getXPStats(parsedXPLog);
    const todayXP = xpStats.today;
    const weekXP = xpStats.week;
    const totalXP = xpStats.total;


    return (
        <View style={styles.container}>
            <View style={styles.infoContainer}>
                <View>
                    <Icon name="person-circle" size={150} color={colors.black} style={styles.profileIcon} />
                </View>
                <View>
                    <View style={styles.profileInfo}>
                        <XPindicator userXP={totalXP} candySize={70} />
                        <StreakIndicator userStreak={userStreak} flameSize={70}/>
                    </View>
                    <Text style={styles.name}>
                        {userName}.
                    </Text>
                </View>
            </View>
            <View style={styles.statisticsContainer}>
                <Text style={styles.statisticsTitle}>My Experience Points (XP) :</Text>
                <View style={styles.statisticsLine}>
                    <Text style={styles.statisticsDescription}>• Today:</Text>
                    <Text style={styles.statisticsText}>{todayXP}</Text>
                </View>
                <View style={styles.statisticsLine}>
                    <Text style={styles.statisticsDescription}>• This week:</Text>
                    <Text style={styles.statisticsText}>{weekXP}</Text>
                </View>
                <View style={styles.statisticsLine}>
                    <Text style={styles.statisticsDescription}>• Total XP:</Text>
                    <Text style={styles.statisticsText}>{totalXP}</Text>
                </View>
            </View>

            <View style={styles.statisticsContainer}>
                <Text style={styles.statisticsTitle}>My Statistics :</Text>
                <View style={styles.picker}>
                <Picker 
                    selectedValue={dropdown} 
                    onValueChange={(value) => setDropdown(value)}
                    dropdownIconColor={adjustableColors.adjustableArrowColor}
                >
                    <Picker.Item label="This week" value="week"/>
                    <Picker.Item label="This month" value="month" />
                    <Picker.Item label="All time" value="alltime" />
                </Picker>
                </View>
                <StatisticsChart mode={dropdown} xpLog={parsedXPLog}/>

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
        alignItems: "flex-start",
        marginVertical: 15,
        marginBottom: 5
    },
    profileInfo: {
        flexDirection: "row",
        justifyContent: "flex-end",
        alignItems: "center",
    },
    name: {
        fontSize: 20,
        fontFamily: "InterLight",
        marginVertical: 10,
        textDecorationLine: "underline",
    },
    statisticsContainer: {
        backgroundColor: colors.hexToRGBA(colors.tertiary, 0.05),
        padding: 10,
        borderRadius: 5,
        marginHorizontal: 5,
        marginVertical: 5,
        borderWidth: 1,
    },
    statisticsTitle: {
        fontSize: 18,
        fontFamily: "InterBold",
        marginBottom: 5,
    },
    statisticsLine: {
        flexDirection: 'row',
        justifyContent: "flex-start",
        marginBottom: 8,
    },
    statisticsDescription: {
        fontSize: 16,
        fontFamily: "InterLight",
    },
    statisticsText: {
        fontSize: 16,
        fontFamily: "InterSemiBold",
        color: colors.blueText,
        textAlign: "right",
        minWidth: 35,
    },
    picker: {
        borderRadius: 5,
        borderWidth: 1,
        borderColor: colors.primary,
        backgroundColor: adjustableColors.adjustableBackgroundColor,
        width: "60%",
    },

});

export default ProfileScreen;