import { useRouter } from 'expo-router';
import { ScrollView, StyleSheet, Text, TouchableOpacity } from 'react-native';

import { buddies } from '../../data/buddies';
import { getTop10BuddiesByXP, getTopFocusingBuddies } from '../../utils/buddyUtils.js';

import AddBuddyContainer from '../../components/AddBuddyContainer';
import BuddyList from '../../components/BuddyList';
import LeaderboardList from '../../components/LeaderboardList';
import colors from '../config/colors';

const BuddiesScreen = () => {

    const router = useRouter();

    const focusingBuddies = getTopFocusingBuddies(buddies);
    const top10Buddies = getTop10BuddiesByXP(buddies);

    return (
    <ScrollView contentContainerStyle={styles.container}>
    {/* <View style={styles.container}> */}
        
        <AddBuddyContainer/>

        <BuddyList topBuddies={focusingBuddies}/>
        <TouchableOpacity style={styles.seeAllButton} onPress={() => router.push("/allBuddies")}>
            <Text style={styles.seeAllText}>See all Buddies</Text>
            <Text style={styles.seeAllDots}>...</Text>
        </TouchableOpacity>

        <LeaderboardList leaderboard={top10Buddies}/>

        <TouchableOpacity style={styles.seeAllButton } onPress={() => router.push("/leaderboard")}>
            <Text style={styles.seeAllText}>Show more</Text>
            <Text style={styles.seeAllDots}>...</Text>
        </TouchableOpacity>      

    </ScrollView>
    // </View>
    );
};

const styles = StyleSheet.create({
    container: { 
        //flex: 1, 
        padding: 10, 
        backgroundColor: colors.lightbackground, 
    },
    seeAllButton: {
        borderBottomRadius: 5,
        alignItems: "center",
        justifyContent: "center",     
        borderWidth: 1,
        backgroundColor: colors.hexToRGBA(colors.tertiary, 0.05),
    },
    seeAllText: {
        fontFamily: "InterLight",
        fontSize: 16,
    },
    seeAllDots: {
        fontFamily: "InterExtraBold",
        fontSize: 16,
    },
});

export default BuddiesScreen;
//export const allSortedBuddies = getSortedBuddiesByXP(buddies);