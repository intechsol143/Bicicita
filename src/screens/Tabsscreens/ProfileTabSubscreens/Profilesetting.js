import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  Switch,
  Platform,
  Alert,
  Linking,
} from 'react-native';
import {Left, Right} from 'native-base';
import PinIcon from 'react-native-vector-icons/SimpleLineIcons';
import {useDispatch, useSelector} from 'react-redux';
import Icon from 'react-native-vector-icons/AntDesign';
import ButtonComp from '../../../components/ButtonComp';
import {ToggleLoginSignup} from '../../../redux/Actions/UsersActionFiles';
import Loader from '../../../components/LoaderComponent';
import {onOff, statusLocation} from '../../../lib/api';
const Profilesetting = ({navigation}) => {
  const {user} = useSelector(({stakreducer}) => stakreducer);

  const dispatch = useDispatch();
  const [profilecheck, setprofilecheck] = useState(
    user?.settings?.public_profile,
  );
  const [notificheck, setnotificheck] = useState(
    user?.settings?.notice_from_friends,
  );
  const [mailcheck, setmailcheck] = useState(
    user?.settings?.email_notification,
  );
  const [mapcheck, setmapcheck] = useState(user?.settings?.use_my_location);
  const [isDelete, setIsDelete] = useState(false);
  const [loader, setLoader] = useState(false);

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
    statusLocation({Auth: user?.userdata?.api_token}).then((res) => {
      console.log('resi', res);
      setmapcheck(res.is_location);
    });
  }, []);
  const SettingData = () => {
    const data = new FormData();
    data.append('public_profile', profilecheck);
    data.append('notice_from_friends', notificheck);
    data.append('email_notification', mailcheck);
    data.append('use_my_location', mapcheck);

    fetch('https://bicicita.com/app/api/setting', {
      method: 'POST',
      body: data,
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${user?.userdata?.api_token}`,
      },
    })
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson.status == 'success') {
          Alert.alert(responseJson.message);
        }
      })
      .catch((error) => {});
  };

  const _DeletUserData = () => {
    setLoader(true);
    fetch('https://bicicita.com/app/api/deleteProfile', {
      method: 'POST',
      body: null,
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${user?.userdata?.api_token}`,
      },
    })
      .then((response) => response.json())
      .then((res) => {
        setLoader(false);
        if (res.status == 'success') {
          // Alert.alert(res.message);
          setIsDelete(true);
          ToggleLoginSignup(null)(dispatch);
        }
      })
      .catch((error) => {
        setLoader(false);
      });
  };
  return loader ? (
    <Loader />
  ) : (
    <ScrollView contentContainerStyle={{flex: 1}}>
      <View style={styles.container}>
        <Text
          style={{
            textAlign: 'center',
            fontFamily: 'Inter-Regular',
            fontSize: 18,
            color: '#979797',
          }}>
          Ajustes
        </Text>
        <View style={{flex: 4.5, margin: 12}}>
          <View style={{flexDirection: 'row'}}>
            <Left style={{flexDirection: 'row', flex: 3, alignItems: 'center'}}>
              <View style={styles.iconview}>
                <Image
                  source={require('../../../assets/Icons/Person.png')}
                  style={{
                    height: 20,
                    tintColor: 'white',
                    width: 20,
                    resizeMode: 'contain',
                  }}
                />
              </View>
              <Text
                style={{
                  marginLeft: 12,
                  fontSize: 14,
                  fontFamily: 'Inter-Medium',
                }}>
                Hacer público mi perfil
              </Text>
            </Left>
            <Right>
              <Switch
                trackColor={{true: '#9561F1', false: '#D1D5E8'}}
                thumbColor="white"
                value={profilecheck}
                onValueChange={() => setprofilecheck(!profilecheck)}
              />
            </Right>
          </View>
          <View style={{height: 15}} />
          <View style={{flexDirection: 'row'}}>
            <Left style={{flexDirection: 'row', flex: 3, alignItems: 'center'}}>
              <View style={styles.iconview}>
                <Image
                  source={require('../../../assets/Icons/On.png')}
                  style={{
                    height: 20,
                    tintColor: 'white',
                    width: 20,
                    resizeMode: 'contain',
                  }}
                />
              </View>
              <Text
                style={{
                  marginLeft: 12,
                  fontSize: 14,
                  fontFamily: 'Inter-Medium',
                }}>
                Solo recibir aviso de amigos
              </Text>
            </Left>
            <Right>
              <Switch
                trackColor={{true: '#9561F1', false: '#D1D5E8'}}
                thumbColor="white"
                value={notificheck}
                onValueChange={() => setnotificheck(!notificheck)}
              />
            </Right>
          </View>
          <View style={{height: 15}} />
          <View style={{flexDirection: 'row'}}>
            <Left style={{flexDirection: 'row', flex: 3, alignItems: 'center'}}>
              <View style={styles.iconview}>
                <Image
                  source={require('../../../assets/Icons/Icon4.png')}
                  style={{
                    height: 20,
                    tintColor: 'white',
                    width: 20,
                    resizeMode: 'contain',
                  }}
                />
              </View>
              <Text
                style={{
                  marginLeft: 12,
                  fontSize: 14,
                  fontFamily: 'Inter-Medium',
                }}>
                Notificaciones por mail
              </Text>
            </Left>
            <Right>
              <Switch
                trackColor={{true: '#9561F1', false: '#D1D5E8'}}
                thumbColor="white"
                value={mailcheck}
                onValueChange={() => setmailcheck(!mailcheck)}
              />
            </Right>
          </View>
          <View style={{height: 15}} />
          <View style={{flexDirection: 'row'}}>
            <Left style={{flexDirection: 'row', flex: 3, alignItems: 'center'}}>
              <View style={styles.iconviewTwo}>
                <PinIcon name={'location-pin'} color={'white'} size={20} />
              </View>
              <Text
                style={{
                  marginLeft: 12,
                  fontSize: 14,
                  fontFamily: 'Inter-Medium',
                }}>
                Mostrar ubicación
              </Text>
            </Left>
            <Right>
              <Switch
                trackColor={{true: '#9561F1', false: '#D1D5E8'}}
                thumbColor="white"
                value={mapcheck}
                onValueChange={() => {
                  setmapcheck(!mapcheck);
                  onOff({Auth: user?.userdata?.api_token}).then((res) => {
                    console.log('res of toggle', res);
                    setmapcheck(res.is_location);
                  });
                }}
              />
            </Right>
          </View>
          <View style={{height: 20}} />
          <View style={{marginLeft: 4}}>
            <Text
              onPress={() => {
                Linking.openURL('https://bicicita.com/politica-de-privacidad/');
              }}
              style={{
                paddingVertical: 3,
                color: '#007aff',
                fontSize: 14,
                fontFamily: 'Inter-Regular',
              }}>
              Politica de privacidad
            </Text>
            <Text
              onPress={() =>
                Linking.openURL(
                  'https://bicicita.com/politica-de-datos-y-cookies/',
                )
              }
              style={{
                paddingVertical: 3,
                color: '#007aff',
                fontSize: 14,
                fontFamily: 'Inter-Regular',
              }}>
              Politica de datos
            </Text>
            <Text
              onPress={() => navigation.navigate('BlockedUsers')}
              style={{
                paddingVertical: 3,
                color: '#007aff',
                fontSize: 14,
                fontFamily: 'Inter-Regular',
              }}>
              Usuarios bloqueados
            </Text>
          </View>
          <View style={{height: 40}} />
          <View style={{flexDirection: 'row'}}>
            <Left style={{flexDirection: 'row', flex: 3, alignItems: 'center'}}>
              <View style={styles.iconviewThree}>
                <Image
                  source={require('../../../assets/Icons/Person.png')}
                  style={{
                    height: 20,
                    tintColor: 'white',
                    width: 20,
                    resizeMode: 'contain',
                  }}
                />
              </View>
              <Text
                style={{
                  marginLeft: 12,
                  fontSize: 14,
                  fontFamily: 'Inter-Medium',
                  color: '#f20732',
                }}>
                Borrar perfil
              </Text>
            </Left>
            <Right>
              <Switch
                trackColor={{true: '#9561F1', false: '#D1D5E8'}}
                thumbColor="white"
                value={isDelete}
                onValueChange={() => {
                  Alert.alert(
                    'Borrar Perfil',
                    '¿Está seguro? ¿Quieres borrar tu cuenta?',
                    [
                      {
                        text: 'NO',
                        onPress: () => {},
                        style: 'cancel',
                      },
                      {
                        text: 'SÍ',
                        onPress: () => {
                          _DeletUserData();
                        },
                      },
                    ],
                  );
                }}
              />
            </Right>
          </View>
        </View>
        <View
          style={{flex: 1.5, alignItems: 'center', justifyContent: 'center'}}>
          <ButtonComp
            onPress={() => navigation.navigate('ChangePassword')}
            style={{borderRadius: 6, backgroundColor: '#9561F1'}}
            title={'Cambiar la contraseña'}
          />
          <View style={{height: 10}} />
          <ButtonComp
            onPress={() => SettingData()}
            style={{borderRadius: 6, backgroundColor: '#9561F1'}}
            title={'Guardar'}
          />
          <View style={{height: 8}} />
          <ButtonComp
            onPress={() => ToggleLoginSignup(null)(dispatch)}
            style={{borderRadius: 6, backgroundColor: '#9561F1'}}
            title={'cerrar sesión'}
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default Profilesetting;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  iconview: {
    height: 35,
    width: 35,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    backgroundColor: '#38D836',
  },
  iconviewTwo: {
    height: 35,
    width: 35,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    backgroundColor: '#9561F1',
  },
  iconviewThree: {
    height: 35,
    width: 35,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    backgroundColor: '#f20732',
  },
});
