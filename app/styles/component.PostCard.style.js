import { StyleSheet } from 'react-native';
import theme from './theme.style';

export default StyleSheet.create({
    container: {
        borderRadius: theme.BORDER_RADIUS,
        marginBottom: 5,
        elevation: 2,
        alignSelf: 'stretch',
    },
    imageContainer: {
        height: 200,
        maxHeight: 200,
        borderTopLeftRadius: theme.BORDER_RADIUS,
        borderTopRightRadius: theme.BORDER_RADIUS
    },
    image: {
        alignSelf: 'stretch',
        height: 200,
        maxHeight: 200,
        borderTopLeftRadius: theme.BORDER_RADIUS,
        borderTopRightRadius: theme.BORDER_RADIUS
    },
    body: {
        flex: 1,
        padding: 20,
        backgroundColor: theme.COLOR_WHITE,
        borderBottomLeftRadius: theme.BORDER_RADIUS,
        borderBottomRightRadius: theme.BORDER_RADIUS,
    },
    title: {
        fontWeight: 'bold',
        fontSize: 18,
    },
    caption: {
        
    },
    statusContainer: {
        flexDirection: 'row',
        justifyContent: 'center'
    },  
    status: {
        fontSize: 14,
        marginTop: 30,
        marginBottom: 20
    },
    statusText: {
        color: theme.COLOR_RED,
        fontSize: 18,
        fontWeight: 'bold',
    },

});
