import { ScrollView } from "react-native";

import LeaderboardList from "../../components/LeaderboardList";
// import { buddies } from "../../data/buddies";
import { useUsers } from '../../contexts/UserContext';

import { getXPStats, parseXPLog } from "../../utils/statisticsUtils";

const LeaderboardScreen = () => {

    const { users } = useUsers();

    const allSortedBuddies = users.map(user => ({
        ...user,
        xp: getXPStats(parseXPLog(user.xpLog || [])).week 
    })).sort((a, b) => b.xp - a.xp);
    
    return (
        <ScrollView>
           <LeaderboardList leaderboard={allSortedBuddies}/>
        </ScrollView>
        
    );
}

export default LeaderboardScreen;