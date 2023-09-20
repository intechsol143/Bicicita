import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Platform,
  TouchableOpacity,
} from 'react-native';
import CodeInput from 'react-native-confirmation-code-input';
import Icon from 'react-native-vector-icons/AntDesign';
import Loader from '../../components/LoaderComponent';

const Forgotverificationcodescreen = ({navigation, route}) => {
  const [codeone, setcode] = useState('');
  const [loading, setloading] = useState(false);
  const [error, setError] = useState('');
  const [codeError, setcoderror] = useState(false);
  const [veriError, setVerificationEror] = useState(false);

  const {email} = route.params;

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

  const handleVerificationCodePress = () => {
    if (!codeone) {
      setcoderror(true);
      return;
    }
    setloading(true);
    const data = new FormData();
    data.append('token', codeone);
    setloading(true);
    fetch('https://bicicita.com/app/api/verify-code', {
      method: 'POST',
      body: data,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson.status === 'success') {
          navigation.navigate('Newpass', {
            email: email,
            code: codeone,
          });
        } else if (responseJson.status === 'error') {
          setVerificationEror(true);
        }

        setloading(false);
      })
      .catch((error) => {
        setloading(false);
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.bottomview}>
        <Text style={styles.headertextone}>
          Por favor introduce el código de verificación.
        </Text>
        <Text style={styles.headertext}>
          Te hemos enviado un código de verificación a tu email.
        </Text>
        <View style={styles.inputView}>
          <View style={styles.inputsContainer}>
            <CodeInput
              secureTextEntry
              codeLength={4}
              activeColor={'#172A55'}
              inactiveColor={codeError ? '#ff0000' : 'grey'}
              autoFocus={false}
              ignoreCase={true}
              inputPosition="center"
              size={40}
              space={30}
              onFulfill={(code) => {
                setcode(code);
                setcoderror('');
              }}
              codeInputStyle={{
                borderWidth: 1.5,
                borderRadius: 5,
              }}
              keyboardType={'numeric'}
              onCodeChange={(text) => {
                setcode(text), setError('');
              }}
            />
          </View>
        </View>
        <TouchableOpacity
          onPress={() => handleVerificationCodePress()}
          style={styles.loginBtn}>
          <Text style={styles.loginText}>Verificar</Text>
        </TouchableOpacity>
      </View>
      {veriError ? (
        <Text
          style={{
            fontSize: 10,
            color: 'red',
            textAlign: 'center',
            fontFamily: 'Inter-Regular',
          }}>
          you entered wrong code
        </Text>
      ) : null}
      <View style={{flex: 3.5}} />

      {loading ? <Loader /> : null}
    </View>
  );
};

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
  },
  headertext: {
    textAlign: 'left',
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#979797',
    width: '90%',
  },
  bottomview: {
    flex: 3,
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
    color: 'white',
    borderWidth: 0.3,
    padding: 8,
  },

  loginBtn: {
    width: '90%',
    backgroundColor: '#9561F1',
    borderRadius: 6,
    height: 40,
    marginTop: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },

  titleTextContainer: {
    width: '90%',
    paddingTop: Platform.OS === 'ios' ? 50 : 20,
    marginLeft: '5%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  backIcon: {
    marginTop: 5,
    width: 20,
    height: 20,
  },
  titleText: {
    fontWeight: 'bold',
    fontSize: 23,
    marginLeft: 30,
  },
  inputsContainer: {
    marginTop: Platform.OS === 'ios' ? 15 : -5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  inputFields: {
    width: '19%',
    height: 40,
    marginTop: 70,
    marginBottom: 0,
    paddingTop: Platform.OS === 'ios' ? -5 : 1,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: 'gray',
  },
  textInput: {
    width: '100%',
    fontSize: 17,
    height: 40,
    paddingLeft: 15,
    paddingTop: Platform.OS === 'ios' ? 5 : 10,
  },
  buttonView: {
    width: '90%',
    marginLeft: '5%',
    marginTop: 25,
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#172A55',
    alignItems: 'center',
    paddingTop: 12,
    borderRadius: 10,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 20,
  },
  infoTextView: {
    marginTop: 15,
  },
  infoText: {
    fontSize: Platform.OS === 'ios' ? 25 : 18,
    color: '#828282',
  },
  infoText2: {
    fontSize: Platform.OS === 'ios' ? 22 : 16,
    color: '#828282',
    opacity: 0.3,
    marginTop: 10,
  },
  errorText: {
    color: '#FF0000',
    width: '90%',
    marginLeft: '5%',
  },

  buttonStyle: {
    borderWidth: 0.5,
    backgroundColor: '#f2f2f6',
    borderColor: '#2EC4B6',
    height: 50,
    alignItems: 'center',
    marginTop: 20,
    borderRadius: 5,
    marginBottom: 20,
    width: '95%',
  },
  buttonTextStyle: {
    color: '#2EC4B6',
    paddingVertical: 10,
    fontSize: 16,
  },
});

export default Forgotverificationcodescreen;
