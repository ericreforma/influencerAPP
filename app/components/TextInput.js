import React, { Component } from 'react';
import { TextInput } from 'react-native';
import style from '../styles/component.Input.style';
import themeStyle from '../styles/theme.style';

export default class Input extends Component {
    render() {
        var styleInput = [
            style.inputTextStyle,
            (
                this.props.bgColor == 'transparent'
                ? style.bgTransparent
                : style.bgWhite
            ),
            (
                this.props.bgColor == 'transparent'
                ? style.bgTransparentPadding
                : style.bgWhitePadding
            ),
            (
                this.props.type == 'text'
                ? style.textInput
                : style.textArea
            )
        ];

        var placeholderColor = this.props.bgColor == 'transparent'
                                ? themeStyle.COLOR_BLUE_LIGHT
                                : themeStyle.COLOR_GRAY_MEDIUM;

        var multiline = this.props.type == 'textarea' ? true : false;

        return (
            <TextInput
                style={styleInput}
                multiline={multiline}
                numberOfLines={4}
                onChangeText={(text) => this.props.changeText(text)}
                placeholder={this.props.placeholder}
                placeholderTextColor={placeholderColor}
            />
        );
    }
}
