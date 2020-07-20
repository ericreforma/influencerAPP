import React, { useEffect, useReducer, useContext, useState, useCallback } from 'react';
import { FlatList, View, TextInput, TouchableOpacity, Image } from 'react-native';

import firebase from 'react-native-firebase';
import Message from './Message';
import styles from '../../styles/chat.Room.style';

import { messagesReducer } from './reducers';
import image from '../../assets';

const Chat = props => {
  const chatSession = props.chatSession;
  const [messages, dispatchMessages] = useReducer(messagesReducer, []);
  const [txt, setTxt] = useState('');
  const messageRef = firebase.firestore().collection('messages');

  useEffect(() => 
    firebase.firestore().collection('messages')
    .where('session_id', '==', chatSession.id)
    .orderBy('created_at', 'asc')
    .onSnapshot(snapshot => {
      dispatchMessages({ type: 'add', payload: snapshot.docs });
    }),
    [false]
  );

  const handlePress = useCallback(
    () => {
      messageRef.add({
        session_id: chatSession.id,
        message: txt,
        uid: chatSession.user_uid,
        created_at: new Date()
      }).then(() => {
        setTxt('');
      });
    },
    [txt]
  );
  
  return ( 
      <View>
        <View style={styles.messagesContainer}>
          <FlatList
            inverted
            data={messages}
            keyExtractor={function (item) {
              return item.id;
            }}
            renderItem={function ({ item }) {
              const data = item.data();
              return (
                <Message 
                  side={data.uid === chatSession.user_uid ? 'right' : 'left'}
                  message={data.message} 
                />);
            }}
          />
        </View>

        <View style={styles.inputContainer}>
            <TextInput 
                style={styles.input} 
                value={txt}
                onChangeText={text => setTxt(text)}
                placeholder="Write your message"
            />

            <TouchableOpacity onPress={handlePress}>
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
