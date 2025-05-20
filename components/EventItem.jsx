import { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { useEvents } from '../contexts/EventContext';

import colors from '../app/config/colors';
import EventModal from './EventModal';

const EventItem = ({ event }) => {

    const [selectedEvent, setSelectedEvent] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);

    const openEvent = (event) => {
        setSelectedEvent(event);
        setModalVisible(true);
    };

    const { deleteEvent } = useEvents();

    const handleDelete = () => {
        console.log("Deleting event:", selectedEvent);
        deleteEvent(selectedEvent.$id); 
        setModalVisible(false); 
    }

    const formatDateForEvent = (isoString) => {
        const date = new Date(isoString);
    
        return date.toLocaleString("en-GB", { 
            day: "2-digit", 
            month: "2-digit", 
            hour: "2-digit", 
            minute: "2-digit", 
            hour12: false // Use 24-hour format
        }).replace(",", " @"); // Replace comma with '@'
    };

    const isPast = new Date(event.date) < new Date(); // Check if the event date is in the past

    return (
        <View style={[
            styles.eventContainer, 
            { backgroundColor: isPast 
                ? colors.hexToRGBA(colors.tertiary, 0.05) 
                : colors.hexToRGBA(colors.tertiary, 0.2) }
        ]}>
            <View style={{flex: 1, marginRight: 10}}>
                <Text style={styles.eventTitle}> {event?.title || "Untitled event"}</Text>
                <Text style={styles.eventCategory}>#{event?.categories?.name || "None"}</Text>
            </View>
            <View>
                <Text style={styles.eventDate}>{formatDateForEvent(event.date) || "No Date Set"}</Text>
                <View style={{flexDirection: "row", justifyContent:"space-between", alignItems: "flex-end"}}>
                    <Text style={styles.eventXP}>{event?.xp || 0} XP</Text>
                    <TouchableOpacity 
                        hitSlop={{ top: 40, bottom: 10, left: 40, right: 10 }}
                        onPress={() => {
                            console.log("Opening event:", event);
                            openEvent(event)}}
                    >
                        <Text style={styles.showEventDetails}>...</Text>
                    </TouchableOpacity>
                </View>
            </View>    

            <EventModal
                key={selectedEvent?.$id}
                visible={modalVisible}
                event={selectedEvent}
                onClose={() => setModalVisible(false)}
                onDelete={handleDelete}
            />

        </View>
    );
};

const styles = StyleSheet.create({  
    eventContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center", // Ensures vertical alignment
        //backgroundColor: colors.hexToRGBA(colors.tertiary, 0.2),
        borderWidth: 1,
        paddingHorizontal: 10,
        paddingVertical: 5,
        marginHorizontal: 5,
        borderRadius: 10,
    },
    eventTitle: {
        fontFamily: "InterMedium",
        fontSize: 17,
        marginBottom: 2,
        flexShrink: 1, // Prevents overflowing
        numberOfLines: 1,
        ellipsizeMode: "tail",
    },
    eventDate: {
        fontFamily: "InterRegular",
        fontSize: 16,
        marginBottom: 2,
    },
    eventCategory: {
        fontFamily: "InterRegular",
        fontSize: 16,
        backgroundColor: colors.secondary,
        paddingInline: 5,
        borderWidth: 1,
        alignSelf: "flex-start",
        flexShrink: 1, // Prevents category from pushing right content
    },
    eventXP: {
        fontFamily: "InterMedium",
        fontSize: 17,
    },
    showEventDetails: {
        fontFamily: "InterBold",
        fontSize: 17,
        marginLeft: 10,
        marginRight: 1,
    },
});

export default EventItem;