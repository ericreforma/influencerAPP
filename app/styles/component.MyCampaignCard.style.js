import { StyleSheet } from 'react-native';
import theme from './theme.style';

export default StyleSheet.create({
    container: {
        elevation: 2,
        backgroundColor: '#fff',
        overflow: 'hidden',
        borderRadius: 10,
        margin: 20,
        paddingBottom: 35,
    },
    header: {
        flexDirection: 'row',
        height: 55,
        padding: 15,
        alignSelf: 'stretch',
        marginBottom: 50
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
    platformTitle: {
        fontSize: 20,
        alignSelf: 'center',
        fontWeight: 'bold'
    },  
    
    socialMediaWrapper: {
        marginTop: 50,
        marginBottom: 20,
        alignItems: 'center',
        alignSelf: 'stretch',
        alignContent: 'center',
        display: 'flex'
    }, 
    socialMediaContainer: {
        justifyContent: 'center',
        alignSelf: 'stretch',
        flexDirection: 'row',
        marginTop: 25
    },  
    socialMedia: {
        width: 50,
        height: 50,
        marginHorizontal: 5
    },
    postCounter: {
        fontSize: 35,

    },
    body: {
        alignSelf: 'stretch',
        alignItems: 'center',
        marginBottom: 35
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
    deadlineContainer: {
        alignSelf: 'stretch',
        backgroundColor: '#f0f0f0',
        paddingVertical: 10,
        alignItems: 'center'
    },
    deadline: {
        color: theme.COLOR_BLUE,
        fontSize: 20,
        fontWeight: 'bold'
    },
    button: {
        marginHorizontal: 20,
        marginBottom: 10,
    },
    eventHeader: {
        height: 100
    },
    messageIcon_container: {
        position: 'absolute',
        top: 25,
        right: 20,
    },
    messageIcon: {
        width: 40,
        height: 40,
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
    sma_header: {
        alignSelf: 'stretch',
        paddingHorizontal: 20,
        paddingVertical: 10,
        elevation: 2
    },
    facebook_header: {
        backgroundColor: '#4267B2'
    },
    facebook_header_text: {
        color: '#fff',
        fontSize: 21
    },
    instagram_header: {
        backgroundColor: '#fff'
    },
    event_appliedJobs: {
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'row',
        borderRadius:10,
        paddingHorizontal: 20,
        paddingVertical: 6,
        elevation: 1,
        borderWidth: 1,
        borderColor: '#eee',
        marginVertical: 10
    },
    eventAppliedJobHeader: {
        alignSelf: 'center',
        fontWeight: 'bold',
        fontSize: 15
    }
});
