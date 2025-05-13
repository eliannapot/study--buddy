import { View, Text, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';

import { MaterialCommunityIcons } from '@expo/vector-icons';

import colors from '../app/config/colors';

const ReminderPicker = ({ value, onChange }) => (
    <View style={styles.groupContainer}>
    <MaterialCommunityIcons name="bell-ring" size={29}/>
    <Text style={styles.groupName}>Reminder:</Text>
    <View style={styles.pickerContainer}>
        <Picker
            value={value}
            onValueChange={(itemValue) => onChange(itemValue)}
            dropdownIconColor={colors.primary}
        >
            <Picker.Item label="Never" value="Never" />
            <Picker.Item label="30 minutes before" value="30 minutes before" />
            <Picker.Item label="1 hour before" value="1 hour before" />
            <Picker.Item label="2 hours before" value="2 hours before" />
            <Picker.Item label="1 day before" value="1 day before" />
        </Picker>
    </View>
</View>
);

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
  pickerContainer: {
    width: 150,
    height: 30,
    borderWidth: 0.5,
    borderColor: colors.primary,
    backgroundColor: colors.hexToRGBA(colors.secondary, 0.15),
    borderRadius: 20,
    marginLeft: 5,
    justifyContent: 'center',
    paddingVertical: 20,
  },
});

export default ReminderPicker;
