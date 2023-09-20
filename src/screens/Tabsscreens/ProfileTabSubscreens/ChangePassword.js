import React, {useState, useLayoutEffect} from 'react';
import {View, Text, TextInput, Platform, Image, Alert} from 'react-native';
import {useSelector} from 'react-redux';

import ButtonComp from '../../../components/ButtonComp';
import Loader from '../../../components/LoaderComponent';
import Icon from 'react-native-vector-icons/AntDesign';
const ChangePassword = ({navigation}) => {
  const {user} = useSelector(({stakreducer}) => stakreducer);

  const [old, setOld] = useState('');
  const [oldErr, setOldErr] = useState('');
  const [password, setPassword] = useState('');
  const [passwordErr, setPasswordErr] = useState('');
  const [con_Password, setCon_Password] = useState('');
  const [conErr, setConErr] = useState('');
  const [changePassErr, setChangePassErr] = useState('');
  const [loader, setLoader] = useState(false);

  useLayoutEffect(() => {
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

  const _userChangePassword = () => {
    if (old && password && con_Password) {
      if (password != con_Password) {
        setPasswordErr('sad');
        setConErr('sad');
      } else {
        setLoader(true);
        setChangePassErr('');
        const data = new FormData();
        data.append('old_password', old);
        data.append('password', password);
        data.append('password_confirmation', con_Password);

        fetch('https://bicicita.com/app/api/change-password', {
          method: 'POST',
          body: data,
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${user?.userdata?.api_token}`,
          },
        })
          .then((response) => response.json())
          .then((responce) => {
            if (responce) {
              if (responce.status === 'success') {
                Alert.alert('Contraseña actualizada con éxito!');
                navigation.goBack();
              } else if (responce.status == 'error') {
                Alert.alert(responce.message);
              }
            } else {
              Alert.alert('Something went wrong!');
            }
          })
          .catch((err) => {})
          .finally(() => {
            setLoader(false);
          });
      }
    } else {
      if (!old && !password && !con_Password) {
        setOldErr('sad');
        setPasswordErr('as');
        setConErr('ass');
      } else if (!old) {
        setOldErr('asd');
      } else if (!password) {
        setPasswordErr('assd');
      } else if (!con_Password) {
        setConErr('asdd');
      }
    }
  };

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      {loader && <Loader loader={loader} />}

      <View style={{paddingHorizontal: 15, marginVertical: 30}}>
        <Text
          style={{
            fontSize: 16,
            // fontFamily: 'Nunito-SemiBold',
          }}>
          Introduzca la contraseña nueva y antigua para actualizar:
        </Text>
      </View>
      <View style={{alignItems: 'center'}}>
        <TextInput
          style={{
            height: 40,
            color: 'black',
            borderWidth: oldErr ? 0.3 : 0,
            borderRadius: 4,
            width: '90%',
            backgroundColor: '#dfdfdf',
            padding: 8,
            borderColor: oldErr ? 'red' : null,
            fontSize: 14,
            fontFamily: 'Inter-Regular',
          }}
          placeholder="Contraseña anterior"
          placeholderTextColor="grey"
          value={old}
          onChangeText={(text) => {
            setOld(text);
            setOldErr('');
          }}
          secureTextEntry
          underlineColorAndroid="transparent"
        />
        <View style={{height: 10}} />

        <TextInput
          style={{
            height: 40,
            color: 'black',
            borderWidth: passwordErr ? 0.3 : 0,
            borderRadius: 4,
            width: '90%',
            backgroundColor: '#dfdfdf',
            padding: 8,
            borderColor: passwordErr ? 'red' : null,
            fontSize: 14,
            fontFamily: 'Inter-Regular',
          }}
          placeholder="Contraseña"
          secureTextEntry
          placeholderTextColor="grey"
          value={password}
          onChangeText={(text) => {
            setPassword(text);
            setPasswordErr('');
          }}
          underlineColorAndroid="transparent"
        />
        <View style={{height: 10}} />
        <TextInput
          style={{
            height: 40,
            color: 'black',
            borderWidth: conErr ? 0.3 : 0,
            borderRadius: 4,
            width: '90%',
            backgroundColor: '#dfdfdf',
            padding: 8,
            borderColor: conErr ? 'red' : null,
            fontSize: 14,
            fontFamily: 'Inter-Regular',
          }}
          placeholder="Confirmar Contraseña"
          secureTextEntry
          placeholderTextColor="grey"
          value={con_Password}
          onChangeText={(text) => {
            setCon_Password(text);
            setConErr('');
          }}
          underlineColorAndroid="transparent"
        />
      </View>

      <View style={{alignItems: 'center'}}>
        <ButtonComp
          onPress={() => _userChangePassword()}
          style={{
            backgroundColor: '#9561F1bb',
            borderRadius: 10,
            marginTop: 10,
          }}
          title={'Actualiza contraseña'}
        />
      </View>
    </View>
  );
};
export default ChangePassword;
