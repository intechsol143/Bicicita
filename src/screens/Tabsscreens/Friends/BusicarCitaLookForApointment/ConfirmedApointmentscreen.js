import React, {useEffect} from 'react';
import {StyleSheet, Text, Platform, View, Image, Alert} from 'react-native';
import {Left, Right} from 'native-base';
import {CheckBox} from 'react-native-elements';
import ButtonComp from '../../../../components/ButtonComp';
import IconImage from 'react-native-vector-icons/Entypo';
import MapIcon from 'react-native-vector-icons/SimpleLineIcons';
import {useSelector} from 'react-redux';
import Icon from 'react-native-vector-icons/AntDesign';
const ConfirmedApointmentscreen = ({navigation, route}) => {
  const {user} = useSelector(({stakreducer}) => stakreducer);
  const {appointment} = route.params;

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

  const ConfirmedApointmentFunc = () => {
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
        if (responseJson.status == 'success') {
          Alert.alert(responseJson.message);
        }
      })
      .catch((err) => {});
  };
  return (
    <View style={styles.container}>
      <View style={styles.subcontainer}>
        <View style={{alignItems: 'center', padding: 12}}>
          <Text
            style={{fontSize: 18, color: 'red', fontFamily: 'Inter-Regular'}}>
            Solicitud de asistencia enviada:
          </Text>
          <Text
            style={{
              fontSize: 16,
              color: '#020c26',
              fontFamily: 'Inter-Regular',
            }}>
            {appointment?.city}
          </Text>
          <Text
            style={{
              fontSize: 14,
              color: '#9fa4bc',
              fontFamily: 'Inter-Regular',
            }}>
            {appointment.introduction}
          </Text>
        </View>
        <View style={{height: 24}} />
        <View
          style={{
            height: 100,
            alignItems: 'center',
            justifyContent: 'space-between',
            flexDirection: 'row',
            width: '100%',
          }}>
          <View style={{height: 120, width: '55%'}}>
            <Image
              source={{uri: appointment.image}}
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
                paddingHorizontal: 7,
                justifyContent: 'space-around',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  textAlign: 'center',
                  fontSize: 12,
                  color: '#979797',
                  fontFamily: 'Inter-Regular',
                }}>
                Foto
              </Text>
              <IconImage name={'image'} size={15} color={'#979797'} />
            </View>
          </View>
          <View style={{height: 120, width: '43%'}}>
            {appointment.map_image ? (
              <Image
                source={{uri: appointment.map_image}}
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
                <Text style={{fontFamily: 'Inter-Regular'}}>Mapa</Text>
              </View>
            )}
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
              <MapIcon name={'location-pin'} size={15} color={'#979797'} />
            </View>
          </View>
        </View>
        <View style={{height: 30}} />
        <View style={{flexDirection: 'row'}}>
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
              {appointment.bike?.map((item, index) => {
                return (
                  <View key={`bike-${index}`} style={{margin: 3}}>
                    <View
                      style={{
                        backgroundColor: '#FF632B',
                        borderRadius: 20,
                        padding: 6,
                        paddingRight: 12,
                        paddingLeft: 12,
                      }}>
                      <Text
                        style={{
                          color: 'white',
                          fontFamily: 'Inter-Regular',
                          fontSize: 12,
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
        <View style={{height: 30}} />
        <View style={{flexDirection: 'row'}}>
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
                    borderRadius: 20,
                    padding: 6,
                    paddingRight: 12,
                    paddingLeft: 12,
                  }}>
                  <Text
                    style={{
                      color: 'white',
                      fontFamily: 'Inter-Regular',
                      fontSize: 12,
                    }}>
                    {appointment.calendar}
                  </Text>
                </View>
              </View>

              <View
                style={{
                  backgroundColor: '#2E64F8',
                  borderRadius: 20,
                  padding: 6,
                  paddingLeft: 12,
                  paddingRight: 12,
                }}>
                <Text
                  style={{
                    color: 'white',
                    fontFamily: 'Inter-Regular',
                    fontSize: 12,
                  }}>
                  {appointment.time}
                </Text>
              </View>
            </View>
          </Right>
        </View>
        <View style={{height: 30}} />
        <View
          style={{
            height: 45,
            alignItems: 'center',
            justifyContent: 'space-around',
            flexDirection: 'row',
            width: '100%',
            borderTopWidth: 0.5,
            borderBottomWidth: 0.5,
            borderTopColor: '#e2e2e2',
            borderBottomColor: '#e2e2e2',
          }}>
          <Text
            style={{
              textAlign: 'left',
              width: '50%',
              fontSize: 14,
              fontFamily: 'Inter-Medium',
            }}>
            Nivel
          </Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'flex-end',
              justifyContent: 'center',
              width: '45%',
            }}>
            {appointment.level && (
              <View style={{marginLeft: '10%'}}>
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
                    appointment.level.findIndex((item) => item === 'Inicio') !==
                    -1
                  }
                />
              </View>
            )}

            {appointment.level && (
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
                    appointment.level.findIndex((item) => item === 'medio') !==
                    -1
                  }
                />
              </View>
            )}
            {appointment.level && (
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
                    appointment.level.findIndex(
                      (item) => item === 'Avanzado',
                    ) !== -1
                  }
                />
              </View>
            )}
            {appointment.level && (
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
                    appointment.level.findIndex((item) => item === 'Pro') !== -1
                  }
                />
              </View>
            )}
          </View>
        </View>
      </View>
      <View style={styles.bottomcontainer}>
        <ButtonComp
          onPress={() => ConfirmedApointmentFunc()}
          style={{borderRadius: 6, backgroundColor: '#9561F1'}}
          title={'Confirmar asistencia'}
        />
      </View>
    </View>
  );
};

export default ConfirmedApointmentscreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  subcontainer: {
    flex: 5,
    marginHorizontal: 12,
  },
  bottomcontainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
