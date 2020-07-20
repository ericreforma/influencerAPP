import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import style from '../../styles/component.Button.style';
import theme from '../../styles/theme.style';

const GradientButton = ({ isSaving = false, ...props }) => (
    <TouchableOpacity
      style={[props.style, style.buttonCommon]}
      onPress={() => {
        if (!isSaving) {
          props.onPress();
        }
      }}
    >
      <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        colors={[theme.COLOR_BLUE, theme.COLOR_BLUE_LIGHT_GRADIENT]}
        style={[style.buttonCommon]}
      >
        {isSaving === false ?
          <Text style={[style.buttonTextCommon, style.buttonGradientText]}>
            {props.text}
          </Text>
          :
          <ActivityIndicator size="small" color="#fff" />
        }
      </LinearGradient>
    </TouchableOpacity>
);

export default GradientButton;
