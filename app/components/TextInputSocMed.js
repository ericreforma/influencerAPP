import React, { Component } from 'react';
import { TextInput, View, Text } from 'react-native';
import style from '../styles/component.Input.style';
import themeStyle from '../styles/theme.style';

export default class InputSocMed extends Component {
    render() {
        return (
            <View style={style.socMedInputView}>
                <Text style={[style.textInput, style.inputTextSocMedLabel]}>{this.props.socialMedia}/</Text>

                <View style={{flex: 1}}>
                    <TextInput
                        style={[
                            style.bgTransparent,
                            style.inputTextSocMedStyle,
                            style.textInput
                        ]}
                        onChangeText={(text) => console.log(text)}
                        placeholder={this.props.placeholder}
                        placeholderTextColor={themeStyle.COLOR_BLUE_LIGHT}
                    />
                </View>
            </View>
        );
    }
}
