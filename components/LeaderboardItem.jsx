import { Text, View } from "react-native";

import Icon from "react-native-vector-icons/Ionicons";
import colors from "../app/config/colors";

const LeaderboardItem = ({item, index}) => {
    return(
        <View style={styles.leaderboardItem}>
            <View style={styles.rankContainer}> 
                <Text style={styles.rank}>{index + 1}</Text>
            </View>
            <View style={styles.nameContainer}>
                <Icon 
                    name="radio-button-on" 
                    size={20} 
                    color={ item.isFocusing ? colors.primary : colors.black } 
                />
                <Text style={styles.name}>{item.name}</Text>
            </View>
            <View style={styles.xpContainer}>
                <Text style={styles.xp}>{item.xp == null ? 0 : item.xp} XP</Text>
            </View>
        </View>
    );
};

const styles = {
    leaderboardItem: { 
        flexDirection: "row", 
        alignItems: "center", 
        padding: 5, 
    },
    rankContainer: {
        backgroundColor: colors.secondary,
        height: 40,
        borderTopRightRadius: 15,
        borderBottomLeftRadius: 15,
        borderWidth: 1,
        justifyContent: "center",
        marginRight: 7,
        flex: 1,
        padding: 5,
    },
    rank: { 
        fontFamily: "LailaSemiBold",
        fontSize: 19,
        textAlign: "center",
    },
    nameContainer: {
        flexDirection: "row", 
        alignItems: "center", 
        flex: 5, 
        backgroundColor: colors.hexToRGBA(colors.tertiary, 0.05),
        paddingVertical: 8,
        paddingHorizontal: 15,
        borderWidth: 1,
        borderTopLeftRadius: 15,
        borderBottomRightRadius: 15,
        marginRight: 7,
    },
    name: { 
        flex: 1, 
        marginLeft: 10, 
        fontFamily: "InterRegular",
        fontSize: 16,
     },
    xpContainer: {
        flex: 2,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: colors.hexToRGBA(colors.tertiary, 0.05),
        padding: 8,
        borderWidth: 1,
        borderTopLeftRadius: 15,
        borderBottomRightRadius: 15,
    },
    xp: { 
        fontfamily: "InterSemiBold", 
        fontSize: 18, 
    },
};

export default LeaderboardItem;