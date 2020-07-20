import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import style from '../../styles/component.Button.style';

const WhiteButton = (props) => (
  <TouchableOpacity
    style={[props.style, style.buttonCommon, style.buttonWhite, (props.border ? style.buttonBorder : null)]}
    onPress={props.onPress}
  >
    <Text style={[style.buttonTextCommon, style.buttonWhiteText]}>{props.text}</Text>
  </TouchableOpacity>
);

export default WhiteButton;
