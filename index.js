import React, { Component } from 'react';
import { AppRegistry, Alert } from 'react-native';
import { Provider } from 'react-redux';
import FlashMessage from 'react-native-flash-message';
import Route from './app/routes';
import { store } from './app/redux/store';
import Notification from './app/services/notification';
import { FCMTokenSchema } from './app/database';

class App extends Component {
  constructor(props) {
    super(props);
    this.notif = new Notification(this.onRegister.bind(this), this.onNotif.bind(this));
  }

  onRegister(token) {
    FCMTokenSchema.update(token.token, () => { 
      console.log('Database Success: FCM Token Saved');
    }, () => {
      console.log('Database Error: error saving FCM Token');
    });
  }

  onNotif(notif) {
    console.log(notif);
    // Alert.alert(notif.title, notif.message);
  }
  
  handlePermission(perms) {
    // Alert.alert('Permissions', JSON.stringify(perms));
  }

  render() {
    console.disableYellowBox = true;
    return (
      <Provider store={store}>
				<Route />
        <FlashMessage position='top' />
			</Provider>
    );
  }
}

AppRegistry.registerComponent('influencerAPP', () => App);
