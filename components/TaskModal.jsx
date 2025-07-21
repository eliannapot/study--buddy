import { Feather, FontAwesome, FontAwesome6, Ionicons } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import { useState } from "react";
import { ImageBackground, StyleSheet, Text, TouchableOpacity, useColorScheme, View } from "react-native";
import Modal from "react-native-modal";

import { useAuth } from "../contexts/AuthContext.js";
import { useBadges } from "../contexts/BadgeContext.js";
import { useTasks } from "../contexts/TaskContext.js";
import { useUserBadges } from "../contexts/UserBadgeContext.js";
import { useUsers } from "../contexts/UserContext.js";

import { checkTaskBadges } from "../utils/badgeUtils.js";

import colors from "../app/config/colors";
import candy from "../assets/images/candy.png";

const TaskModal = ({ visible, task, onClose, onEdit, onDelete, onStatusChange }) => {
    
    if (!task) 
        return null; 


    const { currentUserDoc, updateCurrentUser, users, updateUserById, handleUserActivity } = useUsers();
    const { badges: allBadges } = useBadges();
    const { addUserBadge, userBadges } = useUserBadges();
    const { user } = useAuth();
    const { tasks } = useTasks();

    const [taskStatus, setTaskStatus] = useState(task?.status || "Not Started");
    const [notification, setNotification] = useState(null);

    const showNotification = (message, isError = false) => {
        setNotification({ message, isError });
        setTimeout(() => setNotification(null), 3000);
    };

    const handleStatusChange = async (value) => {
        if (value !== task.status) {
            try {
                await onStatusChange(task.$id, { status: value });
                setTaskStatus(value);
                
                if (value === "Done") {
                    await handleTaskCompletion();
                    showNotification("Task completed successfully!");
                } else {
                    showNotification(`Status changed to "${value}"`);
                }
            } catch (error) {
                showNotification("Failed to update task", true);
                console.error("Status change error:", error);
            }
        }
    };

    const handleTaskCompletion = async () => {
        const isCommonTask = Array.isArray(task.studyBuddy) && task.studyBuddy.length >= 2;
        
        // Handle XP logging
        handleXPUpdate(isCommonTask);
        
        // Check for badge achievements
        const earnedBadges = await checkTaskBadges(
            user?.$id, 
            tasks,
            isCommonTask, 
            allBadges,
            userBadges,
            addUserBadge 
        );
        
        if (earnedBadges.length > 0) {
            showNotification(`🎉 Earned ${earnedBadges[0].title} badge!`);
        }
    };

    const handleXPUpdate = async (isCommonTask) => {
        const xpPoints = task.xp || 1;
        const now = new Date().toISOString();
        const taskId = task.$id;
        const newLogEntry = `${now}-${xpPoints}-${taskId}`;

        if (isCommonTask) {
            // Handle common task XP for all study buddies
            for (const buddy of users) {
                if (!task.studyBuddy.includes(buddy.name)) continue;

                const xpLog = buddy.xpLog || [];
                const alreadyLogged = xpLog.some(entry => entry.includes(`-${taskId}`));

                if (!alreadyLogged) {
                    const updatedXpLog = [...xpLog, newLogEntry];
                    if (buddy.$id === currentUserDoc?.$id) {
                        await updateCurrentUser({ xpLog: updatedXpLog });
                        await handleUserActivity(currentUserDoc.$id);
                    } else {
                        await updateUserById(buddy.$id, { xpLog: updatedXpLog });
                        await handleUserActivity(buddy.$id);
                    }
                }
            }
        } else {
            // Handle individual task XP for just the current user
            const xpLog = currentUserDoc?.xpLog || [];
            const alreadyLogged = xpLog.some(entry => entry.includes(`-${taskId}`));
            
            if (!alreadyLogged) {
                const updatedXpLog = [...xpLog, newLogEntry];
                await updateCurrentUser({ xpLog: updatedXpLog });
                await handleUserActivity(currentUserDoc.$id);
            }
        }
    };


    //Customising the picker item style based on the color scheme of the device
    const colorScheme = useColorScheme();
    const pickerItemStyling = {
        color: colorScheme === 'dark' ? colors.lightbackground : colors.blueText,
    };
    

    const formatReminderDateTime = (dateString) => {
        const date = new Date(dateString);
      
        const day = date.getDate().toString().padStart(2, '0');     // 2-digit day
        const month = (date.getMonth() + 1).toString().padStart(2, '0'); // 2-digit month
        const hours = date.getHours().toString().padStart(2, '0');   // 2-digit hour
        const minutes = date.getMinutes().toString().padStart(2, '0'); // 2-digit minute
      
        return `${day}/${month} @ ${hours}:${minutes}`;
    };


    return (      
    <Modal
      isVisible={visible}
      onBackdropPress={onClose}
      style={styles.modalContainer}
      animationIn="zoomIn"
      animationOut="zoomOut"
    >

        {/* Notification Banner */}
        {notification && (
            <View style={[
                styles.notificationBanner,
                notification.isError ? styles.errorBanner : styles.successBanner
            ]}>
                <Text style={styles.notificationText}>{notification.message}</Text>
            </View>
        )}

        <View style={styles.modalHeader}>
            <TouchableOpacity onPress={onClose}>
                <FontAwesome name="caret-left" size={35} color="white" style={{ marginLeft: 15 }} />
            </TouchableOpacity>
            <View style={{ flexDirection: "row"}}>
                <TouchableOpacity onPress={onEdit}>
                    <Feather name="edit" size={30} color="white" style={{ marginRight: 15 }} />
                </TouchableOpacity>
                <TouchableOpacity onPress={onDelete}>
                    <Ionicons name="trash" size={30} color="white" style={{ marginRight: 15 }} />
                </TouchableOpacity>
            </View>
        </View>

        <View style={ styles.modalContent }>
            <View style={{ flexDirection: "row", alignItems: "flex-start", justifyContent:"space-between",  marginBottom: 10 }}>
                <View style={{ flex: 1, marginRight: 10 }}>
                    <Text style={styles.taskTitle}>{task.title || "Untitled Task"}</Text>
                </View>
                <View>
                    <View style={styles.categoryView}> 
                        <Text style={styles.taskCategoryDue}>#{task?.categories?.name || "None"}</Text>
                    </View>
                    <Text style={styles.taskCategoryDue}>
                        Due: {new Date(task.dueDate).toLocaleDateString("en-GB", { day: "2-digit", month: "2-digit" })}         
                    </Text>
                    <ImageBackground 
                        source={candy} 
                        style={styles.candyIcon} 
                        imageStyle={styles.candyImage}>
                            <Text style={styles.taskXP}>{task.xp} XP</Text>
                    </ImageBackground>
                </View>
            </View>

            {task.details && (
            <View >
                <Text style={styles.groupTitle}>Details:</Text>
                <Text style={styles.groupDetails}>{task.details}</Text>
            </View>
            )}

            {task.repetition && (
            <View style={styles.groupRow}>
                <FontAwesome6 name="repeat" size={25} style={{ marginRight: 10 }} />
                <Text style={styles.groupTitle}>Repeats:</Text>
                <Text style={styles.groupDetails}>{task.repetition }</Text>
            </View>
            )}

            {task.reminder && (
            <View style={styles.groupRow}>
                <FontAwesome6 name="bell" size={25} style={{ marginRight: 10 }} />
                <Text style={styles.groupTitle}>Reminder:</Text>
                <Text style={styles.groupDetails}>{formatReminderDateTime(task.reminder)}</Text>
            </View>
            )}

            
            {task.studyBuddy && currentUserDoc && (() => {
                const otherBuddies = task.studyBuddy.filter(name => name !== currentUserDoc.name);
                if (otherBuddies.length === 0) return null;
                return (
                    <View style={styles.groupRow}>
                        <Ionicons name="people" size={25} style={{ marginRight: 10 }} />
                        <Text style={styles.groupTitle}>StudyBuddy:</Text>
                        <Text style={styles.groupDetails}>{otherBuddies.join(', ')}</Text>
                    </View>
                );
            })()
            }

            <View style={styles.groupRow}>
                <Feather name="loader" size={25} style={{ marginRight: 10 }} />
                <Text style={styles.groupTitle}>Status:</Text>
                {/* <TouchableOpacity style={styles.statusButton}>
                    <Text style={styles.groupDetails}>{task.status}</Text>
                    <FontAwesome6 name="caret-down" size={25} color={colors.primary} style={{ marginLeft: 15}} />
                </TouchableOpacity> */}
                <View style={styles.pickerContainer}>
                    <Picker 
                        selectedValue={taskStatus} 
                        onValueChange={handleStatusChange} 
                        themeVariant="light"
                        dropdownIconColor={colors.primary}
                        itemStyle={[pickerItemStyling, styles.pickerText]}
                    >
                        <Picker.Item label="Not Started" value="Not Started"/>
                        <Picker.Item label="In Progress" value="In Progress"/>
                        <Picker.Item label="Done" value="Done"/>
                    </Picker>
                </View>
            </View>
            
        </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
    modalContainer: {
        justifyContent: "center",
        alignItems: "center",
    },
    notificationBanner: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        padding: 10,
        zIndex: 1000,
    },
    successBanner: {
        backgroundColor: colors.success,
    },
    errorBanner: {
        backgroundColor: colors.error,
    },
    notificationText: {
        color: 'white',
        textAlign: 'center',
        fontFamily: 'InterSemiBold',
    },
    modalHeader: {
        width: "100%",
        height: 50,
        backgroundColor: colors.primary,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row",
    },
    modalContent: {
        width: "100%",
        backgroundColor: colors.lightbackground,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        padding: 10,
    },
    taskTitle: {
        fontFamily: "LailaBold",
        fontSize: 23,
        flexWrap: "wrap",
        flexShrink: 1, 
        numberOfLines: 2,
        ellipsizeMode: "tail", 
        textAlign: "left",
    },
    categoryView: {
        borderWidth: 0.5,
        paddingVertical: 3,
        paddingHorizontal: 6,
        backgroundColor: colors.secondary,
        margin: 5,
        alignSelf: "flex-start",
    },
    taskCategoryDue: {
        fontSize: 16,
        fontFamily: 'InterRegular',
    },
    // Container for the candy background
    candyIcon: {
        width: 42,  // Set explicit dimensions
        height: 40,
        justifyContent: 'center',  
        alignItems: 'center',
    },
    // Controls how the candy image scales inside ImageBackground
    candyImage: {
        resizeMode: 'contain',  // Ensures the whole candy fits
        width: '100%',         // Stretch to fill container
        height: '100%',
    },
    taskXP: {
        fontFamily: "InterMedium",
        fontSize: 17,
    },
    groupRow: {
        marginVertical: 5,
        flexDirection: "row",
        alignItems: "center",
    },
    groupTitle: {
        fontFamily: "InterSemiBold",
        fontSize: 16,
        marginRight: 10,
    },
    groupDetails: {
        fontFamily: "InterRegular",
        fontSize: 15,
        flexWrap: "wrap",
        flexShrink: 1, 
        numberOfLines: 1,
        ellipsizeMode: "tail", 
        color: colors.blueText,
    },
    pickerContainer: {
        flex: 1,
        backgroundColor: colors.hexToRGBA(colors.primary, 0.3),
        borderRadius: 20,
        borderWidth: 0.5,
        justifyContent: "space-between",
    },
    pickerText: {
        fontFamily: "InterSemiBold",
        fontSize: 15,
        flexWrap: "wrap",
        flexShrink: 1, 
        numberOfLines: 1,
        ellipsizeMode: "tail", 
        color: colors.blueText,
    },
});

export default TaskModal;
