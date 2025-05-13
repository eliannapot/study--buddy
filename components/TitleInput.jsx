import { TextInput, StyleSheet } from 'react-native';
import colors from '../app/config/colors';

const TitleInput = ({ value, onChangeText, placeholder = "Title" }) => {
  return (
    <TextInput
      placeholder={placeholder}
      maxLength={60}
      placeholderTextColor={colors.blueText}
      style={styles.input}
      value={value}
      onChangeText={onChangeText}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    borderBottomWidth: 2,
    borderColor: colors.primary,
    fontSize: 28,
    fontFamily: 'InterItalic',
    marginBottom: 5,
  },
});

export default TitleInput;
