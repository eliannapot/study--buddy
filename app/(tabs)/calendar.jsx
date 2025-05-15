import { Ionicons } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Calendar } from 'react-native-calendars';

// import {tasks as tasklist} from "../../data/tasks";
// import {events as eventlist} from "../../data/events";

import { useEvents } from '../../contexts/EventContext';
import { useTasks } from '../../contexts/TaskContext';

import CalendarItem from '../../components/CalendarItem';
import colors from '../config/colors';


const CalendarScreen = () => {

    const today = new Date().toISOString().split('T')[0];
    
    //const [tasks, setTasks] = useState(tasklist); 
    //const [events, setEvents] = useState(eventlist); 
    const { tasks } = useTasks();
    const { events } = useEvents();

    const [selected, setSelected] = useState(today);
    const [dailyItems, setDailyItems] = useState([]);


    const isToday = (dateString) => {
        //const today = new Date().toISOString().split('T')[0];
        return dateString === today;
      };

    const getItemsForDay = (dateString) => {   
        const itemsForDay = [
            ...events
                .filter(event => event.date.startsWith(dateString))
                .map(event => ({ ...event, type: 'event', time: new Date(event.date) })),
            ...tasks
                .filter(task => task.dueDate.startsWith(dateString))
                .map(task => ({ ...task, type: 'task', time: new Date(task.dueDate) })),
            ]
        return itemsForDay.sort((a, b) => a.time - b.time);
    };

    const formatDate = (dateString) => {
            const date = new Date(dateString);
            const day = String(date.getDate()).padStart(2, '0');
            const month = String(date.getMonth() + 1).padStart(2, '0');
        return `${day}/${month}`;
    };
      
    useEffect(() => {
        setDailyItems(getItemsForDay(today));
    }, []);    

    return (
        <View style={styles.container}>
            <Calendar
                renderArrow={(direction) => (
                    <Ionicons
                      name={direction === 'left' ? 'caret-back' : 'caret-forward'}
                      size={30} 
                      color={colors.primary} 
                    />
                  )}
                style={styles.calendarContainer}
                markedDates={{
                    [selected]: {selected: true, selectedDotColor: 'orange'}
                }}
                theme={{
                    backgroundColor: colors.lightbackground,
                    calendarBackground: colors.hexToRGBA(colors.tertiary, 0.05),

                    textSectionTitleColor: colors.black,
                    textMonthFontFamily: "LailaBold",
                    textMonthFontSize: 28,
                    
                }}
                dayComponent={( { date, state } ) => {

                    const dayItems = getItemsForDay(date.dateString).slice(0, 2);

                    return (
                        <TouchableOpacity
                            onPress={() => {
                                if (state !== 'disabled') {
                                    setSelected(date.dateString);
                                    setDailyItems(getItemsForDay(date.dateString));
                                }
                            }}
                            style={[
                                styles.dayContainer,
                                selected === date.dateString && styles.selectedDay,
                                isToday(date.dateString) && styles.todayDay,
                            ]}
                            >
                            <Text style={[
                                    { color: state === 'disabled' ? 'gray' : 'black' },
                                    styles.dayText,
                                    isToday(date.dateString) && styles.todayText,
                                    selected === date.dateString && styles.selectedText,
                                    ]}>
                                {date.day}
                            </Text>
                            <View style={styles.barContainer}>
                                {dayItems.slice(0, 2).map( (item, index) => {
                                    return (
                                        <View
                                            key={index}
                                            style={[
                                                styles.bar,
                                                { opacity: item.type === 'event' ? 1 : 0.5 },
                                            ]}
                                        />
                                    );
                                })}
                            </View>
                        </TouchableOpacity>
                    );
                }}
            />
            
            <View style={styles.detailsContainer}> 
                <Text style={styles.detailsDateText}>{formatDate(selected)}</Text>
                <View style={styles.scrollableView}>
                    <FlatList
                        data={dailyItems}
                        keyExtractor={(item, index) => `${item.type}-${item.event_id || item.task_id}-${index}`}
                        renderItem={({ item }) => (
                            <CalendarItem item={item} />
                        )}
                        scrollEnabled={true}
                        //contentContainerStyle={{ paddingVertical: 10 }}
                    />
                </View>
            </View>     

        </View>
    );
};

const styles = StyleSheet.create({
    // Main container
    container: {
        flex: 1,
        padding: 5,
    },
    calendarContainer: {
        borderWidth: 1,
        borderColor: colors.primary, 
        borderRadius: 5,
        width: "100%",
    },
    //Each day's container
    dayContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 0.5,
      borderColor: colors.black,
      padding: 7,
      borderRadius: 5,
    }, 
    todayDay: {
        backgroundColor: colors.hexToRGBA(colors.secondary, 0.1),
        borderColor: colors.primary,
        borderWidth: 2,
    },
    selectedDay: {
        backgroundColor: colors.hexToRGBA(colors.secondary, 0.5),
    },
    todayText: {
        fontFamily: 'InterBold',
        fontSize: 15,
    },
    selectedText: {
        fontFamily: 'InterSemiBold',
        fontSize: 15,
    },
    dayText: {
        fontFamily: 'Inter',
        fontSize: 17,
    },  
    // Bars container
    barContainer: {
        height: 16,
        width: 30,
    },
    bar: {
        height: 5,
        width: 30,
        borderRadius: 2,
        backgroundColor: colors.primary,
        marginVertical: 2,
    },
    // Bottom details container
    detailsContainer: {
        borderWidth: 1,
        borderColor: colors.primary, 
        borderRadius: 8,
        padding: 10,
        flex: 1,
    },
    detailsDateText: {
        fontSize: 36,
        fontFamily: 'LailaBold',
    },
    scrollableView: {
        maxHeight: 350,
        flex: 1,
    },
});

export default CalendarScreen;