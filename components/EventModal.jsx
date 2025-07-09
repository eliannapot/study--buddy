import { Feather, FontAwesome, FontAwesome6, Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { ImageBackground, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Modal from "react-native-modal";

import { useEvents } from "../contexts/EventContext.js";
import { useUsers } from "../contexts/UserContext.js";

import colors from "../app/config/colors";
import candy from "../assets/images/candy.png";

const EventModal = ({ visible, event, onClose, onEdit, onDelete }) => {
    if (!event) 
        return null; 

    const { currentUserDoc, updateCurrentUser, updateUserById, users } = useUsers();
    const { editEvent } = useEvents();

    const [isPast, setIsPast] = useState(false);
    const [attending, setAttending] = useState(event?.attended === true);
    
    useEffect(() => {
        if (event?.end_date) {
            const now = new Date();
            const endDate = new Date(event.end_date);
            setIsPast(now > endDate);
            setAttending(event.attended === true);
        }
    }, [event]);

    useEffect(() => {
        if (event) {
            setAttending(event.attended === true);
        }
    }, [event]);


    const handleToggleAttendance = async () => {
        const newStatus = !attending; // toggle true ↔ false

        try {
            console.log("Toggling attendance for event:", event.$id, "to", newStatus);
            await editEvent(event.$id, { attended: newStatus });
            setAttending(newStatus);

            if (newStatus === true) {
                // Marking as attended → log XP
                const newLogEntry = `${event.end_date}-${event.xp}-${event.$id}`;

                const xpLog = currentUserDoc?.xpLog || [];
                const alreadyLogged = xpLog.some(entry => entry.includes(`-${event.$id}`));

                if (!alreadyLogged) {
                    await updateCurrentUser({ 
                        xpLog: [...xpLog, newLogEntry]
                    });
                }
            } else {
                // Marking as not attended → remove XP log if exists
                const filteredXpLog = (currentUserDoc?.xpLog || []).filter(
                    entry => !entry.includes(`-${event.$id}`)
                );

                await updateCurrentUser({
                    xpLog: filteredXpLog
                });
            }

        } catch (error) {
            Alert.alert("Error", "Could not update attendance.");
            console.error("Attendance toggle error:", error);
        }
    };



    const formatReminderDateTime = (dateString) => {
        const date = new Date(dateString);
      
        const day = date.getDate().toString().padStart(2, '0');     // 2-digit day
        const month = (date.getMonth() + 1).toString().padStart(2, '0'); // 2-digit month
        const hours = date.getHours().toString().padStart(2, '0');   // 2-digit hour
        const minutes = date.getMinutes().toString().padStart(2, '0'); // 2-digit minute
      
        return `${day}/${month} @ ${hours}:${minutes}`;
    };

    const formatEventDateTime = (dateString, endDateString) => {
        const date = new Date(dateString);
        const endDate = new Date(endDateString);
      
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are 0-indexed
      
        const startHours = date.getHours().toString().padStart(2, '0');
        const startMinutes = date.getMinutes().toString().padStart(2, '0');
      
        const endHours = endDate.getHours().toString().padStart(2, '0');
        const endMinutes = endDate.getMinutes().toString().padStart(2, '0');
      
        return `${day}/${month}, ${startHours}:${startMinutes}-${endHours}:${endMinutes}`;
    };

    return (      
    <Modal
      isVisible={visible}
      onBackdropPress={onClose}
      style={styles.modalContainer}
      animationIn="zoomIn"
      animationOut="zoomOut"
    >
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
                    <Text style={styles.eventTitle}>{event.title || "Untitled Event"}</Text>
                </View>
                <View>
                    <View style={styles.categoryView}> 
                        <Text style={styles.eventCategoryDue}>#{event?.categories?.name || "None"}</Text>
                    </View>
                    <Text style={styles.eventCategoryDue}>
                        {formatEventDateTime(event.date, event.end_date)}
                    </Text>
                    <ImageBackground 
                        source={candy} 
                        style={styles.candyIcon} 
                        imageStyle={styles.candyImage}>
                            <Text style={styles.eventXP}>{event.xp} XP</Text>
                    </ImageBackground>
                </View>
            </View>

            {event.details && (
            <View >
                <Text style={styles.groupTitle}>Details:</Text>
                <Text style={styles.groupDetails}>{event.details}</Text>
            </View>
            )}

            {event.repetition && (
            <View style={styles.groupRow}>
                <FontAwesome6 name="repeat" size={25} style={{ marginRight: 10 }} />
                <Text style={styles.groupTitle}>Repeats:</Text>
                <Text style={styles.groupDetails}>{event.repetition }</Text>
            </View>
            )}

            {event.facilitator && (
                <View style={styles.groupRow}>
                    <FontAwesome6 name="chalkboard-user" size={20} style={{ marginRight: 10 }} />
                    <Text style={styles.groupTitle}>Facilitator:</Text>
                    <Text style={styles.groupDetails}>{event.facilitator}</Text>
                </View>
            )}

            {event.reminder && (
            <View style={styles.groupRow}>
                <FontAwesome6 name="bell" size={25} style={{ marginRight: 10 }} />
                <Text style={styles.groupTitle}>Reminder:</Text>
                <Text style={styles.groupDetails}>{formatReminderDateTime(event.reminder)}</Text>
            </View>
            )}
            
            {event.location && (
                <View style={styles.groupRow}>
                    <Ionicons name="location" size={25} style={{ marginRight: 10 }} />
                    <Text style={styles.groupTitle}>Location:</Text>
                    <Text style={styles.groupDetails}>{event.location}</Text>
                </View>
            )}


            {event.studyBuddy && currentUserDoc && (() => {
                const otherBuddies = event.studyBuddy.filter(name => name !== currentUserDoc.name);
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


            
        </View>

        {isPast && (
            <View style={{ marginTop: 20, alignItems: "center" }}>
                {attending ? (
                    <View
                        style={{
                            backgroundColor: colors.white,
                            padding: 12,
                            borderRadius: 10,
                            width: "90%",
                            alignItems: "center",
                            borderColor: colors.primary,
                            borderWidth: 0.5,
                        }}
                    >
                        <Text style={{ color: colors.primary, fontFamily: "InterSemiBold", fontSize: 16 }}>
                            Attended
                        </Text>
                    </View>
                ) : (
                    <TouchableOpacity
                        style={{
                            backgroundColor: colors.primary,
                            padding: 12,
                            borderRadius: 10,
                            width: "90%",
                            alignItems: "center",
                            borderColor: colors.white,  
                            borderWidth: 0.5,
                        }}
                    >
                        <Text style={{ color: "white", fontFamily: "InterSemiBold", fontSize: 16 }}>
                            Not Attended
                        </Text>
                    </TouchableOpacity>
                )}
            </View>
        )}
        <View style={{ marginTop: 5, alignItems: 'center' }}>
            {new Date(event.end_date) < new Date() && (
                <TouchableOpacity
                    style={{
                        backgroundColor: colors.gray,
                        paddingVertical: 10,
                        paddingHorizontal: 20,
                        borderRadius: 10,
                        borderColor: colors.secondary,
                        borderWidth: 0.5,
                    }}
                    onPress={handleToggleAttendance}
                >
                    <Text style={{ color: 'white', fontFamily: 'InterSemiBold' }}>
                        {attending ? "Mark as Not Attended" : "Mark as Attended"}
                    </Text>
                </TouchableOpacity>
            )}
        </View>

    </Modal>
  );
};

const styles = StyleSheet.create({
    modalContainer: {
        justifyContent: "center",
        alignItems: "center",
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
    eventTitle: {
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
    eventCategoryDue: {
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
    eventXP: {
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
    statusButton: {
        backgroundColor: colors.hexToRGBA(colors.primary, 0.1),
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 20,
        borderWidth: 0.5,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
});

export default EventModal;
