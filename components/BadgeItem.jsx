import { Pressable, StyleSheet, Text, TouchableOpacity, View } from "react-native";

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
        <Pressable onPress={onPress} style={styles.container}>
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
                            <View style={styles.titleContainer}>    
                                <Text style={[styles.badgeText, , {textAlign: "flex-start"}]}>
                                    {badge.isWon ? 
                                        ( badge.title ) : ("???")}
                                </Text>
                            </View>
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
                    <View style={styles.titleContainer}>
                        <Text 
                            style={styles.badgeText}
                            numberOfLines={3}
                            ellipsizeMode="tail"
                        >
                            {badge.isWon ? 
                            ( badge.title ) : ("???")}
                        </Text>
                    </View>
                </View>
            )}
        </Pressable>
    
        
    );
};

export default BadgeItem;

const styles = StyleSheet.create({
    container: {
        // width: 180,
    },
    activeView: {
        width: 280,
        height: 200,
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
        paddingLeft: 15,
        flex: 1,
    },
    favouriteContainer: {
        flexDirection: "row", 
        alignItems: "center", 
        marginTop: 10,
    },
    inactiveView: {
        width: 150,
        height: 200,
        padding: 15,
        margin: 5,
        backgroundColor: colors.hexToRGBA(colors.tertiary, 0.15),
        borderRadius: 15,
        alignItems: "center",
    },
    titleContainer: {
        minHeight: 40,
        justifyContent: "center",
    },
    badgeText: {
        fontSize: 16,
        fontFamily: "InterRegular",
        flexShrink: 1,
        textAlign: "center",
    },
    badgeDate: {
        fontSize: 16,
        fontFamily: "InterLight",
    },
});

