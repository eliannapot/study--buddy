import { useRouter } from 'expo-router';
import { FlatList, StyleSheet, Text, View } from 'react-native';

import EventsContainer from '../../components/EventsContainer';
import StreakIndicator from '../../components/StreakIndicator';
import TasksContainer from '../../components/TasksContainer';
import XPindicator from '../../components/XPIndicator';

import { useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useEvents } from '../../contexts/EventContext';
import { useTasks } from '../../contexts/TaskContext';

const DashboardScreen = () => {
    
    const router = useRouter();
    const { user, loading } = useAuth();

    const { tasks } = useTasks();
    const { events } = useEvents();

    const getUpcomingItems = (items, dateKey, number) => {
        return items
            .slice()
            .sort((a, b) => new Date(a[dateKey]) - new Date(b[dateKey]))
            .slice(0, number);
    };

    const filteredEvents = events.filter(event => new Date(event.date) >= new Date());
    const filteredTasks = tasks.filter(task => task.status !== "Done");

    const upcomingTasks = getUpcomingItems(filteredTasks, 'dueDate', 3);
    const upcomingEvents = getUpcomingItems(filteredEvents, 'date', 2);

    const data = [
        { type: 'tasks', data: upcomingTasks },
        { type: 'events', data: upcomingEvents }
    ];

    const renderItem = ({ item }) => {
        if (item.type === 'tasks') return <TasksContainer tasks={item.data} />;
        if (item.type === 'events') return <EventsContainer events={item.data} />;
        return null;
    };

    useEffect(() => {
        if (!loading && !user) {
            router.replace('/auth');
        }
    }, [loading, user]);

    return (
        <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={(item, index) => item.type + index}
            contentContainerStyle={{ paddingBottom: 20 }}
            ListHeaderComponent={
                <View style={styles.welcomeContainer}>
                    <View style={styles.welcomeMessage}>
                        <Text style={styles.welcomeText}>Hi {user.name}!</Text>
                        <Text style={styles.welcomeText}>Ready to start the day?</Text>
                    </View>
                    <XPindicator userXP={200} candySize={50} />
                    <StreakIndicator userStreak={5} />
                </View>
            }
        />
    );
};

const styles = StyleSheet.create({
    welcomeContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        paddingRight: 5,
    },
    welcomeText: {
        fontStyle: 'italic',
        fontWeight: '300',
        fontSize: 18,
    },
    welcomeMessage: {
        flex: 1,
    },
});

export default DashboardScreen;
