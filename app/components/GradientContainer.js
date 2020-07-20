import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import theme from '../styles/theme.style';

const GradienContainer = props => (
      <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        colors={[theme.COLOR_BLUE, theme.COLOR_BLUE_LIGHT_GRADIENT]}
        style={props.style}
      >
        {props.children}
      </LinearGradient>
);

export default GradienContainer;
