import React, { Component } from 'react';
import {
    Text,
    TouchableOpacity
} from 'react-native';

import theme from '../styles/theme.style';
import styles from '../styles/component.Text.style';

class WelcomeLabel extends Component {
    render() {
        return (
            <Text
                style={[
                    (
                        this.props.xlarge
                        ? styles.welcomeLabelXLarge
                        : styles.welcomeLabelLarge
                    ),
                    styles.welcomeLabel
                ]}
            >
                {this.props.text}
            </Text>
        )
    }
}

class WelcomeCommon extends Component {
    render() {
        return (
            <Text
                style={styles.welcomeCommonText}
            >
                {this.props.text}
            </Text>
        )
    }
}

class WelcomeAdditional extends Component {
    render() {
        return (
            <Text
                style={styles.welcomeAdditionalText}
            >
                {this.props.text}
            </Text>
        )
    }
}

class WelcomeTextButton extends Component {
    render() {
        return (
            <TouchableOpacity
                onPress={this.props.onPress}
            >
                <Text
                    style={styles.welcomeTextButton}
                >
                    {this.props.text}
                </Text>
            </TouchableOpacity>
        )
    }
}

class NavLabelText extends Component {
    render() {
        var fontSize = theme['FONT_SIZE_' + this.props.size.toUpperCase()];

        return (
            <Text
                style={{
                    color: theme.COLOR_WHITE,
                    fontSize: fontSize,
                    fontFamily: 'AvenirLTStd-Black'
                }}
            >
                {this.props.text}
            </Text>
        )
    }
}

class NavCommonText extends Component {
    render() {
        var fontSize = theme['FONT_SIZE_' + this.props.size.toUpperCase()];

        return (
            <Text
                style={{
                    color: theme.COLOR_WHITE,
                    fontSize: fontSize,
                    fontFamily: 'AvenirLTStd-Medium',
                    textAlign: this.props.textAlign == 'right' ? this.props.textAlign : 'left',
                }}
            >
                {this.props.text}
            </Text>
        )
    }
}

class LabelText extends Component {
    render() {
        var fontSize = theme['FONT_SIZE_' + this.props.size.toUpperCase()],
            color = this.props.dark ? theme.COLOR_GRAY_HEAVY : ( 
                this.props.blue ? theme.COLOR_BLUE : (
                    this.props.white ? theme.COLOR_WHITE : theme.COLOR_GRAY_MEDIUM
                )
            );

        return (
            <Text
                style={{
                    fontSize: fontSize,
                    color: color,
                    fontFamily: 'AvenirLTStd-Black'
                }}
            >
                {this.props.text}
            </Text>
        )
    }
}

class CommonText extends Component {
    render() {
        var fontSize = theme['FONT_SIZE_' + this.props.size.toUpperCase()],
            color = this.props.dark ? theme.COLOR_GRAY_HEAVY : ( 
                this.props.blue ? theme.COLOR_BLUE : (
                    this.props.white ? theme.COLOR_WHITE : (
                        this.props.red ? theme.COLOR_RED : (
                            this.props.yellow ? theme.COLOR_YELLOW_HEAVY : theme.COLOR_GRAY_MEDIUM
                        )
                    )
                )
            );

        return (
            <Text
                style={{
                    fontSize: fontSize,
                    lineHeight: fontSize + 5,
                    color: color,
                    textAlign: this.props.textAlignCenter ? 'center' : 'left',
                    fontFamily: this.props.fontWeightBold ? 'AvenirLTStd-Heavy' : 'AvenirLTStd-Medium'
                }}
            >
                {this.props.text}
            </Text>
        )
    }
}

class OtherTextButton extends Component {
    render() {
        var fontSize = theme['FONT_SIZE_' + this.props.size.toUpperCase()];

        return (
            <TouchableOpacity
                onPress={this.props.onPress}
            >
                <Text
                    style={{
                        fontSize: fontSize,
                        color: theme.COLOR_YELLOW_HEAVY,
                        fontFamily: 'AvenirLTStd-Medium'
                    }}
                >
                    {this.props.text}
                </Text>
            </TouchableOpacity>
        )
    }
}

export {
    WelcomeLabel,
    WelcomeCommon,
    WelcomeAdditional,
    WelcomeTextButton,
    LabelText,
    CommonText,
    NavLabelText,
    NavCommonText,
    OtherTextButton
};