import { StyleSheet } from 'react-native';
import theme from './theme.style';

export default StyleSheet.create({
    container: {
        borderRadius: 10,
        overflow: 'hidden',
        elevation: 2,
        backgroundColor: '#fff',
        marginHorizontal: 20
    },
    uploadImageContainer: {
        alignSelf: 'stretch',
    },
    uploadImageButton: {
        alignSelf: 'stretch',
        backgroundColor: '#f3f3f3',
        height: 200,
        alignItems: 'center',
        justifyContent: 'center'
    },
    uploadPlaceHolder: {
        alignItems: 'center',
        justifyContent: 'center'

    },
    textContainer: {
        padding: 20,
    },
    inputControl: {
        borderWidth: 1,
        borderRadius: 20,
        color: '#999999',
        borderColor: '#999999',
        paddingVertical: 5,
        paddingHorizontal: 15,
        marginBottom: 15
    },
    addMoreButton: {
        flexDirection: 'row',
        alignSelf: 'stretch',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 15,
        height: 50
    },
    incentivesWrapper: {
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    incentivesContainer: {
        width: '50%',
        paddingHorizontal: 5,
        backgroundColor: theme.COLOR_WHITE,
    },
    incentive: {
        alignSelf: 'stretch',
        paddingHorizontal: 15,
    }
});
