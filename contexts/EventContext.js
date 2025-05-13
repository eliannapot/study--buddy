import React, { createContext, useContext, useState } from 'react';

const EventsContext = createContext();

import { events as initialEvents } from '../data/events';

export const EventsProvider = ({ children }) => {
    const [events, setEvents] = useState(initialEvents);

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