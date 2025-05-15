import { router } from 'expo-router';
import { useState } from 'react';
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import { useTasks } from '../../contexts/TaskContext';
//import { useCategories } from '../../contexts/CategoryContext.js';

import { buddies } from '../../data/buddies';
import { categories } from '../../data/categories';

import candies from '../../assets/images/candies.png';
import colors from '../config/colors';

import CategorySelector from '../../components/CategorySelector';
import DateTimePickerRow from '../../components/DateTimePickerRow';
import ReminderPicker from '../../components/ReminderPicker';
import RepeatPicker from '../../components/RepeatPicker';
import StudyBuddyPicker from '../../components/StudyBuddyPicker';
import TitleInput from '../../components/TitleInput';
import XPAmountSlider from '../../components/XPAmountSlider';

const NewTaskScreen = () => {

    const { addTask } = useTasks(); 
    //const { categories } = useCategories();

    const [taskTitle, setTaskTitle] = useState('');
    const [selectedCategory, setSelectedCategory] = useState("None");
    const [taskDetails, setTaskDetails] = useState('');
    const [dueDate, setDueDate] = useState(new Date());
    const [dueTime, setDueTime] = useState(new Date());
    const [repeats, setRepeats] = useState('Never');
    const [reminder, setReminder] = useState('Never');
    const [studyBuddy, setStudyBuddy] = useState(null);
    const [experiencePoints, setExperiencePoints] = useState(1);

    const isValidDate = (d) => d instanceof Date && !isNaN(d);
    const safeDueDate = isValidDate(dueDate) ? dueDate : new Date();
    const safeDueTime = isValidDate(dueTime) ? dueTime : new Date();

    const combinedDueDate = new Date(
        safeDueDate.getFullYear(),
        safeDueDate.getMonth(),
        safeDueDate.getDate(),
        safeDueTime.getHours(),
        safeDueTime.getMinutes()
    ).toISOString();

    const handleReminder = (reminder) => {
        const reminderDate = new Date(combinedDueDate);
        switch (reminder) {
            case "1 hour before":
                reminderDate.setHours(reminderDate.getHours() - 1);
                break;
            case "2 hours before":
                reminderDate.setHours(reminderDate.getHours() - 2);
                break;
            case "1 day before":
                reminderDate.setDate(reminderDate.getDate() - 1);
                break;
            case "2 days before":
                reminderDate.setDate(reminderDate.getDate() - 2);
                break;
            default:
                return null;
        }
        return reminderDate.toISOString();
    }

    return (
        <View style={{flex: 1}}>
        <View style={styles.screenContainer}>

            {/* Task Name */}
            <TitleInput
                value={taskTitle}
                onChangeText={setTaskTitle}
                placeholder="Task name"
            />

            {/* Category */}
            <View style={styles.groupContainer}>
                <Text style={styles.groupName}>Category:</Text>
                <CategorySelector
                    categories={categories}
                    selectedCategory={selectedCategory}
                    onCategorySelect={setSelectedCategory}
                />
            </View>

            {/* Details */}
            <View style={styles.groupContainer}>
                <Text style={styles.groupName}>Details:</Text>
                <TextInput
                    placeholder="Task details"
                    maxLength={200}
                    placeholderTextColor={colors.blueText}
                    style={styles.taskDetailsInput}
                    value={taskDetails}
                    onChangeText={setTaskDetails}
                    />
            </View>

            {/* Due date and time */}
            <DateTimePickerRow
                date={dueDate}
                setDate={setDueDate}
                time={dueTime}
                setTime={setDueTime}
                label="Due"
                Icon={MaterialIcons}
                iconName="lock-clock"
            />
            
             
            {/* Repetition setting */}
            <RepeatPicker
                value={repeats}
                onChange={setRepeats}
            />

            {/* Reminder Notification setting */}
            <ReminderPicker
                value={reminder}
                onChange={setReminder}
            />

            {/* Study Buddy */}
            <StudyBuddyPicker
                buddies={buddies}
                value={studyBuddy}
                setValue={setStudyBuddy}
            />

            {/* Experience Points */}
            <View style={styles.groupContainer}>
                <Image source={candies} style={{width: 31, height: 38}}/> 
                <Text style={styles.groupName}>Experience Points:</Text>
                <XPAmountSlider
                    value={experiencePoints}
                    onValueChange={setExperiencePoints}
                />
            </View>
            
        </View>

        {/* Save */}
        <TouchableOpacity 
            onPress={() => {
                const newTask = {
                    //task_id: Date.now().toString(),
                    title: taskTitle,
                    categories: selectedCategory == null ? "None" : selectedCategory,
                    dueDate: combinedDueDate !== null ? combinedDueDate : new Date().toISOString(),
                    xp: experiencePoints,
                    status: "Not Started",
                    studyBuddy: studyBuddy,
                    details: taskDetails,
                    reminder: reminder !== "Never" ? handleReminder(reminder) : null,
                    repetition: repeats !== "Never" ? repeats : null,
                };
                addTask(newTask); 
                alert("Task Saved!", newTask);
                router.back(); 
            }}
        >
                <View style={styles.saveButton}>
                    <MaterialIcons name="save" size={40} color={colors.white}/>
                    <Text style={styles.saveText}>Save</Text>
                </View>
        </TouchableOpacity>

        </View>
    );
};

const styles = StyleSheet.create({
    screenContainer: {
       flex: 1,
    },
    groupContainer: {
        padding: 5,
        flexDirection: 'row',
        alignItems: 'center',
    },
    groupName: {
        fontSize: 16,
        fontFamily: 'InterSemiBold',
        padding: 5,
    },
    groupText: {
        fontSize: 16,
        fontFamily: 'InterRegular',
        color: colors.blueText,
    },
    taskDetailsInput: {
        fontFamily: 'InterLight',
        fontSize: 15,
        paddingHorizontal: 5,
        marginLeft: 10,
        marginRight: 20,
        borderWidth: 1,
        borderColor: colors.primary,
        borderRadius: 5,
    },
    saveButton: {
        backgroundColor: colors.primary,
        width: "100%",
        height: 70,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    saveText: {
        fontSize: 24,
        fontFamily: 'NunitoBold',
        color: colors.white,
        marginLeft: 10,
    },
});

export default NewTaskScreen;