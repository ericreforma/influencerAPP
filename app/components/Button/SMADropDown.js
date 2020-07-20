import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    Animated,
    TouchableOpacity,
} from 'react-native';
import theme from '../../styles/theme.style';
import { SOCIALMEDIA } from '../../config/variables';

export default class SMAButton extends Component {
    state = {
        smaDisplay: false,
        iconOpacity: new Animated.Value(0),
        iconHeight: new Animated.Value(0),
        marginBottom: new Animated.Value(0)
    }

    addProfileLink = () => {
        this.setState({ smaDisplay: true });

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
                    backgroundColor: `${theme.COLOR_WHITE}70`,
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
                    Object.values(SOCIALMEDIA).map((sma, index) =>
                        <Animated.View
                            key={index}
                            style={{
                                height: this.state.iconHeight,
                                opacity: this.state.iconOpacity,
                                justifyContent: 'center',
                                marginBottom: index === 3 ? this.state.marginBottom : 0
                            }}
                        >
                            <TouchableOpacity
                                style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                }}
                                onPress={this.smaIconsOnPress(index, sma.prettyname)}
                            >
                                <Image
                                    style={{
                                        width: 20,
                                        height: 20,
                                        marginRight: 15
                                    }}
                                    resizeMode="cover"
                                    source={sma.icon}
                                />

                                <Text
                                    style={{
                                        fontSize: theme.welcomeStyle.FONT_SIZE_DEFAULT,
                                        color: theme.COLOR_WHITE,
                                        fontFamily: 'AvenirLTStd-Medium',
                                    }}
                                >
                                    {sma.prettyname}
                                </Text>
                            </TouchableOpacity>
                        </Animated.View>
                    )
                : null}
            </View>
        )
    }
}
