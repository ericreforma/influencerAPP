import { StyleSheet } from 'react-native';
import theme from './theme.style';

export default StyleSheet.create({
    container: {
        paddingHorizontal: 20,
        marginBottom: 55,
        flex: 1,
    },  
    HeaderContainer: {
        alignSelf: 'stretch',
        flexDirection: 'row',
        height: 50,
        paddingVertical: 10,
        justifyContent: 'space-between'
    },
    HeaderText: {
        fontWeight: 'bold',
        fontSize: 18,
    },
    HeaderButton: {
    },
    HeaderButtonText: {
        fontSize: 18,
        color: theme.COLOR_BLUE
    },
    inputControl: {
        marginTop: 15,
        fontSize: 17,
        borderWidth: 1,
        borderColor: theme.COLOR_GRAY_LIGHT,
        borderRadius: 10,
        padding: 5
    },
    selectControl: {
        marginTop: 15,
        borderWidth: 1,
        borderColor: theme.COLOR_GRAY_LIGHT,
        borderRadius: 10,
        padding: 5
    },
    BodyContainer: {
        marginBottom: 35,
        
    },
   
    modalContainer: {
        backgroundColor: '#fff',
        paddingHorizontal: 25,
        paddingVertical: 25,
        flex: 1,
    },

    modalHeader: {
        alignSelf: 'stretch',
        flexDirection: 'row',
        height: 50,
        paddingVertical: 10,
        justifyContent: 'space-between',
        marginBottom: 35
    },
    modalIcon: {
        width: 25,
        height: 25
    },
    modalBody: {
        
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
    genderOption: {
        alignSelf: 'stretch',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 12,
        paddingHorizontal: 10,
        marginBottom: 12,
        backgroundColor: '#eee'
    },
    birthDateRow: {
        alignSelf: 'stretch',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 12,
        paddingHorizontal: 10,
        height: 50,
        backgroundColor: '#eee',
    },
    birthDateRowText: {
        fontSize: 18,
        marginTop: 12
    },  
    birthDatePicker: {
        marginTop: 0,

    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#000',
        borderTopWidth: 1,
        borderColor: theme.COLOR_GRAY_LIGHT,
        paddingTop: 25,
        marginBottom: 15
    },
    sma_header: {
        flexDirection: 'row',
    },
    sma_icon_container: {
        flexDirection: 'row',
        position: 'relative',
        borderRadius: 4,
        width: 30,
        height: 30,
        marginRight: 10
    },
    sma_image: {
        width: 20,
        height: 20,
        position: 'absolute',
        top: 5,
        left: 5
    },
    sma_label_container: {
        flex: 1,
        flexDirection: 'row',
    },
    sma_value: {
        fontSize: 16,
        fontWeight: 'bold'
    },
    sma_label: {
        marginRight: 10,
        marginTop: 2
    },
    modal_sma_container: {
        flexDirection: 'row',
        alignSelf: 'stretch'

    },
    modal_sma_label: {
        marginRight: 10,
        marginTop: 23
    },
    modal_sma_input: {
        flex: 1
    },
    phoneInput: {
        flexDirection: 'row',
        borderWidth: 1,
        borderRadius: 10,
        borderColor: '#999',
        paddingHorizontal: 10,
        paddingVertical: 2,
        alignSelf: 'stretch',
        alignItems: 'center'
    },
    phoneNumber: {
        fontSize: 25,
    },
    phoneNumberVerified: {
        color: 'green',
        fontSize: 12
    },
    phoneNumberNotVerified: {
        color: 'red',
        fontSize: 12
    },
    verifyingModal: {
        backgroundColor: '#fff',
        alignSelf: 'center',
        
    },
    FBModalContainer: {
        backgroundColor: 'rgba(0,0,0,0.8)',
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    FBModalContent: {
        backgroundColor: '#fff',
        padding: 25,
        width: 300,
        borderRadius: 20
    },
    FBModalTitle: {
        fontSize: 15,
    }

});
