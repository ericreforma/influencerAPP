import { StyleSheet } from 'react-native';
import theme from './theme.style';

export default StyleSheet.create({
    imageBackgroundStyle: {
        flex: 1,
        paddingHorizontal: theme.welcomeStyle.PADDING_HORIZONTAL
    },
    containerFlex: {
        flex: 1,
        justifyContent: 'space-between',
    },
    containerCenter: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    mainContent: {
        flex: 1
    },
    containerInputs: {
        paddingBottom: '7%'
    },
    containerPageInfo: {
        paddingBottom: 10
    },

    signupInstead: {
        color: '#fff',
        alignSelf: 'center',
        fontSize: 15,
    },
    inputGroup: {
        marginBottom: 20
    },
    inputWrapper: {
        marginBottom: 35
    },
    forgotPassword: {
        marginBottom: 20
    }
});
