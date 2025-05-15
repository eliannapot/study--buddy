import { ScrollView } from "react-native";

import LeaderboardList from "../../components/LeaderboardList";
import { buddies } from "../../data/buddies";
import { getSortedBuddiesByXP } from "../../utils/buddyUtils";

const LeaderboardScreen = () => {

    const allSortedBuddies = getSortedBuddiesByXP(buddies);

    return (
        <ScrollView>
           <LeaderboardList leaderboard={allSortedBuddies}/>
        </ScrollView>
        
    );
}

export default LeaderboardScreen;