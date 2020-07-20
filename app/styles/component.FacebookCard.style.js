import { StyleSheet } from 'react-native';
import theme from './theme.style';

export default StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        borderRadius: 20,
        elevation: 1,
        paddingVertical: 10,
        margin: 20
    },
    header: {
        flexDirection: 'row',
        paddingVertical: 5,
        paddingHorizontal: 10
    },  
    profile_picture: {
        width: 50,
        height: 50,
        marginRight: 10
    },
    page_name: {
        fontWeight: 'bold',
        fontSize: 15
    },
    post_date: {
        fontSize: 5
    },
    post_mainImage: {
        height: 200,
        alignSelf: 'stretch'
    },
    post_message: {
        fontSize: 12,
        margin: 10
    },
    post_engagement_container: {
        flexDirection: 'row',
        paddingVertical: 10
    },
    post_engagement_content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    post_engagement_count: {
        fontWeight: 'bold',
        textAlign: 'center',
        color: theme.COLOR_BLUE
    }

});
