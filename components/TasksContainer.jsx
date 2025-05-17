import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import TaskItem from './TaskItem';

import { useRouter } from 'expo-router';
import colors from '../app/config/colors';
import plusIcon from '../assets/images/plus.png';

const TasksContainer = ({tasks}) => {

    const router = useRouter();
    
    return (
        <View style={styles.tasksContainer}>
            <View style={styles.tasksTitleContainer}>
                <Text style={styles.tasksTitle}>To Do:</Text>
                <TouchableOpacity style={styles.addTaskButton} onPress={() => router.push("/newTask")}>
                    <View style={styles.addTaskTextView}>
                        <Text style={styles.addTaskText}>Add</Text>
                        <Text style={styles.addTaskText}>Task</Text>
                    </View>
                    <Image source={plusIcon} style={{width: 55, height: 55}}/>
                </TouchableOpacity>
            </View>
            <View>
                {tasks.length > 0 ? (
                    <FlatList
                        data = {tasks}
                        keyExtractor={(item) => item.$id.toString()}
                        renderItem={
                            ({item}) => <TaskItem task={item}  />
                        }      
                    />
                ) :(
                    <View style={styles.taskContainer}>
                        <View>
                            <Text style={styles.taskTitle}>No upcoming tasks scheduled!</Text>
                        </View>
                    </View>
                )}
                
                <TouchableOpacity style={styles.seeAllTasksButton} onPress={() => router.push("/allTasks")}>
                    <Text style={styles.seeAllTasksText}>See all tasks</Text>
                    <Text style={styles.seeAllTasksDots}>...</Text>
                </TouchableOpacity>
            </View>
        </View>
  );
};

const styles = StyleSheet.create({
    tasksTitleContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 10,
    },
    tasksTitle: {
        fontFamily: "LailaBold",
        fontSize: 36,
    },
    addTaskButton: {
        borderRadius: 5,
        padding: 2,
        flexDirection: "row",
        alignItems: "center",
    },
    addTaskTextView: {
        flexDirection: "column", 
        alignItems: "flex-end",
        marginRight: 1,
    },
    addTaskText: {
        fontFamily: "NunitoExtraBold",
        fontSize: 15,
        color: colors.primary,
    },
    taskContainer: {
        alignItems: "center", // Ensures vertical alignment
        flexDirection: "row",
        justifyContent: "center",
        backgroundColor: colors.hexToRGBA(colors.tertiary, 0.2),
        borderWidth: 1,
        paddingHorizontal: 10,
        paddingVertical: 10,
        marginHorizontal: 5,
        borderRadius: 10,
    },
    taskTitle: {
        fontFamily: "InterItalic",
        fontSize: 17,
        marginBottom: 2,
        numberOfLines: 1,
    },
    seeAllTasksButton: {
        marginBottom: 10,
        borderRadius: 5,
        backgroundColor: colors.hexToRGBA(colors.tertiary, 0.2),
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 1,
        paddingHorizontal: 10,
        marginHorizontal: 5,
        borderRadius: 10,
    },
    seeAllTasksText: {
        fontFamily: "InterLight",
        fontSize: 16,
    },
    seeAllTasksDots: {
        fontFamily: "InterExtraBold",
        fontSize: 16,
        marginLeft: 5,
        marginRight: 1,
    },
});


export default TasksContainer;

