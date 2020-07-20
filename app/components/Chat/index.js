import React, { useEffect, useState, useCallback, useRef } from 'react';
import { FlatList, View, TextInput, TouchableOpacity, Image, Dimensions, Alert } from 'react-native';

import styles from '../../styles/chat.Room.style';
import { HttpRequest } from '../../services/http';
import { URL } from '../../config/url';
import image from '../../assets';
import Message from './Message';

const Chat = props => {
  const chatSession = props.chatSession;
  const input = useRef(null);
  const [txt, setTxt] = useState('');
  const screenWidth = Math.round(Dimensions.get('window').width);

  useEffect(() => {
    input.current = txt;
  }, [txt]);

  const sending = useCallback(() => {
    props.sendingMessage(input.current);
    setTxt('');
  }, [txt]);
  
  const onChange = useCallback(e => {
    setTxt(e);
  });
  
  const onConfirmDelete = useCallback(e => {
    Alert.alert(
      "Confirm Delete",
      "Delete this message? You cannot undo this action.",
      [
        {
          text: 'NO',
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        {
          text: 'YES',
          onPress: () => {
              props.deleteMessage(e);
        }}
      ],
      { cancelable: false }
    );
  });

  return ( 
      <View>
        <View style={styles.messagesContainer}>
          <FlatList
            style={{ width: screenWidth }}
            inverted
            data={props.messages}
            keyExtractor={function (item, index) {
              return index.toString();
            }}
            renderItem={({ item }) =>
              <TouchableOpacity
                onLongPress={() => {
                  if(item.sender == 0 && item.isDelete == 0) {
                    onConfirmDelete(item.id);
                  }
                }}
              >
                  {console.log(item)}
                  <Message 
                    side={item.sender == 0 ? 'right' : 'left'}
                    message={item.message} 
                    status={item.status}
                    theTime={item.created_at}
                    isDeleted={item.isDelete}
                  />
              </TouchableOpacity>

            }
          />

        </View>

        <View style={styles.inputContainer}>
            <TextInput 
                style={styles.input} 
                value={txt}
                onChangeText={text => onChange(text)}
                placeholder="Write your message"
            />

            <TouchableOpacity onPress={() => sending()} >
              <Image 
                resizeMode='contain'
                style={styles.sendButton}
                source={image.icon.send}
              />
            </TouchableOpacity>
        </View>
      </View>
  );
};

export default Chat;
