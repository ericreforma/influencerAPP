import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, ImageBackground, Text, TouchableOpacity, Alert, Modal, ActivityIndicator } from 'react-native';
import NavigationService from '../services/navigation';
import { GradientButton } from '../components/Button';
import { AuthTextInput } from '../components/TextInput';
import style from '../styles/page.verificationCode.style';
import theme from '../styles/theme.style';
import { HttpRequest } from '../services/http';
import { URL } from '../config/url';

class VerificationCodePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            code: '',
            modalVisible: false,
            loadingText: ''
        };
    }
    
    submittingModal = () => 
        <Modal
            transparent
            visible={this.state.modalVisible}
        >
            <View 
                style={{ 
                    flex: 1,
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignContent: 'center',
                    alignItems: 'center'
                }}
            >
                <View 
                    style={{ 
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        backgroundColor: '#fff',
                        paddingVertical: 25,
                        paddingHorizontal: 55,
                        width: 300,
                        height: 100
                    }}
                >
                    <Text style={{ fontSize: 25, alignSelf: 'center' }}>
                        { this.state.loadingText }
                    </Text>
                    <ActivityIndicator size="large" color="#0000ff" />
                </View>
            </View>

        </Modal>
    

    verifyCode = () => {
        this.setState({ loadingText: 'Verifying', modalVisible: true });
        HttpRequest.post(URL.USER.VERIFYCODE, { code: this.state.code })
        .then(response => {
            if(response.data.status === 'verified') {
                NavigationService.navigate('Loading');
            } else {
                Alert.alert('Error', 'Invalid code');
            }
            this.setState({ modalVisible: false });
        })
        .catch( e => {
            console.log('Error saving Token');
            console.log(e);
            console.log(e.response.data);
            console.log(e.response.status);
            console.log(e.response.headers);
            this.setState({ modalVisible: false })
        });
    }

    resendCode = () => {
        this.setState({ loadingText: 'Resending Code', modalVisible: true });
        HttpRequest.get(URL.USER.VERIFYCODERESEND)
        .then(response => {
            Alert.alert('Success', 'Code resent, please check your email inbox or on your spam/junk folder');
            this.setState({ modalVisible: false })
        })
        .catch( e => {
            console.log('Error saving Token');
            console.log(e);
            console.log(e.response.data);
            console.log(e.response.status);
            console.log(e.response.headers);
            this.setState({ modalVisible: false })
        });

    }
    render() {
        return (
        <ImageBackground
            source={theme.welcomeStyle.welcomeImageBackground}
            style={{
                flex: 1,
                paddingHorizontal: theme.welcomeStyle.PADDING_HORIZONTAL,
                flexDirection: 'column', 
                justifyContent: 'flex-end'
            }}
        >   
            {this.submittingModal()}
            <View style={{ height: 350 }}>
                <View>
                    <Text style={style.title} >
                        Verify Your Email 
                    </Text>
                    <Text style={style.paragraph} >
                        Enter the code we've sent on your email {this.props.navigation.getParam('email') }
                    </Text>
                    <AuthTextInput
                        type="text"
                        style={style.verificationInput}
                        onChangeText={(code) => this.setState({ code })}
                    />
                    <GradientButton
                        text={'Submit'}
                        onPress={() => this.verifyCode()}
                    />
                </View>
                <View>
                    <Text 
                        style={{ 
                            alignSelf: 'center',
                            textAlign: 'center',
                            color: '#fff',
                            marginTop: 20,
                            marginBottom: 10
                        }}
                    >
                        Didn't received any code?
                        Check your spam/junk folder or</Text>    
                </View>
                <View
                    style={{
                        flex: 1,
                        paddingBottom: 40
                    }}
                >
                    <TouchableOpacity 
                        onPress={() => this.resendCode()}
                    >
                        <Text style={style.resendCode} >
                            Resend Code
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ImageBackground>
        );
    }
}

const mapStateToProps = state => ({
    isLoggingIn: state.auth.isLoggingIn,
});

export default connect(mapStateToProps)(VerificationCodePage);