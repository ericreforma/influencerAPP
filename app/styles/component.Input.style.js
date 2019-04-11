import { StyleSheet } from 'react-native';
import theme from './theme.style';

export default StyleSheet.create({
    bgTransparent: {
        backgroundColor: theme.COLOR_WHITE + '50',
        color: theme.COLOR_BLUE_LIGHT,
    },
    bgTransparentPadding: {
        paddingHorizontal: 35,
    },
    bgWhitePadding: {
        paddingHorizontal: 25,
    },
    bgWhite: {
        backgroundColor: theme.COLOR_WHITE,
        color: theme.COLOR_GRAY_HEAVY,
    },
    textInput: {
        height: 50,
    },
    textArea: {
        textAlignVertical: 'top'
    },
    inputTextStyle: {
        borderRadius: 25,
        marginVertical: 7,
        fontSize: 18,
    },
    socMedInputView: {
        flexDirection: 'row',
        backgroundColor: theme.COLOR_WHITE + '50',
        borderRadius: 25,
        marginVertical: 7,
    },
    inputTextSocMedStyle: {
        fontSize: 18,
        paddingRight: 35,
        alignSelf: 'stretch',
        backgroundColor: 'rgba(0,0,0,0)',
    },
    inputTextSocMedLabel: {
        color: theme.COLOR_WHITE,
        textAlignVertical: 'center',
        fontWeight: 'bold',
        fontSize: 18,
        paddingLeft: 35,
    },
});
