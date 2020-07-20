import React from 'react';
import {
    TouchableHighlight,
    Image
} from 'react-native';
import { SOCIALMEDIA } from '../../config/variables';

const SMAButton = props => (
  <TouchableHighlight onPress={props.onPress} >
    <Image
      style={{ margin: 10 }}
      source={SOCIALMEDIA[props.type].icon}
    />
  </TouchableHighlight>
);

export default SMAButton;
