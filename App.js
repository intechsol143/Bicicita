import React, {useEffect} from 'react';
import AuthNavigator from './src/navigators/authNav';
import {Platform} from 'react-native';
import {Provider} from 'react-redux';
import dynamicLinks from '@react-native-firebase/dynamic-links';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import {Store, persistor} from './src/redux/ConfigFile';
import {PersistGate} from 'redux-persist/integration/react';
import PushNotification from 'react-native-push-notification';
import messaging from '@react-native-firebase/messaging';
import {ToggleToken} from './src/redux/Actions/UsersActionFiles';
import {requestUserPermissionForMessaging} from './src/lib/utils';
const App = () => {
  const dispatch = Store.dispatch;
  // useEffect(() => {
  //   const type = 'notification';
  //   PushNotificationIOS.addEventListener(type, onRemoteNotification);
  //   console.log('ios notification entered');
  //   return () => {
  //     PushNotificationIOS.removeEventListener(type);
  //   };
  // }, []);
  // const onRemoteNotification = (notification) => {
  //   const isClicked = notification.getData().userInteraction === 1;

  //   if (isClicked) {
  //     // Navigate user to another screen
  //   } else {
  //     // Do something else with push notification
  //   }
  // };
  const handleDynamicLink = (link) => {
    console.log('orignal link foreground', link.url);
    // console.log("i am already in foreground", lop(link.url));
  };
  useEffect(() => {
    const unsubscribe = dynamicLinks().onLink(handleDynamicLink);
    dynamicLinks()
      .getInitialLink()
      .then((link) => {
        if (link) {
          // https://
          console.log('i am called from background', link.url);
        }
      });
    getToken();
    getNotifications();
    Platform.OS === 'android' && _createChannel();
    // const unsubscribe = messaging().onMessage((remoteMessage) => {
    //   Platform.OS === 'ios' &&
    //     PushNotificationIOS.addNotificationRequest({
    //       id: new Date().toString(),
    //       title: remoteMessage.notification?.title,
    //       body: remoteMessage.notification?.body,
    //       category: 'userAction',
    //       userInfo: remoteMessage.data,
    //     });
    // });
    return unsubscribe;
  }, []);
  // useEffect(() => {
  //   PushNotificationIOS.addEventListener('register', (token) => {
  //     alert(token);
  //     console.log('MyAPNSTOKEN', token); // <--- IT WORKS
  //   });
  //   PushNotificationIOS.addEventListener('registrationError', (token) => {
  //     console.log('registrationError', token); // <--- NO ERRORS
  //   });
  //   PushNotificationIOS.addEventListener(
  //     'notification',
  //     function (notification) {
  //       console.log('notification', notification); // <--- IT NEVER WORKS
  //     },
  //   );
  //   PushNotificationIOS.requestPermissions().then((data) => {
  //     console.log('requestPermissions', data); // {"alert": true, "badge": true, "lockScreen": true, "notificationCenter": true, "sound": true}
  //   });
  // }, []);
  const getToken = async () => {
    requestUserPermissionForMessaging().then(async (res) => {
      let fcmToken = await messaging().getToken();
      // console.log(
      //   'fcmToken getting inside messaging',
      //   JSON.stringify(fcmToken),
      // );
      if (fcmToken) {
        ToggleToken(fcmToken)(dispatch);
      }
    });
    // messaging().onTokenRefresh((token) => {
    //   // _updateToken(token);
    // });
  };

  // const _updateToken = (token) => {
  //   const state = Store.getState();
  //   const {id} = state.stakreducer.user?.userdata;

  //   const data = JSON.stringify({fcm_token: token});
  //   fetch(`https://intechsol.co/bicicita/api/updatefcm/${id}`, {
  //     method: 'POST',
  //     headers: {
  //       Accept: 'application/json',
  //       'Content-Type': 'application/json',
  //     },
  //     body: data,
  //   })
  //     .then((res) => res.json())
  //     .then((res) => {})
  //     .catch((e) => {});
  // };
  const _createChannel = () => {
    PushNotification.createChannel(
      {
        channelId: 'fcm_fallback_notification_channel', // (required)
        channelName: 'fcm_fallback_notification_channel', // (required)
        channelDescription: 'A channel to categorise your notifications', // (optional) default: undefined.
        soundName: 'default', // (optional) See `soundName` parameter of `localNotification` function
        importance: 4, // (optional) default: 4. Int value of the Android notification importance
        vibrate: true, // (optional) default: true. Creates the default vibration patten if true.
      },
      (created) => ({}), // (optional) callback returns whether the channel was created, false means it already existed.
    );
  };
  const getNotifications = async () => {
    await messaging().onNotificationOpenedApp((remoteMessage) => {
      console.log('get called');
    });
    await messaging()
      .getInitialNotification()
      .then((remoteMessage) => {
        if (remoteMessage) {
          console.log('plz');
        }
      });
  };
  return (
    <Provider store={Store}>
      <PersistGate loading={null} persistor={persistor}>
        <AuthNavigator />
      </PersistGate>
    </Provider>
  );
};

export default App;
