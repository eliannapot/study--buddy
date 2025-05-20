import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { Picker } from "@react-native-picker/picker";
import { Stack, useRouter } from "expo-router";
import { useEffect, useState } from "react";

// import {events as eventlist} from "../../data/events";
import { useEvents } from "../../contexts/EventContext";

import tasksIcon from "../../assets/images/goToTasks.png";
import plusIcon from "../../assets/images/plus.png";
import EventItem from "../../components/EventItem";
import colors from "../config/colors";

const AllEventsScreen = () => {

    const router = useRouter();
    const { events } = useEvents();

    const [sortBy, setSortBy] = useState("Date");
    //const [events, setEvents] = useState(eventlist); 
    const [sortedEvents, setSortedEvents] = useState(events);

    useEffect(() => {
        const sortEvents = () => {
            const now = new Date();

            const upcomingEvents = events.filter(event => new Date(event.date) >= now);
            const pastEvents = events.filter(event => new Date(event.date) < now);

            let sorted = [...upcomingEvents];
            switch (sortBy) {
                case "Date":
                    sorted.sort((a, b) => new Date(a.date) - new Date(b.date));
                break;
                case "Category":
                    sorted.sort((a, b) => a.categories?.name || "None".localeCompare(b.categories?.name || "None"));
                break;
                case "XP":
                    sorted.sort((a, b) => b.xp - a.xp);
                break;
                case "A-Z":
                    sorted.sort((a, b) => a.title.localeCompare(b.title));
                break;
            }
            let sortedPastEvents = [...pastEvents];
            switch (sortBy) {
                case "Date":
                    sortedPastEvents.sort((a, b) => new Date(a.date) - new Date(b.date));
                break;
                case "Category":
                    sortedPastEvents.sort((a, b) => a.categories?.name || "None".localeCompare(b.categories?.name || "None"));
                break;
                case "XP":
                    sortedPastEvents.sort((a, b) => b.xp - a.xp);
                break;
                case "A-Z":
                    sortedPastEvents.sort((a, b) => a.title.localeCompare(b.title));
                break;
            }
            setSortedEvents([...sorted,...sortedPastEvents]); // Update state to trigger re-render
        };
        sortEvents();
    }, [sortBy, events]); // Runs when `sortBy` changes

    return(
        <>
            <Stack.Screen
                options={({ navigation }) => {
                const prevRoute = navigation.getState().routes[navigation.getState().index - 1]?.name;
                console.log(prevRoute);
                return {
                    animation: prevRoute === "/allTasks" ? "slide_from_right" : "default",
                    animationDuration: 500, // Smooth slow transition
                    detachPreviousScreen: prevRoute === "/allTasks", // Unmount only if coming from Tasks
                    freezeOnBlur: true, // Stop updating when not active
                };
                }}
            />
            <View style={{flex: 1}}>
                <View style={styles.sortByContainer}>
                    <Text style={styles.sortByText}>
                        Sort by:
                    </Text>
                    <View style={styles.pickerContainer}>
                    <Picker 
                        selectedValue={sortBy} 
                        onValueChange={(value) => setSortBy(value)} 
                        dropdownIconColor={colors.primary}
                        itemStyle={styles.pickerText}
                    >
                        <Picker.Item label="Date" value="Date" style={styles.pickerText}/>
                        <Picker.Item label="Category" value="Category" style={styles.pickerText}/>
                        <Picker.Item label="XP" value="XP" style={styles.pickerText}/>
                        <Picker.Item label="A-Z" value="A-Z" style={styles.pickerText}/>
                    </Picker>
                    </View>
                </View>
                <FlatList
                    data={sortedEvents}
                    keyExtractor={(item) => item.$id.toString()}
                    renderItem={({ item }) => <EventItem event={item} />}
                    contentContainerStyle={styles.listContainer}
                />
                <View style={styles.footer}>
                    <TouchableOpacity onPress={() => {router.push("/allTasks")}}>
                        <Image source={tasksIcon} style={styles.tasksIcon} imageStyle={styles.tasksImage}/>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={styles.addEventButton}
                        onPress={() => {
                            router.push("/newEvent")
                        }}
                    >
                        <View style={styles.addEventTextView}>
                            <Text style={styles.addEventText}>Add</Text>
                            <Text style={styles.addEventText}>Event</Text>
                        </View>
                        <Image source={plusIcon} style={{width: 55, height: 55}}/>
                    </TouchableOpacity>
                </View>
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    sortByContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 10,
        alignItems: "center",
    },
    sortByText: {
        fontFamily: "LailaSemiBold",
        fontSize: 25,
    }, 
    pickerContainer :{
        flex: 1,
        backgroundColor: colors.hexToRGBA(colors.tertiary, 0.2),
        borderRadius: 10,
        borderWidth: 1,
        marginLeft: 10,
    },
    pickerText: {
        fontFamily: "InterMedium",
        fontSize: 21,
        color: colors.blueText,
    },
    listContainer: {
        paddingBottom: 80,
    },
    footer: {
        position: "absolute",
        bottom: -10,
        left: -15,
        right: -15,
        backgroundColor: colors.lightbackground,
        borderTopWidth: 1,
        padding: 20,
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "space-between",
        borderBottomWidth: 10,
        borderColor: colors.primary,
        height: 85,
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
    // Container for the background
    tasksIcon: {
        width: 68.34,  // Set explicit dimensions
        height: 48,
        justifyContent: 'center',  
        alignItems: 'center',
        marginRight: 5,
    },
    // Controls how the image scales inside ImageBackground
    tasksImage: {
        resizeMode: 'contain',  // Ensures the whole fits
        width: '100%',         // Stretch to fill container
        height: '100%',
    },
});

export default AllEventsScreen;
