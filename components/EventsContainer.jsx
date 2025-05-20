import { useRouter } from 'expo-router';
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import EventItem from './EventItem';

import colors from '../app/config/colors';
import plusIcon from '../assets/images/plus.png';


const EventsContainer = ({events}) => {

    const router = useRouter();
    
    return (
    <View style={styles.eventsContainer}>
        <View style={styles.eventsTitleContainer}>
            <Text style={styles.eventsTitle}>Events:</Text>
            <TouchableOpacity 
                style={styles.addEventButton}
                onPress={() => router.push("/newEvent")}
            >
                <View style={styles.addEventTextView}>
                    <Text style={styles.addEventText}>Add</Text>
                    <Text style={styles.addEventText}>Event</Text>
                </View>
                <Image source={plusIcon} style={{width: 55, height: 55}}/>
            </TouchableOpacity>
        </View>
        <View>
            {events.length > 0 ? (
                <FlatList
                        data = {events}
                        keyExtractor={(item) => item.$id.toString()}
                        renderItem={
                            ({item}) => <EventItem event={item} />
                        }      
                />
            ) :(
                <View style={styles.eventContainer}>
                    <View>
                        <Text style={styles.eventTitle}>No upcoming events scheduled!</Text>
                    </View>
                </View>
            )}
            <TouchableOpacity style={styles.seeAllEventsButton} onPress={() => router.push("/allEvents")}>
                <Text style={styles.seeAllEventsText}>See all events</Text>
                <Text style={styles.seeAllEventsDots}>...</Text>
            </TouchableOpacity>
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
    eventsTitleContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 10,
    },
    eventsTitle: {
        fontFamily: "LailaBold",
        fontSize: 36,
    },
    addEventButton: {
        borderRadius: 5,
        padding: 2,
        flexDirection: "row",
        alignItems: "center",
    },
    addEventTextView: {
        flexDirection: "column", 
        alignItems: "flex-end",
        marginRight: 1,
    },
    addEventText: {
        fontFamily: "NunitoExtraBold",
        fontSize: 15,
        color: colors.primary,
    },
    eventContainer: {
        alignItems: "center", // Ensures vertical alignment
        flexDirection: "row",
        justifyContent: "center",
        backgroundColor: colors.hexToRGBA(colors.tertiary, 0.2),
        borderWidth: 1,
        paddingHorizontal: 10,
        paddingVertical: 10,
        marginHorizontal: 5,
        borderRadius: 10,
    },
    eventTitle: {
        fontFamily: "InterItalic",
        fontSize: 17,
        marginBottom: 2,
        numberOfLines: 1,
    },
    seeAllEventsButton: {
        marginBottom: 10,
        borderRadius: 5,
        backgroundColor: colors.hexToRGBA(colors.tertiary, 0.2),
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 1,
        paddingHorizontal: 10,
        marginHorizontal: 5,
        borderRadius: 10,
    },
    seeAllEventsText: {
        fontFamily: "InterLight",
        fontSize: 16,
    },
    seeAllEventsDots: {
        fontFamily: "InterExtraBold",
        fontSize: 16,
        marginLeft: 5,
        marginRight: 1,
    },
});


export default EventsContainer;

