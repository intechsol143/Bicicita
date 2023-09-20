import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Platform,
  TouchableOpacity,
} from 'react-native';

import Loader from '../../components/LoaderComponent';
import Icon from 'react-native-vector-icons/AntDesign';
const Newpassscreen = ({navigation, route}) => {
  const [pass, setpass] = useState('');
  const [confirmpass, setconfirmpass] = useState('');
  const [loading, setloading] = useState(false);
  const [confirmPassError, setConfirmpassError] = useState(false);

  const {email, code} = route.params;

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

  const handleUpdatePassPress = () => {
    setloading(true);

    if (pass != confirmpass) {
      setConfirmpassError(true);
    }

    if (!email) {
      alert('Please fill Email');
      return;
    }
    if (!code) {
      alert('Please fill Password');
      return;
    }
    setloading(true);
    const data = new FormData();
    data.append('email', email);
    data.append('password', pass);
    data.append('password_confirmation', confirmpass);
    data.append('token', code);

    setloading(true);
    fetch('https://bicicita.com/app/api/reset', {
      method: 'POST',
      body: data,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
      .then((response) => response.json())
      .then((responseJson) => {
        setloading(false);
        if (responseJson.status == 'success') {
          navigation.navigate('Loginscreen');
        }
      })
      .catch((error) => {
        setloading(false);
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.bottomview}>
        {/* <Text style={styles.headertextone}>Please Enter a New Password</Text> */}
        <Text style={styles.headertext}>Nueva contraseña</Text>
        <View style={styles.inputView}>
          <TextInput
            style={styles.inputText}
            secureTextEntry
            placeholder="Nueva contraseña"
            placeholderTextColor="#979797"
            value={pass}
            onChangeText={(text) => setpass(text)}
            underlineColorAndroid="transparent"
          />
        </View>
        <Text style={{textAlign: 'left', width: '90%', fontWeight: 'bold'}}>
          Confirma la nueva contraseña
        </Text>
        <View style={styles.inputView}>
          <TextInput
            style={styles.inputText}
            secureTextEntry
            placeholder="Confirma la nueva contraseña"
            placeholderTextColor="#979797"
            value={confirmpass}
            onChangeText={(text) => setconfirmpass(text)}
            underlineColorAndroid="transparent"
          />
        </View>
        <TouchableOpacity
          onPress={() => handleUpdatePassPress()}
          style={styles.loginBtn}>
          <Text style={styles.loginText}>Actualizar</Text>
        </TouchableOpacity>
        {confirmPassError ? (
          <Text
            style={{
              paddingTop: 10,
              fontFamily: 'Inter-Regular',
              color: 'red',
              fontSize: 10,
            }}>
            Not matched pass
          </Text>
        ) : null}
      </View>

      <View style={{flex: 3}} />

      {loading ? <Loader /> : null}
    </View>
  );
};

export default Newpassscreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  headertextone: {
    textAlign: 'left',
    fontSize: 18,
    fontFamily: 'Inter-Regular',
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
    marginTop: 10,
  },
  loginText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
