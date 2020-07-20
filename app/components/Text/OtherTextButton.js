import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import theme from '../../styles/theme.style';

const OtherTextButton = props => (
      <TouchableOpacity
          onPress={props.onPress}
      >
          <Text
                selectable
              style={{
                  fontSize: theme.FONT_SIZE_SMALL,
                  color: theme.COLOR_YELLOW_HEAVY,
              }}
          >
              {props.text}
          </Text>
      </TouchableOpacity>
);
export default OtherTextButton;
