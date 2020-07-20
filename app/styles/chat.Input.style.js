import { StyleSheet } from 'react-native';
import theme from './theme.style';

export default StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        width: '100%'
      },
      inputContainer: {
        width: '70%'
      },
      input: {
        height: 40,
        borderColor: theme.COLOR_GRAY_LIGHT,
        borderWidth: 1,
        borderRadius: 3,
        flexDirection: 'row',
        paddingHorizontal: 10
      }

});
