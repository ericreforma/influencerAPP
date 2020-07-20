import React from 'react';
import {
    View,
    Text,
    TextInput
} from 'react-native';

import theme from '../../styles/theme.style';

const SMATextInput = props => (
  <View
      style={{
          backgroundColor: `${theme.COLOR_WHITE}70`,
          borderRadius: theme.INPUT_BORDER_RADIUS,
          paddingLeft: 30,
          paddingRight: 25,
          alignItems: 'center',
          height: 50,
          marginVertical: 7,
          flexDirection: 'row',
      }}
  >
      <Text
          style={{
              fontSize: theme.welcomeStyle.FONT_SIZE_DEFAULT,
              color: theme.COLOR_WHITE,
              fontFamily: 'AvenirLTStd-Black'
          }}
      >
          {props.SMAPlaceholder}
      </Text>

      <TextInput
          style={{
              fontSize: theme.welcomeStyle.FONT_SIZE_DEFAULT,
              color: theme.COLOR_BLUE_LIGHT,
              fontFamily: 'AvenirLTStd-Medium',
              flex: 1,
          }}
          placeholderTextColor={theme.COLOR_BLUE_LIGHT}
          placeholder={props.placeholder}
          onChangeText={props.onChangeText}
      />
  </View>
);

export default SMATextInput;
