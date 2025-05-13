import { Text, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';

import colors from '../app/config/colors';
import candy from '../assets/images/candy.png';

const XPindicator = ({ userXP, candySize=50 }) => {

    const scale = candySize / 50; // 50 is the base size from your original design

    const dynamicStyles = {
        xpIndicator: {
            padding: 5 * scale,
            borderWidth: 3 * scale,
            borderRadius: 5 * scale,
        },
        candyIcon: {
            width: candySize,
            height: candySize,
        },
        xpNumber: {
            fontSize: 22 * scale,
        },
        xpText: {
            fontSize: 15 * scale,
        },
    };

    return (
        <TouchableOpacity style={[styles.xpIndicator, dynamicStyles.xpIndicator]}>
            <ImageBackground 
                source={candy} 
                style={[styles.candyIcon, dynamicStyles.candyIcon]} 
                imageStyle={styles.candyImage}>
                    <Text style={[styles.xpNumber, dynamicStyles.xpNumber]}>{userXP}</Text>
                    <Text style={[styles.xpText, dynamicStyles.xpText]}>XP</Text>
            </ImageBackground>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    xpIndicator: {
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
    xpNumber: {
        fontFamily: "LailaBold",
        fontSize: 22,
        textAlign: "center",
    },
    xpText: {
        fontFamily: "LailaSemiBold",
        fontSize: 15,
        textAlign: "center",
    },
    // Container for the candy background
    candyIcon: {
        width: 50,  // Set explicit dimensions
        height: 50,
        justifyContent: 'center',  
        alignItems: 'center',
    },
    // Controls how the candy image scales inside ImageBackground
    candyImage: {
        resizeMode: 'contain',  // Ensures the whole candy fits
        width: '100%',         // Stretch to fill container
        height: '100%',
    },

});

export default XPindicator;