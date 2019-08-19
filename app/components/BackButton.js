import React, { Component } from 'react';
import {
    View,
    TouchableOpacity,
    Image
} from 'react-native';

import theme from '../styles/theme.style';

export default class BackButton extends Component {
    render() {
        return (
            <View
                style={{
                    paddingVertical: 25
                }}
            >
                <TouchableOpacity
                    onPress={this.props.onPress}
                >
                    <Image
                        style={{
                            width: 18,
                            height: 18
                        }}
                        resizeMode="contain"
                        source={this.props.darkButton ? theme.backIconDark : theme.backIcon}
                    />
                </TouchableOpacity>
            </View>
        )
    }
}
