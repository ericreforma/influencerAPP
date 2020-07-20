import React, { Component } from 'react';
import { ScrollView, View, Text, Image } from 'react-native';
import { BackButton } from '../components/Button';
import style from '../styles/page.Post.style';
import { HttpRequest } from '../services/http';
import { URL } from '../config/url';

export default class PostPage extends Component {
    
    constructor(props) {
        super(props);

        this.state = {
            post: null,
        };
    }

    componentDidMount() {
        HttpRequest.get(URL.POST.DETAILS, { id: this.props.navigation.getParam('id') })
        .then(response => {
            this.setState({ post: response.data });
        })
        .catch(e => {
            console.log('error');
            console.log(e);
            console.log(e.response);
            console.log(e.response.data.errors);
            console.log(e.message);
            console.log(e.request);
        });
    }
        
    render = () => 
        <ScrollView>
            <BackButton darkButton={true} />
            <View style={style.container}>
                <Image 
                    style={style.image}
                    resizeMode="contain"
                    source={{ uri: `${URL.SERVER_STORAGE}/${this.state.post.media.url}` }}
                />
                <Text style={style.title}> {this.state.post.title}</Text>
                <Text style={style.caption}>{this.state.post.caption}</Text>
                <Text style={style.tags}>{this.state.post.tags}</Text>
            </View>
        </ScrollView>
}
