import { StyleSheet } from 'react-native';
import theme from './theme.style';

export default StyleSheet.create({
    header: {
        flexDirection: 'row',
        height: 55,
        padding: 15,
        alignSelf: 'stretch',
        position: 'relative',
        marginBottom: 55
    },
    photoContainer: {
        marginRight: 10
    },
    photo: {
        width: 75,
        height: 75,
        borderRadius: 75
    },
    titleName: {
        fontSize: 20,
        color: '#000'
    },
    titleClient: {
        fontSize: 15
    },
    myPostTitle: {
        alignSelf: 'center',
        fontSize: 28
    },
    scrollContainer: {
        marginBottom: 90
    },  
    scrollView: {
        paddingBottom: 10
    },
    button: {
        marginHorizontal: 20,
        marginVertical: 25,
        alignSelf: 'stretch'
    },
    buttonContainer: {
        alignSelf: 'stretch',
        position: 'absolute',
        bottom: 20,
        left: 0,
        right: 0,        
        flexDirection: 'column'
    },
    cancelButton: {
        alignSelf: 'stretch'
    }
});
