import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  BackHandler,
  Platform,
} from 'react-native';
import {
  AppleButton,
  appleAuth,
} from '@invertase/react-native-apple-authentication';

import ButtonComp from '../../components/ButtonComp';
import Loader from '../../components/LoaderComponent';
import CheckBox from 'react-native-check-box';
import {GoogleSignin, statusCodes} from '@react-native-community/google-signin';
import {useDispatch, useSelector} from 'react-redux';

const FBSDK = require('react-native-fbsdk');
const {AccessToken, LoginManager} = FBSDK;
import {
  ToggleLoginSignup,
  iphoneEmail,
} from '../../redux/Actions/UsersActionFiles';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
const emailIsValid = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const Loginscreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [pass, setpass] = useState('');
  const [checked, setchecked] = useState(false);
  const [loading, setloading] = useState(false);
  const [errortextwhole, seterrortextwhole] = useState(false);
  const [passerrortext, setpasserrortext] = useState('');
  const [Emailerrortext, setEmailErrortext] = useState('');
  const [isVerified, setIsVerified] = useState(false);
  const {bottom, top} = useSafeAreaInsets();
  const dispatch = useDispatch();
  const {iEmail} = useSelector(({stakreducer}) => stakreducer);
  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);
  console.log('redux email', iEmail);
  function handleBackButtonClick() {
    BackHandler.exitApp();
    return true;
  }
  // const onAppleButtonPress = () => {
  //   // Start the sign-in request
  //   appleAuth
  //     .performRequest({
  //       requestedOperation: appleAuth.Operation.LOGIN,
  //       requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
  //     })
  //     .then(({ identityToken, nonce, fullName, email, user }) => {
  //       if (identityToken) {
  //         appleAuth.getCredentialStateForUser(user).then((getCred) => {
  //           if (getCred === appleAuth.State.AUTHORIZED) {
  //             const body = JSON.stringify({
  //               email: user + "@apple.com",
  //               password: "ApplePassword",
  //               fcm_token: fcmToken,
  //               linkedin_image: null,
  //             });
  //             // fetch(BASE_URL + "/api/login", {
  //             //   method: "POST",
  //             //   headers: {
  //             //     Accept: "application/json",
  //             //     "Content-Type": "application/json",
  //             //   },
  //             //   body,
  //             // })
  //             //   .then((res) => res.json())
  //             //   .then((res) => {
  //             //     if (res.success) {
  //             //       userAuthorize(res.success.token)(dispatch);
  //             //       userLKAuthorize({
  //             //         token: res.success.token,
  //             //         lkImage: "",
  //             //       })(dispatch);
  //             //       skipOnBoarding(true)(dispatch);
  //             //     }
  //             //     if (res.error) {
  //             //       skipOnBoarding(true)(dispatch);
  //             //       navigation.navigate("cmprofile", {
  //             //         name: fullName.familyName + " " + fullName.givenName,
  //             //         linkedInImage: null,
  //             //         remail: email,
  //             //         email: user + "@apple.com",
  //             //         password: "ApplePassword",
  //             //         phoneNumber: null,
  //             //         from: "apple",
  //             //       });
  //             //     }
  //             //   })
  //             //   .catch((e) => {
  //             //     skipOnBoarding(true)(dispatch);
  //             //   });
  //           }
  //         });
  //       } else {
  //         throw "Apple Sign-In failed - no identify token returned";
  //       }
  //     })
  //     .catch((err) => {});
  // };
  async function onAppleButtonPress() {
    // performs login request
    const appleAuthRequestResponse = await appleAuth.performRequest({
      requestedOperation: appleAuth.Operation.LOGIN,
      requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
    });
    console.log('res', appleAuthRequestResponse);
    console.log('email', appleAuthRequestResponse.email);
    console.log(
      'name',
      appleAuthRequestResponse.fullName.familyName +
        appleAuthRequestResponse.fullName.givenName,
    );
    appleAuthRequestResponse.email &&
      iphoneEmail(appleAuthRequestResponse.email)(dispatch);
    // get current authentication state for user
    // /!\ This method must be tested on a real device. On the iOS simulator it always throws an error.
    const credentialState = await appleAuth.getCredentialStateForUser(
      appleAuthRequestResponse.user,
    );
    console.log('Credentials', credentialState);
    // use credentialState response to ensure the user is authenticated
    if (credentialState === appleAuth.State.AUTHORIZED) {
      // user is authenticated
      if (!appleAuthRequestResponse.email && iEmail) {
        // Alert.alert('hello', appleAuthRequestResponse.email);
        setloading(true);
        const data = new FormData();
        data.append('email', iEmail);
        data.append('password', '12345678');
        setloading(true);
        fetch('https://bicicita.com/app/api/login', {
          method: 'POST',
          body: data,
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
          .then((response) => response.json())
          .then((res) => {
            console.log('res', res);
            if (res.status == 'success') {
              ToggleLoginSignup(res)(dispatch);
              setloading(false);
              seterrortextwhole('');
            } else if (res.status == 'error') {
              setIsVerified(!res.is_verified);
              seterrortextwhole(res.message);
              setloading(false);
            }
          })
          .catch((error) => {
            setloading(false);
          })
          .finally(() => {
            setloading(false);
          });
      } else {
        navigation.navigate('ProfileConfirmation', {
          userData: {
            email: iEmail ? iEmail : appleAuthRequestResponse.email,
            pass: '12345678',
            name: appleAuthRequestResponse.fullName.familyName,
          },
          social: true,
        });
        // if (!emailIsValid(email.replace(/\s/g, '')) && !pass) {
        //   setEmailErrortext('Email is required');
        //   setpasserrortext('password is required');
        //   return;
        // }
        // setloading(true);
        // if (!emailIsValid(email.replace(/\s/g, ''))) {
        //   setEmailErrortext('Enter Valid Email');
        //   setloading(false);
        //   return;
        // }
        // if (!pass) {
        //   setpasserrortext('Enter your password');
        //   setloading(false);
        //   return;
        // }
      }
      // navigation.navigate('ProfileConfirmation', {
      //   userData: {
      //     email: iEmail ? iEmail : appleAuthRequestResponse.email,
      //     pass: '12345678',
      //     name: appleAuthRequestResponse.fullName.familyName,
      //   },
      //   social: true,
      // });
    }
  }
  console.log('appleAuthstate authorization', appleAuth.State.AUTHORIZED);
  const FBLogin = async () => {
    LoginManager.logInWithPermissions(['email', 'public_profile']).then(
      function (result) {
        if (result.isCancelled) {
          console.log('cancled');
        } else {
          AccessToken.getCurrentAccessToken().then((data) => {
            const {accessToken} = data;

            initUser(accessToken);
          });
        }
      },

      function (error) {
        alert(error);
        console.log('error', error);
      },
    );
  };

  const handleLoginPress = () => {
    if (!emailIsValid(email.replace(/\s/g, '')) && !pass) {
      setEmailErrortext('Email is required');
      setpasserrortext('password is required');
      return;
    }
    setloading(true);
    if (!emailIsValid(email.replace(/\s/g, ''))) {
      setEmailErrortext('Enter Valid Email');
      setloading(false);
      return;
    }
    if (!pass) {
      setpasserrortext('Enter your password');
      setloading(false);
      return;
    }

    setloading(true);
    const data = new FormData();
    data.append('email', email);
    data.append('password', pass);
    setloading(true);
    fetch('https://bicicita.com/app/api/login', {
      method: 'POST',
      body: data,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
      .then((response) => response.json())
      .then((res) => {
        console.log('res', res);
        if (res.status == 'success') {
          ToggleLoginSignup(res)(dispatch);
          setloading(false);
          seterrortextwhole('');
        } else if (res.status == 'error') {
          setIsVerified(!res.is_verified);
          seterrortextwhole(res.message);
          setloading(false);
        }
      })
      .catch((error) => {
        setloading(false);
      })
      .finally(() => {
        setloading(false);
      });
  };

  const initUser = (token) => {
    fetch(
      'https://graph.facebook.com/v2.5/me?fields=email,name,picture,friends&access_token=' +
        token,
    )
      .then((response) => response.json())
      .then((json) => {
        const data = new FormData();
        data.append('email', json.email);
        data.append('password', json.id);
        fetch('https://bicicita.com/app/api/login', {
          method: 'POST',
          body: data,
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
          .then((response) => response.json())
          .then((responseJson) => {
            if (responseJson.status == 'success') {
              ToggleLoginSignup(responseJson)(dispatch);
              setloading(false);
            } else if (responseJson.status == 'error') {
              navigation.navigate('ProfileConfirmation', {
                social: true,
                screenfacebook: false,
                facebookdata: json,
                regscren: false,
              });
              setloading(false);
            }
          })
          .catch((error) => {
            setloading(false);
          });
      })
      .catch(() => {
        reject('ERROR GETTING DATA FROM FACEBOOK');
      });
  };

  const GooglesignInMethod = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      Google_Registration(userInfo);
    } catch (error) {
      console.log('error', error);
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log('sign in cancelled');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log('in progress');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.log('play services not available');
      } else {
        console.log('else');
      }
    }
  };

  const Google_Registration = (userInfo) => {
    const data = new FormData();
    data.append('email', userInfo.user.email);
    data.append('password', userInfo.user.id);
    fetch('https://bicicita.com/app/api/login', {
      method: 'POST',
      body: data,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log('i am responceJson', responseJson);
        if (responseJson.status == 'success') {
          ToggleLoginSignup(responseJson)(dispatch);
          setloading(false);
        } else if (responseJson.status == 'error') {
          navigation.navigate('ProfileConfirmation', {
            regscren: false,
            social: true,
            screenfacebook: false,
            regInfo: userInfo,
          });
          setloading(false);
        }
      })
      .catch((error) => {
        setloading(false);
      });
  };

  useEffect(() => {
    GoogleSignin.configure();
    // GoogleSignin.configure({
    //   scopes: ['profile'],
    //   webClientId:
    //     '1027827424609-fqjladthqukrad8g0cgc4bb07u3f696e.apps.googleusercontent.com',
    //   offlineAccess: true,
    // });
    BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
    return () => {
      BackHandler.removeEventListener(
        'hardwareBackPress',
        handleBackButtonClick,
      );
    };
  }, []);
  return (
    <View style={styles.container}>
      <View style={{flex: 1}}>
        <View style={styles.subcontainerTwo}>
          <Image
            source={require('../../assets/Icons/newshape.png')}
            style={styles.imagestye}
          />
          <View
            style={{
              position: 'absolute',
              height: '100%',
              alignItems: 'center',
              justifyContent: 'center',
              width: '100%',
            }}>
            <ButtonComp
              style={{
                backgroundColor: '#007aff',
                borderRadius: 10,
                marginTop: 20,
              }}
              onPress={() => onAppleButtonPress()}
              title={'Entrar con Apple'}
            />
            {/* <View style={{height: 10}} /> */}
            <ButtonComp
              style={{
                backgroundColor: '#9561F1',
                borderRadius: 10,
                marginTop: 10,
              }}
              onPress={() => FBLogin()}
              title={'Entrar con Facebook'}
            />
            <View style={{height: 10}} />
            <ButtonComp
              onPress={() => GooglesignInMethod()}
              style={{backgroundColor: '#D86C0Ebb', borderRadius: 10}}
              title={'Entrar con Google'}
            />
            <View style={{marginTop: 20}} />
            <View
              style={{
                height: 30,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-evenly',
                width: '100%',
              }}>
              <View
                style={{
                  flexDirection: 'row',

                  alignItems: 'center',
                  width: '100%',
                  justifyContent: 'space-around',
                }}>
                <View
                  style={{
                    height: 1,
                    width: '35%',
                    backgroundColor: '#979797',
                  }}></View>
                <View
                  style={{
                    height: 7,
                    borderRadius: 20,
                    borderWidth: 1,
                    borderColor: '#979797',
                    width: 7,
                    backgroundColor: 'white',
                  }}
                />

                <View
                  style={{
                    height: 1,
                    width: '35%',
                    backgroundColor: '#979797',
                  }}></View>
              </View>

              <View></View>
            </View>
            <TextInput
              style={{
                height: 40,
                color: 'black',
                borderWidth: Emailerrortext ? 0.3 : 0,
                borderRadius: 4,
                width: '90%',
                backgroundColor: '#dfdfdf',
                padding: 8,
                borderColor: Emailerrortext ? 'red' : null,
                fontSize: 14,
                fontFamily: 'Inter-Regular',
              }}
              placeholder="Email"
              placeholderTextColor="grey"
              value={email}
              onChangeText={(text) => {
                setEmail(text);
                setEmailErrortext('');
              }}
              autoCapitalize="none"
              underlineColorAndroid="transparent"
            />
            <View style={{height: 10}} />
            <TextInput
              style={{
                height: 40,
                color: 'black',
                borderWidth: passerrortext ? 0.3 : 0,
                borderRadius: 4,
                width: '90%',
                backgroundColor: '#dfdfdf',
                padding: 8,
                borderColor: passerrortext ? 'red' : null,
                fontSize: 14,
                fontFamily: 'Inter-Regular',
              }}
              placeholder="Contraseña"
              secureTextEntry
              placeholderTextColor="grey"
              value={pass}
              onChangeText={(text) => {
                setpass(text);
                setpasserrortext('');
              }}
              autoCapitalize="none"
              underlineColorAndroid="transparent"
            />
            <ButtonComp
              onPress={() => handleLoginPress()}
              style={{
                backgroundColor: '#9561F1',
                borderRadius: 10,
                marginTop: 10,
              }}
              title={'Inicio Sesión'}
            />
            <View style={{height: 15}} />
            <View style={styles.checkboxview}>
              <CheckBox
                onClick={() => setchecked(!checked)}
                isChecked={checked}
                checkBoxColor={'#979797'}
              />
              <Text
                style={{
                  right: 12,
                  color: '#979797',
                  fontFamily: 'Inter-Regular',
                }}>
                Recordar mis datos
              </Text>
              <Text
                onPress={() =>
                  navigation.navigate('Forgotpass', {isForget: true})
                }
                style={{
                  fontSize: 12,
                  color: '#007aff',
                  fontFamily: 'Inter-Regular',
                }}>
                ¿Olvidaste la contraseña?
              </Text>
            </View>
            {errortextwhole ? (
              <Text style={styles.errortextstyleone}>{errortextwhole}</Text>
            ) : null}
            {isVerified && (
              <ButtonComp
                onPress={() => {
                  setEmail('');
                  setpass('');
                  seterrortextwhole(false);
                  setIsVerified(false);
                  navigation.navigate('Forgotpass', {isForget: false});
                }}
                style={{
                  backgroundColor: '#9561F1',
                  borderRadius: 10,
                  marginTop: 10,
                }}
                title={'Verificar correo electrónico'}
              />
            )}
          </View>
        </View>
        <Text
          onPress={() => navigation.navigate('Registerscreen', {regTest: true})}
          style={{
            textAlign: 'center',
            fontSize: 18,
            bottom: Platform.OS == 'ios' ? bottom : 10,
            fontFamily: 'Inter-Regular',
          }}>
          Registrarse
        </Text>
      </View>
      {loading ? <Loader /> : null}
    </View>
  );
};

export default Loginscreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  errortextstyle: {
    textAlign: 'left',
    margin: 2,
    color: 'red',
    width: '90%',
    bottom: 8,
    fontSize: 10,
  },
  errortextstyleone: {
    textAlign: 'center',
    margin: 10,
    color: 'red',

    fontSize: 10,
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
  checkboxview: {
    flexDirection: 'row',
    alignItems: 'center',

    justifyContent: 'space-between',
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
    borderWidth: 0,
    borderRadius: 10,
    padding: 8,
    fontSize: 14,
    fontFamily: 'Inter-Regular',
  },

  subcontainerParent: {
    flex: 0.5,
    backgroundColor: 'green',
  },
  subcontainerTwo: {
    flex: 4,
  },
  imagestye: {
    height: 300,
    bottom: '5%',
    marginRight: 2,
    width: 200,
    alignSelf: 'flex-end',
    resizeMode: 'contain',
  },
});
