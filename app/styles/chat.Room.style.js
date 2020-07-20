import { StyleSheet } from 'react-native';
import theme from './theme.style';

export default StyleSheet.create({
    messagesContainer: {
      height: '100%',
      paddingBottom: 51,
      backgroundColor: '#fff',
    },
    inputContainer: {
      flexDirection: 'row',
      position: 'absolute',
      bottom: 0,
      paddingHorizontal: 20,
      borderTopWidth: 1,
      borderTopColor: theme.COLOR_BLUE_LIGHT
    },
    input: {
      flex: 1,
      fontSize: 15,
    },
    sendButton: {
      flex: 0,
      width: 30,
      height: 30,
      marginTop: 10,
    },

    headerContainer: {
        flexDirection: 'row',
        paddingVertical: 5,
        paddingHorizontal: 20,
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 1,
        backgroundColor: theme.COLOR_BLUE,
        elevation: 1,
        width: '100%',
    },
    headerImage: {
        width: 50,
        height: 50,
        borderRadius: 75,
    },  
    headerSubText: {
      fontSize: 12,
      color: '#fff'
    },
    headerMainText: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#fff'
    },
    headerTextContainer: {
        paddingLeft: 10,
        paddingTop: 7
    },
  });
