import React, { Component } from 'react';
import {
    View,
    ImageBackground
} from 'react-native';

import ButtonGradient from '../components/ButtonGradient';
import BackButton from '../components/BackButton';
import {
    WelcomeLabel,
    WelcomeCommon,
    WelcomeAdditional,
    WelcomeTextButton
} from '../components/Text';

import theme from '../styles/theme.style';
import lang from '../assets/language/welcome';

export default class WelcomePage extends Component {
    render() {
        return (
			<ImageBackground
                source={theme.welcomeStyle.welcomeImageBackground}
                style={{
                    flex: 1,
                    paddingHorizontal: theme.welcomeStyle.PADDING_HORIZONTAL
                }}
            >
            
                <BackButton
                    onPress={() => this.props.navigation.pop()}
                />

                <View
                    style={{
                        flex: 1
                    }}
                >
                    <View
                        style={{
                            flex: 3,
                            justifyContent: 'flex-end'
                        }}
                    >
                        <WelcomeLabel
                            text={lang.welcomePage.headerText}
                            xlarge={true}
                        />

                        <WelcomeCommon
                            text={lang.welcomePage.additionalText}
                        />
                    </View>

                    <View
                        style={{
                            flex: 1,
                            justifyContent: 'space-between',
                            paddingTop: 20,
                            paddingBottom: 40
                        }}
                    >
                        <ButtonGradient
                            text={lang.welcomePage.buttonText}
                            onPress={() => this.props.navigation.replace('Home')}
                        />

                        <View>
                            <WelcomeAdditional
                                text={lang.welcomePage.newText}
                            />

                            <WelcomeTextButton
                                text={lang.welcomePage.tutorialText}
                                onPress={() => alert('Tutorial Video Clicked')}
                            />
                        </View>
                    </View>
                </View>
            </ImageBackground>
        )
    }
}
