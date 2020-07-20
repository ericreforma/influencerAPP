import React, { Component } from 'react';
import { View, Image, Text } from 'react-native';
import Chat from '../components/Chat';
import socket from '../services/socket';
import { HttpRequest } from '../services/http';
import style from '../styles/chat.Room.style';
import { URL } from '../config/url';

export default class ChatPage extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            chatSession: this.props.navigation.getParam('chatSession'),
            messages: [],
            campaign: this.props.navigation.getParam('campaign')
        };

        this.getMessages();
        
    }

    chatHead = () =>
        <View style={style.headerContainer}>
            <Image 
                style={style.headerImage}
                source={this.state.campaign.media === null ?
                    image.male_avatar : 
                    { uri: `${URL.SERVER_STORAGE}/${this.state.campaign.media[0].url}` }}
            />
            <View style={style.headerTextContainer}>
                <Text style={style.headerMainText}>{ this.state.campaign.name }</Text>
                <Text style={style.headerSubText}>
                    { this.state.chatSession.campaign_type === 1 ? 'Social Media' : 'Event' }
                </Text>
            </View>
        </View>

    getMessages = () => {
        HttpRequest.get(URL.CHAT.HISTORY, { session_id: this.state.chatSession.id })
        .then(response => {
            const messages = response.data;
            messages.sort(this.compare);
            this.setState({ messages });

            socket.chat(this.state.chatSession.id, e => {
                if (e.chat.sender === 1) {
                    messages.push(e.chat);
                    messages.sort(this.compare);
                    this.setState({ messages });
                }
            });
        })
        .catch(e => {
            console.log(e);
            console.log(e.response.data);
            console.log(e.response.status);
            console.log(e.response.headers);
        });
    }

    sendingMessage = (text) => {
        const messages = this.state.messages;
        const max = Math.max.apply(Math, messages.map(function(o) { return o.id; }));
        const sending_id = messages.length !== 0 ? parseInt(max) + 1 : 0;
        
        const message = {
            id: sending_id,
            sending_id,
            session_id: this.state.chatSession.id,
            user_id: this.state.chatSession.user_id,
            client_id: this.state.chatSession.client_id,
            campaign_type: this.state.chatSession.campaign_type,
            campaign_id: this.state.chatSession.campaign_id,
            isDelete: 0,
            type: 0,
            message: text,
            sender: 0,
            status: 'sending'
        };

        messages.push(message);
        messages.sort(this.compare);
        this.setState({ messages });

        HttpRequest.post(URL.CHAT.SEND, message).then(response => {
            this.sent(response.data.id, response.data.sending_id);
        }).catch(e => {
            console.log(e);
            console.log(e.response.data);
            console.log(e.response.status);
            console.log(e.response.headers);
        });
    }

    sent = (id, sending_id) => {
        const messages = this.state.messages;
        const msg = messages.find(x => x.sending_id === sending_id);
        const index = messages.findIndex(x => x.sending_id === sending_id);
        msg.status = 'sent';
        msg.id = id;
        messages[index] = msg;
        messages.sort(this.compare);
        this.setState({ messages });
    }

    deleteMessage = chat_id => {
        HttpRequest.get(URL.CHAT.DELETE, { chat_id }).then(response => {
            console.log(response.data);
            this.getMessages();
        }).catch(e => {
            console.log(e);
            console.log(e.response.data);
            console.log(e.response.status);
            console.log(e.response.headers);
        });
    }
    compare = (a, b) => {
        if (a.id < b.id) {
            return 1;
        }
        if (a.id > b.id) {
            return -1;
        }

        return 0;
    }

    render = () => 
        <>
            { this.chatHead() }
            <Chat 
                chatSession={this.state.chatSession}
                messages={this.state.messages}
                sendingMessage={this.sendingMessage}
                deleteMessage={this.deleteMessage}
            />
        </>
        
}
