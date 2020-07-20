import { StyleSheet } from 'react-native';
import theme from './theme.style';

export default StyleSheet.create({
    wrapper: {
        backgroundColor: '#fff',
        flex: 1,
        position: 'relative'
    },
    container: {
        flex: 1,
        flexWrap: 'wrap',
        flexDirection: 'row',
    },
    title: {
        fontSize: 18,
        padding: 20,
        color: '#999'
    },
    modal: {
        margin: 0,
        padding: 0
    },
    camerabutton: {
        position: 'absolute',
        right: 20,
        top: 9
    },
    camera: {
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center'
        
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 25,
        position: 'relative',
        backgroundColor: 'blue',
    },
    selection: {
        top: 5,
        right: 5,
        borderWidth: 1,
        borderColor: '#fff',
        position: 'absolute',
        borderRadius: 20,
        width: 20,
        height: 20
    },
    selected: {
        backgroundColor: theme.COLOR_BLUE,
        borderColor: theme.COLOR_BLUE
    }
});
