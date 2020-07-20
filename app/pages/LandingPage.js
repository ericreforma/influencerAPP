import React, { Component } from 'react';
import { ImageBackground, View, ActivityIndicator, Text } from 'react-native';
import { connect } from 'react-redux';
import Modal from 'react-native-modal';
import { AuthAction } from '../redux/actions/auth.action';
import NavigationService from '../services/navigation';
import { GradientButton, WhiteButton, SMAButton } from '../components/Button';
import { WelcomeLabel, WelcomeCommon, WelcomeAdditional } from '../components/Text';

import theme from '../styles/theme.style';
import lang from '../assets/language/welcome';

class LandingPage extends Component {
	constructor(props) {
		super(props);

		this.state = {
			isModalVisible: false
		};
	}

	signingInModal = () =>	
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
				<Text style={{ fontSize: 25, alignSelf: 'center' }}>
					Signing In
				</Text>
				<ActivityIndicator size="large" color="#0000ff" />
			</View>
		</Modal>
		
	render() {
		return (
			<ImageBackground
				source={theme.welcomeStyle.landingImageBackground}
				style={{
					flex: 1,
					paddingHorizontal: theme.welcomeStyle.PADDING_HORIZONTAL,
					justifyContent: 'flex-end',
				}}
			>
				<View>
					{ this.signingInModal() }
					<WelcomeLabel text={lang.landingPage.headerText} />
					<WelcomeCommon text={lang.landingPage.additionalText} />
				</View>

				<View>
					<View>
						<WhiteButton
							text={lang.landingPage.loginText}
							onPress={() => NavigationService.navigate('Login')}
						/>
						<GradientButton
							text={lang.landingPage.signUpText}
							onPress={() => NavigationService.navigate('Signup')}
						/>
					</View>

					<View style={{ marginBottom: 20 }} >
						<WelcomeAdditional text={lang.landingPage.alternativeLoginText} />

						<View
							style={{
								flexDirection: 'row',
								justifyContent: 'center',
								alignContent: 'space-between',
								marginBottom: 10,
							}}
						>
							<SMAButton
								type="facebook"
								onPress={
									() => {
										this.props.LoginFacebook();
									}
								}
							/>

							<SMAButton
								type="google"
								onPress={() => {
									this.props.LoginGoogle();
								}}
							/>
						</View>
					</View>
				</View>
			</ImageBackground>
		);
	}
}

const mapDispatchToProps = (dispatch) => ({
	LoginFacebook: () =>	dispatch(AuthAction.firebase.facebook()),
	LoginGoogle: () =>	dispatch(AuthAction.firebase.google()),
  });
  
export default connect(null, mapDispatchToProps)(LandingPage);