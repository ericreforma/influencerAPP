import React from 'react';
import { Text } from 'react-native';
import theme from '../../styles/theme.style';

const NavLabelText = props => {
  const fontSize = theme[`FONT_SIZE_${props.size.toUpperCase()}`];
  return (
      <Text
        selectable
          style={{
              color: theme.COLOR_WHITE,
              fontSize,
              fontFamily: 'AvenirLTStd-Black'
          }}
      >
          {props.text}
      </Text>
  );
};

export default NavLabelText;
