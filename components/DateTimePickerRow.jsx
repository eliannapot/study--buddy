import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useState } from 'react';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import colors from '../app/config/colors';

const DateTimePickerRow = ({
  date,
  setDate,
  time,
  setTime,
  label = "Date & Time",
  Icon = MaterialIcons,
  iconName = "lock-clock",
}) => {

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  return (
    <View style={styles.groupContainer}>
      <Icon name={iconName} size={29} />
      <Text style={styles.groupName}>{label}:</Text>

      <TouchableOpacity
        onPress={() => setShowDatePicker(true)}
        style={styles.dateTimeContainer}
      >
        <Text style={styles.groupText}>{date.toLocaleDateString()}</Text>
      </TouchableOpacity>

      <Text style={styles.groupText}> at</Text>

      <TouchableOpacity
        onPress={() => setShowTimePicker(true)}
        style={styles.dateTimeContainer}
      >
        <Text style={styles.groupText}>{time.toLocaleTimeString()}</Text>
      </TouchableOpacity>

      {showDatePicker && (
        <RNDateTimePicker
          value={date}
          mode="date"
          display="default"
          onChange={(event, selectedDate) => {
            setShowDatePicker(false);
            if (selectedDate) {
              setDate(selectedDate)
            } else {
              setDate(date); 
            }
          }}
        />
      )}

      {showTimePicker && (
        <RNDateTimePicker
          value={time}
          mode="time"
          display="default"
          onChange={(event, selectedTime) => {
            setShowTimePicker(false);
            if (selectedTime) {
              setTime(selectedTime)
            } else {
              setTime(time); 
            };
          }}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
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
  dateTimeContainer: {
    padding: 5,
    borderWidth: 0.5,
    borderColor: colors.primary,
    backgroundColor: colors.hexToRGBA(colors.secondary, 0.15),
    borderRadius: 20,
    marginLeft: 5,
    justifyContent: 'center',
  },
});

export default DateTimePickerRow;
