/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import messaging from '@react-native-firebase/messaging';
import PushNotificationConfig from './config/PushNotificationConfig';
import PushNotification from 'react-native-push-notification';
messaging().setBackgroundMessageHandler(async (remoteMessage) => {
  console.log('clg', remoteMessage);
  PushNotification.localNotification(remoteMessage);
});
PushNotificationConfig.congigurations();
AppRegistry.registerComponent(appName, () => App);
