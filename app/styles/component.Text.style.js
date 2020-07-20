import { StyleSheet } from 'react-native';
import theme from './theme.style';

export default StyleSheet.create({
    welcomeLabel: {
        fontFamily: 'AvenirLTStd-Heavy',
        color: theme.COLOR_WHITE,
        marginBottom: 5,
        paddingHorizontal: 0
    },
    welcomeLabelXLarge: {
        fontSize: theme.welcomeStyle.FONT_SIZE_XLARGE,
        lineHeight: theme.welcomeStyle.FONT_SIZE_XLARGE + 7
    },
    welcomeLabelLarge: {
        fontSize: theme.welcomeStyle.FONT_SIZE_LARGE,
        lineHeight: theme.welcomeStyle.FONT_SIZE_LARGE + 7
    },
    welcomeCommonText: {
        color: theme.COLOR_WHITE,
        fontSize: theme.welcomeStyle.FONT_SIZE_MEDIUM,
        fontFamily: 'AvenirLTStd-Medium',
        marginBottom: 10,
    },
    welcomeAdditionalText: {
        textAlign: 'center',
        fontSize: theme.welcomeStyle.FONT_SIZE_SMALL,
        fontFamily: 'AvenirLTStd-Medium',
        marginTop: 20,
        color: theme.COLOR_GRAY_HEAVY,
    },
    welcomeTextButton: {
        textAlign: 'center',
        fontSize: theme.welcomeStyle.FONT_SIZE_SMALL,
        fontFamily: 'AvenirLTStd-Medium',
        color: theme.COLOR_YELLOW_HEAVY
    }
});
