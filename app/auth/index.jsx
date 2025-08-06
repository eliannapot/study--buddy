import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

import logo from '../../assets/images/mylogocut.png';
import colors from '../config/colors';

import { useAuth } from '../../contexts/AuthContext';
import { useUsers } from '../../contexts/UserContext';

const AuthScreen = () => {

    const {login, register} = useAuth();
    const { fetchCurrentUser } = useUsers();
    const router = useRouter();

    // const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [isRegistering, setIsRegistering] = useState(false);  //If true, show register form, else login
    const [error, setError] = useState(false);

    const handleAuth = async () => {
        if (!email.trim() || !password.trim()) {
            setError('Email and password are required');
            return;
        }
        if (isRegistering && password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }
        let response;
        if(isRegistering) {
            response = await register(email, password, name);
            console.log('Registering...');
        } else {
            response = await login(email, password);
            console.log('Logging in...');
            if (!response?.error) {
                await fetchCurrentUser(); 
                console.log('User fetched after login:', response);
            }
        }
        if (response?.error) {
            Alert.alert('Error', response.error);
            return;
        }
        console.log('Auth done, going to dashboard');
        router.replace("/dashboard");  
    }

    return (
        <View style={styles.container}>
            <Image source={logo} style={{width: 250, height: 110, marginBottom: 40}}/>
            
            <View style={{marginBottom: 20, alignItems: 'center'}}>
                <Text style={styles.header}>
                    {isRegistering ? 'Sign Up Information' : 'Log In Information'}
                </Text>
                {error ? <Text style={styles.error}>{error}</Text> : null}
            </View>
            
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
            {isRegistering && (
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
            )}

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

            {/* Confirm Password */}
            { isRegistering && (
                <View style={styles.rowContainer}>
                    <View>
                        <Text style={styles.title}>
                            Confirm
                        </Text>
                        <Text style={styles.title}>
                           Password:
                        </Text>
                    </View>
                    <TextInput
                        style={styles.input}
                        placeholder="****"
                        placeholderTextColor={colors.blueText}
                        value={confirmPassword}
                        onChangeText={setConfirmPassword}
                        secureTextEntry                
                        textContentType='none'
                    />
                </View>
            )}

            

            <TouchableOpacity style={styles.button} onPress={handleAuth}>
                <Text style={styles.buttonText}>
                    {isRegistering ? 'Sign up' : 'Log in'}
                </Text>
            </TouchableOpacity>
            
            <View style={styles.switchContainer}>
                <Text style={styles.header}>
                        {isRegistering ? 'Already have an account?' : 'Don\'t have an account yet?'}
                </Text>
                <TouchableOpacity 
                    onPress={() => setIsRegistering(!isRegistering)}
                    style={styles.button}
                >
                    <Text style={styles.buttonText}>
                        {isRegistering ? 'Log In' : 'Sign Up'}
                    </Text>
                </TouchableOpacity>
            </View>

        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.lightbackground,
        padding: 20,
    },
    header: {
        fontSize: 20,
        fontFamily: "InterSemiBold",
    },
    error: {
        color: 'red',
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
        width: '50%',
        alignItems: 'center',
        borderRadius: 20,
        marginTop: 10,
        borderWidth: 1,
    },
    buttonText: {
        fontFamily: "InterLight",
        fontSize: 20,
    },
    switchContainer: {
        marginTop: 30,
        alignItems: 'center',
        width: '100%',
    },
});

export default AuthScreen;