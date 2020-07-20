import React from 'react';
import { Text } from 'react-native';
import theme from '../../styles/theme.style';

const CommonText = props => {
  const fontSize = theme[`FONT_SIZE_${props.size.toUpperCase()}`];
  const color = props.dark ? theme.COLOR_GRAY_HEAVY : (
      props.blue ? theme.COLOR_BLUE : (
          props.white ? theme.COLOR_WHITE : (
              props.red ? theme.COLOR_RED : (
                  props.yellow ? theme.COLOR_YELLOW_HEAVY : theme.COLOR_GRAY_MEDIUM
              )
          )
      )
  );

  return (
      <Text
            selectable
          style={[{
              fontSize,
              lineHeight: fontSize + 5,
              color,
              textAlign: props.textAlignCenter ? 'center' : 'left',
              fontFamily: props.fontWeightBold ? 'AvenirLTStd-Heavy' : 'AvenirLTStd-Medium'
          },
          props.style
        ]}
      >
          {props.text}
      </Text>
  );
};

export default CommonText;
