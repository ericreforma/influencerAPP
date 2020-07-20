import React, { Component } from 'react';
import { connect } from 'react-redux';
import { 
	View, ImageBackground, Alert, 
	TouchableOpacity, Text, Modal,
	ActivityIndicator 
} from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import { AuthAction } from '../redux/actions/auth.action';
import { WelcomeLabel, WelcomeCommon, WelcomeTextButton } from '../components/Text';
import { AuthTextInput } from '../components/TextInput';
import { GradientButton, BackButton } from '../components/Button';
import styles from '../styles/page.Login.style';
import theme from '../styles/theme.style';
import lang from '../assets/language/welcome';
import NavigationService from '../services/navigation';

class LoginPage extends Component {
	
	constructor(props) {
		super(props);
		this.state = {
			email: null,
			password: null,
			isConnected: false
		};
	}

	componentDidMount() {
		NetInfo.fetch().then(state => {
			this.setState({ isConnected: state.isInternetReachable });
        });
	}

	login = () => {
		if (this.doValidation()) {
			this.props.login(this.state.email, this.state.password);
		}
	}
	
	signingInModal = () =>	
		<Modal isVisible={this.props.isLoggingIn} >
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
				<Text style={{ fontSize: 25, alignSelf: 'center' }}>
					Signing In
				</Text>
				<ActivityIndicator size="large" color="#0000ff" />
			</View>
		</Modal>
		
	doValidation = () => {
		let isValid = false;

		if (!this.validateEmail()) {
			Alert.alert('Error', 'Entered account does not exist');
		} else if (this.state.password === '' || this.state.password === null) {
			Alert.alert('Error', 'Entered account does not exist');
		} else if (!this.state.isConnected) {
			Alert.alert('No internet!', 'Poor network connection detected. Please check your connectivity.');
		} else {
			isValid = true;
		}
		return isValid;
	}

	validateEmail = () => {
		let re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return re.test(this.state.email);
	}
	
	render() {
		return (
			<ImageBackground
				source={theme.welcomeStyle.loginImageBackground}
				style={styles.imageBackgroundStyle}
			>
				<View style={styles.containerFlex} >
					<BackButton onPress={() => this.props.navigation.pop()} /> 
					<View>
						<View style={styles.containerPageInfo} >
							<WelcomeLabel text={lang.loginPage.headerText} />
							<WelcomeCommon text={lang.loginPage.additionalText}	/>
						</View>

						<View style={styles.inputWrapper}>
							<View style={styles.inputGroup}>
								<AuthTextInput
									type="text"
									placeholder={lang.loginPage.emailText}
									onChangeText={(email) => this.setState({ email })}
								/>
								<AuthTextInput
									type="password"
									placeholder={lang.loginPage.passwordText}
									onChangeText={(password) => this.setState({ password })}
								/>
								<GradientButton
									text={lang.loginPage.loginText}
									onPress={() => this.login()}
									isSaving={this.props.isLoggingIn}
								/>
							</View>
							<View style={[styles.containerCenter, styles.forgotPassword]}>
								<WelcomeTextButton text={lang.loginPage.forgotPasswordText} />
							</View>
							<TouchableOpacity
								onPress={() => { NavigationService.navigate('Signup'); }}
							>
								<Text style={styles.signupInstead}>Don't have an account? <Text style={{ fontWeight: 'bold' }}>Sign Up</Text> now!</Text>
							</TouchableOpacity>
						</View>
					</View>
				</View>
			</ImageBackground>
		);
	}
}
const mapStateToProps = state => ({
    isLoggingIn: state.auth.isLoggingIn,
});

const mapDispatchToProps = (dispatch) => ({
	login: (email, password) => dispatch(AuthAction.firebase.email(email, password))
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
