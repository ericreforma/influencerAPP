import { StyleSheet } from 'react-native';
import theme from './theme.style';

export default StyleSheet.create({
    light: {
        backgroundColor: 'rgba(255,255,255, 0)',
        elevation: 2,
        height: 70
    },
    dark: {
        backgroundColor: theme.COLOR_BLACK,
        elevation: 2,
        height: 90
    },
    innerPage: {
        backgroundColor: 'rgba(255,255,255, 0)',
        elevation: 2,
        height: 50
    },
    backContainer: {
        paddingLeft: 20,
        paddingBottom: 15,
        width: 20,
        height: 20
    }
});
