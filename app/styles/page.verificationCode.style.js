import { StyleSheet } from 'react-native';
import theme from './theme.style';

export default StyleSheet.create({
    title: {
        color: theme.COLOR_WHITE,
        fontSize: theme.welcomeStyle.FONT_SIZE_MEDIUM,
        fontFamily: 'AvenirLTStd-Medium',
        marginBottom: 10,
        textAlign: 'center'
    },
    paragraph: {
        color: theme.COLOR_WHITE,
        fontSize: theme.welcomeStyle.FONT_SIZE_SMALL,
        fontFamily: 'AvenirLTStd-Medium',
        marginBottom: 8,
    },
    verificationInput: {
        textAlign: 'center'
    },
    resendCode: {
        color: theme.COLOR_YELLOW_HEAVY,
        textAlign: 'center'
    }
    
});
