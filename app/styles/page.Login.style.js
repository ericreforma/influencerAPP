import { StyleSheet } from 'react-native';
import theme from './theme.style';

export default StyleSheet.create({
    imageBackgroundStyle: {
        flex: 1,
        paddingHorizontal: theme.welcomeStyle.PADDING_HORIZONTAL
    },
    containerFlex: {
        flex: 1
    },
    containerCenter: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    containerInputs: {
        justifyContent: 'space-between',
        paddingBottom: '7%'
    },
    containerPageInfo: {
        justifyContent: 'flex-end',
        paddingBottom: 10
    }
});
