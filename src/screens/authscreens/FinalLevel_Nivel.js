import React, {useEffect, useState} from 'react';
import {StyleSheet, Alert, Text, View, Platform, Image} from 'react-native';
import Loader from '../../components/LoaderComponent';
import Typesofbikes from '../../components/BikesTypeComp';
import ButtonComp from '../../components/ButtonComp';
import {useDispatch, useSelector} from 'react-redux';
import {ToggleLoginSignup} from '../../redux/Actions/UsersActionFiles';
import Geolocation from 'react-native-geolocation-service';
import RNAndroidLocationEnabler from 'react-native-android-location-enabler';
import Icon from 'react-native-vector-icons/AntDesign';
const FinalLevel_Nivel = ({navigation, route}) => {
  const [arr, setArr] = useState([['Inicio', 'medio'], ['Avanzado'], ['Pro']]);
  const [bikeslevel, setbikeslevel] = useState([]);
  const [colorsarr] = useState([
    '#0BB2EA',
    '#0B3A4A',
    '#7A13E2',
    '#4B4650',
    '#E8460E',
    '#0B16CB',
    '#15CEDD',
    '#2BC239',
    '#5897AD',
    '#E8460E',
  ]);
  const [loading, setloading] = useState(false);
  const [responseError, setreponseError] = useState(false);
  const {fcmToken} = useSelector(({stakreducer}) => stakreducer);
  const dispatch = useDispatch();
  const [toggle, setToggle] = useState(false);
  const [latitude, setlatitude] = useState(0);
  const [longitude, setlongitude] = useState(0);
  const [bikeLevelErr, setBokeLevelErr] = useState('');
  const {bikselection} = route.params;
  useEffect(() => {
    setTimeout(() => {
      setToggle(!toggle);
    }, 3000);
    setTimeout(() => {
      setToggle(!toggle);
    }, 5000);
    setTimeout(() => {
      setToggle(!toggle);
    }, 8000);
    setTimeout(() => {
      setToggle(!toggle);
    }, 10000);
    setTimeout(() => {
      setToggle(!toggle);
    }, 20000);
    setTimeout(() => {
      setToggle(!toggle);
    }, 50000);
    setTimeout(() => {
      setToggle(!toggle);
    }, 100000);
    setTimeout(() => {
      setToggle(!toggle);
    }, 500000);
  }, []);
  useEffect(() => {
    if (!bikselection.latitude) {
      CurrentLoc();
    }

    console.log('useeffect called');
  }, []);

  const CurrentLoc = async () => {
    Platform.OS === 'android'
      ? getPermissions()
      : Geolocation.requestAuthorization('always').then((res) => {
          findCoordinates();
          console.log('res', res);
        });
    console.log("i am ios i'll come here");
  };

  const getPermissions = () => {
    RNAndroidLocationEnabler.promptForEnableLocationIfNeeded({
      interval: 10000,
      fastInterval: 5000,
    }).then((data) => {
      if (data === 'already-enabled') {
        findCoordinates();
      } else {
        setTimeout(() => {
          findCoordinates();
        }, 5000);
      }
    });
  };

  const findCoordinates = async () => {
    console.log('i even come here too');
    Geolocation.getCurrentPosition(
      (position) => {
        setlatitude(position.coords.latitude);
        setlongitude(position.coords.longitude);
      },
      (error) => {
        // console.log('i am error', error);
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 10000,
        // forceRequestLocation: true,
      },
    );
    // Geolocation.getCurrentPosition(
    //   ({coords}) => {
    //     console.log('coordintes of current location', coords);
    //     setlatitude(coords.latitude);
    //     setlongitude(coords.longitude);
    //   },
    //   (error) => {},
    //   {enableHighAccuracy: true, timeout: 1000, maximumAge: 1000},
    // );
  };

  useEffect(() => {
    navigation.setOptions({
      headerStyle: {
        elevation: 0,
      },
      headerTitle: () => (
        <Image
          source={require('../../assets/Icons/logoapp.png')}
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

  console.log('email for login', bikselection);
  const handleSignUpPress = () => {
    console.log('lat last at signup', latitude);
    console.log('long last at signup', longitude);
    console.log('lat first at signup', bikselection.latitude);
    console.log('long first at signup', bikselection.longitude);
    if (bikeslevel.length === 0) {
      setBokeLevelErr('Please select bike level');
      return;
    } else {
      const data = new FormData();
      data.append(
        'email',
        bikselection.WholeuserDescription?.userData?.email
          ? bikselection.WholeuserDescription?.userData?.email
          : bikselection.WholeuserDescription?.facebookdata
          ? bikselection.WholeuserDescription?.facebookdata?.email
          : bikselection.WholeuserDescription?.regInfo?.user?.email,
      );
      data.append(
        'password',
        bikselection.WholeuserDescription?.userData?.pass
          ? bikselection.WholeuserDescription?.userData?.pass
          : bikselection.WholeuserDescription?.facebookdata
          ? bikselection.WholeuserDescription?.facebookdata?.id
          : bikselection.WholeuserDescription?.regInfo?.user?.id,
      );
      // data.append(
      //   'name',
      //   bikselection?.WholeuserDescription?.name
      //     ? bikselection?.WholeuserDescription?.name
      //     : bikselection.WholeuserDescription?.facebookdata
      //     ? bikselection.WholeuserDescription?.facebookdata?.name
      //     : bikselection.WholeuserDescription?.regInfo?.user?.name,
      // );
      data.append(
        'name',
        bikselection?.WholeuserDescription?.name
          ? bikselection?.WholeuserDescription?.name
          : bikselection.WholeuserDescription?.facebookdata
          ? bikselection.WholeuserDescription?.facebookdata?.name
          : bikselection.WholeuserDescription?.regInfo?.user?.name
          ? bikselection.WholeuserDescription?.regInfo?.user?.name
          : bikselection.WholeuserDescription?.userData?.name,
      );
      data.append('city', bikselection.WholeuserDescription.regcities);
      data.append('fcm_token', fcmToken);
      data.append('gender', bikselection.WholeuserDescription.gender);
      data.append(
        'introduction',
        bikselection.WholeuserDescription.description,
      );
      bikselection.bikescolors.forEach((item) => {
        data.append('bike[]', item);
      });
      bikeslevel.length > 0 && data.append('level', bikeslevel[0]);
      data.append('latitude', latitude ? latitude : bikselection.latitude);
      data.append('longitude', longitude ? longitude : bikselection.longitude);
      !bikselection.WholeuserDescription?.userData?.email &&
        data.append('email_verified_at', Date.now());

      (bikselection.WholeuserDescription.facebookdata ||
        bikselection.WholeuserDescription.regInfo) &&
        data.append(
          'image_url',
          bikselection.WholeuserDescription?.facebookdata
            ? bikselection.WholeuserDescription?.facebookdata?.picture?.data
                ?.url
            : bikselection.WholeuserDescription?.regInfo?.user?.photo,
        );
      bikselection.WholeuserDescription.image1 &&
        data.append('image1', {
          uri: bikselection.WholeuserDescription.image1,
          type: 'image/jpeg',
          name: 'image' + new Date() + '.jpg',
        });
      bikselection.WholeuserDescription.image2 &&
        data.append('image2', {
          uri: bikselection.WholeuserDescription.image2,
          type: 'image/jpeg',
          name: 'image' + new Date() + '.jpg',
        });
      bikselection.WholeuserDescription.image3 &&
        data.append('image3', {
          uri: bikselection.WholeuserDescription.image3,
          type: 'image/jpeg',
          name: 'image' + new Date() + '.jpg',
        });
      setloading(true);
      fetch('https://bicicita.com/app/api/register', {
        method: 'POST',
        body: data,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
        .then((response) => response.json())
        .then((res) => {
          console.log('res of api', res);
          setloading(false);
          if (res.status === 'success') {
            if (bikselection.WholeuserDescription?.userData?.email) {
              navigation.navigate('EmailVerifiction', {
                user: res,
                isSignUp: true,
              });
            } else {
              ToggleLoginSignup(res)(dispatch);
            }
          } else if (res.status === 'error') {
            setreponseError(res.error.password);
          } else if (res.error.email == 'The email has already been taken.') {
            // Alert.alert('Email not avalible');
            setreponseError(res.error.email);
          }
        })
        .catch((error) => {
          setloading(false);
          console.log('i even come in get', error);
        });
    }
  };
  console.log('latt', latitude);
  console.log('long', longitude);
  return (
    <View style={styles.container}>
      <View style={styles.topviewcontainer}>
        <View style={{bottom: 12, alignItems: 'center'}}>
          <Text style={styles.pageheadingone}>Nivel</Text>
          <Text style={styles.pageheading}>Elige tu Nivel</Text>
        </View>
        <View style={{top: 30}}>
          {arr.map((item, index) =>
            item.length == 2 ? (
              <View
                key={`item-${index}`}
                style={{
                  flexDirection: 'row',
                  width: 200,
                  justifyContent: 'space-between',
                }}>
                {item.map((itemInner, index) => {
                  const locArr = [...bikeslevel];
                  const NewIndex = locArr.findIndex(
                    (itemk) => itemk === itemInner,
                  );
                  return (
                    <Typesofbikes
                      key={`Colors-${index}`}
                      title={itemInner}
                      borderColor={
                        NewIndex !== -1 ? colorsarr[NewIndex] : 'black'
                      }
                      backgroundColor={
                        NewIndex !== -1 ? colorsarr[NewIndex] : 'black'
                      }
                      borderWidth={1}
                      selected={NewIndex !== -1}
                      onPress={() => {
                        setBokeLevelErr('');
                        if (NewIndex === -1) {
                          locArr.length < 1 && locArr.push(itemInner);
                        } else {
                          locArr.splice(NewIndex, 1);
                        }
                        setbikeslevel(locArr);
                      }}
                    />
                  );
                })}
              </View>
            ) : (
              <View
                key={`Colors-${index}`}
                style={{
                  flexDirection: 'row',
                  width: 200,
                  justifyContent: 'center',
                }}>
                {item.map((itemInner, index) => {
                  const locArr = [...bikeslevel];
                  const NewIndex = locArr.findIndex(
                    (itemk) => itemk === itemInner,
                  );
                  return (
                    <Typesofbikes
                      key={`Color-${index}`}
                      title={itemInner}
                      borderColor={
                        NewIndex !== -1 ? colorsarr[NewIndex] : 'black'
                      }
                      backgroundColor={
                        NewIndex !== -1 ? colorsarr[NewIndex] : 'black'
                      }
                      borderWidth={1}
                      selected={NewIndex !== -1}
                      onPress={() => {
                        if (NewIndex === -1) {
                          locArr.length < 1 && locArr.push(itemInner);
                        } else {
                          locArr.splice(NewIndex, 1);
                        }
                        setbikeslevel(locArr);
                      }}
                    />
                  );
                })}
              </View>
            ),
          )}
        </View>
      </View>
      <View style={styles.middleviewcontainer}>
        <View style={{width: '100%', justifyContent: 'center', padding: 40}}>
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.textstyle}>1. </Text>
            <Text style={styles.textstyle}> Inicio: Empezando con la bici</Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.textstyle}>2. </Text>
            <Text style={styles.textstyle}>
              Medio: Al menos 1 vez a la semana
            </Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.textstyle}>3. </Text>
            <Text style={styles.textstyle}>
              Avanzado: Al menos 2 veces a la semana y nivel técnico avanzado
            </Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.textstyle}>4. </Text>
            <Text style={styles.textstyle}>
              Pro: Más de 3 veces a la semana y nivel técnico alto
            </Text>
          </View>
        </View>
      </View>
      {responseError ? (
        <Text
          style={{
            textAlign: 'center',
            fontSize: 10,
            color: 'red',
            fontFamily: 'Inter-Regular',
          }}>
          {responseError}
        </Text>
      ) : null}
      {bikeLevelErr ? (
        <Text
          style={{
            textAlign: 'center',
            fontSize: 10,
            color: 'red',
            fontFamily: 'Inter-Regular',
          }}>
          {bikeLevelErr}
        </Text>
      ) : null}
      <View style={styles.bottomviewcontainer}>
        <ButtonComp
          onPress={() => {
            // latitude ? handleSignUpPress() : navigation.goBack();
            handleSignUpPress();
          }}
          style={{backgroundColor: '#9561F1', borderRadius: 6}}
          title={'Finalizar'}
        />
      </View>
      {loading ? <Loader /> : null}
    </View>
  );
};

export default FinalLevel_Nivel;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  topviewcontainer: {
    flex: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textstyle: {
    textAlign: 'left',
    color: '#626579',
    fontSize: 14,
    fontFamily: 'Inter-Regular',
  },
  middleviewcontainer: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomviewcontainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pageheadingone: {
    fontSize: 18,
    color: '#4d4d4d',
    opacity: 0.6,
  },
  pageheading: {
    fontSize: 14,
    opacity: 0.6,
    color: '#4d4d4d',
  },
});
