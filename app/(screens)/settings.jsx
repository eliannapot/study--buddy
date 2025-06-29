import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { ScrollView, StyleSheet, Switch, Text, TextInput, TouchableOpacity, View } from 'react-native';

import { useAuth } from "../../contexts/AuthContext";

import colors from '../config/colors';

const SettingsScreen = () => {
    const { user, logout } = useAuth();

    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);

    // const [username, setUsername] = useState('emily876');
    const [email, setEmail] = useState('em@emai.com');
    const [name, setName] = useState('Emily');
    const [password, setPassword] = useState('12345678');

    return (
        <ScrollView style={styles.container}>
            
            {/* Account Section */}
            <View style={styles.section}>
                <Text style={styles.header}>Profile Information</Text>
                    
                {/* Username */}
                {/* <View style={styles.rowContainer}>
                    <Text style={styles.title}>
                        Username:
                    </Text>
                    <TextInput
                        style={styles.input}
                        placeholder="emily876"
                        placeholderTextColor={colors.blueText}
                        value={username}
                        onChangeText={setUsername}
                        textContentType='username'
                    />
                </View> */}
                
                {/* Email */}
                <View style={styles.rowContainer}>
                    <Text style={styles.title}>
                        Email:
                    </Text>
                    <TextInput
                        style={styles.input}
                        placeholder="email@email.com"
                        placeholderTextColor={colors.blueText}
                        value={email}
                        onChangeText={setEmail}
                        autoCapitalize='none'
                        keyboardType='email-address'
                    />
                </View>
    
                {/* Name */}
                <View style={styles.rowContainer}>
                    <Text style={styles.title}>
                        Name:
                    </Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Emily"
                        placeholderTextColor={colors.blueText}
                        value={name}
                        onChangeText={setName}
                        autoCapitalize='none'
                    />
                </View>
    
                {/* Password */}
                <View style={styles.rowContainer}>
                    <Text style={styles.title}>
                        Password:
                    </Text>
                    <TextInput
                        style={styles.input}
                        placeholder="****"
                        placeholderTextColor={colors.blueText}
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry
                        textContentType='none'
                    />
                </View>

                <TouchableOpacity style={[styles.button, { alignSelf: 'center' }]}>
                    <Text style={styles.buttonText}>Update</Text>
                </TouchableOpacity>

                <View style={[styles.rowContainer, { marginTop: 10 }]}>
                    <Text style={styles.title}> Profile Picture:</Text>
                    <TouchableOpacity style={styles.button}>
                        <Text style={styles.buttonText}>Change</Text>
                    </TouchableOpacity>
                </View>
            </View>

            {/* Dark Mode Toggle */}
            {/* <View style={styles.settingItem}>
                <Text style={styles.settingText}>Dark Mode</Text>
                <Switch value={isDarkMode} onValueChange={toggleDarkMode} />
            </View> */}


            {/* Notifications Section */}
            <View style={styles.section}>
                <Text style={styles.header}>Notifications</Text>

                <View style={styles.notifContainer}>
                    <Text style={styles.title}>Badges</Text>
                    <Switch
                        trackColor={{false: colors.blueText, true: colors.secondary}}
                        thumbColor={isEnabled ? colors.hexToRGBA(colors.blueText,0.8) : colors.blueText}
                        onValueChange={toggleSwitch}
                        value={isEnabled}
                    />
                </View>

                
            </View>

            {/* About Section */}
            <View style={styles.section}>
                <Text style={styles.header}>Account</Text>

                {/* Logout Button */}
                <TouchableOpacity 
                    style={styles.button}
                    // onPress={()=> router.push("/auth")}
                    onPress={logout}
                >
                    <Text style={styles.buttonText}>Log Out</Text>
                    <Ionicons name="log-out-outline" size={24} style={{ marginLeft: 10 }} />
                </TouchableOpacity>

                {/* Delete Account Button */}
                <TouchableOpacity 
                    style={styles.deleteButton}
                    onPress={() => console.log("Delete Account")}
                >
                    <Text style={styles.buttonText}>Delete Account</Text>
                    <FontAwesome name="trash" size={24} style={{ marginLeft: 10 }} />
                </TouchableOpacity>
            </View>

        </ScrollView>
    );
};

export default SettingsScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: colors.lightbackground,
    },
    header: {
        fontSize: 22,
        fontFamily: 'InterBold',
        marginBottom: 5,
    },
    section: {
        marginTop: 5,
    },
    rowContainer: {
        flexDirection: 'row',
        width: '100%',
        marginBottom: 7,
        alignItems: 'center',
        justifyContent: "flex-start",
    },
    title: {
        fontSize: 16,
        fontFamily: "InterSemiBold",
    },
    input: {
        padding: 10,
        borderRadius: 20,
        borderWidth: 1,
        marginLeft: 10,
        width: '60%',
        color: colors.blueText,
    },
    button: {
        backgroundColor: colors.hexToRGBA(colors.secondary, 0.5),
        padding: 5,
        width: '40%',
        alignItems: 'center',
        borderRadius: 20,
        borderWidth: 1,
        marginHorizontal: 10,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    buttonText: {
        fontFamily: "InterLight",
        fontSize: 18,
    },
    notifContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 10,
    },
    deleteButton: {
        backgroundColor: colors.hexToRGBA(colors.red, 0.65),
        padding: 5,
        width: '60%',
        alignItems: 'center',
        borderRadius: 20,
        borderWidth: 1,
        marginHorizontal: 10,
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'center',
    },
});

