import React from 'react';
import { View, Text } from 'react-native';
import moment from 'moment';
import { styles, flattenedStyles } from '../../styles/chat.Message.style';

export default function Message({ message, status, side, theTime, isDeleted }) {
  const isLeftSide = side === 'left';
  const timeStyle = side === 'left' ? styles.timeLeft : styles.timeRight;
  const containerStyles = isLeftSide ? styles.container : flattenedStyles.container;

  const textContainerStyles = isLeftSide ? styles.textContainer : flattenedStyles.textContainer;
  const textStyles = isDeleted === 1 ?
            isLeftSide ? styles.leftDeleted : styles.rightDeleted : 
            isLeftSide ? flattenedStyles.leftText : flattenedStyles.rightText;

  return (
    <View style={containerStyles}>
      <View style={textContainerStyles}>
        <Text style={textStyles}>
          {isDeleted === 0 ? message : 'Message removed'}
        </Text>
        { status && status === 'sending' ? 
          <Text style={timeStyle}>sending...</Text>
        : 
          <Text style={timeStyle}>{moment(theTime).format('hh:mm a')}</Text>
        }
      </View>
    </View>
  )
}