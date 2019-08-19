import React, { Component } from 'react';
import {
	ImageBackground,
	View,
	ScrollView,
	Animated,
	Dimensions
} from 'react-native';

import {
    WelcomeLabel,
	WelcomeCommon,
} from '../components/Text';
import {
	WelcomeTextInput,
	WelcomeSMATextInput,
	WelcomeAddSMAButton
} from '../components/TextInput';
import ButtonGradient from '../components/ButtonGradient';
import BackButton from '../components/BackButton';

import theme from '../styles/theme.style';
import lang from '../assets/language/welcome';

export default class SignUpPage extends Component {
	state = {
		fullName: '',
		email: '',
		password: '',
		confirmPassword: '',

		proceedToNext: false,
		addProfileLinkContainerHeight: new Animated.Value(0),
		addProfileLinkContainerRight: new Animated.Value(Dimensions.get('window').width - 40),
		addProfileLink: [],

		animationDuration: 500
	}

	getStartedButtonOnPress = () => {
		if(this.state.proceedToNext) {
			this.props.navigation.replace('Welcome');
		} else {
			if(this.state.password == '' || this.state.confirmPassword == '') {
				alert('Fill up the input fields');
			} else if(this.state.password == this.state.confirmPassword) {
				this.setState({proceedToNext: true});
		
				Animated.timing(this.state.addProfileLinkContainerHeight, {
					toValue: 64,
					duration: this.state.animationDuration
				}).start();
		
				Animated.timing(this.state.addProfileLinkContainerRight, {
					toValue: 0,
					duration: this.state.animationDuration
				}).start();
			} else {
				alert('Password unmatched!');
			}
		}
	}

	addSMAButtonContentChangeSize = () => {
		Animated.timing(this.state.addProfileLinkContainerHeight, {
			toValue: 234,
			duration: this.state.animationDuration
		}).start();
	}

	addProfileLinkOnPress = (sma, name) => {
		var addProfileLink = this.state.addProfileLink,
			addProfileLinkLength = addProfileLink.length,
			addProfileLinkSMA = addProfileLink.map(ap => ap.sma);

		if(addProfileLinkSMA.indexOf(sma) === -1) {
			addProfileLink.push({
				right: new Animated.Value(Dimensions.get('window').width - 40),
				height: new Animated.Value(0),
				sma: sma,
				label: name,
				value: '',
			});
			
			this.setState({ addProfileLink });
			this.animationProfileLinks(addProfileLinkLength);
		} else {
			alert('Social Media Account already chosen!');
		}

		this.animationProfileLinksHeight();
	}

	animationProfileLinks = (index) => {
		Animated.timing(this.state.addProfileLink[index].height, {
			toValue: 64,
			duration: this.state.animationDuration
		}).start();

		Animated.timing(this.state.addProfileLink[index].right, {
			toValue: 0,
			duration: this.state.animationDuration
		}).start();
	}

	animationProfileLinksHeight = () => {
		Animated.timing(this.state.addProfileLinkContainerHeight, {
			toValue: 64,
			duration: this.state.animationDuration
		}).start();
	}

	render() {
		return (
			<ImageBackground
				source={theme.welcomeStyle.signupImageBackground}
				style={{
					flex: 1,
					paddingHorizontal: theme.welcomeStyle.PADDING_HORIZONTAL
				}}
			>
				<ScrollView
					overScrollMode="never"
					showsVerticalScrollIndicator={false}
                    ref={ref => this._scrollView = ref}
                    onContentSizeChange={(contentWidth, contentHeight) => {
                        this._scrollView.scrollToEnd({animated: true});
                    }}
				>
					<BackButton
						onPress={() => this.props.navigation.pop()}
					/>

					<View
						style={{
							paddingVertical: 30
						}}
					>
						<WelcomeLabel
							text={lang.signupPage.headerText}
						/>

						<WelcomeCommon
							text={lang.signupPage.additionalText}
						/>

						<View
							style={{
								marginVertical: 20
							}}
						>
							<WelcomeTextInput
								type="text"
								placeholder={lang.signupPage.nameText}
								onChangeText={(fullName) => this.setState({ fullName })}
							/>
							
							<WelcomeTextInput
								type="text"
								placeholder={lang.signupPage.emailText}
								onChangeText={(email) => this.setState({ email })}
							/>
							
							<WelcomeTextInput
								type="password"
								placeholder={lang.signupPage.passwordText}
								onChangeText={(password) => this.setState({ password })}
							/>
							
							<WelcomeTextInput
								type="password"
								placeholder={lang.signupPage.confirmPasswordText}
								onChangeText={(confirmPassword) => this.setState({ confirmPassword })}
							/>
							
							{this.state.proceedToNext ? (
								<View>
									{this.state.addProfileLink.map((sma, smaIdx) =>
										<Animated.View
											key={smaIdx}
											style={{
												height: sma.height,
												right: sma.right
											}}
										>
											<WelcomeSMATextInput
												onChangeText={(text) => console.log(text)}
												SMAPlaceholder={sma.label}
												placeholder={lang.signupPage.smaPlaceholder}
											/>
										</Animated.View>
									)}

									<Animated.View
										style={{
											height: this.state.addProfileLinkContainerHeight,
											right: this.state.addProfileLinkContainerRight
										}}
									>
										<WelcomeAddSMAButton
											duration={this.state.animationDuration}
											placeholder={lang.signupPage.addProfileText}
											onPress={this.addProfileLinkOnPress}
											contentChangeSize={this.addSMAButtonContentChangeSize}
										/>
									</Animated.View>
								</View>
							) : null}

							<ButtonGradient
								text={this.state.proceedToNext ? lang.signupPage.getStartedText : lang.signupPage.nextText}
								onPress={this.getStartedButtonOnPress}
							/>
						</View>
					</View>
				</ScrollView>
			</ImageBackground>
		);
	}
}
