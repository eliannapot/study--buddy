import { Picker } from '@react-native-picker/picker';
import { StyleSheet, Text, View } from 'react-native';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import colors, { adjustableColors } from '../app/config/colors';

const StudyBuddyPicker = ({ buddies, value, setValue }) => (
  <View style={styles.groupContainer}>
    <MaterialIcons name="people-alt" size={29} />
    <Text style={styles.groupName}>Study Buddy:</Text>
    <View style={styles.pickerContainer}>
      <Picker
        selectedValue={value}
        onValueChange={(itemValue) => setValue(itemValue)}
        dropdownIconColor={adjustableColors.adjustableArrowColor}
      >
        <Picker.Item label="..." value={null} />
        {buddies.map((buddy) => (
          <Picker.Item
            key={buddy.id || buddy.name}
            label={buddy.name}
            value={buddy.name}
          />
        ))}
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
    backgroundColor: adjustableColors.adjustableBackgroundColor,
    borderRadius: 20,
    marginLeft: 5,
    justifyContent: 'center',
    paddingVertical: 20,
  },
});

export default StudyBuddyPicker;
