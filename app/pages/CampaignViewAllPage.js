import React, { Component } from 'react';
import { View, Text, FlatList } from 'react-native';
import { connect } from 'react-redux';
import { Title } from '../components/Header';
import { UserController } from '../controllers';
import { CampaignCard } from '../components/Card';
import { HttpRequest } from '../services/http';
import { URL } from '../config/url';
import theme from '../styles/theme.style';

export default class CampaignViewAllPage extends Component {
    
    constructor(props) {
        super(props);

        this.state = {
            campaigns: [],
            type: this.props.navigation.getParam('type'),
            exchangeRate: 1
        };
    }

    componentDidMount() {
        UserController.exchangeRate(response => {
            this.setState({ exchangeRate: response.data.rate });
        });
        this.getAll();

    }

    getAll = () => {
        HttpRequest.get(URL.CAMPAIGN.VIEWALL, { type: this.state.type })
        .then(response => {
            this.setState({ campaigns: response.data });
            console.log(response.data)
        })
        .catch(e => {
            console.log(e);
            console.log(e.error);
            console.log(e.response);
            console.log(e.response.data);
            console.log(e.response.status);
            console.log(e.response.headers);
        });
    }
    title = () => 
        <Text 
            style={{
                alignSelf: 'center',
                fontSize: 23,
                fontWeight: 'bold',
                paddingVertical: 15,
                color: theme.COLOR_BLUE
            }}
        >
            {`${this.state.type === 0 ? 'Recommended for you' : 
                this.state.type === 1 ? 'Social Media' : 'Events'}`}
        </Text>
    
    render = () => 
        <FlatList
            contentContainerStyle={{
                paddingHorizontal: 15,
                marginTop: 15,
                paddingBottom: 25
            }}
            ListHeaderComponent={this.title}
            overScrollMode="never"
            showsHorizontalScrollIndicator={false}
            horizontal={false}
            data={this.state.campaigns}
            renderItem={({ item }) => <CampaignCard campaign={item} type={this.state.type === 0 ? 1 : this.state.type} exchangeRate={this.state.exchangeRate} />}
            keyExtractor={(item, index) => index.toString()}
        />
    
}

