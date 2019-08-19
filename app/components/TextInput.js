import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    Animated,
    TouchableOpacity,
    TextInput
} from 'react-native';

import theme from '../styles/theme.style';

class WelcomeTextInput extends Component {
    render() {
        return (
            <View
                style={{
                    backgroundColor: theme.COLOR_WHITE + '70',
                    borderRadius: theme.INPUT_BORDER_RADIUS,
                    paddingHorizontal: theme.INPUT_HORIZONTAL_PADDING,
                    justifyContent: 'center',
                    height: 50,
                    marginVertical: 7
                }}
            >
                <TextInput
                    style={{
                        fontSize: theme.welcomeStyle.FONT_SIZE_DEFAULT,
                        color: theme.COLOR_BLUE_LIGHT,
                        fontFamily: 'AvenirLTStd-Medium',
                    }}
                    placeholderTextColor={theme.COLOR_BLUE_LIGHT}
                    placeholder={this.props.placeholder}
                    onChangeText={this.props.onChangeText}
                    secureTextEntry={this.props.type == 'password' ? true : false}
                />
            </View>
        );
    }
}

class WelcomeAddSMAButton extends Component {
    state = {
        smaIcons: [
            {
                icon: require('../assets/image/icons/facebook_icon.png'),
                label: 'Facebook',
                name: 'FB',
            },{
                icon: require('../assets/image/icons/instagram_icon.png'),
                label: 'Instagram',
                name: 'IG',
            },{
                icon: require('../assets/image/icons/youtube_icon.png'),
                label: 'Youtube',
                name: 'Youtube',
            },{
                icon: require('../assets/image/icons/twitter_icon.png'),
                label: 'Twitter',
                name: 'Twitter'
            }
        ],

        smaDisplay: false,
        iconOpacity: new Animated.Value(0),
        iconHeight: new Animated.Value(0),
        marginBottom: new Animated.Value(0)
    }

    addProfileLink = () => {
        this.setState({smaDisplay: true});

        Animated.timing(this.state.iconHeight, {
            toValue: 40,
            duration: this.props.animationDuration
        }).start();

        Animated.timing(this.state.marginBottom, {
            toValue: 10,
            duration: this.props.animationDuration
        }).start();

        Animated.timing(this.state.iconOpacity, {
            toValue: 1,
            duration: this.props.animationDuration
        }).start();

        this.props.contentChangeSize();
    }

    smaIconsOnPress = (index, name) => () => {
        Animated.timing(this.state.iconHeight, {
            toValue: 0,
            duration: this.props.animationDuration
        }).start(() => {
            this.setState({smaDisplay: false});
        });

        Animated.timing(this.state.marginBottom, {
            toValue: 0,
            duration: this.props.animationDuration
        }).start();

        Animated.timing(this.state.iconOpacity, {
            toValue: 0,
            duration: this.props.animationDuration
        }).start();

        this.props.onPress(index, name);
    }

    render() {
        return (
            <View
                style={{
                    backgroundColor: theme.COLOR_WHITE + '70',
                    borderRadius: theme.INPUT_BORDER_RADIUS,
                    paddingLeft: 30,
                    paddingRight: 20,
                    marginVertical: 7,
                }}
            >
                <TouchableOpacity
                    disabled={this.state.smaDisplay}
                    onPress={this.addProfileLink}
                    style={{
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        flexDirection: 'row',
                        height: 50,
                    }}
                >
                    <Text
                        style={{
                            fontSize: theme.welcomeStyle.FONT_SIZE_DEFAULT,
                            color: theme.COLOR_BLUE_LIGHT,
                            fontFamily: 'AvenirLTStd-Medium',
                        }}
                    >
                        {this.props.placeholder}
                    </Text>

                    <Image
                        style={{
                            width: 28,
                            height: 28,
                        }}
                        resizeMode="contain"
                        source={theme.welcomeStyle.addProfileLinkImage}
                    />
                </TouchableOpacity>
                
                {this.state.smaDisplay ?
                    this.state.smaIcons.map((icon, index) =>
                        <Animated.View
                            key={index}
                            style={{
                                height: this.state.iconHeight,
                                opacity: this.state.iconOpacity,
                                justifyContent: 'center',
                                marginBottom: index == 3 ? this.state.marginBottom : 0
                            }}
                        >
                            <TouchableOpacity
                                style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                }}
                                onPress={this.smaIconsOnPress(index, icon.name)}
                            >
                                <Image
                                    style={{
                                        width: 20,
                                        height: 20,
                                        marginRight: 15
                                    }}
                                    resizeMode="contain"
                                    source={icon.icon}
                                />
                                
                                <Text
                                    style={{
                                        fontSize: theme.welcomeStyle.FONT_SIZE_DEFAULT,
                                        color: theme.COLOR_WHITE,
                                        fontFamily: 'AvenirLTStd-Medium',
                                    }}
                                >
                                    {icon.label}
                                </Text>
                            </TouchableOpacity>
                        </Animated.View>
                    )
                : null}
            </View>
        )
    }
}

class WelcomeSMATextInput extends Component {
    render() {
        return (
            <View
                style={{
                    backgroundColor: theme.COLOR_WHITE + '70',
                    borderRadius: theme.INPUT_BORDER_RADIUS,
                    paddingLeft: 30,
                    paddingRight: 25,
                    alignItems: 'center',
                    height: 50,
                    marginVertical: 7,
                    flexDirection: 'row',
                }}
            >
                <Text
                    style={{
                        fontSize: theme.welcomeStyle.FONT_SIZE_DEFAULT,
                        color: theme.COLOR_WHITE,
                        fontFamily: 'AvenirLTStd-Black'
                    }}
                >
                    {this.props.SMAPlaceholder}/
                </Text>

                <TextInput
                    style={{
                        fontSize: theme.welcomeStyle.FONT_SIZE_DEFAULT,
                        color: theme.COLOR_BLUE_LIGHT,
                        fontFamily: 'AvenirLTStd-Medium',
                        flex: 1,
                    }}
                    placeholderTextColor={theme.COLOR_BLUE_LIGHT}
                    placeholder={this.props.placeholder}
                    onChangeText={this.props.onChangeText}
                />
            </View>
        )
    }
}

export {
    WelcomeTextInput,
    WelcomeSMATextInput,
    WelcomeAddSMAButton
};