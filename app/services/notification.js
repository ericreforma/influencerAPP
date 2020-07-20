import PushNotification from 'react-native-push-notification';
import { FIREBASE } from '../config/variables';

export default class Notification {

  constructor(onRegister, onNotification) {
    this.configure(onRegister, onNotification);
    this.lastId = 0;
  }

  configure(onRegister, onNotification) {
    PushNotification.configure({

      onRegister: onRegister,
      onNotification: onNotification, 
      
      senderID: FIREBASE.GCM,

      permissions: {
        alert: true,
        badge: true,
        sound: true
      },

      popInitialNotification: true,

      
      requestPermissions: true,
    });
  }

  localNotif() {
    this.lastId++;
    PushNotification.localNotification({
      title: "Local Notification", // (optional)
      message: "My Notification Message", // (required)
    });
  }

  scheduleNotif() {
    this.lastId++;
    PushNotification.localNotificationSchedule({
      date: new Date(Date.now() + (30 * 1000)), // in 30 secs
      title: "Scheduled Notification", // (optional)
      message: "My Notification Message", // (required)
      playSound: true, // (optional) default: true
      soundName: 'default', // (optional) Sound to play when the notification is shown. Value of 'default' plays the default sound. It can be set to a custom sound such as 'android.resource://com.xyz/raw/my_sound'. It will look for the 'my_sound' audio file in 'res/raw' directory and play it. default: 'default' (default sound is played)
    });
  }

  checkPermission(cbk) {
    return PushNotification.checkPermissions(cbk);
  }

  cancelNotif() {
    PushNotification.cancelLocalNotifications({id: ''+this.lastId});
  }

  cancelAll() {
    PushNotification.cancelAllLocalNotifications();
  }
}