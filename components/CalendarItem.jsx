import { router } from "expo-router";
import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import colors from "../app/config/colors";

import EventModal from "./EventModal";
import TaskModal from "./TaskModal";

import { useTasks } from "../contexts/TaskContext";

const CalendarItem = ({ item }) => {

    const { deleteTask } = useTasks();

    const [selectedEvent, setSelectedEvent] = useState(null);
    const [eventModalVisible, setEventModalVisible] = useState(false);
    
    const openEvent = (event) => {
        setSelectedEvent(event);
        setEventModalVisible(true);
    };

    
    const [selectedTask, setSelectedTask] = useState(null);
    const [taskModalVisible, setTaskModalVisible] = useState(false);
    
    const openTask = (task) => {
        setSelectedTask(task);
        setTaskModalVisible(true);
    };

    const handleEdit = () => {
            console.log("Editing task:", selectedTask);
            setTaskModalVisible(false);
            router.push({
                pathname: "/newTask",
                params: { taskId: selectedTask.$id }
            });
        };
        
    const handleDelete = () => {
        console.log("Deleting task:", selectedTask);
        deleteTask(selectedTask.$id); 
        setTaskModalVisible(false); 
    }

    return(
        <View>

        <TouchableOpacity 
            onPress={() => {
                if (item.type === 'event') {
                    openEvent(item)}
                if (item.type === 'task') {
                    openTask(item)}
            }}
        >
        <View style={styles.itemContainer}>
            <View style={styles.leftContainer}>
                <View style={styles.timesContainer}>
                    <Text style={styles.timeText}>
                        {item.time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </Text>
                    <Text style={styles.timeText}>
                        {item.end_date && `${new Date(item.end_date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`}
                    </Text>
                </View>
                <View style={[
                    styles.verticalBar,
                    { opacity: item.type === 'event' ? 1 : 0.8 }
                ]}/>
            </View>
            <Text style={styles.itemTitle}>
                {item.title}
            </Text>
        </View>
        </TouchableOpacity>
        
        <EventModal
            visible={eventModalVisible}
            event={selectedEvent}
            onClose={() => setEventModalVisible(false)}
        />
        <TaskModal
            visible={taskModalVisible}
            task={selectedTask}
            onClose={() => setTaskModalVisible(false)}
            onDelete={handleDelete}
            onEdit={handleEdit}
        />
        
        </View>
        
    );
}

const styles = StyleSheet.create({
    itemContainer: {
        padding: 10,
        borderWidth: 1,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    leftContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    timesContainer: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
    },
    timeText: {
        fontSize: 16,
        fontFamily: 'InterMedium',
    },
    verticalBar: {
        width: 8,
        height: 45,
        backgroundColor: colors.secondary,
        borderRadius: 5,
        marginHorizontal: 5,
    },
    itemTitle: {
        fontSize: 18,
        fontFamily: "LailaSemiBold",
        marginLeft: 10,
        flexWrap: 'wrap',
    },
});

export default CalendarItem;    