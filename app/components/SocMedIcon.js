import React, { Component } from 'react';
import { TouchableHighlight, Text, Image } from 'react-native';
import style from '../styles/component.Icon.style';

export default class SocMedIcon extends Component {
    render() {
        var icon = {
            facebook: require('../assets/image/icons/facebook_icon.png'),
            google: require('../assets/image/icons/google_icon.png'),
            instagram: require('../assets/image/icons/instagram_icon.png'),
            youtube: require('../assets/image/icons/youtube_icon.png'),
            twitter: require('../assets/image/icons/twitter_icon.png'),
        };

        return (
            <Image
                style={style.socMedIcon}
                source={icon[this.props.type]}
            />
        );
    }
}
