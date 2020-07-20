import { StyleSheet } from 'react-native';
import theme from './theme.style';

export default StyleSheet.create({
    div: {
        marginBottom: 30,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    totalEarnContainer: {
        alignItems: "center",
        justifyContent: 'center',
    },
    totalEarn: {
        fontSize: 65,
        color: theme.COLOR_BLUE,
        fontWeight: 'bold'
    },
    earningHistoryHeader: {
        marginTop: 25,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    earningHistory: {
        fontFamily: 'AvenirLTStd-Heavy',
        fontSize: 21,
        color: theme.COLOR_BLACK,
        fontWeight: 'bold'
    },
    earningHistorySort: {
        fontFamily: 'AvenirLTStd-Heavy',
        color: theme.COLOR_YELLOW_HEAVY,
        fontSize: 16,
        position: 'absolute',
        right: 0,
        top: 3
    },
    earnListContainer: {
        borderWidth: 1,
        borderColor: theme.COLOR_GRAY_LIGHT,
        borderRadius: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 15,
    },
    earnDate: {
        paddingTop: 20
    },
    earnBrand: {
        marginLeft: 15,
        paddingTop: 20
    },
    earnAmount: {
        borderRadius: 10,
        paddingVertical: 20,
        width: 75,
        alignItems: 'center'
    },
    earnAmountText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16
    }

});
