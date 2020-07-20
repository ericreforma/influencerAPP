import { StyleSheet } from 'react-native';
import theme from './theme.style';

export default StyleSheet.create({
    container: {
        flexDirection: 'row',
        paddingVertical: 10,
        paddingHorizontal: 20,
    },
    image: {
        width: 75,
        height: 75,
        borderRadius: 75,
    },  
    mainText: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    textContainer: {
        paddingLeft: 10,
        paddingTop: 7
    },
    emptyChatContainer: {
        marginTop: 50,
        justifyContent: 'center',
        alignItems: 'center'
    },
    refreshButton: {
        marginTop: 20,
        backgroundColor: '#999',
        paddingVertical: 5,
        paddingHorizontal: 10,
        color: '#fff'
    }
    
});
