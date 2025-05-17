import { createContext, useContext, useEffect, useState } from 'react';
import { ActivityIndicator, Alert, StyleSheet, Text, View } from 'react-native';

import colors from '../app/config/colors';

const TasksContext = createContext();

//import { tasks as initialTasks } from '../data/tasks'; 
import taskService from '../services/taskService';

export const TasksProvider = ({ children }) => {

    //const [tasks, setTasks] = useState(initialTasks); 
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => { 
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        setLoading(true);
        const response = await taskService.getTasks();
        console.log("Tasks fetched:", response);
        if (response.error) {
            setError(response.error);
            Alert.alert("Error", response.error);
        } else {
            setTasks(response.data);
            setError(null);
        }
        setLoading(false);
    }
    
    const addTask = async (task) => {
        if (!task) {
            Alert.alert("Error, no task provided");
            return;
        }
        const response = await taskService.addTask(task);
        if (response.error) {
            Alert.alert("Error", response.error);
            return;
        } else {
            setTasks([...tasks, response.data]); 
        }
    };
    
    const deleteTask = async (taskId) => {
        console.log("opening alert to delete task with id:", taskId);
        Alert.alert("Delete Task", "Are you sure you want to delete this task?", [
            { 
                text: "Cancel", 
                style: "cancel" 
            },
            { 
                text: "Delete",
                style: "destructive", 
                onPress: async () => {
                    const response = await taskService.deleteTask(taskId);
                    if (response.error) {
                        Alert.alert("Error", response.error);
                        return;
                    } else {
                        setTasks(tasks.filter((task) => task.$id !== taskId));                    
                    }
                }}
        ]);
    };
    
    return (
        <TasksContext.Provider value={{ tasks, addTask, deleteTask }}>
            { loading ? (
                <View style={{justifyContent: 'center', alignItems: 'center' }}> 
                    <ActivityIndicator size ="large" color={colors.primary}  />
                </View>
            ): (
                <>
                    {error && <Text style={styles.errorText}>{error}</Text>}
                    {children}
                </>
            )}
        </TasksContext.Provider>
    );
};

const styles = StyleSheet.create({
    errorText: {
        color: 'red',
        textAlign: 'center',
        marginBottom: 10,
        fontSize: 16,
    },
});

export const useTasks = () => useContext(TasksContext);