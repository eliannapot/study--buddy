import { FlatList, StyleSheet, Text, View } from 'react-native';

import NotificationItem from '../../components/NotificationItem';
import colors from '../config/colors';

const NotificationsScreen = () => {

    const notifications = [
        { id: '1', message: 'You have a new message!', dateTime: '2023-10-01 10:00 AM', iconType: 'bell', unread: true },
        { id: '2', message: 'Your assignment is due tomorrow.', dateTime: '2023-10-01 12:00 PM', iconType: 'calendar' },
        { id: '3', message: 'Reminder: Meeting at 3 PM.' , dateTime: '2023-10-01 02:00 PM', iconType: 'badge' },
        { id: '4', message: 'New friend request received.', dateTime: '2023-10-01 04:00 PM', iconType: 'buddy' },
        { id: '5', message: 'Task completed successfully.', dateTime: '2023-10-01 06:00 PM', iconType: 'task' },
        { id: '6', message: 'New comment on your post.', dateTime: '2023-10-01 08:00 PM', iconType: 'bell' },
        { id: '7', message: 'You have a new follower.', dateTime: '2023-10-01 09:00 PM', iconType: 'calendar' },
        { id: '8', message: 'Your profile has been updated.', dateTime: '2023-10-01 10:00 PM', iconType: 'badge' },
        { id: '9', message: 'New event created in your calendar.', dateTime: '2023-10-01 11:00 PM', iconType: 'buddy' },
        { id: '10', message: 'You have a new notification.', dateTime: '2023-10-01 12:00 AM', iconType: 'task' },
    ];
   
    return (
        <View style={styles.container}>
            <View style={{ alignItems: 'flex-end' }}>
                <Text style={styles.readText}>Mark all as read</Text>
            </View>
            <FlatList
                data={notifications}
                renderItem={({ item }) => (
                    <NotificationItem notification={item}/>
                )}
                keyExtractor={(item) => item.id}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.lightbackground,
        padding: 10,
    },
    readText: {
        fontSize: 16,
        fontFamily: 'InterLight',
        color: colors.grayText,
        margin: 10,
    },
});

export default NotificationsScreen;