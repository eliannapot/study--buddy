import { ScrollView } from "react-native";

import LeaderboardList from "../../components/LeaderboardList";
// import { buddies } from "../../data/buddies";
import { useUsers } from '../../contexts/UserContext';

import { getSortedBuddiesByXP } from "../../utils/buddyUtils";

const LeaderboardScreen = () => {

    const { users } = useUsers();

    const allSortedBuddies = getSortedBuddiesByXP(users);

    return (
        <ScrollView>
           <LeaderboardList leaderboard={allSortedBuddies}/>
        </ScrollView>
        
    );
}

export default LeaderboardScreen;