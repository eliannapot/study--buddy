import { router, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import { useCategories } from '../../contexts/CategoryContext.js';
import { useTasks } from '../../contexts/TaskContext';

import { combineDateAndTime, getReminderDate, isValidDate, splitDateAndTime } from '../../utils/datetimeUtils';

import { buddies } from '../../data/buddies';

import candies from '../../assets/images/candies.png';
import colors from '../config/colors';

import CategorySelector from '../../components/CategorySelector';
import DateTimePickerRow from '../../components/DateTimePickerRow';
import ReminderPicker from '../../components/ReminderPicker';
import RepeatPicker from '../../components/RepeatPicker';
import StudyBuddyPicker from '../../components/StudyBuddyPicker';
import TitleInput from '../../components/TitleInput';
import XPAmountSlider from '../../components/XPAmountSlider';

const TaskFormScreen = () => {
    const { editTask, addTask, tasks } = useTasks(); 
    const { categories } = useCategories();

    const params = useLocalSearchParams();
    const editingTask = tasks.find((task) => task.$id === params.taskId);

    const [taskTitle, setTaskTitle] = useState(editingTask?.title || '');
    const [selectedCategory, setSelectedCategory] = useState(editingTask?.categories || null);
    const [taskDetails, setTaskDetails] = useState(editingTask?.details || '');

    // const [dueDate, setDueDate] = useState(editingTask?.dueDate ? new Date(editingTask.dueDate) : new Date());
    // const [dueTime, setDueTime] = useState(editingTask?.dueDate ? new Date(editingTask.dueDate) : new Date());
    const { dateOnly, timeOnly } = editingTask?.dueDate ? splitDateAndTime(editingTask.dueDate) : { dateOnly: new Date(), timeOnly: new Date() };
    const [dueDate, setDueDate] = useState(dateOnly);
    const [dueTime, setDueTime] = useState(timeOnly);

    const [repeats, setRepeats] = useState(editingTask?.repetition || 'Never');
    const [reminder, setReminder] = useState(editingTask?.reminder ? 'Custom' : 'Never');
    const [studyBuddy, setStudyBuddy] = useState(editingTask?.studyBuddy || null);
    const [experiencePoints, setExperiencePoints] = useState(editingTask?.xp || 1);

    const safeDueDate = isValidDate(dueDate) ? dueDate : new Date();
    const safeDueTime = isValidDate(dueTime) ? dueTime : new Date();
    const combinedDueDate = combineDateAndTime(safeDueDate, safeDueTime);

    const handleSave = () => {
        const taskData = {
            ...editingTask,
            title: taskTitle,
            categories: selectedCategory?.$id || null,
            dueDate: combinedDueDate,
            xp: experiencePoints,
            status: editingTask?.status || "Not Started",
            studyBuddy: studyBuddy,
            details: taskDetails,
            reminder: reminder !== "Never" ? getReminderDate(reminder, combinedDueDate) : null,
            repetition: repeats !== "Never" ? repeats : null,
        };
        if (editingTask) {
            editTask(editingTask.$id, taskData); 
            alert("Task Edited!");
        } else {
            addTask(taskData);
            alert("Task Created!");
        }
    router.back();
    }

    return (
        <View style={{ flex: 1 }}>
            <View style={styles.screenContainer}>

                <TitleInput
                    value={taskTitle}
                    onChangeText={setTaskTitle}
                    placeholder="Task name"
                />

                <View style={styles.groupContainer}>
                    <Text style={styles.groupName}>Category:</Text>
                    <CategorySelector
                        categories={categories}
                        selectedCategory={selectedCategory}
                        onCategorySelect={setSelectedCategory}
                    />
                </View>

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

                <DateTimePickerRow
                    date={dueDate}
                    setDate={setDueDate}
                    time={dueTime}
                    setTime={setDueTime}
                    label="Due"
                    Icon={MaterialIcons}
                    iconName="lock-clock"
                />

                <RepeatPicker
                    value={repeats}
                    onChange={setRepeats}
                />

                <ReminderPicker
                    value={reminder}
                    onChange={setReminder}
                />

                <StudyBuddyPicker
                    buddies={buddies}
                    value={studyBuddy}
                    setValue={setStudyBuddy}
                />

                <View style={styles.groupContainer}>
                    <Image source={candies} style={{ width: 31, height: 38 }} />
                    <Text style={styles.groupName}>Experience Points:</Text>
                    <XPAmountSlider
                        value={experiencePoints}
                        onValueChange={setExperiencePoints}
                    />
                </View>

            </View>

            <TouchableOpacity onPress={handleSave}>
                <View style={styles.saveButton}>
                    <MaterialIcons name="save" size={40} color={colors.white} />
                    <Text style={styles.saveText}>{editingTask ? "Save Changes" : "Save"}</Text>
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

export default TaskFormScreen;