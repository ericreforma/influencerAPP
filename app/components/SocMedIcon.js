import React, { Component } from 'react';
import { TouchableHighlight, Text, Image } from 'react-native';
import style from '../styles/component.Icon.style';

export default class SocMedIcon extends Component {
    socialMedia = (type, notANumber) => {
        var socMedType = [
            {
                type: 'facebook',
                url: require('../assets/image/icons/facebook_icon.png'),
            },
            {
                type: 'instagram',
                url: require('../assets/image/icons/instagram_icon.png'),
            },
            {
                type: 'youtube',
                url: require('../assets/image/icons/youtube_icon.png'),
            },
            {
                type: 'twitter',
                url: require('../assets/image/icons/twitter_icon.png'),
            },
            {
                type: 'google',
                url: require('../assets/image/icons/google_icon.png'),
            },
        ];

        var returnValue = notANumber ? socMedType.filter(smt => smt.type == type)[0].url : socMedType[type].url;
        console.log(returnValue);
        console.log(type);
        return returnValue;
    }

    render() {
        return (
            <Image
                style={style.socMedIcon}
                source={this.socialMedia(this.props.type, isNaN(this.props.type))}
            />
        );
    }
}
