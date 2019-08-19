import { StyleSheet } from 'react-native';
import theme from './theme.style';

export default StyleSheet.create({
    buttonCommon: {
      height: 50,
      borderRadius: 25,
      textAlign: 'center',
      marginVertical: 7,
      justifyContent: 'center'
    },
    buttonWhite: {
      backgroundColor: theme.COLOR_WHITE,
    },
    buttonTextCommon: {
      textAlign: 'center',
      fontFamily: 'AvenirLTStd-Medium',
      fontSize: 18
    },
    buttonWhiteText: {
      color: theme.COLOR_BLUE_LIGHT,
    },
    buttonGradientText: {
      color: theme.COLOR_WHITE
    },
    buttonBorder: {
      borderWidth: 0.5,
      borderColor: theme.COLOR_GRAY_MEDIUM
    }
});
