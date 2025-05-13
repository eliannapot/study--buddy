import {Text, View, StyleSheet} from "react-native";

import Icon from "react-native-vector-icons/Ionicons";

import colors from "../app/config/colors";

const BuddyItem = ({ buddy }) => {

    return(
        <View style={styles.buddyItem}>
            <Icon
                name="radio-button-on" size={35} color={ buddy.isFocusing ? (colors.primary) : (colors.black)}
            />
            <Text style={styles.buddyName}>{buddy.name}</Text>
            
            { buddy.isFocusing ? (
                <Text style={styles.buddyStatus}>Focusing...</Text>
            ) : (   
                null
            ) }
        </View>
    );
};

const styles = StyleSheet.create({
    buddyItem: { 
        flexDirection: "row", 
        alignItems: "center", 
        padding: 10, 
        backgroundColor: colors.hexToRGBA(colors.tertiary, 0.05), 
        borderWidth: 0.5, 
    },
    buddyName: { 
        flex: 1, 
        marginLeft: 10, 
        fontSize: 16,
        fontFamily: "InterRegular", 
    },
    buddyStatus: { 
        color: colors.primary, 
        fontFamily: "InterItalic",
        fontSize: 16, 
    },
});

export default BuddyItem;
