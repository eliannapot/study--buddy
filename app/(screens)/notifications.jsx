import { FlatList, StyleSheet, Text, View } from 'react-native';

import NotificationItem from '../../components/NotificationItem';
import colors from '../config/colors';

import { useNotifications } from '../../contexts/NotificationContext';

const NotificationsScreen = () => {
    
    const { notifications, loading, error } = useNotifications();
   
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