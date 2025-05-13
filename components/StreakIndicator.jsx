import { Text, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';

import colors from '../app/config/colors';
import flame from '../assets/images/flame.png';

const StreakIndicator = ({ userStreak, flameSize = 50 }) => {
    const scale = flameSize / 50; // Base size from original design

    const dynamicStyles = {
        streakIndicator: {
            padding: 5 * scale,
            borderWidth: 3 * scale,
            borderRadius: 5 * scale,
        },
        flameIcon: {
            width: flameSize,
            height: flameSize,
        },
        streakNumber: {
            fontSize: 25 * scale,
        },
        streakText: {
            fontSize: 10 * scale,
            lineHeight: 11 * scale,
        },
    };

    return (
        <TouchableOpacity style={[styles.streakIndicator, dynamicStyles.streakIndicator]}>
            <ImageBackground
                source={flame}
                style={[styles.flameIcon, dynamicStyles.flameIcon]}
                imageStyle={styles.flameImage}
            >
                <Text style={[styles.streakNumber, dynamicStyles.streakNumber]}>
                    {userStreak}
                </Text>
                <Text style={[styles.streakText, dynamicStyles.streakText]}>
                    days Streak
                </Text>
            </ImageBackground>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    streakIndicator: {
        backgroundColor: colors.hexToRGBA(colors.tertiary, 0.2),
        borderWidth: 3,
        borderColor: colors.tertiary,
        padding: 5,
        borderRadius: 5,
        marginRight: 10,
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
    },
    streakNumber: {
        fontFamily: "LailaBold",
        fontSize: 25,
        textAlign: "center",
    },
    streakText: {
        fontFamily: "LailaSemiBold",
        fontSize: 10,
        textAlign: "center",
        lineHeight: 11,
    },
    // Container for the flame background
    flameIcon: {
        width: 50,  // Set explicit dimensions
        height: 50,
        justifyContent: 'center',  
        alignItems: 'center',
    },
    // Controls how the flame image scales inside ImageBackground
    flameImage: {
        resizeMode: 'contain',  // Ensures the whole flame fits
        width: '100%',         // Stretch to fill container
        height: '100%',
    },

});

export default StreakIndicator;