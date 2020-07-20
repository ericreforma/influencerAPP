import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Image, ActivityIndicator } from 'react-native';
import { LabelText } from '../components/Text';
import { TokenSchema, FCMTokenSchema } from '../database';
import { RawHttpRequest } from '../services/http';
import { URL } from '../config/url';
import lang from '../assets/language/Main';
import theme from '../styles/theme.style';
import NavigationService from '../services/navigation';
import { AuthAction } from '../redux/actions/auth.action';
import { USER } from '../redux/actions/types.action';

class LoadingPage extends Component {
    componentDidMount() {
        
        if (this.props.auth.isLoggedIn) {
            this.loginToServer();
        } else {
            this.props.authenticate(() => {
                this.loginToServer();
            }, () => {
                this.props.navigation.navigate('Landing');
            });
        }
    }

    loginToServer = () => {
        this.props.getProfileRequest();
        
        TokenSchema.update(
          this.props.auth.token,
          this.props.auth.user.uid,
          () => { 
            const fcm = FCMTokenSchema.get();
            const fcmtoken = fcm.token;
            const cred = JSON.stringify(this.props.auth.user);

            RawHttpRequest.post(URL.FIREBASE.LOGIN, { cred, fcmtoken })
            .then(response => {
                const profile = response.data.profile;
                const isExist = response.data.isExist;
                this.props.getProfileSuccess(profile);

                // Login to facebook if linked
                    AuthAction.LoginToLinkedAcounts(profile.social_media);
                
                if (profile.email_verified === 1) {
                    if (!isExist) {
                        this.props.navigation.navigate('Welcome');
                    } else {
                        this.props.navigation.navigate('Home');
                    }
                } else {
                    this.props.navigation.navigate('VerificationCode', { email: profile.email });
                }
            })
            .catch(e => {

              console.log(e);
              console.log(e.response);
              console.log(e.response.data);
              console.log(e.response.status);
              console.log(e.response.headers);
            });
          },
          e => {
            console.log('Error saving Token');
            console.log(e);
            console.log(e.response.data);
            console.log(e.response.status);
            console.log(e.response.headers);
          });
    };
    
    render() {
        return (
            <View
                style={{
                    flex: 1,
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: theme.COLOR_BLACK
                }}
            >
                <Image source={require('../assets/image/app_icon.png')} />

                <View
                    style={{
                        marginTop: 10,
                        marginBottom: 20
                    }}
                >
                    <LabelText
                        size="large"
                        dark={false}
                        white={true}
                        text={lang.appName}
                    />
                </View>
                <ActivityIndicator color={theme.COLOR_WHITE} size="large" />
            </View>
        );
    }
}
const mapStateToProps = state => ({
    auth: state.auth
});

const mapDispatchToProps = (dispatch) => ({
    getProfileRequest: () => dispatch({ type: USER.GET.PROFILE.REQUEST }),
    getProfileSuccess: (profile) => dispatch({ type: USER.GET.PROFILE.SUCCESS, user: profile }),
    authenticate: (success, failed) => dispatch(AuthAction.firebase.authenticate(success, failed)),
});

export default connect(mapStateToProps, mapDispatchToProps)(LoadingPage);
