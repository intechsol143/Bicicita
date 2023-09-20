import {Platform} from 'react-native';
import messaging from '@react-native-firebase/messaging';
const emailIsValid = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
//Exporter
const requestUserPermissionForMessaging = async () => {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL ||
    authStatus === true ||
    authStatus.status === 'granted';

  if (enabled) {
    return (
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === true ||
      authStatus.status === 'granted'
    );
  }
  return Platform.OS === 'android';
};
export {emailIsValid, requestUserPermissionForMessaging};
