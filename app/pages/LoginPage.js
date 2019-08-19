import React, { Component } from 'react';
import {
	View,
	Image,
	TextInput,
	ImageBackground,
	TouchableOpacity
} from 'react-native';

import {
    WelcomeLabel,
	WelcomeCommon,
	WelcomeTextButton
} from '../components/Text';
import { WelcomeTextInput } from '../components/TextInput';
import ButtonGradient from '../components/ButtonGradient';
import BackButton from '../components/BackButton';

import styles from '../styles/page.Login.style';
import theme from '../styles/theme.style';
import lang from '../assets/language/welcome';

export default class LogInPage extends Component {
	render() {
		return (
			<ImageBackground
				source={theme.welcomeStyle.loginImageBackground}
				style={styles.imageBackgroundStyle}
			>
				<BackButton
					onPress={() => this.props.navigation.pop()}
				/>

				<View
					style={styles.containerFlex}
				>
					<View
						style={[styles.containerFlex, styles.containerPageInfo]}
					>
						<WelcomeLabel
							text={lang.loginPage.headerText}
						/>

						<WelcomeCommon
							text={lang.loginPage.additionalText}
						/>
					</View>

					<View
						style={[styles.containerFlex, styles.containerInputs]}
					>
						<View>
							<WelcomeTextInput
								type="text"
								placeholder={lang.loginPage.emailText}
								onChangeText={(text) => console.log(text)}
							/>
							
							<WelcomeTextInput
								type="password"
								placeholder={lang.loginPage.passwordText}
								onChangeText={(text) => console.log(text)}
							/>

							<ButtonGradient
								text={lang.loginPage.loginText}
								onPress={() => alert('Log In')}
							/>
						</View>
						
						<View
							style={styles.containerCenter}
						>
							<WelcomeTextButton
								text={lang.loginPage.forgotPasswordText}
							/>
						</View>
					</View>
				</View>
			</ImageBackground>
		);
	}
}