import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

import colors from '../app/config/colors';
import addIcon from '../assets/images/plus.png';

const AddBuddyContainer = () => {

    return (
        <View style={styles.addBuddyContainer}>
            <Text style={styles.addBuddyText}>Add a Buddy:</Text>
            <TextInput 
                style={[styles.buddyInput, {color: colors.blueText}]} 
                placeholder="username" 
                placeholderTextColor={colors.blueText}
            />
            <TouchableOpacity style={styles.addButton}>
                <Image source={addIcon} style={{width:30, height:30}}/>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    addBuddyContainer: { 
        flexDirection: "row", 
        alignItems: "center", 
        marginBottom: 10, 
        backgroundColor: colors.hexToRGBA(colors.tertiary, 0.05),
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 3,
        borderWidth: 1,
    },
    addBuddyText: { 
        fontFamily: "InterSemiBold", 
        fontSize: 17, 
        marginRight: 5, 
    },
    buddyInput: { 
        flex: 1, 
        borderBottomWidth: 1, 
        padding: 5, 
        marginRight: 5, 
        marginLeft: 5,
        fontFamily: "InterItalic",
        backgroundColor: colors.lightbackground,
        borderWidth: 0.5,
        borderRadius: 15,
    },
    addButton: { 
        padding: 5 
    },
});

export default AddBuddyContainer;