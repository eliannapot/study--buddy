import { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { useCategories } from '../contexts/CategoryContext';
import { useTasks } from "../contexts/TaskContext";

import { router } from 'expo-router';
import colors from '../app/config/colors';
import TaskModal from './TaskModal';

const TaskItem = ({ task }) => {

    const { categories } = useCategories();

    const [selectedTask, setSelectedTask] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);

    const openTask = (task) => {
        setSelectedTask(task);
        setModalVisible(true);
    };

    const { deleteTask } = useTasks(); 

    const handleEdit = () => {
        console.log("Editing task:", selectedTask);
        setModalVisible(false);
        router.push({
            pathname: "/newTask",
            params: { taskId: selectedTask.$id }
        });
    };
    
    const handleDelete = () => {
        console.log("Deleting task:", selectedTask);
        deleteTask(selectedTask.$id); 
        setModalVisible(false); 
    }

    const formatDateForTasks = (isoString) => {
        const date = new Date(isoString);
    
        return date.toLocaleDateString("en-GB", { 
            day: "2-digit", 
            month: "2-digit" 
        }); // Output: "03/05"
    };

    const isDone = task?.status === "Done"; // Check if the task is done
    
    return (
        <>
        <View style={[
            styles.taskContainer,
            { backgroundColor: isDone 
                            ? colors.hexToRGBA(colors.tertiary, 0.03) 
                            : colors.hexToRGBA(colors.tertiary, 0.15) }]}>
            <View style={{flex: 1, marginRight: 10}}>
                <Text style={styles.taskTitle}> {task?.title || "Untitled Task"}</Text>
                <Text style={styles.taskCategory}>#{task?.categories?.name || "None"}</Text>
            </View>
            <View>
                <Text style={styles.taskDueDate}>Due: {formatDateForTasks(task?.dueDate) || "No Due Date"}</Text>
                <View style={{flexDirection: "row", justifyContent:"space-between", alignItems: "flex-end"}}>
                    <Text style={styles.taskXP}>{task?.xp || 0} XP</Text>
                    <TouchableOpacity 
                        hitSlop={{ top: 40, bottom: 10, left: 40, right: 10 }}
                        onPress={() => {
                            console.log("Opening task:", task);
                            openTask(task)}}
                    > 
                        <Text style={styles.showTaskDetails}>...</Text>
                    </TouchableOpacity>
                </View>
            </View>  
        </View>
        <TaskModal
            key={selectedTask?.$id}
            visible={modalVisible}
            task={selectedTask}
            onClose={() => setModalVisible(false)}
            onDelete={handleDelete}
            onEdit={handleEdit}
        />
        </>
    );
};

const styles = StyleSheet.create({  
    taskContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center", // Ensures vertical alignment
        backgroundColor: colors.hexToRGBA(colors.tertiary, 0.1),
        borderWidth: 1,
        paddingHorizontal: 10,
        paddingVertical: 5,
        marginHorizontal: 5,
        borderRadius: 10,
    },
    taskTitle: {
        fontFamily: "InterMedium",
        fontSize: 17,
        marginBottom: 2,
        flexShrink: 1, // Prevents overflowing
        numberOfLines: 1,
        ellipsizeMode: "tail",
    },
    taskDueDate: {
        fontFamily: "InterRegular",
        fontSize: 16,
        marginBottom: 2,
    },
    taskCategory: {
        fontFamily: "InterRegular",
        fontSize: 16,
        backgroundColor: colors.hexToRGBA(colors.secondary, 1),
        paddingInline: 5,
        borderWidth: 1,
        alignSelf: "flex-start",
        flexShrink: 1, // Prevents category from pushing right content
    },
    taskXP: {
        fontFamily: "InterMedium",
        fontSize: 17,
    },
    showTaskDetails: {
        fontFamily: "InterBold",
        fontSize: 17,
        marginLeft: 5,
        marginRight: 1,

    },
});

export default TaskItem;