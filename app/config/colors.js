import { Appearance } from 'react-native';

const hexToRGBA = (hex, alpha) => {
  const r = parseInt(hex.substring(1, 3), 16);
  const g = parseInt(hex.substring(3, 5), 16);
  const b = parseInt(hex.substring(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

const colors = {
  primary: '#227B94', // dark blue
  secondary: '#FFDC7F', // yellow
  tertiary: '#78B7D0', // light blue

  secondarybackground: '#FAF0E6',
  
  lightbackground: '#F5F5F5', // white-ish
  darkbackground: '#333', // black-ish

  blueText: '#16325B',
  grayText: '3B3F5E',

  black: '#000',
  white: '#fff',
  gray: '#515151',
  red: '#FF0000',

  hexToRGBA,
};

const getAdjustableColors = () => {
  const colorScheme = Appearance.getColorScheme();

  return {
    adjustableBackgroundColor: colorScheme === 'dark' ? '#61A0B1' : '#FAF0E6',
    adjustableTextColor: colorScheme === 'dark' ? colors.white : colors.black,
    adjustableArrowColor: colorScheme === 'dark' ? colors.secondary : colors.primary,
  };
};

export const adjustableColors = getAdjustableColors();
export default colors;
