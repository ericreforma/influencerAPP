import React, { Component } from 'react';
import {
	ImageBackground,
	View
} from 'react-native';

import ButtonWhite from '../components/ButtonWhite';
import ButtonGradient from '../components/ButtonGradient';
import SocMedIcon from '../components/SocMedIcon';
import {
    WelcomeLabel,
    WelcomeCommon,
    WelcomeAdditional
} from '../components/Text';

import theme from '../styles/theme.style';
import lang from '../assets/language/welcome';

export default class LandingPage extends Component {
	socMedClick = (type) => () => {
		alert(type);
	}

	render() {
		return (
			<ImageBackground
				source={theme.welcomeStyle.landingImageBackground}
				style={{
					flex: 1,
					paddingHorizontal: theme.welcomeStyle.PADDING_HORIZONTAL,
				}}
			>
				<View
					style={{
						flex: 1.75,
						justifyContent: 'flex-end',
						marginBottom: 20
					}}
				>
					<WelcomeLabel text={lang.landingPage.headerText} />
					<WelcomeCommon text={lang.landingPage.additionalText} />
				</View>
				
				<View
					style={{
						flex: 1,
					}}
				>
					<View>
						<ButtonWhite
							text={lang.landingPage.loginText}
							onPress={() => this.props.navigation.navigate('Login')}
						/>

						<ButtonGradient
							text={lang.landingPage.signUpText}
							onPress={() => this.props.navigation.navigate('Signup')}
						/>
					</View>

					<View
						style={{
							marginBottom: 20
						}}
					>
						<WelcomeAdditional text={lang.landingPage.alternativeLoginText} />

						<View style={{
							flexDirection: 'row',
							justifyContent: 'center',
							alignContent: 'space-between',
							marginBottom: 10,
						}}>
							<SocMedIcon
								type="facebook"
								onPress={this.socMedClick('facebook')}
							/>

							<SocMedIcon
								type="google"
								onPress={this.socMedClick('facebook')}
							/>
						</View>
					</View>
				</View>
			</ImageBackground>
		);
	}
}
