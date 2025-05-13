import React from 'react';
import Svg, { Path } from 'react-native-svg';

const Star = ({ color = '#999', stroke = '#000', size = 50 }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
    <Path
      stroke={stroke}
      strokeWidth={0.5}
      d="M12 .587l3.668 7.431L24 9.753l-6 5.847 1.417 8.263L12 19.771 4.583 23.863 6 15.6 0 9.753l8.332-1.735z"
    />
  </Svg>
);

export default Star;
