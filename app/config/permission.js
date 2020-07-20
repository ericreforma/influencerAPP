import { PermissionsAndroid } from 'react-native';

export const requestPermission = (permissions, success, failed) => 
    PermissionsAndroid.requestMultiple(permissions).then(result => {
      let notPermitted = 0;
      
      permissions.map(permission => {
        if (result[permission] === 'granted') {
          notPermitted += 1;
        }
      });

      if (notPermitted > 0) {
        success();
      } else {
        failed();
      }
    });
