import { ScrollView } from "react-native";

import BuddyList from "../../components/BuddyList";
import { buddies } from "../../data/buddies";
import { getFocusingBuddies } from "../../utils/buddyUtils";

const AllBuddiesScreen = () => {

    const allBuddies = getFocusingBuddies(buddies);

    return (
        <ScrollView>
           <BuddyList topBuddies={allBuddies}/>
        </ScrollView>
        
    );
}

export default AllBuddiesScreen;