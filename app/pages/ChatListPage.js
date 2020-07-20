import React, { Component } from 'react';
import { View, Text, Image, ActivityIndicator, TouchableOpacity, FlatList } from 'react-native';
import { HttpRequest } from '../services/http';
import { URL } from '../config/url';
import image from '../assets';
import style from '../styles/page.chatList.style';
import { CampaignController } from '../controllers';
import NavigationService from '../services/navigation';

const openChat = (session) => {
    CampaignController.chatSession(
        session.campaign_type,
        session.campaign_id,
        session.client_id,
    ).then(response => {
        NavigationService.navigate('Chat', { chatSession: response.data, campaign: session.campaign });
    }).catch(e => {
        console.log(e);
        console.log(e.response.data);
        console.log(e.response.status);
        console.log(e.response.headers);
    });
};

const ChatListItem = ({ listItem }) =>
    <TouchableOpacity onPress={e => openChat(listItem)}>
        <View style={style.container}>
            <Image 
                style={style.image}
                source={listItem.campaign.media === null ?
                    image.male_avatar : 
                    { uri: `${URL.SERVER_STORAGE}/${listItem.campaign.media[0].url}` }}
            />
            <View style={style.textContainer}>
                <Text style={style.mainText}>{ listItem.campaign.name }</Text>
                <Text style={style.subText}>
                    { listItem.campaign_type === 1 ? 'Social Media' : 'Event' }
                </Text>
            </View>
        </View>
    </TouchableOpacity>

export default class ChatListPage extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            list: [],
            isRefreshing: false
        };

        this.getSessions();
    }

    onRefresh() {
        this.setState({ isRefreshing: true }, () => { this.getSessions(); });
    }

    getSessions = () => {
        
        HttpRequest.get(URL.CHAT.SESSION.LIST)
        .then(response => {
            this.setState({ 
                list: response.data,
                isRefreshing: false
            });
        })
        .catch(e => {
            console.log(e);
            console.log(e.response.data);
            console.log(e.response.status);
            console.log(e.response.headers);
        });
       
    }

    
    render = () => 
        <View>
            { this.state.list.length == 0 ?
                <View style={style.emptyChatContainer} >
                    <Text>Clients will initiate the conversation.</Text>
                    <TouchableOpacity 
                        onPress={() => {
                            if(!this.state.isRefreshing) {
                                this.onRefresh();
                            }
                        }}
                    >
                        { !this.state.isRefreshing ? 
                        <Text style={style.refreshButton}>Refresh</Text>
                        :
                        <ActivityIndicator size='small' color='blue' />
                        }

                    </TouchableOpacity>
                </View> :
                <FlatList 
                    data={this.state.list}
                    renderItem={({ item }) => <ChatListItem listItem={item} />}
                    keyExtractor={item => item.id.toString()}
                    onRefresh={() => this.onRefresh()}
                    refreshing={this.state.isRefreshing}
                />
            }
            
        </View>

}
