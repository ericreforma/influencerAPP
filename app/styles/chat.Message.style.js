import { StyleSheet } from 'react-native';
import theme from './theme.style';

const styles = StyleSheet.create({
    container: {
      width: '100%',
      paddingVertical: 3,
      paddingHorizontal: 10,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-start'
    },
    textContainer: {
      maxWidth: 200,
      marginLeft: 10
    },
    rightContainer: {
      justifyContent: 'flex-end'
    },
    rightTextContainer: {
      marginRight: 10
    },
    leftText: {
      textAlign: 'left',
      backgroundColor: '#efefef',
      borderRadius: 20,
      paddingHorizontal: 10,
      paddingVertical: 8,
    },
    rightText: {
      backgroundColor: '#3f8eff',
      textAlign: 'right',
      color: '#fff',
      borderRadius: 20,
      paddingHorizontal: 10,
      paddingVertical: 8,
    },
    text: {
      fontSize: 16
    },
    timeLeft: {
      fontSize: 12,
      color: '#999'
    },
    timeRight: {
      textAlign: 'right',
      fontSize: 12,
      color: '#999'
    },
    leftDeleted: {
      backgroundColor: '#fff',
      fontStyle: 'italic',
      textAlign: 'left',
      borderRadius: 20,
      borderWidth: 1,
      borderColor: '#999',
      paddingHorizontal: 10,
      paddingVertical: 8,
    },
    rightDeleted: {
      backgroundColor: '#fff',
      fontStyle: 'italic',
      textAlign: 'right',
      borderRadius: 20,
      borderWidth: 1,
      borderColor: '#999',
      paddingHorizontal: 10,
      paddingVertical: 8,
    },
  });
  
  const flattenedStyles = {
    container: StyleSheet.flatten([styles.container, styles.rightContainer]),
    textContainer: StyleSheet.flatten([styles.textContainer, styles.rightTextContainer]),
    leftText: StyleSheet.flatten([styles.leftText, styles.text]),
    rightText: StyleSheet.flatten([styles.rightText, styles.text])
  };
  
  export {
    styles,
    flattenedStyles
  };
