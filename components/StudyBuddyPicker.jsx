import { View, Text, StyleSheet } from 'react-native';
import { useState } from 'react';

import DropDownPicker from 'react-native-dropdown-picker';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

import colors from '../app/config/colors';

const StudyBuddyPicker = ({ buddies, value, setValue }) => {
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([
    { label: '...', value: null },
    ...buddies.map(buddy => ({
      label: buddy.name,
      value: buddy.name, // or buddy.id depending on your DB model
    })),
  ]);

  return (
    <View style={styles.groupContainer}>
      <MaterialIcons name="people-alt" size={29} />
      <Text style={styles.groupName}>Study Buddy:</Text>
      <DropDownPicker
        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setItems}
        placeholder="..."
        dropDownContainerStyle={styles.dropdownContainer}
        style={styles.dropdownContainer}
        textStyle={styles.groupText}
        labelStyle={styles.label}
        ArrowDownIconComponent={() => <Ionicons name="caret-down" size={17} color={colors.primary} />}
        ArrowUpIconComponent={() => <Ionicons name="caret-up" size={17} color={colors.primary} />}
      />
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
  dropdownContainer: {
    borderWidth: 0.5,
    borderColor: colors.primary,
    backgroundColor: colors.hexToRGBA(colors.secondary, 0.15),
    width: 150,
    borderRadius: 20,
    marginLeft: 5,
  },
  label: {
    fontFamily: 'InterRegular',
    fontSize: 16,
  },
});

export default StudyBuddyPicker;
