import { StyleSheet } from 'react-native';
import theme from './theme.style';

export default StyleSheet.create({
    mainNavContainer: {
        alignContent: 'center',
        alignItems:'center',
        marginVertical: 20,
        flexDirection: 'row'
    },  
    mainNavText: {
        fontSize: 20,
        marginHorizontal: 10,
    },  
    mainNavTextSelected: {
        fontSize: 20,
        marginHorizontal: 10,
        fontWeight: 'bold'
    },
    navigation: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        elevation: 8,
        position: 'absolute',
        bottom: 0,
        backgroundColor: '#fff',
    },
    navItem: {
        paddingVertical: 20,
        flex: 1,
        alignContent: 'center',
    },
    navImage: {
        alignSelf: 'center',
        width: 20,
        height: 20
    },
    navTitle: {
        alignSelf: 'center',
        fontSize: 23,
        fontWeight: 'bold',
        paddingVertical: 15,
        color: theme.COLOR_BLUE
    },
    navActive: {
        width: '50%',
        height: 2,
        backgroundColor: theme.COLOR_BLUE,
        alignSelf: 'center',
        marginTop: 5
    },
    navText: {
        alignSelf: 'center',
        fontSize: 12,
    },
    navTextActive: {
        alignSelf: 'center',
        fontSize: 12,
        color: theme.COLOR_BLUE
    },
    scrollContainer: {
        paddingBottom: 55
    },
    emptyCard: {
        alignSelf: 'stretch',
        paddingVertical: 50,
        fontSize: 18
    },
    emptyCardText: {
        alignSelf: 'center',
        fontSize: 18,
    },
    topNav: {
        display: 'flex',
        paddingVertical: 18,
        flexDirection: 'row',
        justifyContent: 'center',
        elevation: 2,
        backgroundColor: '#fff'
    },
    topNavList: {
        position: 'relative',
        marginHorizontal: 10
    },
    topNavListText: {
        fontSize: 18,
        color: '#fff'
    },
    topNavListTextActive: {
        fontSize: 18,
        color: '#fff',
        fontWeight: 'bold',
        borderBottomWidth: 2,
        borderBottomColor: '#FFF',
    }
});
