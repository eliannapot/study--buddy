import { StyleSheet, Text, View } from 'react-native';


import EventsContainer from '../../components/EventsContainer';
import StreakIndicator from '../../components/StreakIndicator';
import TasksContainer from '../../components/TasksContainer';
import XPindicator from '../../components/XPIndicator';

// import { events as eventlist } from "../../data/events";
// import { tasks as tasklist } from "../../data/tasks";
import { useEvents } from '../../contexts/EventContext';
import { useTasks } from '../../contexts/TaskContext';

const DashboardScreen = () => {

    // const [tasks, setTasks] = useState(tasklist); 
    // const [events, setEvents] = useState(eventlist); 
    const { tasks } = useTasks();
    const { events } = useEvents();

    const getUpcomingItems = (items, dateKey, number) => {
        return items
            .slice() // Clone array to avoid mutating the original state
            .sort((a, b) => new Date(a[dateKey]) - new Date(b[dateKey])) // Sort dynamically
            .slice(0, number); // Get the first n items
    };

    const filteredEvents = events.filter(event => new Date(event.date) >= new Date()); // Filter out past events
    const filteredTasks = tasks.filter(task => task.status !== "Done"); // Filter out completed tasks

    const upcomingTasks = getUpcomingItems(filteredTasks, 'dueDate', 3);
    const upcomingEvents = getUpcomingItems(filteredEvents, 'date', 2);
    
    

    return (

        <View>
            <View style={styles.welcomeContainer}>
                <View style={styles.welcomeMessage}>
                    <Text style={styles.welcomeText}>
                        Hi Emily! 
                    </Text>
                    <Text style={styles.welcomeText}>
                        Ready to start the day?
                    </Text>
                </View>
                <XPindicator userXP={200} candySize={50}/>
                <StreakIndicator userStreak={5}/>
            </View>
            <View>
                <TasksContainer tasks={upcomingTasks}/>
            </View>
            <View>     
                <EventsContainer events={upcomingEvents}/>            
            </View>         
        </View>
    );
};

const styles = StyleSheet.create({
    welcomeContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 10,
        paddingRight: 5,
    },
    welcomeText: {
        fontStyle: "italic",
        fontWeight: "300",
        fontSize: 18,
    },  
    welcomeMessage: {
        flex: 1,
    },
});

export default DashboardScreen;