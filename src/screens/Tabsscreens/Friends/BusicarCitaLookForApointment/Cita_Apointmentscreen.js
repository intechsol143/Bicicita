import React, {useState, useEffect} from 'react';
import {Left, Right} from 'native-base';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Platform,
  Modal,
  Alert,
  ScrollView,
} from 'react-native';
import LocationIcon from 'react-native-vector-icons/Entypo';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import {CheckBox} from 'react-native-elements';
// import {ScrollView} from 'react-native-gesture-handler';
import IconPin from 'react-native-vector-icons/SimpleLineIcons';

import Icon from 'react-native-vector-icons/AntDesign';
import ImageUploadIcon from 'react-native-vector-icons/Entypo';
import {useSelector} from 'react-redux';
import Icon1 from 'react-native-vector-icons/AntDesign';
import ButtonComp from '../../../../components/ButtonComp';
import Loader from '../../../../components/LoaderComponent';
import ImageView from 'react-native-image-viewing';
const Cita_Apointmentscreen = ({navigation, route}) => {
  const {user} = useSelector(({stakreducer}) => stakreducer);
  const {id} = route.params;
  const [showBigger, setShowBigger] = useState(false);
  const [appointment, setAppointment] = useState('');
  const [loading, setloading] = useState(false);
  const [visible, setIsVisible] = useState(false);
  const [images, setImages] = useState([]);
  useEffect(() => {
    Apointment();
  }, []);
  // console.log('user', user.userdata.latitude);
  console.log('app', appointment);
  useEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <Image
          source={require('../../../../assets/Icons/logoapp.png')}
          style={{height: 40, width: 150, resizeMode: 'contain'}}
        />
      ),
      headerLeft: () =>
        Platform.OS === 'ios' && (
          <Icon1
            name="arrowleft"
            color="black"
            size={20}
            style={{left: 15}}
            onPress={() => navigation.goBack()}
          />
        ),
      headerStyle: {
        elevation: 0,
      },
      headerTitleAlign: 'center',
    });
  }, []);
  const _imageView = () => {
    setIsVisible(true);
  };
  const myModal2 = () => (
    <Modal
      animationType="slide"
      transparent={true}
      visible={showBigger}
      onRequestClose={() => {
        setShowBigger(!showBigger);
      }}>
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          backgroundColor: '#00000088',
          justifyContent: 'center',
        }}>
        <View style={{height: '80%', width: '100%'}}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-end',
              paddingRight: 10,
            }}>
            <TouchableOpacity
              onPress={() => setShowBigger(false)}
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                height: 25,
                width: 30,
                // backgroundColor: 'red',
              }}>
              <LocationIcon name="circle-with-cross" size={20} />
            </TouchableOpacity>
          </View>
          <MapView
            provider={PROVIDER_GOOGLE}
            style={{flex: 1}}
            region={{
              latitude: parseFloat(appointment?.latitude),
              longitude: parseFloat(appointment?.longitude),
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            }}>
            {/* {list()} */}
            {/* <Marker
                coordinate={{
                  latitude: parseFloat(user.userdata.latitude),
                  longitude: parseFloat(user.userdata.longitude),
                  // latitudeDelta: 0.0922,
                  // longitudeDelta: 0.0421,
                }}
                // pinColor="red"
                // image={{uri: element.profile_image}}
              /> */}
            {appointment?.latitude ? (
              <Marker
                // draggable
                coordinate={{
                  latitude: parseFloat(appointment?.latitude),
                  longitude: parseFloat(appointment?.longitude),
                }}
                onDragEnd={(e) => {
                  // setDeparture(e.nativeEvent.coordinate);
                }}
              />
            ) : null}
            {/* <Marker
              // draggable
              coordinate={{
                latitude: parseFloat(user?.userdata?.latitude),
                longitude: parseFloat(user?.userdata?.longitude),
              }}
              onDragEnd={(e) => {
                setDeparture(e.nativeEvent.coordinate);
              }}
            /> */}
          </MapView>
        </View>
      </View>
    </Modal>
  );
  const Apointment = () => {
    setloading(true);
    fetch(`https://bicicita.com/app/api/appointment/${id}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${user?.userdata.api_token}`,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        console.log('data', res);
        setAppointment(res.userdata);
        setloading(false);
      })
      .catch((err) => {
        setloading(false);
        console.log('error comming');
      });
  };

  const _acceptAppointment = () => {
    setloading(true);
    const data = new FormData();
    data.append('creator_id', appointment.user_id);
    data.append('appointment_id', appointment.id);
    fetch(`https://bicicita.com/app/api/confirm-Appointment`, {
      method: 'POST',
      body: data,
      headers: {
        Authorization: `Bearer ${user?.userdata.api_token}`,
      },
    })
      .then((response) => response.json())
      .then((responseJson) => {
        setloading(false);

        if (responseJson.status == 'success') {
          Alert.alert(responseJson.message, '', [
            {text: 'OK', onPress: () => navigation.goBack()},
          ]);
        }
      })
      .catch((err) => {
        setloading(false);
      });
  };
  console.log('app', appointment);

  const _rejectAppointment = () => {
    setloading(true);
    const data = new FormData();
    data.append('appointment_id', appointment.id);
    fetch(`https://bicicita.com/app/api/reject-Appointment`, {
      method: 'POST',
      body: data,
      headers: {
        Authorization: `Bearer ${user?.userdata.api_token}`,
      },
    })
      .then((response) => response.json())
      .then((responseJson) => {
        setloading(false);
        if (responseJson.status == 'success') {
          Alert.alert(responseJson.message, '', [
            {text: 'OK', onPress: () => navigation.goBack()},
          ]);
        }
      })
      .catch((err) => {
        setloading(false);
      });
  };

  const _requestAppointment = () => {
    setloading(true);
    const data = new FormData();
    data.append('creator_id', appointment.user_id);
    data.append('appointment_id', appointment.id);
    fetch(`https://bicicita.com/app/api/request-appointment`, {
      method: 'POST',
      body: data,
      headers: {
        Authorization: `Bearer ${user?.userdata.api_token}`,
      },
    })
      .then((response) => response.json())
      .then((res) => {
        setloading(false);
        if (res.status == 'success') {
          Alert.alert(res.message, '', [
            {text: 'OK', onPress: () => navigation.goBack()},
          ]);
        }
      })
      .catch((err) => {
        setloading(false);
      });
  };
  // console.log(object);
  return loading ? (
    <Loader />
  ) : (
    <View style={styles.container}>
      <ImageView
        images={images}
        imageIndex={0}
        visible={visible}
        onRequestClose={() => setIsVisible(false)}
      />
      <View style={styles.subcontainer}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text
            style={{
              textAlign: 'center',
              fontSize: 18,
              color: '#979797',
              fontFamily: 'Inter-Regular',
            }}>
            Cita
          </Text>
          <View style={{flexDirection: 'row', marginTop: 20}}>
            <Left>
              <Text
                style={{
                  fontSize: 14,
                  fontFamily: 'Inter-Medium',
                  color: '#020c26',
                }}>
                Lugar
              </Text>
            </Left>
            <Right style={{flex: 3}}>
              <Text
                style={{
                  fontSize: 14,
                  fontFamily: 'Inter-Medium',
                  color: '#020c26',
                }}>
                {appointment?.city}
              </Text>
            </Right>
          </View>
          <View style={{flexDirection: 'row', marginTop: 15}}>
            <Left>
              <Text
                style={{
                  fontSize: 14,
                  fontFamily: 'Inter-Medium',
                  color: '#020c26',
                }}>
                Tipo de bici
              </Text>
            </Left>
            <Right>
              <View style={{flexDirection: 'row'}}>
                {appointment?.bike?.map((item) => {
                  return (
                    <View style={{margin: 3}} key={`bike-${item}`}>
                      <View
                        style={{
                          backgroundColor: '#38D836',
                          borderRadius: 30,
                          paddingRight: 12,
                          paddingLeft: 12,
                          padding: 6,
                        }}>
                        <Text
                          style={{
                            fontSize: 12,
                            fontFamily: 'Inter-Bold',
                            color: 'white',
                          }}>
                          {item}
                        </Text>
                      </View>
                    </View>
                  );
                })}
              </View>
            </Right>
          </View>

          <View style={{flexDirection: 'row', marginTop: 15}}>
            <Left>
              <Text
                style={{
                  fontSize: 14,
                  fontFamily: 'Inter-Medium',
                  color: '#020c26',
                }}>
                Participantes
              </Text>
            </Left>
            <Right>
              <View style={{flexDirection: 'row'}}>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('ApointmentInvitedUsers', {
                      id: appointment?.id,
                    })
                  }
                  style={{
                    height: 30,
                    width: 30,
                    borderRadius: 15,
                    marginRight: 15,
                    backgroundColor: '#ccc',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Icon name="plus" size={20} color={'#9561F1'} />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('ApointmentInvitedUsers', {
                      id: appointment?.id,
                    })
                  }
                  style={{
                    backgroundColor: '#46E1FC',
                    borderRadius: 30,
                    paddingLeft: 12,
                    paddingRight: 12,
                    padding: 6,
                  }}>
                  <Text
                    style={{
                      fontSize: 12,
                      fontFamily: 'Inter-Regular',
                      color: 'white',
                    }}>
                    {appointment?.participants}
                  </Text>
                </TouchableOpacity>
              </View>
            </Right>
          </View>

          <View style={{flexDirection: 'row', marginTop: 15}}>
            <Left>
              <Text
                style={{
                  fontSize: 14,
                  fontFamily: 'Inter-Medium',
                  color: '#020c26',
                }}>
                Fecha/Hora
              </Text>
            </Left>
            <Right>
              <View style={{flexDirection: 'row'}}>
                <View style={{marginRight: 10}}>
                  <View
                    style={{
                      backgroundColor: '#2E64F8',
                      borderRadius: 30,
                      paddingRight: 12,
                      paddingLeft: 12,
                      padding: 6,
                    }}>
                    <Text
                      style={{
                        fontSize: 12,
                        fontFamily: 'Inter-Regular',
                        color: 'white',
                      }}>
                      {appointment?.calendar}
                    </Text>
                  </View>
                </View>

                <View
                  style={{
                    backgroundColor: '#2E64F8',
                    borderRadius: 30,
                    paddingLeft: 12,
                    paddingRight: 12,
                    padding: 6,
                  }}>
                  <Text
                    style={{
                      fontSize: 12,
                      fontFamily: 'Inter-Regular',
                      color: 'white',
                    }}>
                    {appointment?.time}
                  </Text>
                </View>
              </View>
            </Right>
          </View>

          <View style={{height: 20}} />
          <View style={styles.checkboxparent}>
            <Text
              style={{
                textAlign: 'left',
                fontFamily: 'Inter-Medium',
                fontSize: 14,
              }}>
              Nivel
            </Text>
            <View
              style={{
                flexDirection: 'row',
                marginLeft: 28,
                alignItems: 'flex-end',
                justifyContent: 'center',
                width: '80%',
              }}>
              {appointment?.level && (
                <View style={{marginLeft: '45%'}}>
                  <CheckBox
                    center
                    checkedIcon={
                      <Image
                        source={require('../../../../assets/Circles/Circlegreen_tick.png')}
                        style={{height: 25, width: 25, resizeMode: 'contain'}}
                      />
                    }
                    uncheckedIcon={
                      <Image
                        source={require('../../../../assets/Circles/Circlegreen.png')}
                        style={{height: 25, width: 25, resizeMode: 'contain'}}
                      />
                    }
                    checked={
                      appointment?.level.findIndex(
                        (item) => item === 'Inicio',
                      ) !== -1
                    }
                  />
                </View>
              )}

              {appointment?.level && (
                <View style={{right: 15}}>
                  <CheckBox
                    center
                    checkedIcon={
                      <Image
                        source={require('../../../../assets/Circles/Circleorange_tick.png')}
                        style={{height: 25, width: 25, resizeMode: 'contain'}}
                      />
                    }
                    uncheckedIcon={
                      <Image
                        source={require('../../../../assets/Circles/Circleorange.png')}
                        style={{height: 25, width: 25, resizeMode: 'contain'}}
                      />
                    }
                    checked={
                      appointment?.level.findIndex(
                        (item) => item === 'medio',
                      ) !== -1
                    }
                  />
                </View>
              )}
              {appointment?.level && (
                <View style={{right: 30}}>
                  <CheckBox
                    center
                    checkedIcon={
                      <Image
                        source={require('../../../../assets/Circles/Circleblue_tick.png')}
                        style={{height: 25, width: 25, resizeMode: 'contain'}}
                      />
                    }
                    uncheckedIcon={
                      <Image
                        source={require('../../../../assets/Circles/Circleblue.png')}
                        style={{height: 25, width: 25, resizeMode: 'contain'}}
                      />
                    }
                    checked={
                      appointment?.level.findIndex(
                        (item) => item === 'Avanzado',
                      ) !== -1
                    }
                  />
                </View>
              )}
              {appointment?.level && (
                <View style={{right: 45}}>
                  <CheckBox
                    center
                    checkedIcon={
                      <Image
                        source={require('../../../../assets/Circles/Circlepink_tick.png')}
                        style={{height: 25, width: 25, resizeMode: 'contain'}}
                      />
                    }
                    uncheckedIcon={
                      <Image
                        source={require('../../../../assets/Circles/Circlepink.png')}
                        style={{height: 25, width: 25, resizeMode: 'contain'}}
                      />
                    }
                    checked={
                      appointment?.level.findIndex((item) => item === 'Pro') !==
                      -1
                    }
                  />
                </View>
              )}
            </View>
          </View>

          <View style={{height: 15}} />
          <View
            style={{
              borderWidth: 0,
              width: '100%',
              borderRadius: 4,
              backgroundColor: '#dfdfdf',
              padding: 4,
            }}>
            <Text style={{fontSize: 14, color: 'black', padding: 8}}>
              {appointment?.introduction}
            </Text>
          </View>
          <View style={{height: 17}} />
          <View
            style={{
              height: 100,
              alignItems: 'center',
              justifyContent: 'space-between',
              flexDirection: 'row',
              width: '100%',
            }}>
            <TouchableOpacity
              onPress={() => {
                setImages([
                  {
                    uri: appointment?.image,
                  },
                ]);
                _imageView();
              }}
              style={{height: 120, width: '55%'}}>
              <Image
                source={{uri: appointment?.image}}
                style={{
                  height: 100,
                  width: '100%',
                  // resizeMode: 'contain',
                  borderRadius: 10,
                }}
              />
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingHorizontal: 7,
                  justifyContent: 'space-around',
                }}>
                <Text
                  style={{
                    textAlign: 'center',
                    fontFamily: 'Inter-Regular',
                    fontSize: 12,
                    color: '#979797',
                  }}>
                  Foto
                </Text>
                <ImageUploadIcon name={'image'} size={15} color={'#979797'} />
              </View>
            </TouchableOpacity>
            <View style={{height: 120, width: '43%'}}>
              {appointment?.latitude && (
                <MapView
                  provider={PROVIDER_GOOGLE}
                  style={{flex: 1}}
                  region={{
                    latitude: parseFloat(appointment?.latitude),
                    longitude: parseFloat(appointment?.longitude),
                    latitudeDelta: 0.01,
                    longitudeDelta: 0.01,
                  }}>
                  <Marker
                    // draggable

                    coordinate={{
                      latitude: parseFloat(appointment?.latitude),
                      longitude: parseFloat(appointment?.longitude),
                    }}
                    // onDragEnd={(e) => {
                    //   setDeparture(e.nativeEvent.coordinate);
                    //   console.log('coordinates', e.nativeEvent.coordinate);
                    // }}
                  />
                </MapView>
              )}
              <TouchableOpacity
                onPress={() => setShowBigger(true)}
                style={{
                  // backgroundColor: 'red',
                  position: 'absolute',
                  height: 120,
                  width: '100%',
                }}></TouchableOpacity>
              {/* {appointment?.map_image ? (
                <Image
                  source={{uri: appointment?.map_image}}
                  style={{
                    height: 100,
                    width: '100%',
                    // resizeMode: 'contain',
                    borderRadius: 10,
                  }}
                />
              ) : (
                <View
                  style={{
                    height: 100,
                    borderRadius: 10,
                    width: '100%',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#D8D8D8',
                  }}>
                  <Text
                    style={{
                      fontSize: 16,
                      color: 'black',
                      fontFamily: 'Inter-Regular',
                    }}>
                    Mapa
                  </Text>
                </View>
              )} */}
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <Text
                  style={{
                    textAlign: 'center',
                    fontSize: 12,
                    color: '#979797',
                    fontFamily: 'Inter-Regular',
                  }}>
                  Mapa de la ruta
                </Text>
                <IconPin name={'location-pin'} size={15} color={'#979797'} />
              </View>
            </View>
          </View>
          <View style={{height: 20}} />
          {!appointment?.is_reject && (
            <>
              {!appointment?.is_in_appointment ? (
                <View
                  style={{
                    alignItems: 'center',
                  }}>
                  <ButtonComp
                    disabled={appointment?.request_status}
                    onPress={() => {
                      if (!appointment?.request_status) {
                        _requestAppointment();
                      } else {
                        Alert.alert('Request sent already', '', [
                          {text: 'OK', onPress: () => navigation.goBack()},
                        ]);
                      }
                    }}
                    style={{
                      borderRadius: 6,
                      width: '100%',
                      backgroundColor: '#9561F1',
                    }}
                    title={
                      appointment?.request_status
                        ? 'Pendiente de asistencia'
                        : 'Solicitar asistencia'
                    }
                  />
                </View>
              ) : !appointment?.status ? (
                <View
                  style={{
                    alignItems: 'center',
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                  }}>
                  <ButtonComp
                    onPress={() => _acceptAppointment()}
                    style={{
                      borderRadius: 6,
                      width: '45%',
                      backgroundColor: '#9561F1',
                    }}
                    title={'Aceptar'}
                  />
                  <ButtonComp
                    onPress={() => _rejectAppointment()}
                    style={{
                      borderRadius: 6,
                      width: '45%',
                      backgroundColor: '#9561F1',
                    }}
                    title={'Rechazar'}
                  />
                </View>
              ) : null}
            </>
          )}
        </ScrollView>
      </View>
      {myModal2()}
    </View>
  );
};

export default Cita_Apointmentscreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  subcontainer: {
    flex: 5,
    paddingHorizontal: 12,
    backgroundColor: 'white',
    marginTop: 10,
    marginBottom: 10,
  },
  bottomcontainer: {
    flex: 1,
    backgroundColor: 'grey',
  },
  checkboxparent: {
    height: 45,
    alignItems: 'center',
    justifyContent: 'space-around',
    flexDirection: 'row',
    width: '100%',
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
    borderTopColor: '#e2e2e2',
    borderBottomColor: '#e2e2e2',
  },
});
