import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { Picker } from "@react-native-picker/picker";
import { Stack, useRouter } from "expo-router";
import { useEffect, useState } from "react";

//import {tasks as tasklist} from "../../data/tasks";
import { useTasks } from "../../contexts/TaskContext";

import eventsIcon from "../../assets/images/goToEvents.png";
import plusIcon from "../../assets/images/plus.png";
import TaskItem from "../../components/TaskItem";
import colors, { adjustableColors } from "../config/colors";

const AllTasksScreen = () => {

    const router = useRouter();
    const { tasks } = useTasks(); 

    const [sortBy, setSortBy] = useState("Due date");
    //const [tasks, setTasks] = useState(tasklist); 
    const [sortedTasks, setSortedTasks] = useState(tasks);

    useEffect(() => {
        const sortTasks = () => {

            const incompleteTasks = tasks.filter(task => task.status !== "Done"); 
            const completedTasks = tasks.filter(task => task.status === "Done"); 

            let sorted = [...incompleteTasks];
            switch (sortBy) {
                case "Due date":
                    sorted.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
                    break;
                case "Category":
                    sorted.sort((a, b) => a.categories?.name || "None".localeCompare(b.categories?.name || "None"));
                    break;
                case "XP":
                    sorted.sort((a, b) => b.xp - a.xp); 
                    break;
                case "A-Z":
                    sorted.sort((a, b) => a.title.localeCompare(b.title)); 
                    break;
            }
            let sortedCompletedTasks = [...completedTasks];
            switch (sortBy) {
                case "Due date":
                    sortedCompletedTasks.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
                    break;
                case "Category":
                    sortedCompletedTasks.sort((a, b) => a.categories?.name || "None".localeCompare(b.categories?.name || "None"));
                    break;
                case "XP":
                    sortedCompletedTasks.sort((a, b) => b.xp - a.xp); 
                    break;
                case "A-Z":
                    sortedCompletedTasks.sort((a, b) => a.title.localeCompare(b.title)); 
                    break;
            }
            setSortedTasks([...sorted, ...sortedCompletedTasks]); // Update state to trigger re-render
        };    
        sortTasks();
    }, [sortBy, tasks]);

    return(
        <>
            <Stack.Screen
                options={({ navigation }) => {
                const prevRoute = navigation.getState().routes[navigation.getState().index - 1]?.name;
                console.log(prevRoute);
                return {
                    animation: prevRoute === "/allEvents" ? "slide_from_left" : "default",
                    animationDuration: 500, // Slow smooth transition
                    detachPreviousScreen: prevRoute === "/allEvents", // Unmount only if coming from Events
                    freezeOnBlur: true, // Avoid re-render lag
                };
                }}
            />
            <View style={{flex: 1}}>
                <View style={styles.sortByContainer}>
                    <Text style={styles.sortByText}>
                        Sort by:
                    </Text>
                    <View style={styles.pickerContainer}>
                    <Picker 
                        selectedValue={sortBy} 
                        onValueChange={(value) => setSortBy(value)} 
                        dropdownIconColor={adjustableColors.adjustableArrowColor}
                    >
                        <Picker.Item label="Due date" value="Due date" style={styles.pickerText}/>
                        <Picker.Item label="Category" value="Category" style={styles.pickerText}/>
                        <Picker.Item label="XP" value="XP" style={styles.pickerText}/>
                        <Picker.Item label="A-Z" value="A-Z" style={styles.pickerText}/>
                    </Picker>
                    </View>
                </View>
                <FlatList
                    data={sortedTasks}
                    // keyExtractor={(item) => item.id.toString()}
                    keyExtractor={(item) => item.$id.toString()}
                    renderItem={({ item }) => <TaskItem task={item} />}
                    contentContainerStyle={styles.listContainer}
                />
                <View style={styles.footer}>
                    <TouchableOpacity 
                        style={styles.addTaskButton}
                        onPress={() => {router.push("/newTask")}}
                    >
                        <Image source={plusIcon} style={{width: 55, height: 55}}/>
                        <View style={styles.addTaskTextView}>
                            <Text style={styles.addTaskText}>Add</Text>
                            <Text style={styles.addTaskText}>Task</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {router.push("/allEvents")}}>
                        <Image source={eventsIcon} style={styles.eventsIcon} imageStyle={styles.eventsImage}/>
                    </TouchableOpacity>
                </View>
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    sortByContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 10,
        alignItems: "center",
    },
    sortByText: {
        fontFamily: "LailaSemiBold",
        fontSize: 25,
    }, 
    pickerContainer :{
        flex: 1,
        borderRadius: 10,
        borderWidth: 1,
        marginLeft: 10,
        borderWidth: 0.5,
        borderColor: colors.primary,
        backgroundColor: adjustableColors.adjustableBackgroundColor,
    },
    pickerText: {
        fontFamily: "InterMedium",
        fontSize: 19,
    },
    listContainer: {
        paddingBottom: 80,
    },
    footer: {
        position: "absolute",
        bottom: -10,
        left: -15,
        right: -15,
        backgroundColor: colors.lightbackground,
        borderTopWidth: 1,
        padding: 20,
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "space-between",
        borderBottomWidth: 10,
        borderColor: colors.primary,
        height: 85,
    },
    addTaskButton: {
        borderRadius: 5,
        padding: 2,
        flexDirection: "row",
        alignItems: "center",
    },
    addTaskTextView: {
        flexDirection: "column", 
        alignItems: "flex-start",
        marginRight: 1,
    },
    addTaskText: {
        fontFamily: "NunitoExtraBold",
        fontSize: 15,
        color: colors.primary,
    },
    // Container for the events background
    eventsIcon: {
        width: 64,  // Set explicit dimensions
        height: 48,
        justifyContent: 'center',  
        alignItems: 'center',
        marginRight: 5,
    },
    // Controls how the events image scales inside ImageBackground
    eventsImage: {
        resizeMode: 'contain',  // Ensures the whole fits
        width: '100%',         // Stretch to fill container
        height: '100%',
    },
});

export default AllTasksScreen;
