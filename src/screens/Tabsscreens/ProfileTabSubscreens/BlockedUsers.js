import React, {useEffect, useState} from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  FlatList,
  Platform,
  Text,
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import {useSelector, useDispatch} from 'react-redux';
import Icons from 'react-native-vector-icons/Feather';
import {blockUsersList} from '../../../lib/api';
const BlockedUsers = ({navigation}) => {
  const [list, setList] = useState([]);
  const [toggle, setToggle] = useState(false);
  useEffect(() => {
    navigation.setOptions({
      headerStyle: {
        elevation: 0,
      },
      headerTitle: () => (
        <Image
          source={require('../../../assets/Icons/logoapp.png')}
          style={{height: 40, width: 150, resizeMode: 'contain'}}
        />
      ),
      headerLeft: () =>
        Platform.OS === 'ios' && (
          <Icon
            name="arrowleft"
            color="black"
            size={20}
            style={{left: 15}}
            onPress={() => navigation.goBack()}
          />
        ),
      headerTitleAlign: 'center',
    });
  }, []);
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      blockUsersList({Auth: user.userdata.api_token}).then((res) => {
        console.log('res', res);
        setList(res.blocklist);
      });
    });
    return unsubscribe;
  }, [navigation]);
  useEffect(() => {
    // const unsubscribe = navigation.addListener('focus', () => {
    blockUsersList({Auth: user.userdata.api_token}).then((res) => {
      console.log('res', res);
      setList(res.blocklist);
    });
    // });
    // return unsubscribe;
  }, [toggle]);
  const {user} = useSelector(({stakreducer}) => stakreducer);
  // console.log('user', user .userdata);
  const renderItem = ({item}) => (
    <View style={{borderBottomWidth: 0.5, borderBottomColor: '#dfdfdf'}}>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('SingleBlockdetail', {
            user_id: item.user_id,
          })
        }
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingHorizontal: 8,
          margin: 6,
        }}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Image
            source={{uri: item.image_url ? item.image_url : item.profile_image}}
            style={{height: 50, width: 50, borderRadius: 30}}
          />
          <Text
            style={{
              marginLeft: 12,
              color: '#020c26',
              fontSize: 14,

              fontFamily: 'Inter-Medium',
            }}>
            {item.name}
          </Text>
        </View>
        <View style={{alignItems: 'center'}}>
          <TouchableOpacity
            onPress={() => {
              fetch(`https://bicicita.com/app/api/block-user/${item.user_id}`, {
                method: 'GET',
                headers: {
                  Authorization: `Bearer ${user?.userdata.api_token}`,
                },
              })
                .then((response) => response.json())
                .then((res) => {
                  console.log('user blocked', res);
                  if (res.status == 'success') {
                    // Alert.alert('Usuario bloqueado');
                    setToggle(!toggle);
                    // navigation.navigate('Home');
                    // console.log('fucking navigate');
                  }
                });
            }}
            style={{
              height: 35,
              width: 35,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 30,
              backgroundColor: '#f8f8f8',
            }}>
            {/* <AddIcon name={'plus'} size={20} color={'#9561f1'} /> */}
            <Icons name="user-plus" size={20} color={'#9561f1'} />
          </TouchableOpacity>
          <Text style={{fontSize: 12}}>Añadir amigo</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <Text
        style={{
          textAlign: 'center',
          paddingVertical: 10,
          fontSize: 18,
          fontFamily: 'Inter-Regular',
          color: '#979797',
          bottom: 12,
        }}>
        Usuarios bloqueados
      </Text>
      <FlatList data={list} renderItem={renderItem} />
    </View>
  );
};
export default BlockedUsers;
