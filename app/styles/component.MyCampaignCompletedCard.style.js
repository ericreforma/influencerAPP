import { StyleSheet } from 'react-native';
import theme from './theme.style';

export default StyleSheet.create({
    container: {
        elevation: 2,
        overflow: 'hidden',
        borderRadius: 10,
        margin: 20
    },
    header: {
        flex: 1,
        flexDirection: 'row',
        height: 55,
        padding: 15,
        alignSelf: 'stretch',
    },
    smaContainer: {
        borderRadius: 8,
        width: 35,
        height: 35,
        position: 'relative',
        marginRight: 10,
        marginTop: 6
    },
    socialMedia: {
        position: 'absolute',
        top: 5,
        left: 5,
        width: 25,
        height: 25
    },
    titleName: {
        fontSize: 20,
        color: '#fff'
    },
    titleDate: {
        fontSize: 10,
        color: '#dadada'
    },
    body: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#fff',
        paddingHorizontal: 20,
        paddingVertical: 10,
        marginTop: 35
    },
    button: {
        marginHorizontal: 20,
        marginTop: 35,
        marginBottom: 35,
    },
    completed: {
        color: theme.COLOR_BLUE,
        fontSize: 21,
        fontWeight: 'bold',
        
    }


});
