import React from 'react';
import { Text } from 'react-native';
import theme from '../../styles/theme.style';

const LabelText = props => {
  const fontSize = theme[`FONT_SIZE_${props.size.toUpperCase()}`];
  const color = props.dark ? theme.COLOR_GRAY_HEAVY : (
      props.blue ? theme.COLOR_BLUE : (
          props.white ? theme.COLOR_WHITE : theme.COLOR_GRAY_MEDIUM
      )
  );

  return (
    <Text
        selectable
        style={[{
            fontSize,
            color,
            fontFamily: 'AvenirLTStd-Black'
        }, props.style]}
    >
        {props.text}
    </Text>
  );
};

export default LabelText;
