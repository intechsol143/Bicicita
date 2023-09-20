import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Platform,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import moment from 'moment';
import {Left, Body, Right} from 'native-base';
import MapIcon from 'react-native-vector-icons/Feather';
import {CheckBox} from 'react-native-elements';
import {useDispatch, useSelector} from 'react-redux';
import Icon from 'react-native-vector-icons/AntDesign';
import ButtonComp from '../../../../components/ButtonComp';
import Loader from '../../../../components/LoaderComponent';
import {ToggleApointments} from '../../../../redux/Actions/UsersActionFiles';

const AppointmentDetails = ({navigation, route}) => {
  const {user} = useSelector(({stakreducer}) => stakreducer);
  const dispatch = useDispatch();

  const [loading, setloading] = useState(false);

  const [editdata, seteditdata] = useState('');
  const {id} = route.params;
  console.log('id', id);
  useEffect(() => {
    setloading(true);
    fetch(`https://bicicita.com/app/api/detail-appointment/${id}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${user?.userdata.api_token}`,
      },
    })
      .then((response) => response.json())
      .then((res) => {
        seteditdata(res.detaildata);
        console.log('resi', res.detaildata);
        ToggleApointments(res)(dispatch);
      })
      .catch((error) => {})
      .finally(() => setloading(false));
  }, []);

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
          <Icon
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
  // console.log("appointment",)
  const deleteApointment = async () => {
    setloading(true);
    try {
      const data = new FormData();
      data.append('appointment_id', id);
      const res = await (
        await fetch(`https://bicicita.com/app/api/delete-user-appointment`, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${user?.userdata.api_token}`,
          },
          body: data,
        })
      ).json();
      console.log('res', res);
      setloading(true);
      if (res.status === 'success') {
        navigation.navigate('Credas');
      }
    } catch (error) {
      setloading(false);
    }
  };
  console.log('level', editdata.level);
  return loading ? (
    <Loader />
  ) : !editdata ? (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Text
        style={{
          fontSize: 14,
          fontFamily: 'Inter-Medium',
        }}>
        Cita no encontrada
      </Text>
    </View>
  ) : (
    <View style={styles.conatiner}>
      <ScrollView>
        <View style={styles.subcontainer}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Left></Left>
            <Body>
              <Text style={styles.headerstext}>Cita</Text>
            </Body>
            <Right>
              <TouchableOpacity
                onPress={() => navigation.navigate('EditApointment')}>
                <Image
                  source={require('../../../../assets/Icons/EditIcon.png')}
                  style={{
                    height: 25,
                    marginRight: 20,
                    width: 25,
                    resizeMode: 'contain',
                  }}
                />
              </TouchableOpacity>
            </Right>
          </View>
          <View style={{height: 20}} />
          <View style={styles.placecontainer}>
            <Left>
              <Text style={{fontSize: 14, fontFamily: 'Inter-Medium'}}>
                Lugar
              </Text>
            </Left>
            <Right>
              <View
                style={{
                  flexDirection: 'row',
                  // backgroundColor: 'red',
                  // width: '100%',

                  justifyContent: 'flex-end',
                  // alignItems: 'center',
                }}>
                <Text style={{fontSize: 12, fontFamily: 'Inter-Medium'}}>
                  {editdata.city}
                </Text>
              </View>
            </Right>
          </View>
          <View style={styles.placecontainer}>
            <Left>
              <Text style={{fontSize: 14, fontFamily: 'Inter-Medium'}}>
                ¿Quién asistirá?
              </Text>
            </Left>
            <Right>
              <View style={{flexDirection: 'row'}}>
                <View
                  style={{
                    padding: 6,
                    borderRadius: 20,
                    alignItems: 'center',
                    paddingLeft: 12,
                    paddingRight: 12,
                    justifyContent: 'center',
                    backgroundColor: '#FF632B',
                  }}>
                  <Text style={styles.text}>{editdata.gender}</Text>
                </View>
              </View>
            </Right>
          </View>
          <View style={styles.placecontainer}>
            <Left>
              <Text style={{fontSize: 14, fontFamily: 'Inter-Medium'}}>
                Tipo de bici
              </Text>
            </Left>
            <Right>
              <Text>{editdata.bike}</Text>
            </Right>
          </View>
          <View style={styles.placecontainer}>
            <Left>
              <Text style={{fontSize: 14, fontFamily: 'Inter-Medium'}}>
                Participantes
              </Text>
            </Left>
            <Right>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <View style={{marginLeft: 10, marginRight: 10}}>
                  <View
                    style={{
                      padding: 6,
                      paddingRight: 10,
                      paddingLeft: 10,
                      backgroundColor: '#46E1FC',
                      borderRadius: 20,
                    }}>
                    <Text
                      style={{
                        fontSize: 12,
                        color: 'white',
                        fontFamily: 'Inter-Regular',
                      }}>
                      {editdata.participants}
                    </Text>
                  </View>
                </View>
              </View>
            </Right>
          </View>
          <View style={styles.placecontainer}>
            <Left>
              <Text style={{fontSize: 14, fontFamily: 'Inter-Medium'}}>
                Fecha
              </Text>
            </Left>
            <Right>
              <View
                style={{
                  flexDirection: 'row',
                  padding: 4,
                  paddingLeft: 6,
                  paddingRight: 6,
                  borderRadius: 20,
                  backgroundColor: '#46E1FC',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    fontSize: 14,
                    color: 'white',
                    fontFamily: 'Inter-Medium',
                  }}>
                  {moment(editdata.calendar).format('DD/MM/YYYY')}
                </Text>
              </View>
            </Right>
          </View>
          <View style={styles.placecontainer}>
            <Left>
              <Text style={{fontSize: 14, fontFamily: 'Inter-Medium'}}>
                Hora
              </Text>
            </Left>
            <Right>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <View style={{marginRight: 10}}>
                  <View
                    style={{
                      padding: 4,
                      paddingRight: 6,
                      paddingLeft: 6,
                      backgroundColor: '#46E1FC',
                      borderRadius: 20,
                    }}>
                    <Text
                      style={{
                        fontSize: 14,
                        color: 'white',
                        fontFamily: 'Inter-Regular',
                      }}>
                      {editdata.time}
                    </Text>
                  </View>
                </View>
              </View>
            </Right>
          </View>
          <View
            style={{
              height: 45,
              borderTopWidth: 0.5,
              borderBottomWidth: 0.5,
              borderTopColor: '#e2e2e2',
              borderBottomColor: '#e2e2e2',
              width: '90%',
              alignItems: 'center',
              justifyContent: 'flex-start',
              flexDirection: 'row',
            }}>
            <Text style={{fontSize: 14, fontFamily: 'Inter-Medium'}}>
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
              {editdata.level && (
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
                      editdata.level.findIndex((item) => item === 'Inicio') !==
                      -1
                    }
                  />
                </View>
              )}
              {editdata.level && (
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
                      editdata.level.findIndex((item) => item === 'medio') !==
                      -1
                    }
                  />
                </View>
              )}
              {editdata.level && (
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
                      editdata.level.findIndex(
                        (item) => item === 'Avanzado',
                      ) !== -1
                    }
                  />
                </View>
              )}
              {editdata.level && (
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
                      editdata.level.findIndex((item) => item === 'Pro') !== -1
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
              width: '90%',
              borderRadius: 4,
              backgroundColor: '#e2e2e2',
              padding: 10,
              paddingLeft: 8,
            }}>
            <Text style={{fontFamily: 'Inter-Regular'}}>
              {editdata.introduction}
            </Text>
          </View>
          <View style={{height: 18}} />
          <View
            style={{
              height: 120,
              borderRadius: 6,
              flexDirection: 'row',
              width: '90%',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <View
              style={{
                height: 120,
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'row',
                width: '50%',
              }}>
              <View style={{height: '100%', width: '100%'}}>
                <Image
                  source={{
                    uri: editdata?.image
                      ? editdata?.image
                      : 'https://images.unsplash.com/photo-1511886674141-d5c41a18b3d5?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=752&q=80',
                  }}
                  style={{
                    height: '100%',
                    width: '100%',
                    borderRadius: 10,
                  }}
                />
              </View>
            </View>
            {editdata?.latitude ? (
              <View
                style={{
                  height: 120,
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexDirection: 'row',
                  width: '50%',
                  // backgroundColor: 'red',
                  marginLeft: 3,
                }}>
                <View
                  style={{
                    height: '100%',
                    width: '100%',
                  }}>
                  <MapView
                    provider={PROVIDER_GOOGLE}
                    style={{flex: 1}}
                    region={{
                      latitude: parseFloat(editdata?.latitude),
                      longitude: parseFloat(editdata?.longitude),
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
                    {/* <Marker
                      // draggable
                      coordinate={{
                        latitude: parseFloat(user.userdata.latitude),
                        longitude: parseFloat(user.userdata.longitude),
                      }}
                      onDragEnd={(e) => {
                        setDeparture(e.nativeEvent.coordinate);
                        console.log('coordinates', e.nativeEvent.coordinate);
                      }}
                    /> */}
                    <Marker
                      // draggable

                      coordinate={{
                        latitude: parseFloat(editdata.latitude),
                        longitude: parseFloat(editdata.longitude),
                      }}
                      onDragEnd={(e) => {
                        setDeparture(e.nativeEvent.coordinate);
                        console.log('coordinates', e.nativeEvent.coordinate);
                      }}
                    />
                  </MapView>
                </View>
                {/* <Image
                  source={{
                    uri: editdata.map_image,
                  }}
                  style={{
                    height: '100%',
                    width: '100%',
                    borderRadius: 10,
                  }}
                /> */}
              </View>
            ) : (
              <View
                style={{
                  height: 120,
                  backgroundColor: '#979797',
                  width: '50%',
                  borderRadius: 5,
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginLeft: 3,
                }}>
                <MapIcon name={'map-pin'} size={24} color={'grey'} />
              </View>
            )}
          </View>

          <View style={{height: 30}} />
          <View style={{flexDirection: 'row', width: '90%'}}>
            <Left>
              <Text>Ruta</Text>
            </Left>
            <Body></Body>
            {/* <Right> */}
            <View style={{flexDirection: 'row'}}>
              <View style={{marginRight: 6}}>
                <View
                  style={{
                    padding: 4,
                    paddingRight: 25,
                    paddingLeft: 25,
                    borderRadius: 20,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#46E1FC',
                  }}>
                  <Text style={{color: 'white'}}>
                    {editdata.status === 'private' ? 'privada' : 'pública'}
                  </Text>
                </View>
              </View>
            </View>
            {/* </Right> */}
          </View>
        </View>
        {/* <View style={{...styles.bottomcontainer, ...{marginBottom: 10}}}>
          <ButtonComp
            onPress={() => navigation.navigate('RequestedAsistances', {id})}
            style={{backgroundColor: '#9561F1', borderRadius: 6}}
            title={'Asistencias solicitadas'}
          />
        </View> */}
        <View style={styles.bottomcontainer}>
          <ButtonComp
            onPress={() => deleteApointment()}
            style={{backgroundColor: '#9561F1', borderRadius: 6}}
            title={'Borrar Cita'}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default AppointmentDetails;

const styles = StyleSheet.create({
  conatiner: {
    flex: 1,
    paddingBottom: 20,
    backgroundColor: 'white',
  },
  text: {
    color: 'white',
    fontFamily: 'Inter-Bold',
    fontSize: 10,
  },
  selectdropdown: {
    marginTop: 14,
    backgroundColor: '#dfdfdf',
    height: 40,
    width: '100%',
    justifyContent: 'center',
    borderRadius: 6,
  },
  subcontainer: {
    flex: 5,
    alignItems: 'center',
    padding: 10,
    marginTop: 20,
    marginBottom: 20,
  },
  switchcontainer: {
    flexDirection: 'row',
    margin: 14,
  },
  searchSection: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: 0.3,
    borderRadius: 5,
    paddingHorizontal: 12,
    height: 40,
  },

  input: {
    flex: 1,
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 0,
    backgroundColor: '#fff',
    color: '#424242',
  },
  firstbtn: {
    padding: 6,
    paddingLeft: 12,
    paddingRight: 12,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FF632B',
  },
  colorchangeviewbtns: {
    padding: 6,
    paddingRight: 12,
    paddingLeft: 12,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#46E1FC',
  },
  placecontainer: {
    flexDirection: 'row',
    margin: 14,
    bottom: 12,
  },
  bottomcontainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapiconview: {
    height: 35,
    width: 35,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    backgroundColor: '#38D836',
  },
  headerstext: {
    fontSize: 18,
    color: '#979797',
    fontFamily: 'Inter-Regular',
  },
  passwordContainer: {
    flexDirection: 'row',
    borderWidth: 0,
    borderRadius: 10,
    paddingHorizontal: 10,
    alignItems: 'center',
    borderColor: '#000',
    width: '90%',
    backgroundColor: '#f8f8f8',
  },
});
