
const hexToRGBA = (hex, alpha) => {
    const r = parseInt(hex.substring(1, 3), 16);
    const g = parseInt(hex.substring(3, 5), 16);
    const b = parseInt(hex.substring(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  };
  
  // Usage
  //backgroundColor: hexToRGBA(colors.tertiary, 0.2);
  

export default {

    primary: '#227B94', //dark blue
    secondary: '#FFDC7F', //yellow
    tertiary: "#78B7D0",
    //(120, 183, 208), //light blue
    
    lightbackground: '#F5F5F5', //white-ish
    darkbackground: '#333', //black-ish
    
    blueText: '#16325B',
    grayText: "3B3F5E",
    
    black: '#000',
    white: '#fff',
    gray: '#515151',
    red: '#FF0000',

    hexToRGBA,
};

