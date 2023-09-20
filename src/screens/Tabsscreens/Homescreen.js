import React, {useEffect, useState} from 'react';
import {StyleSheet, View, ImageBackground, Image} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import messaging from '@react-native-firebase/messaging';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import ButtonComp from '../../components/ButtonComp';
import Geolocation from 'react-native-geolocation-service';
import {buildGPX, GarminBuilder} from 'gpx-builder';
import {unread} from '../../lib/api';
import {updateBadge, nullBadge} from '../../redux/Actions/UsersActionFiles';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
// import GpxParser from 'gpxParser';
import {
  allUsersList,
  setSelectedUsers,
  ToggleCities,
} from '../../redux/Actions/UsersActionFiles';

const Homescreen = ({navigation}) => {
  const {user, badge} = useSelector(({stakreducer}) => stakreducer);
  const {bottom, top} = useSafeAreaInsets();
  const dispatch = useDispatch();
  const myapikey = 'AIzaSyB_H2_55fkLI8-EyfYLUlJI4obywUd-KnE';
  // const [xm, setXm] = useState('');
  // console.log('badge at home', badge);
  // const gpx = new gpxParser();
  // const {Point} = GarminBuilder.MODELS;
  // const points = [
  //   new Point(51.02832496166229, 15.515156626701355, {
  //     ele: 314.715,
  //     time: new Date('2018-06-10T17:29:35Z'),
  //     hr: 120,
  //   }),
  // ];

  // const gpxData = new GarminBuilder();
  // console.log('gpx', user.userdata.api_token);

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
    getToken();
    // gpxData.setSegmentPoints(points);
    // setXm(buildGPX(gpxData.toObject()));
    // Geolocation.requestAuthorization().then(() => {
    findCoordinates();
    // });

    unread({Auth: user.userdata.api_token}).then((res) => {
      console.log('res', res);
      updateBadge(res.unread_badge)(dispatch);
    });
  }, []);

  const findCoordinates = async () => {
    console.log('i even come here too');
    // Geolocation.requestAuthorization('always');
    // Geolocation.requestAuthorization();
    // Geolocation.setRNConfiguration({authorizationLevel: 'always'});
    // Geolocation.requestAuthorization();
    // Geolocation.getCurrentPosition(
    //   ({coords}) => {
    //     console.log('coordintes', coords);
    //     // setlatitude(coords.latitude);
    //     // setlongitude(coords.longitude);
    //   },
    //   (error) => {},
    //   {enableHighAccuracy: true, timeout: 1000, maximumAge: 1000},
    // );
  };
  // console.log('new', xm);
  const getToken = async () => {
    let fcmToken = await messaging().getToken();
    // // updateToken({Auth: user.userdata.api_token, fcm_token: fcmToken});
    _updateToken(fcmToken);
    messaging().onTokenRefresh((token) => {
      // updateToken({Auth: user.userdata.api_token, fcm_token: token});
      _updateToken(token);
    });
  };
  const _updateToken = (token) => {
    // const state = Store.getState();
    // const {id} = state.stakreducer.user?.userdata;

    const data = JSON.stringify({fcm_token: token});
    fetch(`https://bicicita.com/app/api/updatefcm/${user?.userdata?.id}`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: data,
    })
      .then((res) => res.json())
      .then((res) => {
        // console.log('i am chaged ', res);
      })
      .catch((e) => {});
  };
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      _allUsersList();
    });
    return () => unsubscribe;
  }, [navigation]);

  const jj = () => {
    navigation.navigate('Searchfriends');
  };
  const kk = () => {
    navigation.navigate('Lookforapointment');
  };
  const ll = () => {
    setSelectedUsers([])(dispatch);
    ToggleCities('')(dispatch);
    navigation.navigate('Creatapointment');
  };
  const ll1 = () => {
    setSelectedUsers([])(dispatch);
    ToggleCities('')(dispatch);
    navigation.navigate('Creatapointment');
  };
  // console.log('user', user.userdata);
  const _allUsersList = () => {
    // intechsol.co/bicicita/api/all-user
    https: fetch(`https://bicicita.com/app/api/friendlist`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${user?.userdata?.api_token}`,
      },
    })
      .then((response) => response.json())
      .then((res) => {
        if (res.status == 'success') {
          console.log('my friends', res);
          setSelectedUsers([])(dispatch);
          // allUsersList(res.data)(dispatch);
          allUsersList(res.frienddata)(dispatch);
        }
      });
  };

  return (
    <ImageBackground
      source={require('../../assets/Icons/newback.png')}
      style={{
        flex: 1,
        height: '100%',
        marginTop: Platform.OS === 'android' ? 0 : top,
      }}>
      <View style={{alignItems: 'center'}}>
        <Image
          source={require('../../assets/Icons/logoapp.png')}
          style={{height: 50, width: 180, resizeMode: 'contain', top: 5}}
        />
      </View>
      <View
        style={{
          alignItems: 'center',
          flex: 1,
          justifyContent: 'center',
        }}>
        {[
          {title: 'Buscar amigos', backgroundColor: '#9561F1', onPress: jj},
          {title: 'Buscar cita', backgroundColor: '#F27405', onPress: kk},
          {title: 'Crear cita', backgroundColor: '#F20732', onPress: ll},
          {
            /* {title: 'Crear cita', backgroundColor: '#F20732', onPress: ll1}, */
          },
        ].map(({title, onPress, backgroundColor}, index) => (
          <ButtonComp
            style={{
              marginVertical: 10,
              borderRadius: 10,
              backgroundColor,
            }}
            key={`item-${index}`}
            title={title}
            onPress={() => onPress()}
          />
        ))}
      </View>
    </ImageBackground>
  );
};

export default Homescreen;

const styles = StyleSheet.create({});
