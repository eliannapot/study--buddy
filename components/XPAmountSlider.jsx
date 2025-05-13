import { View, Text, StyleSheet } from 'react-native';
import Slider from '@react-native-community/slider';

import colors from '../app/config/colors';

const XPAmountSlider = ({ value, onValueChange }) => {
  return (
    <View>
      <Slider
        style={styles.slider}
        minimumValue={1}
        maximumValue={5}
        step={1}
        value={value}
        onSlidingComplete={onValueChange}
        minimumTrackTintColor={colors.black}
        maximumTrackTintColor={colors.gray}
        thumbTintColor={colors.primary}
      />
      <View style={styles.tickMarks}>
        {[1, 2, 3, 4, 5].map((num) => (
          <Text
            key={num}
            style={[
              styles.tickText,
              num === value && styles.highlightedTickText,
            ]}
          >
            {num}
          </Text>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  slider: {
    width: 150,
    height: 40,
    marginHorizontal: 10,
    paddingVertical: 10,
    borderWidth: 0.5,
    borderColor: colors.primary,
    borderRadius: 20,
    backgroundColor: colors.hexToRGBA(colors.secondary, 0.15),
  },
  tickMarks: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 10,
    width: 150,
  },
  tickText: {
    fontSize: 14,
    fontFamily: 'InterRegular',
    color: colors.blueText,
  },
  highlightedTickText: {
    color: colors.black,
    fontFamily: 'InterBold',
    fontSize: 14,
  },
});

export default XPAmountSlider;
