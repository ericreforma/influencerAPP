import { Alert } from 'react-native';
import { AUTH } from './types.action';
import firebase from 'react-native-firebase';
import { AccessToken, LoginManager, GraphRequest, GraphRequestManager } from 'react-native-fbsdk';
import { GoogleSignin } from '@react-native-community/google-signin';
import { TokenSchema, FCMTokenSchema } from '../../database';
import NavigationService from '../../services/navigation';
import { HttpRequest, RawHttpRequest } from '../../services/http';
import { URL } from '../../config/url';

export const AuthAction = {
  firebase: {
    authenticate: (success, failed) => dispatch => {
      dispatch({ type: AUTH.LOGIN.REQUEST, authSource: 'unknown' });
      let user = null;

      firebase.auth().onAuthStateChanged(theUser => {
          user = theUser;
          console.log('user changed')
      });

      if (user) {
        user.getIdToken().then(token => {
          dispatch({ type: AUTH.LOGIN.SUCCESS, token, uid: user.uid, user });
          success();
        });
      } else {
        dispatch({ type: AUTH.LOGIN.FAILED });
        failed();
      }
      
    },

    email: (email, password) => dispatch => {
      dispatch({ type: AUTH.LOGIN.REQUEST, authSource: 'facebook.com' });
      firebase.auth().signInWithEmailAndPassword(email, password)
        .then((result) => {
            result.user.getIdToken()
            .then(token => {
              dispatch({ type: AUTH.LOGIN.SUCCESS, token, uid: result.user.uid, user: result.user });
              NavigationService.navigate('Loading');
            })
            .catch(e => {
              console.log(e.code);
              console.log(e.message);
              dispatch({ type: AUTH.LOGIN.FAILED });
            });
        })
        .catch(e => {
          console.log(e.response);

          // if (e.code === 'auth/user-not-found' || e.code === 'auth/wrong-password') {
            Alert.alert('Entered account does not exist');
          // }

          console.log(e.code);
          console.log(e.message);
          dispatch({ type: AUTH.LOGIN.FAILED });
        });
    },
        
    facebook: () => dispatch => {
        dispatch({ type: AUTH.LOGIN.REQUEST, authSource: 'facebook.com' });
        LoginManager.logInWithPermissions([
          'public_profile', 
          'email',
          'groups_access_member_info',
          'publish_to_groups',
          'user_age_range',
          'user_birthday',
          'user_friends',
          'user_gender',
          'user_hometown',
          'user_likes',
          'user_link',
          'user_location',
          'user_photos',
          'user_posts',
          'user_videos',
          'manage_pages',
          'instagram_manage_insights',
          'instagram_basic',
          'pages_show_list'
        ])
        .then(result => {
          if (result.isCancelled) {
            dispatch({ type: AUTH.LOGIN.FAILED });
            console.log("Login cancelled");
            Alert.alert('Unable to sign in on facebook');
          } else {
            AccessToken.getCurrentAccessToken().then(data => {
              const credential = firebase.auth.FacebookAuthProvider.credential(data.accessToken);
              firebase.auth().signInWithCredential(credential).then(firebaseCredential => {
                firebaseCredential.user.getIdToken().then(token => {
                  const firebaseUser = firebaseCredential.user.toJSON();
                  
                  dispatch({ type: AUTH.LOGIN.SUCCESS, token, uid: firebaseUser.uid, user: firebaseUser });
                  NavigationService.navigate('Loading');
                });
              });
            });
          }
        }, 
        error => {
          console.log("Login error");
          console.log(error);
          dispatch({ type: AUTH.LOGIN.FAILED });
        });
    },

    google: () => dispatch => {
        try {
        dispatch({ type: AUTH.LOGIN.REQUEST, authSource: 'google.com' });

          GoogleSignin.configure({
            scopes: ['profile', 'email'],
            webClientId: '553833031460-dkjfg0cna2qe3pn9o51getm4b8ufr404.apps.googleusercontent.com', 
          });
          GoogleSignin.signIn().then(data => {
            const credential = firebase.auth.GoogleAuthProvider.credential(data.idToken, data.accessToken)
            firebase.auth().signInWithCredential(credential).then(firebaseCredential => {
              firebaseCredential.user.getIdToken().then(token => {
                const firebaseUser = firebaseCredential.user.toJSON();
                
                dispatch({ type: AUTH.LOGIN.SUCCESS, token, uid: firebaseUser.uid, user: firebaseUser });
                NavigationService.navigate('Loading');

              });
            });
          });
        } catch (e) {
          Alert.alert('Unable to signin with Google');
          console.log(e);
          dispatch({ type: AUTH.LOGIN.FAILED });
        }
    },

    linkAccount: authLink => dispatch => {
      dispatch({ type: AUTH.LINK.REQUEST })

      if (authLink === 'facebook') {
        LoginManager.logInWithPermissions([
          'public_profile', 
          'email',
          'groups_access_member_info',
          'publish_to_groups',
          'user_age_range',
          'user_birthday',
          'user_friends',
          'user_gender',
          'user_hometown',
          'user_likes',
          'user_link',
          'user_location',
          'user_photos',
          'user_posts',
          'user_videos',
          'manage_pages'
        ])
        .then((result) => {
          if (result.isCancelled) {
            dispatch({ type: AUTH.LINK.FAILED });

            console.log("Login cancelled");
            Alert.alert('Sign in Cancelled');

          } else {

            AccessToken.getCurrentAccessToken().then(data => {
              const credential = firebase.auth.FacebookAuthProvider.credential(data.accessToken);
              console.log('facebook credential');
              console.log(data);
              console.log(credential);

              const infoRequest = new GraphRequest(
                `/${data.userID}/accounts`, {
                  accessToken: data.accessToken,
                }, (error, grpahResult) => {
                  if (error) {
                    console.log(error);
                  } else {
                    console.log(grpahResult);

                    // if(grpahResult.data.length > 0) {
                    //   firebase.auth().currentUser.linkAndRetrieveDataWithCredential(credential)
                    //   .then(firebaseCredential => {
                    //     console.log(firebaseCredential);
                    //     // HttpRequest.post(URL.USER.LINKACCOUNT, {
                    //     //   app_id: data.applicationID,
                    //     //   app_user_id: data.userID,
                    //     //   accessToken: data.accessToken,
                    //     //   type: 0,
                    //     //   type_name: 'facebook',
                    //     //   username: '',
                    //     //   link: firebaseCredential.additionalUserInfo.profile.link
                    //     // })
                    //   });
                    // }
                  }
                }
              );

              new GraphRequestManager().addRequest(infoRequest).start();
            });

          }
        })
        
        .catch((error) => {
          console.log("Login error");
          console.log(error);
          dispatch({ type: AUTH.LINK.FAILED });
        });
      }
      

      // firebase.auth.currentUser.linkWithPopup(authProvider)
      // .then(result => {
      //   // Accounts successfully linked.
      //   let credential = result.credential;
      //   let user = result.user;

      //   console.log(result);
      //   // ...
      // }).catch(error => {
      //   console.log('error');
      //   console.log(error);
      //   // Handle Errors here.
      //   // ...
      // });
      
    },

    signup: (user) => dispatch =>
      firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
      .then(result => {
          result.user.getIdToken()
          .then(token => {
              Object.assign(user, { uid: result.user.uid });
              dispatch({ type: AUTH.LOGIN.SUCCESS, token, uid: result.user.uid, user });
              
              NavigationService.navigate('Loading');
          })
          .catch(e => {
            console.log(e);
            console.log(e.code);
            console.log(e.message);
          });
      })
      .catch(e => {
          if (e.code === 'auth/email-already-in-use') {
            Alert.alert('Email already registered.');
          }
          console.log(e);
          console.log(e.code);
          console.log(e.message);
      }),

    logout: () => dispatch => {
      TokenSchema.revoke(() => {
        firebase.auth().signOut().then(() => {
          dispatch({ type: AUTH.LOGOUT });
          NavigationService.navigate('Loading');
        }, (e) => {
          console.log('Sign Out Error', e);
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
      });
    },
  },

  LoginToLinkedAcounts: social_media => {

    social_media.map(sma => {
      // FACEBOOK
        if (sma.type === 0) {
          const credential = JSON.parse(sma.credential);
          console.log(credential);
          credential.expirationTime = 0;
          AccessToken.getCurrentAccessToken().then(data => {
            if (data === null){
                AccessToken.setCurrentAccessToken(credential);
                AccessToken.refreshCurrentAccessTokenAsync().then(accessToken => {
                  console.log("Access Token Refreshed");
                });
            }
          });
        }
    });
  },

  login: (email, password) => dispatch => {
    dispatch({
      type: AUTH.LOGIN.REQUEST,
      email,
      password,
    });

    if (email === null) {
      Alert.alert('Email or password is empty');
    } else {
      RawHttpRequest.post(URL.USER.LOGIN, { email, password })
      .then(response => {
        const data = response.data;
        TokenSchema.update(
          data.token,
          () => {
            dispatch({ type: AUTH.LOGIN.SUCCESS });
            NavigationService.navigate('Loading');
          },
          e => {
            console.log('Error saving Token');
            console.log(e);
        });
      }).catch((e) => {
        dispatch({ type: AUTH.LOGIN.FAILED });
        Alert.alert('Invalid Email or password');
        console.log('Login failed');
        console.log('response', JSON.stringify(e));
        console.log(e.response.data.errors);
        console.log(e.message);
        console.log(e.request);
      });
    }
  },

  signup: (userData, sma) => dispatch => {
    dispatch({ type: AUTH.SIGNUP.REQUEST });
    RawHttpRequest.post(URL.USER.SIGNUP, { userData, sma })
    .then(response => {
      const data = response.data;
      TokenSchema.update(
        data.token,
        () => {
          dispatch({ type: AUTH.SIGNUP.SUCCESS });
          console.log(response);
          NavigationService.navigate('Loading', { gotoWelcomeScreen: true });
        },
        e => {
          console.log('Error saving Token');
          console.log(e);
          console.log(e.response.data);
          console.log(e.response.status);
          console.log(e.response.headers);
        });
    })
    .catch(e => {
      Alert.alert('Error', 'Unable to signup');
      console.log('Error saving Token');
      console.log(e);
      console.log(e.response.data);
      console.log(e.response.status);
      console.log(e.response.headers);
    });
    
      
  },

  
};
