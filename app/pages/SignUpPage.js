import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
	ImageBackground,
	View,
	ScrollView,
	Animated,
	Dimensions,
	Alert,
	ActivityIndicator,
	TouchableOpacity,
	Text
} from 'react-native';
import Modal from 'react-native-modal';

import {
  	WelcomeLabel,
	WelcomeCommon,
} from '../components/Text';
import {
	AuthTextInput,
	SMATextInput,
} from '../components/TextInput';

import { GradientButton, BackButton, SMADropDown } from '../components/Button';

import theme from '../styles/theme.style';
import lang from '../assets/language/welcome';
import { AuthController } from '../controllers/';
import { AuthAction } from '../redux/actions/auth.action';
import { TokenSchema } from '../database';
import NavigationService from '../services/navigation';

class SignUpPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			name: '',
			email: '',
			password: '',
			confirmPassword: '',

			proceedToNext: false,
			addProfileLinkContainerHeight: new Animated.Value(0),
			addProfileLinkContainerRight: new Animated.Value(Dimensions.get('window').width - 40),
			addProfileLink: [],

			animationDuration: 500,
			isModalVisible: false
		};
	}

	validateEmail = () => {
		let re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return re.test(this.state.email);
	}

	validateNoSpecialChar = text => {
		return /^[a-zA-Z\b ]+$/.test(text);
	}

	signingIn = () =>	
		<Modal isVisible={this.state.isModalVisible} >
			<View 
				style={{ 
					backgroundColor: '#fff',
					flexDirection: 'row',
					justifyContent: 'space-between',
					paddingVertical: 25,
					paddingHorizontal: 55,
					alignContent: 'center'
				}}
			>
				
				<Text
					style={{ fontSize: 25, alignSelf: 'center' }}
				>Signing Up</Text>
				<ActivityIndicator size="large" color="#0000ff" />
			</View>
		</Modal>
		

	getStartedButtonOnPress = () => {
		this.setState({ isModalVisible: false });

		if (this.state.name === ''){
			Alert.alert('Error', `Full name field can't be blank`);
		} else if (!this.validateNoSpecialChar(this.state.name)) {
			Alert.alert('Error', 'Your name should not contain any special characters ');
		} else if (this.state.email === '' || this.state.email === null) {
			Alert.alert('Error', `E-mail address field can't be blank`);
		} else if (this.state.password === '') {
			Alert.alert('Error', `Password field can't be blank`);
		} else if (this.state.password.length < 8) {
			Alert.alert('Error', `Your password should be at least 8 characters long`);
		} else if (this.state.confirmPassword == '') {
			Alert.alert('Error', 'The passwords you entered do not match');
		} else if (this.state.password !== this.state.confirmPassword) {
			Alert.alert('Error', 'The passwords you entered do not match');
		} else if (!this.validateEmail(this.state.email)) {
			Alert.alert('Error', `Invalid E-mail address`);
		} else {
			const userData = {
				displayName: this.state.name,
				username: this.state.name,
				description: '',
				contact_numner: '',
				location: '',
				gender: '0',
				media_id: 0,
				birthdate: '1900-01-01',
				email: this.state.email,
				password: this.state.password,
				sma: this.state.addProfileLink
			};
			this.props.signup(userData);
		}
	}

	addSMAButtonContentChangeSize = () => {
		Animated.timing(this.state.addProfileLinkContainerHeight, {
			toValue: 265,
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
			Alert.alert('Alert', 'Social Media Account already chosen!');
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

	onSMAChangeText = (value, index) => {
		const addProfileLink = this.state.addProfileLink;
		addProfileLink[index].value = value;

		this.setState({ addProfileLink });
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
					<BackButton onPress={() => this.props.navigation.pop()} />

					<View style={{ paddingVertical: 30 }} >

						<WelcomeLabel text={lang.signupPage.headerText} />
						<WelcomeCommon text={lang.signupPage.additionalText} />

						<View style={{ marginVertical: 20 }}>
							<AuthTextInput
								type="text"
								placeholder={lang.signupPage.nameText}
								onChangeText={(name) => this.setState({ name })}
							/>

							<AuthTextInput
								type="text"
								placeholder={lang.signupPage.emailText}
								onChangeText={(email) => this.setState({ email })}
							/>

							<AuthTextInput
								type="password"
								placeholder={lang.signupPage.passwordText}
								onChangeText={(password) => this.setState({ password })}
							/>

							<AuthTextInput
								type="password"
								placeholder={lang.signupPage.confirmPasswordText}
								onChangeText={(confirmPassword) => this.setState({ confirmPassword })}
							/>

							{this.state.proceedToNext && 
								<View>
									{this.state.addProfileLink.map((sma, smaIdx) =>
										<Animated.View
											key={smaIdx}
											style={{
												height: sma.height,
												right: sma.right
											}}
										>
											<SMATextInput
												onChangeText={(text) => {
													this.onSMAChangeText(text, smaIdx);
												}}
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
										<SMADropDown
											duration={this.state.animationDuration}
											placeholder={lang.signupPage.addProfileText}
											onPress={this.addProfileLinkOnPress}
											contentChangeSize={this.addSMAButtonContentChangeSize}
										/>
									</Animated.View>
								</View>
							}

							<GradientButton
								text={lang.signupPage.getStartedText}
								onPress={this.getStartedButtonOnPress}
							/>
						</View>
						<TouchableOpacity
							onPress={() => { NavigationService.navigate('Login'); }}
						>
							<Text 
								style={{ color: '#fff',
									alignSelf: 'center',
									fontSize: 15,
								}}
							>
								Already a member? <Text style={{ fontWeight: 'bold' }}>Log In</Text></Text>
						</TouchableOpacity>
					</View>

				
				</ScrollView>
			</ImageBackground>
		);
	}
}

const mapDispatchtoProps = (dispatch) => ({
	signup: (userData) => dispatch(AuthAction.firebase.signup(userData))
});

export default connect(null, mapDispatchtoProps)(SignUpPage);
