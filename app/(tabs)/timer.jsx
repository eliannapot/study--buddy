import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { Alert, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { useCategories } from '../../contexts/CategoryContext.js';
import { useUsers } from '../../contexts/UserContext.js';

import colors from '../config/colors';

import BuddyList from '../../components/BuddyList';
import { getOnlyFocusingBuddies } from '../../utils/timerUtils.js';

import CategorySelector from '../../components/CategorySelector';

import playIcon from '../../assets/images/play-button.png';
import stopIcon from '../../assets/images/stop-button.png';

const TimerScreen = () => {
    
    const { categories } = useCategories(); 
    const [selectedCategory, setSelectedCategory] = useState(null);
    
    const [seconds, setSeconds] = useState(0);
    const [isRunning, setIsRunning] = useState(false);

    const { users, currentUserDoc, updateCurrentUser, handleUserActivity } = useUsers();
    
    const filteredUsers = users.filter(u => u.$id !== currentUserDoc?.$id);
    
    const router = useRouter();
        
    const onlyFocusingBuddies = getOnlyFocusingBuddies(filteredUsers);

    useEffect(() => {
        let interval;
        if (isRunning) {
          interval = setInterval(() => {
            setSeconds(prevSeconds => prevSeconds + 1);
          }, 1000); // Change interval to 1000ms (1 second)
        } else {
          clearInterval(interval);
        }
        return () => clearInterval(interval);
        }, [isRunning]);

    const minutes = Math.floor(seconds / 60).toString().padStart(2, '0'); // Ensure 2 digits
    const displaySeconds = (seconds % 60).toString().padStart(2, '0');

    const handleTimerStop = async () => {
        setIsRunning(false);
        const completedHalfHours = Math.floor(seconds / (30 * 60)); // 30 minutes

        if (completedHalfHours > 0) {
            const xpPoints = completedHalfHours;
            const now = new Date().toISOString();
            const timerId = currentUserDoc?.$id;
            const newLogEntry = `${now}-${xpPoints}-${timerId}`;
            const updatedXpLog = [...(currentUserDoc?.xpLog || []), newLogEntry];

            await updateCurrentUser({ xpLog: updatedXpLog });
            await handleUserActivity(currentUserDoc?.$id);

            Alert.alert("Focus session complete!", `You earned ${xpPoints} XP 🎉`);
        }

        setSeconds(0);
        await updateCurrentUser({ isFocusing: null });
    };

    return (
        <View >

            <Text style={styles.changingText}>
                {isRunning ? 'Eliminate Distractions' : 'Are you ready to start focusing?'}
            </Text>

            <View style={styles.timerContainer}>
                <View style={styles.timeContainer}>
                    <Text style={styles.timeText}>
                        {minutes} 
                    </Text>
                </View>
                <Text style={styles.timeText}> : </Text>
                <View style={styles.timeContainer}>
                    <Text style={styles.timeText}>
                        {displaySeconds} 
                    </Text>
                </View>
            </View>

            <CategorySelector
                    // categories={categories}
                    selectedCategory={selectedCategory}
                    onCategorySelect={setSelectedCategory}
                />

            {/* <Button title="Pause" onPress={() => { setIsRunning(false); }} /> */}
            
            <View style={styles.buttonsContainer}>
                {/* <Button title={isRunning ? 'Stop' : 'Start'} onPress={() => setIsRunning(!isRunning)} /> */}
                
                <TouchableOpacity onPress={() => {
                        if (!selectedCategory) {
                            alert("Select a category to start focusing.");
                            return;
                        }
                        setIsRunning(true);
                        updateCurrentUser({isFocusing: selectedCategory.name,})
                    }}>
                {isRunning ? (
                    <Image source={playIcon} style={styles.smallIcon}/>
                    ) : (
                    <Image source={playIcon} style={styles.bigIcon}/>
                    )}
                </TouchableOpacity>
                <TouchableOpacity onPress={ handleTimerStop }>
                    {isRunning ? (
                    <Image source={stopIcon} style={styles.bigIcon}/>
                    ) : (
                    <Image source={stopIcon} style={styles.smallIcon}/>
                    )}
                </TouchableOpacity>
            </View> 

            <View>
                <BuddyList topBuddies={onlyFocusingBuddies}/>
                <TouchableOpacity style={styles.seeAllButton} onPress={() => router.push("/allBuddies")}>
                    <Text style={styles.seeAllDots}>...</Text>
                </TouchableOpacity>
            </View>
            

        </View>
  );
};

const styles = StyleSheet.create({
    changingText: {
        fontFamily: "InterLight",
        fontSize: 18,
        textAlign: 'center',
    },
    timerContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 20,
    },
    timeContainer: {
        backgroundColor: colors.hexToRGBA(colors.secondary, 0.2),
        borderRadius: 5,
        borderWidth: 2,
        borderColor: colors.secondary,
        padding: 10,
        paddingHorizontal: 20,
    },
    timeText: {
        fontFamily: "InterRegular",
        fontSize: 64,
    },
    bigIcon: {
        width: 150,
        height: 150,
        marginHorizontal: 10,
    },
    smallIcon: {
        width: 110,
        height: 110,
        marginHorizontal: 10,
    },
    buttonsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 35,
    },
    seeAllButton: {
        borderBottomRadius: 5,
        alignItems: "center",
        justifyContent: "center",     
        borderWidth: 1,
        backgroundColor: colors.hexToRGBA(colors.tertiary, 0.05),
    },
    seeAllDots: {
        fontFamily: "InterExtraBold",
        fontSize: 24,
        marginBottom: 2,
        lineHeight: 18,
    },
});

export default TimerScreen;
