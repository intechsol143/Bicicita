import React, {useEffect, useState} from 'react';
import {Text, View, Image, FlatList, RefreshControl} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';

import NotificationComp from '../../components/NotificationComp';

import {updateBadge, nullBadge} from '../../redux/Actions/UsersActionFiles';

const Notificationscreen = ({navigation}) => {
  const [refreshing, setRefreshing] = useState(false);
  const {user} = useSelector(({stakreducer}) => stakreducer);
  const dispatch = useDispatch();

  const [Notificationdata, setNotificationdata] = useState([]);

  useEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <Image
          source={require('../../assets/Icons/logoapp.png')}
          style={{height: 40, width: 150, resizeMode: 'contain'}}
        />
      ),
      headerLeft: () => null,
      headerStyle: {
        elevation: 0,
      },
      headerTitleAlign: 'center',
    });
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      _getNotifications();
      // nullBadge(0)(dispatch);
    });

    return unsubscribe;
  }, [navigation]);

  const _getNotifications = () => {
    setRefreshing(true);
    fetch(`https://bicicita.com/app/api/notification-list`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${user?.userdata.api_token}`,
      },
    })
      .then((response) => response.json())
      .then((responseJson) => {
        setRefreshing(false);
        if (responseJson.status === 'success') {
          setNotificationdata(responseJson.data.reverse());
          console.log('respnce notification', responseJson);
        } else if (responseJson.status === 'error') {
        }
      })
      .catch((error) => {
        setRefreshing(false);
      });
  };

  const _onRefresh = () => {
    // nullBadge(0)(dispatch);
    _getNotifications();
  };

  return (
    <View style={{flex: 1, paddingHorizontal: 12, backgroundColor: 'white'}}>
      <Text
        style={{
          textAlign: 'center',
          fontSize: 18,
          color: '#979797',
          fontFamily: 'Inter-Regular',
        }}>
        Notificaciones
      </Text>
      <View style={{height: 15}} />
      <FlatList
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            colors={['#9561F1', '#9561F1']}
            refreshing={refreshing}
            onRefresh={_onRefresh}
          />
        }
        data={Notificationdata}
        renderItem={({item}) => (
          <NotificationComp navigation={navigation} item={item} />
        )}
        keyExtractor={(item) => `${item.id}`}
      />
    </View>
  );
};

export default Notificationscreen;
