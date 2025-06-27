import { Picker } from '@react-native-picker/picker';
import { StyleSheet, Text, View } from 'react-native';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import colors, { adjustableColors } from '../app/config/colors';

const RepeatPicker = ({ value, onChange }) => (
  <View style={styles.groupContainer}>
    <MaterialIcons name="repeat" size={29} />
    <Text style={styles.groupName}>Repeats:</Text>
    <View style={styles.pickerContainer}>
      <Picker
        selectedValue={value}
        onValueChange={onChange}
//        onValueChange={(itemValue) => setRepeats(itemValue)}
        dropdownIconColor={adjustableColors.adjustableArrowColor}
      >
        <Picker.Item label="Never" value="Never" />
        <Picker.Item label="Daily" value="Daily" />
        <Picker.Item label="Weekly" value="Weekly" />
        <Picker.Item label="Monthly" value="Monthly" />
        <Picker.Item label="Yearly" value="Yearly" />
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

export default RepeatPicker;
