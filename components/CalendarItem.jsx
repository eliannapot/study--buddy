import { router } from "expo-router";
import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import colors from "../app/config/colors";

import EventModal from "./EventModal";
import TaskModal from "./TaskModal";

import { useEvents } from "../contexts/EventContext";
import { useTasks } from "../contexts/TaskContext";

const CalendarItem = ({ item: originalItem }) => {

    const item = {
        ...originalItem,
        type: 'dueDate' in originalItem ? 'task' : 'date' in originalItem ? 'event' : null
    }


    const { deleteTask, editTask } = useTasks();
    const [selectedTask, setSelectedTask] = useState(null);
    const [taskModalVisible, setTaskModalVisible] = useState(false);
    
    const openTask = () => {
        console.log(item);
        setSelectedTask(item);
        setTaskModalVisible(true);
    };

    const { deleteEvent } = useEvents();
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [eventModalVisible, setEventModalVisible] = useState(false);
    
    const openEvent = () => {
        console.log(item);
        setSelectedEvent(item);
        setEventModalVisible(true);
    };

    const handleTaskEdit = () => {
            console.log("Editing task:", selectedTask);
            setTaskModalVisible(false);
            router.push({
                pathname: "/newTask",
                params: { taskId: selectedTask.$id }
            });
        };
        
    const handleTaskDelete = () => {
        console.log("Deleting task:", selectedTask);
        deleteTask(selectedTask.$id); 
        setTaskModalVisible(false); 
    }

    const handleStatusChange = async (newStatus) => {
        try {
            console.log("Updating status to:", newStatus);
            
            // Only send the status field to update
            await editTask(selectedTask.$id, { status: newStatus });
            
            // Update local state
            setSelectedTask(prev => ({
                ...prev,
                status: newStatus
            }));
            
        } catch (err) {
            console.error("Failed to update status:", err);
        }
    };

    const handleEventEdit = () => {
        console.log("Editing event:", selectedEvent);
        setEventModalVisible(false);
        router.push({
            pathname: "/newEvent",
            params: { eventId: selectedEvent.$id }
        });
    };

    const handleEventDelete = () => {
        console.log("Deleting event:", selectedEvent);
        deleteEvent(selectedEvent.$id); 
        setEventModalVisible(false); 
    };

    return(
        <View>

        <TouchableOpacity 
            onPress={() => {
                item.type === 'task' ? openTask(item) : openEvent(item);
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
            key={selectedEvent?.$id}
            visible={eventModalVisible}
            event={selectedEvent}
            onClose={() => setEventModalVisible(false)}
            onDelete={handleEventDelete}
            onEdit={handleEventEdit}
        />
        <TaskModal
            key={selectedTask?.$id}
            visible={taskModalVisible}
            task={selectedTask}
            onClose={() => setTaskModalVisible(false)}
            onDelete={handleTaskDelete}
            onEdit={handleTaskEdit}
            onStatusChange={ handleStatusChange }
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