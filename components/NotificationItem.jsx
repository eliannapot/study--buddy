import { FontAwesome5, FontAwesome6, Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import {View, Text, StyleSheet} from 'react-native';

import colors from '../app/config/colors';

const NotificationItem = ({ notification }) => {

    const getIcon = (iconType) => {
        switch (iconType) {
            case 'bell':
                return <Ionicons name="notifications" size={40}/>;
            case 'calendar':
                return <FontAwesome5 name="calendar-alt" size={40} />;
            case 'badge':
                return <MaterialCommunityIcons name="star-circle" size={40} />;
            case 'buddy':
                return <Ionicons name="people" size={40} />;
            case 'task':
                return <MaterialIcons name="task" size={40} />;
            default:
                return <Ionicons name="notifications" size={40} />;
        }
    }

    return(
        <View style={[styles.container,
            notification.unread ? { 
               backgroundColor: colors.hexToRGBA(colors.tertiary,0.3) 
            } : { 
                backgroundColor: colors.hexToRGBA(colors.tertiary, 0.10) 
            }]
        }>
            <View style={styles.iconContainer}>
                {getIcon(notification.iconType)}
            </View>
            <View style={{ flex: 1 }}>
                <Text style={styles.message}>{notification.message}</Text>
                <Text style={styles.dateTime}>{notification.dateTime}</Text>
            </View>
            {notification.unread && 
                <View style={styles.dot} />
            }

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        padding: 10,
        backgroundColor: colors.hexToRGBA(colors.tertiary, 0.15),
        borderTopLeftRadius: 10,
        borderBottomRightRadius: 10,
        marginVertical: 5,
        borderWidth: 1,
        alignItems: 'center',
    },
    iconContainer: {
        marginLeft: 5,
        marginRight: 15,
    },
    message: {
        fontSize: 16,
        fontFamily: 'InterMedium',
        flexWrap: 'wrap',
        flexShrink: 1,
    },
    dateTime: {
        fontSize: 16,
        color: colors.grayText,
        fontFamily: "InterLight",
    },
    dot: {
        width: 20,
        height: 20,
        borderRadius: 20,
        backgroundColor: colors.secondary,
        position: 'absolute',
        top: 10,
        right: 10,
        borderWidth: 1,
    },
});

export default NotificationItem;