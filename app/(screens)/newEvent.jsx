import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import FontAwesome6 from "react-native-vector-icons/FontAwesome6";

import { useCategories } from "../../contexts/CategoryContext.js";
import { useEvents } from "../../contexts/EventContext";

import { combineDateAndTime, getReminderDate, splitDateAndTime } from "../../utils/datetimeUtils";

import { buddies } from "../../data/buddies";

import candies from "../../assets/images/candies.png";
import colors from "../config/colors";

import CategorySelector from "../../components/CategorySelector";
import DateTimePickerRow from "../../components/DateTimePickerRow";
import ReminderPicker from "../../components/ReminderPicker";
import RepeatPicker from "../../components/RepeatPicker";
import StudyBuddyPicker from "../../components/StudyBuddyPicker";
import TitleInput from "../../components/TitleInput";
import XPAmountSlider from "../../components/XPAmountSlider";

const EventFormScreen = () => {
    const { addEvent, editEvent, events } = useEvents();
    const { categories } = useCategories();

    const params = useLocalSearchParams();
    const editingEvent = events.find(event => event.$id === params.eventId);

    const [eventName, setEventName] = useState(editingEvent?.title || "");
    const [selectedCategory, setSelectedCategory] = useState(editingEvent?.categories || null);
    const [eventDetails, setEventDetails] = useState(editingEvent?.details || "");
    const [location, setLocation] = useState(editingEvent?.location || "");
    const [facilitator, setFacilitator] = useState(editingEvent?.facilitator || "");
    const [repeats, setRepeats] = useState(editingEvent?.repetition || "Never");
    const [reminder, setReminder] = useState(editingEvent?.reminder ? "Custom" : "Never");
    const [studyBuddy, setStudyBuddy] = useState(editingEvent?.studyBuddy || null);
    const [experiencePoints, setExperiencePoints] = useState(editingEvent?.xp || 1);

    const { dateOnly: startDate, timeOnly: startTime } = editingEvent?.date
        ? splitDateAndTime(editingEvent.date)
        : { dateOnly: new Date(), timeOnly: new Date() };

    const { dateOnly: endDateOnly, timeOnly: endTimeOnly } = editingEvent?.end_date
        ? splitDateAndTime(editingEvent.end_date)
        : { dateOnly: new Date(), timeOnly: new Date() };

    const [eventDate, setEventDate] = useState(startDate);
    const [eventTime, setEventTime] = useState(startTime);
    const [endDate, setEndDate] = useState(endDateOnly);
    const [endTime, setEndTime] = useState(endTimeOnly);

    const combinedStartDate = combineDateAndTime(eventDate, eventTime);
    const combinedEndDate = combineDateAndTime(endDate, endTime);

    const handleSave = () => {
        const eventData = {
            ...editingEvent,
            title: eventName,
            categories: selectedCategory?.$id || null,
            date: combinedStartDate,
            end_date: combinedEndDate,
            xp: experiencePoints,
            facilitator,
            details: eventDetails,
            location,
            studyBuddy,
            reminder: reminder !== "Never" ? getReminderDate(reminder, combinedStartDate) : null,
            repetition: repeats !== "Never" ? repeats : null,
        };

        if (editingEvent) {
            editEvent(editingEvent.$id, eventData);
            alert("Event updated!");
        } else {
            addEvent(eventData);
            alert("Event created!");
        }

        router.back();
    };

    return (
        <View style={{ flex: 1 }}>
            <View style={styles.screenContainer}>

                <TitleInput
                    value={eventName}
                    onChangeText={setEventName}
                    placeholder="Event name"
                />

                <View style={styles.groupContainer}>
                    <Text style={styles.groupName}>Category:</Text>
                    <CategorySelector
                        categories={categories}
                        selectedCategory={selectedCategory}
                        onCategorySelect={setSelectedCategory}
                    />
                </View>

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
                    label="Until"
                    Icon={FontAwesome}
                    iconName="hourglass-end"
                />

                <View style={styles.groupContainer}>
                    <FontAwesome5 name="map-marker-alt" size={29} />
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

                <RepeatPicker value={repeats} onChange={setRepeats} />

                <ReminderPicker value={reminder} onChange={setReminder} />

                <View style={styles.groupContainer}>
                    <FontAwesome6 name="chalkboard-user" size={25} />
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

                <StudyBuddyPicker
                    buddies={buddies}
                    value={studyBuddy}
                    setValue={setStudyBuddy}
                />

                <View style={styles.groupContainer}>
                    <Image source={candies} style={{ width: 31, height: 38 }} />
                    <Text style={styles.groupName}>Experience Points:</Text>
                    <XPAmountSlider
                        value={experiencePoints}
                        onValueChange={setExperiencePoints}
                    />
                </View>

            </View>

            <TouchableOpacity onPress={handleSave}>
                <View style={styles.saveButton}>
                    <MaterialIcons name="save" size={40} color={colors.white} />
                    <Text style={styles.saveText}>
                        {editingEvent ? "Save Changes" : "Save"}
                    </Text>
                </View>
            </TouchableOpacity>
        </View>
    );
};

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

export default EventFormScreen;
