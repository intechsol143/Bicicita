import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Platform,
  Image,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import Loader from '../../components/LoaderComponent';

const emailIsValid = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const Forgotscreen = ({navigation, route}) => {
  const {isForget} = route.params;
  const [Email, setEmail] = useState('');
  const [loading, setloading] = useState(false);
  const [Emailerrortext, setEmailErrortext] = useState('');
  const [myemailerrortext, setmyemailerrortext] = useState(false);

  useEffect(() => {
    navigation.setOptions({
      headerStyle: {
        elevation: 0,
      },
      headerTitle: () => (
        <Image
          source={require('../../assets/Icons/logoapp.png')}
          style={{height: 50, width: 150, resizeMode: 'contain'}}
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

  const handleForgotPress = () => {
    if (!emailIsValid(Email.replace(/\s/g, ''))) {
      setEmailErrortext('Email is required');
      return;
    }
    const url = isForget ? 'forgot' : 'check-user-verify';
    const data = new FormData();
    data.append('email', Email);
    setloading(true);

    fetch(`https://bicicita.com/app/api/${url}`, {
      method: 'POST',
      body: data,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
      .then((response) => response.json())
      .then((res) => {
        setloading(false);
        if (res.status === 'success') {
          if (isForget) {
            navigation.navigate('Verificationcode', {email: Email});
          } else {
            navigation.navigate('EmailVerifiction', {
              isSignUp: false,
            });
          }
        } else if (res.status === 'error') {
          setmyemailerrortext(true);
        }
      })
      .catch((error) => {
        setloading(false);
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.bottomview}>
        {isForget ? (
          <Text style={styles.headertextone}>
            Introduce tu email para resetear tu contraseña
          </Text>
        ) : (
          <Text style={styles.headertextone}>
            Enter your email to verify your account.
          </Text>
        )}
        <Text style={styles.headertext}>Email</Text>
        <View style={styles.inputView}>
          <TextInput
            style={{
              height: 40,
              color: 'black',
              borderWidth: Emailerrortext ? 0.3 : 0,
              backgroundColor: '#dfdfdf',
              borderColor: Emailerrortext ? 'red' : null,
              padding: 8,
              borderRadius: 6,
            }}
            placeholder="info@bicicita.com"
            placeholderTextColor="grey"
            value={Email}
            onChangeText={(text) => {
              setEmail(text);
              setEmailErrortext(''), setmyemailerrortext('');
            }}
            underlineColorAndroid="transparent"
          />
        </View>
        <TouchableOpacity
          onPress={() => handleForgotPress()}
          style={styles.loginBtn}>
          <Text style={styles.loginText}>Enviar</Text>
        </TouchableOpacity>
        {myemailerrortext ? (
          <Text
            style={{fontSize: 10, color: 'red', fontFamily: 'Inter-Regular'}}>
            Email error account doennot exist
          </Text>
        ) : null}
      </View>
      <View style={{flex: 2.5}} />
      {loading ? <Loader /> : null}
    </View>
  );
};

export default Forgotscreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  headertextone: {
    textAlign: 'left',
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    width: '90%',
    top: 6,
  },
  headertext: {
    textAlign: 'left',
    fontSize: 12,
    marginTop: 20,
    fontFamily: 'Inter-Bold',
    width: '90%',
    top: 6,
  },
  bottomview: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  subheadingtext: {
    width: 180,
    textAlign: 'center',
  },
  welcometext: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  maininputesview: {
    flex: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  firstetxt: {
    width: '80%',
    marginTop: 20,
    textAlign: 'left',
    fontSize: 12,
    fontWeight: 'bold',
  },
  inputView: {
    width: '90%',
    backgroundColor: 'white',
    height: 40,
    margin: 15,
    justifyContent: 'center',
  },
  forgerttext: {
    textAlign: 'right',
    width: '80%',
  },
  inputText: {
    height: 40,
    color: 'black',
    backgroundColor: '#dfdfdf',
    padding: 8,
    borderRadius: 6,
  },

  loginBtn: {
    width: '90%',
    backgroundColor: '#9561F1',
    borderRadius: 6,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
