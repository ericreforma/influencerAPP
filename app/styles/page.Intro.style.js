import { StyleSheet } from 'react-native';
import theme from './theme.style';

export default StyleSheet.create({
    introContainer: {
      flex: 1,
      paddingVertical: 20,
      paddingHorizontal: 40,
      justifyContent: 'flex-end'
    },
    introTextCommon: {
      marginTop: 10,
      color: theme.COLOR_WHITE,

    },
    introAdditionalText: {
      marginTop: 20,
      color: theme.COLOR_GRAY_HEAVY,
    },
    introViewSocMed: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignContent: 'space-between',
      marginBottom: 10,
    },
    landingPageHeader: {
      fontSize: 35,
      fontFamily: 'AvenirLTStd-Heavy',
    },
    landingPageText: {
      fontSize: 20,
      fontFamily: 'AvenirLTStd-Medium',
      marginBottom: 30,
    },
    landingPageLoginWith: {
      textAlign: 'center',
      fontSize: 15,
      fontFamily: 'AvenirLTStd-Medium',
    },
});
