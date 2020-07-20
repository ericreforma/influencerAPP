import { StyleSheet } from 'react-native';
import theme from './theme.style';
import { BottomTabBar } from 'react-navigation';

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
    checkInput: {
        borderWidth: 1,
        borderRadius: 20,
        color: '#999999',
        borderColor: '#999999',
        paddingVertical: 10,
        paddingHorizontal: 15,
        marginBottom: 15,
    },
    checkInputSelected: {
        borderWidth: 1,
        borderRadius: 20,
        backgroundColor: theme.COLOR_BLUE,
        borderColor: theme.COLOR_BLUE,
        paddingVertical: 10,
        paddingHorizontal: 15,
        marginBottom: 15,
    },
    checkInputText: {
        fontSize: 18,
        alignSelf: 'center'
    },
    checkInputTextSelected: {
        color: '#fff',
        fontSize: 18,
        alignSelf: 'center'
    },
    jobLabel: {
        fontWeight: 'bold',
        fontSize: 16,
        alignSelf: 'center',
        marginBottom: 20
    },
    modalMediaSelect: {
        justifyContent: 'flex-end',
        margin: 0,
    },
    imageThumbs: {
        width: 150,
        height: 150,
        marginVertical: 20,
        marginHorizontal: 10,
        position: 'relative',
        zIndex: 1
    },
    imageThumbsButton: {
        padding: 30
    },
    imageThumbsButtonPlaceHolder: {
        width: 125,
        height: 125,
    },
    removeButton: {
        borderRadius: 20,
        paddingVertical: 5,
        paddingHorizontal: 10,
        position: 'absolute',
        top: 10,
        right: 5,
        color: '#fff',
        backgroundColor: '#eee',
        zIndex: 9
    },
    removeButtonText: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    modalJob: {
        flex: 1
    },
    modalContainer: {
        padding: 25,
        flex: 1,
        display: 'flex',
        flexDirection: 'column'
    },
    modalJobDescription: {
        fontSize: 22,
        fontWeight: 'bold',
        color: theme.COLOR_BLUE,
        alignSelf: 'center'
    },
    modalBlockContainer: {
        marginBottom: 15,
        alignSelf: 'stretch',
        position: 'relative',
    },
    modalSkillContainer: {
        flexWrap: 'wrap',
        alignSelf: 'stretch',
        flexDirection: 'row',
    },
    modalJobSkill: {
        backgroundColor: '#eee',
        marginRight: 5,
        paddingVertical: 3,
        paddingHorizontal: 7,
        fontSize: 12,
        borderRadius: 10,
        marginBottom: 5
    },
    modalScheduleList: {
        alignSelf: 'stretch',
        padding: 20,
        elevation: 1,
        borderRadius: 10,
        marginTop: 10,
        marginBottom: 25
    },
    modalSchedButton: {
        alignSelf: 'stretch',
        flexDirection: 'row',
        alignContent: 'space-between',
        borderRadius: 20,
        paddingVertical: 10,
        paddingHorizontal: 10,
        marginBottom: 10,
        elevation: 1
    },
    modalSchedButtonSelected: {
        alignSelf: 'stretch',
        flexDirection: 'row',
        alignContent: 'space-between',
        borderRadius: 20,
        paddingVertical: 10,
        paddingHorizontal: 10,
        marginBottom: 10,
        backgroundColor: theme.COLOR_BLUE
    },
    modalSchedButtonConflict: {
        alignSelf: 'stretch',
        flexDirection: 'row',
        alignContent: 'space-between',
        borderRadius: 20,
        paddingVertical: 10,
        paddingHorizontal: 10,
        marginBottom: 10,
        backgroundColor: theme.COLOR_GRAY_LIGHT
    },
    modalSchedButtonAll: {
        alignSelf: 'stretch',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#999',
        borderRadius: 20,
        paddingVertical: 10,
        paddingHorizontal: 10,
        marginBottom: 10
    },
    modalSchedButtonAllSelected: {
        alignSelf: 'stretch',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#999',
        borderRadius: 20,
        paddingVertical: 10,
        paddingHorizontal: 10,
        marginBottom: 10,
        backgroundColor: theme.COLOR_BLUE
    },
    textWhite: {
        color: '#fff'
    },
    modalSchedButtonContent: {
        flex: 1
    },
    jobcontainer: {
        borderRadius: 10,
        overflow: 'hidden',
        elevation: 2,
        backgroundColor: '#fff',
        marginHorizontal: 20,
        marginBottom: 20
    },
    jobName: {
        fontSize: 21, 
        marginTop: 20,
        alignSelf: 'center',
        color: theme.COLOR_BLUE,
    },
    jobReady: {
        color: theme.COLOR_RED,
        alignSelf: 'center'
    },
    rateContainer: {
       padding: 20,
       backgroundColor: theme.COLOR_PAGE_HIGHLIGHT 
    },
    jobRate: {
        fontSize: 20,
        color: theme.COLOR_BLUE,
        alignSelf: 'center'
    }
});
