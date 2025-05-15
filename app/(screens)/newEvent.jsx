import { router } from "expo-router";
import { useState } from "react";
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import FontAwesome6 from "react-native-vector-icons/FontAwesome6";

import { useEvents } from "../../contexts/EventContext";
//import { useCategories } from "../../contexts/CategoryContext.js";

import { buddies } from "../../data/buddies";
import { categories } from "../../data/categories";

import candies from "../../assets/images/candies.png";
import colors from "../config/colors";

import CategorySelector from "../../components/CategorySelector";
import DateTimePickerRow from "../../components/DateTimePickerRow";
import ReminderPicker from "../../components/ReminderPicker";
import RepeatPicker from "../../components/RepeatPicker";
import StudyBuddyPicker from "../../components/StudyBuddyPicker";
import TitleInput from "../../components/TitleInput";
import XPAmountSlider from "../../components/XPAmountSlider";

const NewEventScreen = () => {

    const { addEvent } = useEvents();
    //const { categories } = useCategories();

    const [eventName, setEventName] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("None");
    const [eventDetails, setEventDetails] = useState("");
    const [eventDate, setEventDate] = useState(new Date());
    const [eventTime, setEventTime] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [endTime, setEndTime] = useState(new Date());
    const [location, setLocation] = useState("");
    const [repeats, setRepeats] = useState("Never");
    const [reminder, setReminder] = useState("Never");
    const [facilitator, setFacilitator] = useState("");
    const [studyBuddy, setStudyBuddy] = useState(null);
    const [experiencePoints, setExperiencePoints] = useState(1);

    const combinedDate = new Date(
        eventDate.getFullYear(),
        eventDate.getMonth(),
        eventDate.getDate(),
        eventTime.getHours(),
        eventTime.getMinutes()
    ).toISOString();

    const combinedEndDate = new Date(
        endDate.getFullYear(),
        endDate.getMonth(),
        endDate.getDate(),
        endTime.getHours(),
        endTime.getMinutes()
    ).toISOString();

    return(
        <View style={{flex: 1}}>
            <View style={styles.screenContainer}>

                {/* Event Name */}
                <TitleInput
                    value={eventName}
                    onChangeText={setEventName}
                    placeholder="Event name"
                />

                {/* Category */}
                <View style={styles.groupContainer}>
                    <Text style={styles.groupName}>Category:</Text>
                    <CategorySelector
                        categories={categories}
                        selectedCategory={selectedCategory}
                        onCategorySelect={setSelectedCategory}
                    />
                </View>

                {/* Details */}
                <View style={styles.groupContainer}>
                    <Text style={styles.groupName}>Details:</Text>
                    <TextInput
                        placeholder="Event details"
                        maxLength={200}
                        placeholderTextColor={colors.blueText}
                        style={styles.eventDetailsInput}
                        value={eventDetails}
                        onChangeText={setEventDetails}
                        />
                </View>

                {/* Date and Time */}
                <DateTimePickerRow
                    date={eventDate}
                    setDate={setEventDate}
                    time={eventTime}
                    setTime={setEventTime}
                    label="Scheduled"
                    Icon={FontAwesome5}
                    iconName="calendar-alt"
                />
                <DateTimePickerRow
                    date={endDate}
                    setDate={setEndDate}
                    time={endTime}
                    setTime={setEndTime}
                    label="until"
                    Icon={FontAwesome}
                    //iconName="long-arrow-right"
                    iconName="hourglass-end"
                />

                {/* Location */}
                <View style={styles.groupContainer}>
                    <FontAwesome5 name="map-marker-alt" size={29}/>
                    <Text style={styles.groupName}>Location:</Text>
                    <TextInput
                        placeholder="Event location"
                        maxLength={50}
                        placeholderTextColor={colors.blueText}
                        style={styles.eventDetailsInput}
                        value={location}
                        onChangeText={setLocation}
                        />
                </View>

                {/* Repeats */}
                <RepeatPicker
                    value={repeats}
                    onChange={setRepeats}
                />

                {/* Reminder */}
                <ReminderPicker
                    value={reminder}
                    onChange={setReminder}
                />

                {/* Facilitator */}
                <View style={styles.groupContainer}>
                    <FontAwesome6 name="chalkboard-user" size={25}/>
                    <Text style={styles.groupName}>Facilitator:</Text>
                    <TextInput
                        placeholder="Event facilitator"
                        maxLength={60}
                        placeholderTextColor={colors.blueText}
                        style={styles.eventDetailsInput}
                        value={facilitator}
                        onChangeText={setFacilitator}
                        />
                </View>

                {/* Study Buddy */}
                <StudyBuddyPicker
                    buddies={buddies}
                    value={studyBuddy}
                    setValue={setStudyBuddy}
                />

                {/* Experience Points */}
                <View style={styles.groupContainer}>
                    <Image source={candies} style={{width: 31, height: 38}}/> 
                    <Text style={styles.groupName}>Experience Points:</Text>
                    <XPAmountSlider
                        value={experiencePoints}
                        onValueChange={setExperiencePoints}
                    />
                </View>



            </View>
            {/* Save */}
            <TouchableOpacity 
                onPress={() => {
                    const newEvent = {
                        event_id: Date.now().toString(),
                        title: eventName,
                        category: selectedCategory,
                        date: combinedDate,
                        end_date: combinedEndDate,
                        xp: experiencePoints,
                        repetition: repeats,
                        facilitator: facilitator,
                        details: eventDetails,
                        location: location,
                        studyBuddy: studyBuddy,
                        reminder: reminder,
                    };
                    addEvent(newEvent);
                    alert('Event saved!');
                    router.back();
                }}
            >
                    <View style={styles.saveButton}>
                        <MaterialIcons name="save" size={40} color={colors.white}/>
                        <Text style={styles.saveText}>Save</Text>
                    </View>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    screenContainer: {
        flex: 1,
    },
    groupContainer: {
        padding: 5,
        flexDirection: 'row',
        alignItems: 'center',
    },
    groupName: {
        fontSize: 16,
        fontFamily: 'InterSemiBold',
        padding: 5,
    },
    groupText: {
        fontSize: 16,
        fontFamily: 'InterRegular',
        color: colors.blueText,
    },
    eventDetailsInput: {
        fontFamily: 'InterLight',
        fontSize: 15,
        paddingHorizontal: 5,
        marginLeft: 10,
        marginRight: 20,
        borderWidth: 1,
        borderColor: colors.primary,
        borderRadius: 5,
    },
    saveButton: {
        backgroundColor: colors.primary,
        width: "100%",
        height: 70,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    saveText: {
        fontSize: 24,
        fontFamily: 'NunitoBold',
        color: colors.white,
        marginLeft: 10,
    },
});

export default NewEventScreen;