import { StyleSheet } from 'react-native';
import theme from './theme.style';

export default StyleSheet.create({
    navigation: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 25
    },
    navItem: {
        fontSize: 25,
        fontWeight: 'bold',
        color: '#cccaca',
        marginVertical: 10,
        marginHorizontal: 20
    },
    navItemActive: {
        color: '#515151'
    },
    navLineActive: {
        alignSelf: 'center',
        width: '40%',
        height: 1,
        borderBottomWidth: 4,
        borderColor: '#ffae00'
    },
    overviewContainer: {
        alignSelf: 'stretch',
        borderRadius: 15,
        elevation: 2,
        backgroundColor: '#fff',
        overflow: 'hidden',
        marginHorizontal: 20,
        marginBottom: 55,
    },
    campaignImageContainer: {
        position: 'relative',
    },
    campaignPhoto: {
        alignSelf: 'stretch',
        height: 200,
    },
    campaignLogo: {
        position: 'absolute',
        width: 25,
        height: 25,
        top: 20,
        left: 20
    },
    campaignTitle: {
        position: 'absolute',
        bottom: 20,
        left: 20,
        fontSize: 17,
        color: '#fff'
    },
     campaignDescription: {
         padding: 20,
         fontSize: 15,
     },
     campaignTag: {
        fontSize: 15,
        paddingHorizontal: 20
     },
     campaignStatus: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 20
     },
     campaignStatus_value: {
        color: theme.COLOR_RED,
        fontWeight: 'bold',
        fontSize: 20,
     },
     postContainer: {
         marginHorizontal: 20,
         overflow: 'hidden',
         borderRadius: 15,
         elevation: 2,
         alignSelf: 'stretch',
         marginBottom: 35,
         paddingBottom: 25
     },
     postImage: {
         alignSelf: 'stretch',
         height: 200,
     },
     postTitle: {
         fontSize: 17,
         marginHorizontal: 20,
         marginVertical: 20,
         fontWeight: 'bold'

     },
     postDescription: {
        fontSize: 15,
        marginHorizontal: 20,
     },
     postTags: {
        fontSize: 15,
        marginTop: 20,
        marginHorizontal: 20,
     },
     postAddMoreContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 25,
        marginBottom: 55
     },
     postAddMoreImage: {
         width: 35,
         height: 35,
         marginRight: 15
     },
     postAddMoreText: {
         fontSize: 20
     },
     postUpdateButton: {
         marginHorizontal: 20,
     }
});
