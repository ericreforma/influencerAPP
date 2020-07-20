import { StyleSheet } from 'react-native';
import theme from './theme.style';

export default StyleSheet.create({
    container: {
      marginHorizontal: 20,
      paddingVertical: 10,
      paddingHorizontal: 16,
      backgroundColor: theme.COLOR_BLUE_LIGHT,
      borderRadius: 3
    },
    text: {
      color: theme.COLOR_WHITE
    }
  });
