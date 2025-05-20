import { createContext, useContext, useEffect, useState } from 'react';
import { ActivityIndicator, Alert, StyleSheet, Text, View } from 'react-native';

import colors from '../app/config/colors';

const EventsContext = createContext();

//import { events as initialEvents } from '../data/events';
import eventService from '../services/eventService';

export const EventsProvider = ({ children }) => {
    
    //const [events, setEvents] = useState(initialEvents);
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchEvents();
    }, []);

    const fetchEvents = async () => {
        setLoading(true);
        const response = await eventService.getEvents();
        console.log("Events fetched:", response);
        if (response.error) {
            setError(response.error);
            Alert.alert("Error", response.error);
        } else {
            setEvents(response.data);
            setError(null);
        }
        setLoading(false);
    }

    const addEvent = async (event) => {
        if (!event) {
            Alert.alert("Error, no event provided");
            return;
        }
        const response = await eventService.addEvent(event);
        if (response.error) {
            Alert.alert("Error", response.error);
            return;
        } else {
            setEvents([...events, response.data]);
        }
    };

    const deleteEvent = async (eventId) => {
        Alert.alert("Delete Event", "Are you sure you want to delete this event?", [
            {
                text: "Cancel",
                style: "cancel",
            },
            {
                text: "Delete",
                style: "destructive",
                onPress: async () => {
                    const response = await eventService.deleteEvent(eventId);
                    if (response.error) {
                        Alert.alert("Error", response.error);
                        return;
                    } else {
                        setEvents(events.filter((event) => event.$id !== eventId));
                    }
                },
            },
        ]);
    }

    return (
        <EventsContext.Provider value={{ events, addEvent, deleteEvent }}>
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
        </EventsContext.Provider>
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

export const useEvents = () => useContext(EventsContext);