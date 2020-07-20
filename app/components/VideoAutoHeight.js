import React, { Component } from 'react';
import { View, Dimensions } from 'react-native';
import VideoPlayer from 'react-native-video-controls';
import { URL } from '../config/url';

export default class VideoAutoHeight extends Component {
    constructor(props) {
        super(props);
        this.state = {
            width: Math.round(Dimensions.get('window').width), 
            heightScaled: 0
        };
    }

    componentDidMount() {
        console.log(this.props.media)
    }
    render = () =>
    <View
        style={{ 
            width: '100%',
            height: this.state.heightScaled 
        }}
    >

        <VideoPlayer
            source={{ uri: `${URL.SERVER_STORAGE}/${this.props.media.url}` }}
            navigator={this.props.navigator}
            controlTimeout={3000}
            showOnStart={false}
            videoStyle={{ 
                width: '100%',
                height: this.state.heightScaled 
            }}
            resizeMode='contain'
            disableBack
            style={{ 
                width: '100%',
                height: this.state.heightScaled 
            }}
            onLoad={response => {
                const { width, height } = response.naturalSize;
                const heightScaled = height * (this.state.width / width);
            
                this.setState({ heightScaled });
            }}
        />
    </View>
    
}
