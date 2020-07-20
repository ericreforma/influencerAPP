import { StyleSheet } from 'react-native';
import theme from './theme.style';

export default StyleSheet.create({
    allCategoryTitle: {
        fontSize: 17,
        fontWeight: 'bold'
    }, 
    categoryListContainer: {
        borderTopWidth: 1,
        borderColor: theme.COLOR_GRAY_LIGHT,
        paddingTop: 15,
        paddingHorizontal: 25,
        marginTop: 10,
        paddingBottom: 25
    },  
    categoryItem: {
        alignSelf: 'stretch',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 15,
    },
    categoryText: {
        fontSize: 19,
    },
    checkBox: {
        width: 20,
        height: 20,
        borderWidth: 2,
        borderColor: theme.COLOR_GRAY_MEDIUM,
        position: 'relative'
    },
    check: {
        position: 'absolute',
        top: 1,
        left: 1,
        width: 15,
        height: 15
    },
    bubbleContainer: {
        flexWrap: 'wrap',
        alignSelf: 'stretch',
        flexDirection: 'row',
        marginTop: 25,
        paddingLeft: 25,
        paddingRight: 15,
    },
    bubble: {
        paddingHorizontal: 15,
        paddingVertical: 5,
        borderRadius: 10,
        backgroundColor: theme.COLOR_BLUE,
        position: 'relative',
        marginRight: 10,
        marginBottom: 8
    },
    bubbleText: {
        color: '#fff',
        fontSize: 18,
    },
    bubbleClose: {
        backgroundColor: theme.COLOR_GRAY_HEAVY,
        color: '#fff',
        position: 'absolute',
        right: -5,
        top: -5,
        paddingHorizontal: 7,
        paddingTop: 0,
        paddingBottom: 2,
        borderRadius: 15
    },
    saveButton: {
        alignSelf: 'stretch',
        backgroundColor: theme.COLOR_BLUE_LIGHT,
        height: 50,
        justifyContent: 'center'

    },
    saveButtonText: {
        color: '#fff',
        alignSelf: 'center',
        fontSize: 18
    },

});
