import { createContext, useContext, useEffect, useState } from 'react';

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

    const addEvent = (event) => {
        setEvents((prevEvents) => [...prevEvents, event]);
    };

    const deleteEvent = (eventId) => {
        setEvents((prevEvents) => prevEvents.filter((event) => event.id !== eventId));
    };

    return (
        <EventsContext.Provider value={{ events, addEvent, deleteEvent }}>
            {children}
        </EventsContext.Provider>
    );
};

export const useEvents = () => useContext(EventsContext);