import { Alert } from 'react-native';
import firebase from 'react-native-firebase';
import { AccessToken, LoginManager } from 'react-native-fbsdk';
import { GoogleSignin } from '@react-native-community/google-signin';
import { RawHttpRequest, HttpRequest } from '../services/http';
import NavigationService from '../services/navigation';
import { TokenSchema } from '../database';
import { URL } from '../config/url';
import { AuthAction } from '../redux/actions/auth.action';

export const  AuthController = {
  firebase: {
    login: {
      email: (email, password, success, failed) =>
        firebase.auth().signInWithEmailAndPassword(email, password)
        .then((result) => {
          
            result.user.getIdToken()
            .then(token => {
              TokenSchema.update(
                result.user.uid,
                token,
                () => {
                  success();
                },
                e => {
                  console.log('Error saving Token');
                  console.log(e);
                  
                  failed();
              });
            })
            .catch(e => {
              console.log(error.code);
              console.log(error.message);
              failed();
            })

        })
        .catch(function(error) {
            console.log(error.code);
            Alert.alert(error.message)
            console.log(error.message);
            failed();
        }),
        
      facebook: async function(callbackSuccess, callbackError) {
        const result = await LoginManager.logInWithPermissions(["public_profile", 'email']);
          console.log(result);
          if (result.isCancelled) {
            console.log("Login cancelled");
            Alert.alert('Unable to sign in on facebook');
            callbackError();
          } else {
            callbackSuccess();
            const data = await AccessToken.getCurrentAccessToken();
            const credential = firebase.auth.FacebookAuthProvider.credential(data.accessToken);
            const firebaseUserCredential = await firebase.auth().signInWithCredential(credential);
            const token = await firebaseUserCredential.user.getIdToken();

            AuthAction.firebase.login(firebaseUserCredential.user.toJSON(), token);
          }
      },
      google: async function(callbackError) {
        try {
          await GoogleSignin.configure({
            scopes: ['profile', 'email'],
            webClientId: '553833031460-dkjfg0cna2qe3pn9o51getm4b8ufr404.apps.googleusercontent.com', 
          });
      
          const data = await GoogleSignin.signIn();

          const credential = firebase.auth.GoogleAuthProvider.credential(data.idToken, data.accessToken)
          const firebaseUserCredential = await firebase.auth().signInWithCredential(credential);
          const token = await firebaseUserCredential.user.getIdToken()

          console.log(token)
          AuthAction.firebase.login(firebaseUserCredential.user.toJSON(), token);
        } catch (e) {
          Alert.alert('Unabale to sign in');
          console.log(e);
          callbackError();
        }
      },
      signup: (user, sma, callback) => 
        firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
        .then(result => {
            console.log('firebase siging up');
            result.user.getIdToken()
            .then(token => {
                console.log('token granted');
                Object.assign(user, { uid: result.user.uid });

                TokenSchema.update(
                  result.user.uid,
                  token,
                  () => {
                    const userData = JSON.stringify(user);
                    HttpRequest.post(URL.FIREBASE.SIGNUP, { userData })
                    .then(response => {
                      console.log(response);
                      callback();
                      NavigationService.navigate('Loading', { gotoWelcomeScreen: true });
                    })
                    .catch(e => {
                      callback();
                      console.log(e);
                      console.log(e.response);
                      console.log(e.response.data);
                      console.log(e.response.status);
                      console.log(e.response.headers);
                    });
                  },
                  e => {
                    callback();
                    console.log('Error saving Token');
                    console.log(e);
                    console.log(e.response.data);
                    console.log(e.response.status);
                    console.log(e.response.headers);
                  });
            })
            .catch(e => {
              callback();
              console.log(error);
              console.log(error.code);
              console.log(error.message);
            });
        })
        .catch(error => {
          callback();
            console.log(error)
        })
      },
    logout: () => {
      TokenSchema.revoke(() => {
        firebase.auth().signOut().then(function() {

          NavigationService.navigate('Loading');

        }, function(e) {
          console.error('Sign Out Error', e);
            console.log(e);
            console.log(e.response.data);
            console.log(e.response.status);
            console.log(e.response.headers);
        });
      },
      (e) => {
        Alert.alert('System Error', `Unable to logout ${e}`);
        console.log(e);
          console.log(e.response.data);
          console.log(e.response.status);
          console.log(e.response.headers);
      })
    },
    verifyPhone: (phoneNumber, success, failed) => {
      firebase.auth().verifyPhoneNumber(phoneNumber).on(
          'state_changed',
          phoneAuthSnapshot => {
            switch (phoneAuthSnapshot.state) {
              case firebase.auth.PhoneAuthState.CODE_SENT:
                
                break;
              case firebase.auth.PhoneAuthState.ERROR: // or 'error'
                console.log('verification error', phoneAuthSnapshot);
                console.log(phoneAuthSnapshot.ERROR);
                failed();
                break;
            }
          },
          error => {
            // optionalErrorCb would be same logic as the ERROR case above,  if you've already handed
            // the ERROR case in the above observer then there's no need to handle it here
            console.log(error);
            // verificationId is attached to error if required
            console.log(error.verificationId);
          },
          phoneAuthSnapshot => {
            success();
            // optionalCompleteCb would be same logic as the AUTO_VERIFIED/CODE_SENT switch cases above
            // depending on the platform. If you've already handled those cases in the observer then
            // there's absolutely no need to handle it here.

            // Platform specific logic:
            // - if this is on IOS then phoneAuthSnapshot.code will always be null
            // - if ANDROID auto verified the sms code then phoneAuthSnapshot.code will contain the verified sms code
            //   and there'd be no need to ask for user input of the code - proceed to credential creating logic
            // - if ANDROID auto verify timed out then phoneAuthSnapshot.code would be null, just like ios, you'd
            //   continue with user input logic.
          },
        );

    },
    signup: (user, sma, callback) => 
      firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
      .then(result => {
          console.log('firebase siging up');
          result.user.getIdToken()
          .then(token => {
              console.log('token granted');
              Object.assign(user, { uid: result.user.uid });

              TokenSchema.update(
                result.user.uid,
                token,
                () => {
                  const userData = JSON.stringify(user);
                  HttpRequest.post(URL.FIREBASE.SIGNUP, { userData })
                  .then(response => {
                    console.log(response);
                    callback();
                    NavigationService.navigate('Loading', { gotoWelcomeScreen: true });
                  })
                  .catch(e => {
                    callback();
                    console.log(e);
                    console.log(e.response);
                    console.log(e.response.data);
                    console.log(e.response.status);
                    console.log(e.response.headers);
                  });
                },
                e => {
                  callback();
                  console.log('Error saving Token');
                  console.log(e);
                  console.log(e.response.data);
                  console.log(e.response.status);
                  console.log(e.response.headers);
                });
          })
          .catch(e => {
            callback();
            console.log(error);
            console.log(error.code);
            console.log(error.message);
          });
      })
      .catch(error => {
        callback();
          console.log(error)
      })
  },
  logout: () => {
    TokenSchema.revoke(() => {
        NavigationService.navigate('Loading');
    },
    (e) => {
      Alert.alert('System Error', `Unable to logout ${e}`);
      console.log(e);
        console.log(e.response.data);
        console.log(e.response.status);
        console.log(e.response.headers);
    })
  },
};
