import { ScrollView } from "react-native";

import BuddyList from "../../components/BuddyList";
// import { buddies } from "../../data/buddies";
import { useUsers } from "../../contexts/UserContext";
import { getFocusingBuddies } from "../../utils/buddyUtils";

const AllBuddiesScreen = () => {

    const { users, currentUserDoc } = useUsers();
    
    const filteredUsers = users.filter(u => u.$id !== currentUserDoc?.$id);
    
    const allBuddies = getFocusingBuddies(filteredUsers);

    return (
        <ScrollView>
           <BuddyList topBuddies={allBuddies}/>
        </ScrollView>
        
    );
}

export default AllBuddiesScreen;