import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  ImageBackground,
  Linking,
  TouchableOpacity,
  Platform,
} from 'react-native';
import CheckBox from 'react-native-check-box';
import Icon from 'react-native-vector-icons/AntDesign';
import ButtonComp from '../../components/ButtonComp';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import Loader from '../../components/LoaderComponent';

const emailIsValid = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const Registerscreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [pass, setpass] = useState('');
  const [checked, setchecked] = useState(false);
  const [checked1, setchecked1] = useState(false);
  const [checked1err, setchecked1err] = useState('');
  const [checked2, setchecked2] = useState(false);
  const [checked2err, setchecked2err] = useState('');
  const [passerrortext, setpasserrortext] = useState(false);
  const [Emailerrortext, setEmailErrortext] = useState(false);
  const [lengtherror, setlengtherror] = useState(false);
  const [emailfound, setemailfound] = useState(false);
  const [loading, setloading] = useState(false);

  const EmailAndPassValidator = () => {
    if (
      !emailIsValid(email.replace(/\s/g, '')) &&
      !pass &&
      !checked1 &&
      !checked2
    ) {
      setEmailErrortext('Email is required');
      setpasserrortext('password is required');
      setchecked1err('asd');
      setchecked2err('asd');
      return;
    }
    if (!emailIsValid(email.replace(/\s/g, ''))) {
      setEmailErrortext(true);

      return;
    } else if (pass.length === 0) {
      setpasserrortext(true);

      return;
    } else if (pass.length < 6) {
      setpasserrortext(true);
      setlengtherror(true);

      return;
    } else if (!checked1) {
      setchecked1err('asd');
      return;
    } else if (!checked2) {
      setchecked2err('asd');
      return;
    }
    const data = new FormData();
    data.append('email', email);
    setloading(true);

    fetch('https://bicicita.com/app/api/findEmail', {
      method: 'POST',
      body: data,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
      .then((response) => response.json())
      .then((responseJson) => {
        setloading(false);
        console.log('res', responseJson);
        if (responseJson.status == 'success') {
          setemailfound(true);
        } else if (responseJson.status == 'error') {
          navigation.navigate('ProfileConfirmation', {userData: {email, pass}});
        }
      })
      .catch((error) => {})
      .finally(() => {
        setloading(false);
      });
  };
  useEffect(() => {
    navigation.setOptions({
      headerStyle: {
        elevation: 0,
        backgroundColor: 'white',
      },

      headerTitle: () => (
        <Image
          source={require('../../assets/Icons/logoapp.png')}
          style={{height: 50, width: 180, resizeMode: 'contain'}}
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
  console.log('checked1', checked1);
  console.log('checked2', checked2);
  console.log('error1', checked1err);
  console.log('error2', checked2err);
  return (
    <View style={styles.container}>
      <View></View>
      <Text
        style={{
          textAlign: 'center',
          fontFamily: 'Inter-Regular',
          fontSize: 20,
          color: '#979797',
        }}>
        Crea tu cuenta
      </Text>
      <View style={{flex: 1}} />

      <View style={styles.subcontainerTwo}>
        <TextInput
          style={{
            height: 40,
            color: 'black',
            fontSize: 14,
            width: '90%',
            backgroundColor: '#dfdfdf',
            fontFamily: 'Inter-Regular',
            borderWidth: Emailerrortext ? 0.3 : 0,
            borderColor: Emailerrortext ? 'red' : null,
            borderRadius: 4,
            padding: 8,
          }}
          placeholder="Email"
          placeholderTextColor="grey"
          value={email}
          onChangeText={(text) => {
            setEmail(text);
            setEmailErrortext('');
            setemailfound(false);
          }}
          autoCapitalize="none"
          underlineColorAndroid="transparent"
        />
        <View style={{height: 10}} />

        <TextInput
          style={{
            height: 40,
            color: 'black',
            fontSize: 14,
            fontFamily: 'Inter-Regular',
            width: '90%',
            backgroundColor: '#dfdfdf',
            borderWidth: passerrortext ? 0.3 : 0,
            borderColor: passerrortext ? 'red' : null,
            borderRadius: 4,
            padding: 8,
          }}
          placeholder="Contraseña"
          secureTextEntry
          placeholderTextColor="grey"
          value={pass}
          onChangeText={(text) => {
            setpass(text);
            setpasserrortext(false);
            setlengtherror(false);
            setemailfound(false);
          }}
          underlineColorAndroid="transparent"
        />
        {lengtherror ? (
          <Text
            style={{
              textAlign: 'left',
              fontSize: 10,
              width: '90%',
              top: 4,
              color: 'red',
              fontFamily: 'Inter-Regular',
            }}>
            Password should be 6 characters
          </Text>
        ) : null}

        <View style={{height: 30}} />
        <ButtonComp
          onPress={() => EmailAndPassValidator()}
          style={{
            backgroundColor: '#9561F1bb',
            borderRadius: 10,
            marginTop: 10,
          }}
          title={'Registrarse'}
        />
        {emailfound ? (
          <Text
            style={{
              fontSize: 10,
              color: 'red',

              paddingVertical: 10,
              fontFamily: 'Inter-Regular',
            }}>
            Email ya existe
          </Text>
        ) : null}
        <View style={{height: 15}} />
        <View style={{width: '90%'}}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <TouchableOpacity
              onPress={() => {
                setchecked1(!checked1);
                checked1err && setchecked1err('');
              }}>
              <Icons
                name={checked1 ? 'check-box-outline' : 'checkbox-blank-outline'}
                color={checked1err ? 'red' : 'grey'}
                size={20}
              />
            </TouchableOpacity>
            <Text
              onPress={() => {
                Linking.openURL('https://bicicita.com/politica-de-privacidad/');
              }}
              style={{
                paddingVertical: 3,
                color: '#007aff',
                fontSize: 14,
                left: 5,
                fontFamily: 'Inter-Regular',
              }}>
              Politica de privacidad
            </Text>
          </View>
          <View
            style={{flexDirection: 'row', marginTop: 10, alignItems: 'center'}}>
            <TouchableOpacity
              onPress={() => {
                setchecked2(!checked2);
                checked2err && setchecked2err('');
              }}>
              <Icons
                name={checked2 ? 'check-box-outline' : 'checkbox-blank-outline'}
                color={checked2err ? 'red' : 'grey'}
                size={20}
              />
            </TouchableOpacity>
            <Text
              onPress={() =>
                Linking.openURL(
                  'https://bicicita.com/politica-de-datos-y-cookies/',
                )
              }
              style={{
                paddingVertical: 3,
                color: '#007aff',
                left: 5,
                fontSize: 14,
                fontFamily: 'Inter-Regular',
              }}>
              Politica de datos
            </Text>
          </View>
        </View>
        <View style={styles.checkboxview}>
          {/* <CheckBox
            onClick={() => setchecked(!checked)}
            isChecked={checked}
            checkBoxColor={'#979797'}
          /> */}
          <TouchableOpacity
            onPress={() => {
              setchecked(!checked);
              // checked2err && setchecked2err('');
            }}>
            <Icons
              name={checked ? 'check-box-outline' : 'checkbox-blank-outline'}
              color={'grey'}
              size={20}
            />
          </TouchableOpacity>
          <Text
            style={{left: 5, fontFamily: 'Inter-Regular', color: '#979797'}}>
            Recordar mis datos
          </Text>
          {/* <Text
            style={{
              fontSize: 12,
              color: '#007aff',
              fontFamily: 'Inter-Regular',
            }}>
            ¿Olvidaste la contraseña?
          </Text> */}
        </View>
      </View>
      <View
        style={{flex: 0.2, alignItems: 'center', justifyContent: 'flex-end'}}>
        <ImageBackground
          resizeMode={'contain'}
          source={require('../../assets/Icons/newshape.png')}
          style={styles.imagestye}></ImageBackground>
      </View>
      {loading ? <Loader /> : null}

      {/* <Text
        style={{
          textAlign: 'center',
          color: '#007aff',
          width: '100%',
          fontSize: 18,
          fontFamily: 'Inter-Regular',
          flexDirection: 'row',
          bottom: 30,
        }}>
        Inicio sesión
      </Text> */}
    </View>
  );
};

export default Registerscreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  inputView: {
    width: '90%',
    backgroundColor: '#dfdfdf',
    height: 40,
    margin: 15,
    marginTop: 20,
    borderRadius: 10,
    justifyContent: 'center',
  },
  errortextstyleone: {
    textAlign: 'center',
    margin: 10,
    color: 'red',
    fontSize: 10,
  },
  checkboxview: {
    flexDirection: 'row',
    marginTop: 10,
    alignItems: 'center',
    // justifyContent: 'space-between',
    width: '90%',
  },
  inputViewOne: {
    width: '90%',
    backgroundColor: '#dfdfdf',
    height: 40,
    borderRadius: 10,
    justifyContent: 'center',
  },
  inputText: {
    height: 40,
    color: '#9fa4bc',
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    borderWidth: 0,
    borderRadius: 10,
    padding: 8,
  },
  errortextstyle: {
    textAlign: 'center',
    margin: 10,
    color: 'red',
    width: '80%',
    fontSize: 10,
  },
  subcontainerParent: {
    flex: 0.5,
    backgroundColor: 'green',
  },
  subcontainerTwo: {
    flex: 5,
    alignItems: 'center',
  },
  imagestye: {
    height: 250,
    width: 200,
    alignSelf: 'flex-end',
    resizeMode: 'contain',
    top: 100,
    left: '2%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
