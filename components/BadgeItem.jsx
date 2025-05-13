import {Text, View, StyleSheet, Pressable, TouchableOpacity} from "react-native";

import Icon from "react-native-vector-icons/Ionicons";

import Star from "../assets/svg/Star";

import colors from "../app/config/colors";

const BadgeItem = ({ badge, isActive, onPress, onToggleFavourite }) => {

    const formatDateForBadges = (isoString) => {
        const date = new Date(isoString);

        return date.toLocaleDateString("en-GB", { 
            day: "2-digit", 
            month: "2-digit", 
            year: "numeric"
        }); // Output: "03/05/2025"
    };
    

    return(
        <Pressable onPress={onPress}>
         { isActive ? 
            ( 
                    <View style={styles.activeView} >
                        <Star
                        color={badge.isWon ? 
                            (colors.hexToRGBA(colors.secondary, 0.70)) 
                            : (colors.hexToRGBA(colors.primary, 0.55))}
                        stroke="#000"
                        size={100}
                        />
                        <View style={styles.infoContainer}>
                            <Text style={styles.badgeText}>
                                {badge.isWon ? 
                                    ( badge.title ) : ("???")}
                            </Text>
                            <Text style={styles.badgeDate}>
                            {badge.isWon ? 
                            ( 
                                formatDateForBadges(badge.dateEarned)  
                            ) : (
                                "???"
                            )}
                            </Text>
                            {badge.isWon ? (
                                <TouchableOpacity onPress={() => onToggleFavourite(badge.id)} style={styles.favouriteContainer}>
                                    <Icon 
                                        name={badge.isFavourite ? 'heart' : 'heart-outline'} 
                                        size={30} 
                                        color={badge.isFavourite ? colors.primary : colors.black} 
                                    />
                                    <Text style={styles.badgeText}> Mark as Favourite </Text>
                                </TouchableOpacity>
                            ) : ( 
                                "" 
                            )}    
                        </View>
                    
                  </View>
            ) : (
                <View style={styles.inactiveView} >
                    <Star
                        color={badge.isWon ? 
                            (colors.hexToRGBA(colors.secondary, 0.70)) 
                            : (colors.hexToRGBA(colors.primary, 0.55))}
                        stroke={colors.black}
                        size={100}
                    />
                    <Text style={styles.badgeText}>
                        {badge.isWon ? 
                           ( badge.title ) : ("???")}
                    </Text>
                </View>
            )}
        </Pressable>
    
        
    );
};

export default BadgeItem;

const styles = StyleSheet.create({
    activeView: {
        padding: 15,
        paddingBottom: 40,
        margin: 5,
        backgroundColor: colors.hexToRGBA(colors.primary, 0.15),
        borderRadius: 15,
        borderWidth: 1,
        borderColor: colors.primary,
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "space-between",
    },
    infoContainer: {
        paddingHorizontal: 15,
        justifyContent: "center",
    },
    favouriteContainer: {
        flexDirection: "row", 
        alignItems: "center", 
        marginTop: 10,
    },
    inactiveView: {
        padding: 15,
        margin: 5,
        backgroundColor: colors.hexToRGBA(colors.tertiary, 0.15),
        borderRadius: 15,
        alignItems: "center",
    },
    badgeText: {
        fontSize: 16,
        fontFamily: "InterRegular",
    },
    badgeDate: {
        fontSize: 16,
        fontFamily: "InterLight",
    },
});

