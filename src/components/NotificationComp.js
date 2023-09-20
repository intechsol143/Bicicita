import {Right, Left} from 'native-base';
import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Alert} from 'react-native';
import BellIcon from 'react-native-vector-icons/AntDesign';
import Icons from 'react-native-vector-icons/FontAwesome';
import {useSelector, useDispatch} from 'react-redux';
// import {useSelector} from 'react-redux';
import moment from 'moment';
import {updateBadge, nullBadge} from '../redux/Actions/UsersActionFiles';
const NotificationComp = ({item, navigation}) => {
  const dispatch = useDispatch();
  const parsedDate = new Date(Date.parse(`${item.time} UTC`));
  const localDate = parsedDate.toLocaleString();
  const today =
    moment(new Date()).format('MM/DD/YY') ==
    moment(localDate).format('MM/DD/YY');

  const {user} = useSelector(({stakreducer}) => stakreducer);
  console.log('localDate', localDate);
  const StatusChage = () => {
    fetch(`https://bicicita.com/app/api/notification-status/${item.id}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${user?.userdata?.api_token}`,
      },
    })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log('notification', responseJson.unread);
        updateBadge(responseJson.unread)(dispatch);
        if (responseJson.status === 'success') {
          if (item.type === 'appointment') {
            navigation.navigate('Home', {
              screen: 'BusicarCitaApointment',
              params: {
                id: responseJson.data.redirect,
              },
            });
          } else if (item.type === 'chat') {
            navigation.navigate('Chatscreen', {
              userdata: responseJson.userdata,
            });
          } else if (item.type === 'appointment_delete') {
            navigation.navigate('Home');
          } else if (item.type === 'friend') {
            navigation.navigate('Custom');
          } else if (item.type === 'apply_appointment') {
            navigation.navigate('Profile', {
              screen: 'RequestedAsistances',
              params: {
                id: responseJson.data.redirect,
              },
            });
          } else if (item.type === 'appointment_user') {
            navigation.navigate('Profile', {
              screen: 'Apointmentdetail',
              params: {
                id: responseJson.data.redirect,
              },
            });
          }
        } else if (responseJson.status === 'error') {
        }
      })
      .catch((error) => {});
  };

  return (
    <TouchableOpacity
      onPress={() => StatusChage()}
      style={{flexDirection: 'row', marginVertical: 12}}>
      <Left>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          {item.status ? (
            <Icons name="bell-o" size={20} color={'#9561F1'} />
          ) : (
            <Icons name="bell" size={20} color={'#9561F1'} />
          )}
          {/* <BellIcon
            name={'bells'}
            size={20}
            color={item.status ? '#979797' : '#9561F1'}
          /> */}
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={{color: item.bulletcolor, marginLeft: 6}}>
              {'\u2B24'}
            </Text>
            <Text
              style={{
                color: item.colortext,
                fontSize: 16,
                marginLeft: 10,
                fontFamily: item.family,
                width: '100%',
              }}>
              {item.message}
            </Text>
          </View>
        </View>
      </Left>
      <Right>
        <Text
          style={{
            color: '#9fa4bc',
            fontSize: 12,
            fontFamily: 'Inter-Regular',
          }}>
          {/* {moment(localDate).format('DD/MM/YYYY')} */}
          {item.time}
        </Text>
        {/* {today ? (
          <Text
            style={{
              color: '#9fa4bc',
              fontSize: 12,
              fontFamily: 'Inter-Regular',
            }}>
            {moment(localDate).format('h:mm a')}
          </Text>
        ) : (
          <Text
            style={{
              color: '#9fa4bc',
              fontSize: 12,
              fontFamily: 'Inter-Regular',
            }}>
            {moment(localDate).format('DD/MM/YYYY')}
          </Text>
        )} */}
      </Right>
    </TouchableOpacity>
  );
};

export default NotificationComp;

const styles = StyleSheet.create({});
