import PushNotification from 'react-native-push-notification';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import {useEffect} from 'react';
import {Store} from '../src/redux/ConfigFile';
import {updateBadge} from '../src/redux/Actions/UsersActionFiles';
{
  /* <key>FirebaseDynamicLinksCustomDomains</key>
	<array>
		<string>https://go.fussballeuropa.com/news</string>
		<string>https://go.fussballeuropa.com</string>
	</array> */
}
const {badge} = Store.getState().stakreducer;
const state = Store.getState();
const PushNotificationsConfigs = {
  congigurations: () => {
    const dispatch = Store.dispatch;

    PushNotification.configure({
      // senderID: '1027827424609',
      onNotification: (notification) => {
        // console.log('state', state);
        console.log(
          'i am fucking Notification i entered your app',
          notification,
        );
        // setTimeout(() => {
        updateBadge(badge + 1)(dispatch);
        // }, 3000);

        const clicked = notification.userInteraction;
        if (clicked) {
        }

        notification.finish(PushNotificationIOS.FetchResult.NoData);
      },
      onError: (err) => {
        console.log('Error configuring notifications', err);
      },

      onAction: (notification) => {},

      onRegistrationError: (err) => {},

      // IOS ONLY (optional): default: all - Permissions to register.
      permissions: {
        alert: true,
        badge: true,
        sound: true,
      },
      popInitialNotification: true,
      requestPermissions: false,
    });
  },
};

export default PushNotificationsConfigs;
