import { StyleSheet } from 'react-native';
import theme from './theme.style';

export default StyleSheet.create({
    cardContainer: {
        backgroundColor: theme.COLOR_WHITE,
        borderRadius: 10,
        elevation: 3,
    },
    cardColorGrayLight: {
        color: theme.COLOR_GRAY_MEDIUM
    },
    cardBorderTop: {
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
    cardHeaderHeight: {
        height: 190,
    },
    cardHeaderContainer: {
        backgroundColor: theme.COLOR_BLACK + '50',
        marginBottom: -185
    },
    cardHeaderImage: {
        width: undefined,
        flex: 1,
    },
    cardHeaderTopTextContainer: {
        height: 185,
        marginLeft: 10,
        marginBottom: -185
    },
    cardHeaderBottomTextContainer: {
        height: 170,
        marginLeft: 20,
        marginBottom: 15,
    },
    cardHeaderBottomText: {
        color: theme.COLOR_WHITE,
        fontFamily: 'AvenirLTStd-Heavy',
        fontSize: 16,
        height: 170,
        textAlignVertical: 'bottom',
    },
    cardBodyContainer: {
        paddingVertical: 15,
        paddingHorizontal: 20
    },
});
