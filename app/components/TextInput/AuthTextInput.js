import React, { useState } from 'react';
import {
    View,
    TextInput,
    TouchableOpacity,
    Image
} from 'react-native';

import image from '../../assets';
import theme from '../../styles/theme.style';

const AuthTextInput = props => {
  const [visibility, setVisibility] = useState(!(props.type == 'password'));

  return (
    <View
      style={{
          backgroundColor: `${theme.COLOR_WHITE}70`,
          borderRadius: theme.INPUT_BORDER_RADIUS,
          paddingHorizontal: theme.INPUT_HORIZONTAL_PADDING,
          justifyContent: 'center',
          height: 50,
          marginVertical: 7,
          position: 'relative'
      }}
    >
      <TextInput
          style={[{
              fontSize: theme.welcomeStyle.FONT_SIZE_DEFAULT,
              color: theme.COLOR_BLUE_LIGHT,
              fontFamily: 'AvenirLTStd-Medium',
          }, props.style]}
          placeholderTextColor={theme.COLOR_BLUE_LIGHT}
          placeholder={props.placeholder}
          onChangeText={props.onChangeText}
          secureTextEntry={(props.type === 'password' ? !visibility : false)}
      />
      { props.type === 'password' && 
        <TouchableOpacity 
          style={{
            position: 'absolute',
            right: 25,
            top: 13,
            width: 20,
            height: 20
          }}
          onPress={() => {
            setVisibility(!visibility);
          }}
        >
          <Image
              style={{
                  width: 25,
                  maxWidth: 25,
                  height: 25,
                  maxHeight: 25,
              }}
              resizeMode="contain"
              source={(visibility) ? image.icon.visible : image.icon.invisible}
          />
      </TouchableOpacity>
      }
      
    </View>
  );
};

export default AuthTextInput;
