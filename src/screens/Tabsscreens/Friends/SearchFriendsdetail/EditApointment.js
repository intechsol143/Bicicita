import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Modal,
  Platform,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import Axios from 'axios';
import ImageView from 'react-native-image-viewing';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import Icons from 'react-native-vector-icons/Entypo';
import {Left, Body, Right} from 'native-base';
import MapIcon from 'react-native-vector-icons/Feather';
import IconFor from 'react-native-vector-icons/MaterialIcons';
import IconPlus from 'react-native-vector-icons/AntDesign';
import {CheckBox} from 'react-native-elements';
import ButtonComp from '../../../../components/ButtonComp';
import moment from 'moment';

import {typeofBikes} from '../../../../Data/data';
import DateTimePicker from '@react-native-community/datetimepicker';
import ImagePicker from 'react-native-image-crop-picker';
import IconMinus from 'react-native-vector-icons/AntDesign';
import Loader from '../../../../components/LoaderComponent';
import {setSelectedUsers} from '../../../../redux/Actions/UsersActionFiles';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {useSelector, useDispatch} from 'react-redux';

const EditApointment = ({navigation, route}) => {
  const {user} = useSelector(({stakreducer}) => stakreducer);
  const {apoinrments} = useSelector(({RegcityReducer}) => RegcityReducer);
  const {selectedUsers} = useSelector(({AppReducer}) => AppReducer);
  const dispatch = useDispatch();
  // console.log('appointments', apoinrments);
  const dateP = new Date();
  const TimeP = new Date();
  const [thistypeofbike, setthistypeofbike] = useState(
    apoinrments?.detaildata.bike,
  );
  const [male, setmale] = useState(
    apoinrments?.detaildata.gender[0] === 'Hombre',
  );
  const [visible, setIsVisible] = useState(false);
  const [images, setImages] = useState([]);
  const [female, setfemale] = useState(
    apoinrments?.detaildata.gender[0] === 'Mujer',
  );
  // const [editPlace, setEditPlace] = useState('');
  const [editLat, setEditLat] = useState('');
  const [editLong, setEditLong] = useState('');
  const [datastaus, setstatus] = useState(apoinrments?.detaildata.status);
  const [bothgenders, setbothgenders] = useState(
    apoinrments?.detaildata.gender[0] === 'Todos',
  );
  const [showBigger, setShowBigger] = useState(false);

  const [date, setDate] = useState(
    moment(apoinrments.detaildata.calendar).format('DD-MM-YYYY'),
  );
  const [newLat, setNewLat] = useState('');
  const [time, setTime] = useState(apoinrments.detaildata.time);
  const [vis, setVis] = useState(false);
  const [showAnd, setShowAnd] = useState(false);
  const [showAnd1, setShowAnd1] = useState(false);
  const [showAnd2, setShowAnd2] = useState(true);
  const [showAndTime, setShowAndTime] = useState(false);
  const [showAndTime2, setShowAndTime2] = useState(true);
  const [introduction, setIntrodunction] = useState(
    apoinrments.detaildata.introduction,
  );
  const [show, setShow] = useState(apoinrments.detaildata.time);
  const [increment, setIncrement] = useState(
    parseInt(apoinrments.detaildata.participants),
  );
  const [editPlace, setEditPlace] = useState('');
  const [loading, setloading] = useState(false);
  const [thislevel, setthislevel] = useState(apoinrments.detaildata.level);
  const [updateimage, setupdateimage] = useState('');
  const [mapImage, setMapImage] = useState();
  const _imageView = () => {
    setIsVisible(true);
  };
  const myModal1 = () => {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={vis}
        onRequestClose={() => {
          setVis(!vis);
        }}>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#00000088',
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-end',
              marginRight: 20,
              marginBottom: 10,
              width: '100%',
            }}>
            <Icons
              onPress={() => setVis(!vis)}
              name="circle-with-cross"
              color="white"
              size={25}
            />
          </View>
          <View
            style={{
              borderRadius: 10,
              // padding: 20,
              height: '50%',
              // flex: 4,
              backgroundColor: 'white',
              width: '100%',
            }}>
            <MapView
              provider={PROVIDER_GOOGLE}
              style={{flex: 1}}
              region={{
                latitude: parseFloat(user.userdata.latitude),
                longitude: parseFloat(user.userdata.longitude),
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
              <Marker
                draggable
                coordinate={
                  editLat
                    ? {
                        latitude: parseFloat(editLat),
                        longitude: parseFloat(editLong),
                      }
                    : {
                        latitude: parseFloat(apoinrments.detaildata.latitude),
                        longitude: parseFloat(apoinrments.detaildata.longitude),
                      }
                }
                onDragEnd={(e) => {
                  setNewLat(e.nativeEvent.coordinate);
                  console.log('coordinates', e.nativeEvent.coordinate);
                }}
              />
            </MapView>
          </View>
          <View style={{width: '100%', alignItems: 'center', marginTop: 20}}>
            <ButtonComp
              onPress={() => {
                setVis(!vis);
                setEditLat(newLat.latitude);
                setEditLong(newLat.longitude);
                // setmap(true);
              }}
              style={{backgroundColor: '#9561F1', borderRadius: 6}}
              title={'seleccionar coordenada'}
            />
          </View>
        </View>
      </Modal>
    );
  };
  useEffect(() => {
    if (editLat) {
      getName();
    }
  }, [editLat]);
  const getName = () => {
    let radius = 150;
    let myapikey = 'AIzaSyB_H2_55fkLI8-EyfYLUlJI4obywUd-KnE';
    let request = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${newLat.latitude},${newLat.longitude}&radius=${radius}&key=${myapikey}`;
    return Axios.get(request)
      .then(({data, status}) => {
        if (data.status == 'OK') {
          console.log('data', data.results[0].name);
          setEditPlace(data.results[0].name);
          // // Alert.alert("i get data");
          // setSearchInput(data.results[0].name);
          // setgoogleSearchText(data.results[0].name);
          // ToastAndroid.show("Got Location !", ToastAndroid.SHORT);
          // return status === 200 || status === 201 ? data : null;
        } else {
          // Alert.alert("i got denied")
        }
      })
      .catch((e) => {});
  };
  const chooseImage = (img) => {
    ImagePicker.openPicker({
      multiple: false,
      width: 300,
      height: 400,
      cropping: false,
    }).then((image) => {
      if (img) {
        setupdateimage(image.path);
      } else {
        setMapImage(image.path);
      }
    });
  };
  const handleConfirm = (date) => {
    // console.warn('A date has been picked: ', date);
    setDate(moment(date).format('DD-MM-YYYY'));
    setShow(moment(date).format('YYYY-MM-DD'));
    hideDatePicker();
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
              <Icons name="circle-with-cross" size={20} />
            </TouchableOpacity>
          </View>
          <MapView
            provider={PROVIDER_GOOGLE}
            style={{flex: 1}}
            region={{
              latitude: editLat
                ? parseFloat(editLat)
                : parseFloat(apoinrments.detaildata.latitude),
              longitude: editLat
                ? parseFloat(editLong)
                : parseFloat(apoinrments.detaildata.longitude),
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

            <Marker
              // draggable
              coordinate={
                editLat
                  ? {
                      latitude: editLat ? parseFloat(editLat) : '33.6844202',
                      longitude: editLong
                        ? parseFloat(editLong)
                        : '74.35874729999999',
                    }
                  : {
                      latitude: parseFloat(apoinrments.detaildata.latitude),
                      longitude: parseFloat(apoinrments.detaildata.longitude),
                    }
              }
              onDragEnd={(e) => {
                setDeparture(e.nativeEvent.coordinate);
              }}
            />

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
  const handleConfirm1 = (time) => {
    // console.warn('A date has been picked: ', date);
    setTime(moment(time).format('h:mm a'));
    hideDatePicker1();
  };
  const hideDatePicker = () => {
    setShowAnd(false);
  };
  const hideDatePicker1 = () => {
    setShowAnd1(false);
  };
  const EditApointment = () => {
    const gender = bothgenders
      ? 'Todos'
      : male
      ? 'Hombre'
      : female
      ? 'Mujer'
      : '';

    setloading(true);
    const data = new FormData();

    gender && data.append('gender[]', gender);
    introduction && data.append('introduction', introduction);
    increment && data.append('participants', increment);
    data.append('city', editPlace ? editPlace : apoinrments.detaildata.city);
    selectedUsers.length &&
      selectedUsers?.forEach((item) => {
        data.append('invite[]', item.friend_id);
      });
    time && data.append('time', time);
    date && data.append('calendar', show);
    data.append(
      'longitude',
      editLong ? editLong : apoinrments.detaildata.longitude,
    );
    data.append(
      'latitude',
      editLat ? editLat : apoinrments.detaildata.latitude,
    );
    data.append('id', apoinrments.detaildata.id);
    datastaus && data.append('status', datastaus);
    updateimage &&
      data.append('image', {
        uri: updateimage,
        type: 'image/jpeg',
        name: 'image' + new Date() + '.jpg',
      });
    mapImage &&
      data.append('map_image', {
        uri: mapImage,
        type: 'image/jpeg',
        name: 'image' + new Date() + '.jpg',
      });
    thislevel.forEach((item) => {
      data.append('level[]', item);
    });
    thistypeofbike.forEach((item) => {
      data.append('bike[]', item);
    });
    fetch(`https://bicicita.com/app/api/edit-appointment`, {
      method: 'POST',
      body: data,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${user?.userdata.api_token}`,
      },
    })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log('called here', responseJson);
        setloading(false);
        setSelectedUsers([])(dispatch);
        if (responseJson.status === 'success') {
          Alert.alert(responseJson.message);
          navigation.navigate('Profile');
          console.log('res', responseJson);
        }
      })
      .catch((error) => {
        setloading(false);
        console.log('error', error);
      });
  };
  // console.log('freiends', selectedUsers);
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
          <IconPlus
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

  const Levels = (levelitem) => {
    const element = [...thislevel];
    const index = element.findIndex((item) => item === levelitem);
    if (index === -1) {
      element.push(levelitem);
    } else {
      element.splice(index, 1);
    }
    setthislevel(element);
  };
  console.log('app', editLat);
  console.log('lg', editLong);
  console.log('place', editPlace);
  const myapikeys = 'AIzaSyB_H2_55fkLI8-EyfYLUlJI4obywUd-KnE';
  return (
    <View style={styles.conatiner}>
    <ImageView
        images={images}
        imageIndex={0}
        visible={visible}
        onRequestClose={() => setIsVisible(false)}
      />
      <ScrollView keyboardShouldPersistTaps="always">
        <View style={styles.subcontainer}>
          <Text style={styles.headerstext}>Crear Cita</Text>
          <View style={styles.placecontainer}>
            <Left>
              <Text style={{fontSize: 14, fontFamily: 'Inter-Medium'}}>
                Lugar
              </Text>
            </Left>
            <Right>
              {/* <TouchableOpacity
                onPress={() => setVis(true)}
                style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text style={{fontSize: 13, fontFamily: 'Inter-Medium'}}>
                  {editPlace ? editPlace : apoinrments.detaildata.city}
                </Text>
                <IconFor name={'keyboard-arrow-right'} size={24} />
              </TouchableOpacity> */}
              <GooglePlacesAutocomplete
                GooglePlacesDetailsQuery={{fields: 'geometry'}}
                fetchDetails={true}
                styles={{
                  textInputContainer: {
                    // backgroundColor: 'grey',
                    width: 200,
                  },
                  textInput: {
                    // height: 38,
                    color: '#5d5d5d',
                    // fontSize: 16,
                    borderWidth: 1,
                    borderColor: '#ccc',
                  },
                  listView: {
                    height: 100,
                  },
                }}
                value={'abc'}
                placeholder={
                  apoinrments?.detaildata?.city
                    ? apoinrments?.detaildata?.city
                    : 'Search'
                }
                onPress={(data, details = null) => {
                  // 'details' is provided when fetchDetails = true
                  // console.log('data', data);
                  // console.log('details', details);
                  setEditPlace(data.description);
                  console.log(
                    'lat ,long',
                    JSON.stringify(details.geometry.location),
                  );
                  // setDeparture({
                  //   lattitude: details.geometry.location.lat,
                  //   longitude: details.geometry.location.lng,
                  // });
                  setEditLong(details.geometry.location.lng);
                  setEditLat(details.geometry.location.lat);

                  // setTimeout(() => {
                  //   setmap(true);
                  // }, 1000);
                }}
                query={{
                  key: myapikeys,
                  language: 'en',
                }}
              />
            </Right>
          </View>
          <View style={styles.placecontainer}>
            <Left>
              <Text style={{fontSize: 12, fontFamily: 'Inter-Medium'}}>
                ¿Quién asistirá?
              </Text>
            </Left>
            <Right>
              <View style={{flexDirection: 'row'}}>
                <View style={{marginRight: 6}}>
                  <TouchableOpacity
                    onPress={() => {
                      if (bothgenders && male) {
                        setmale(true);
                        setfemale(false);
                      } else {
                        setfemale(false);
                        setmale(!male);
                      }
                      setbothgenders(false);
                    }}
                    style={{
                      padding: 6,
                      paddingLeft: 12,
                      paddingRight: 12,
                      borderRadius: 20,
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: male ? '#46E1FC' : '#979797',
                    }}>
                    <Text style={styles.text}>Hombre</Text>
                  </TouchableOpacity>
                </View>
                <View style={{marginRight: 6}}>
                  <TouchableOpacity
                    onPress={() => {
                      if (bothgenders && female) {
                        setmale(false);
                        setfemale(true);
                      } else {
                        setfemale(!female);
                        setmale(false);
                      }
                      setbothgenders(false);
                    }}
                    style={{
                      padding: 6,
                      paddingLeft: 12,
                      paddingRight: 12,
                      borderRadius: 20,
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: female ? '#46E1FC' : '#979797',
                    }}>
                    <Text style={styles.text}>Mujer</Text>
                  </TouchableOpacity>
                </View>

                <TouchableOpacity
                  onPress={() => {
                    setbothgenders(!bothgenders);
                    setmale(!bothgenders);
                    setfemale(!bothgenders);
                  }}
                  style={{
                    padding: 6,
                    borderRadius: 20,
                    alignItems: 'center',
                    paddingLeft: 12,
                    paddingRight: 12,
                    justifyContent: 'center',
                    backgroundColor: bothgenders ? '#FF632B' : '#979797',
                  }}>
                  <Text style={styles.text}>Todos</Text>
                </TouchableOpacity>
              </View>
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
                <TouchableOpacity
                  onPress={() => {
                    if (increment > 1) {
                      setIncrement(increment - 1);
                    }
                  }}
                  style={{
                    padding: 6,
                    borderRadius: 20,
                    backgroundColor: '#f8f8f8',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <IconMinus name={'minus'} size={15} color={'#9561f1'} />
                </TouchableOpacity>
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
                      {increment}
                    </Text>
                  </View>
                </View>
                <TouchableOpacity
                  onPress={() => setIncrement(increment + 1)}
                  style={{
                    padding: 6,
                    borderRadius: 20,
                    backgroundColor: '#f8f8f8',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <IconPlus name={'plus'} size={15} color={'#9561f1'} />
                </TouchableOpacity>
              </View>
            </Right>
          </View>
          <View style={styles.placecontainer}>
            <Left>
              <Text style={{fontSize: 14, fontFamily: 'Inter-Medium'}}>
                Invitar amigos
              </Text>
            </Left>
            <Right>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  width: '40%',
                }}>
                <View
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 20,
                    padding: 6,
                    paddingLeft: 10,
                    paddingRight: 10,
                    backgroundColor: '#46E1FC',
                  }}>
                  <Text
                    style={{
                      fontSize: 12,
                      color: 'white',
                      fontFamily: 'Inter-Regular',
                    }}>
                    {selectedUsers.length
                      ? selectedUsers?.length
                      : apoinrments?.detaildata?.invite?.length
                      ? apoinrments?.detaildata?.invite?.length
                      : 0}
                  </Text>
                </View>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('Home', {
                      screen: 'Friendslist',
                      params: {
                        myitem: increment,
                        edit: true,
                        id: apoinrments?.detaildata?.id,
                      },
                    })
                  }
                  style={{
                    padding: 6,
                    borderRadius: 20,
                    backgroundColor: '#f8f8f8',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <IconPlus name={'plus'} size={15} color={'#9561f1'} />
                </TouchableOpacity>
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
              <TouchableOpacity
                onPress={() => {
                  setShowAnd(true);
                }}
                style={{flexDirection: 'row', alignItems: 'center'}}>
                {!date ? (
                  <Text style={{fontSize: 14, fontFamily: 'Inter-Medium'}}>
                    Calendrio
                  </Text>
                ) : (
                  <Text style={{fontSize: 14, fontFamily: 'Inter-Medium'}}>
                    {date}
                  </Text>
                )}
                <IconFor name={'keyboard-arrow-right'} size={24} />
              </TouchableOpacity>
            </Right>
            {showAnd && (
              <DateTimePickerModal
                isVisible={showAnd}
                mode="date"
                locale={'es'}
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
                minimumDate={
                  new Date(
                    new Date().getFullYear(),
                    new Date().getMonth(),
                    new Date().getDate(),
                  )
                }
              />
            )}
            {/* <DateTimePicker
                value={dateP}
                mode={'date'}
                minimumDate={new Date()}
                is24Hour={true}
                display={'calendar'}
                onChange={(_, selectedDate) => {
                  const thisDate = new Date(selectedDate);
                  const currentDate =
                    thisDate.getDate() +
                      '-' +
                      (thisDate.getMonth() + 1) +
                      '-' +
                      thisDate.getFullYear() || date;
                  setShowAnd(false);
                  setShowAnd2(true);
                  setDate(currentDate);
                }}
              /> */}
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
                  <TouchableOpacity
                    onPress={() => setShowAnd1(true)}
                    style={{
                      padding: 6,
                      backgroundColor: '#46E1FC',
                      borderRadius: 20,
                    }}>
                    {!time ? (
                      <Text
                        style={{
                          fontSize: 12,
                          color: 'white',
                          fontFamily: 'Inter-Regular',
                        }}>
                        02:00pm
                      </Text>
                    ) : (
                      <Text
                        style={{
                          fontSize: 12,
                          color: 'white',
                          fontFamily: 'Inter-Regular',
                        }}>
                        {time}
                      </Text>
                    )}
                  </TouchableOpacity>
                </View>
              </View>
            </Right>
            <DateTimePickerModal
              isVisible={showAnd1}
              mode="time"
              onConfirm={handleConfirm1}
              onCancel={hideDatePicker1}
            />
            {/* {showAndTime && (
              <DateTimePicker
                value={TimeP}
                mode={'time'}
                is24Hour={true}
                display={'clock'}
                onChange={(event, selectedDate) => {
                  setShowAndTime(false);
                  setShowAndTime2(true);
                  setTime(moment(selectedDate).format('h:mm a'));
                }}
              />
            )} */}
          </View>
          <View style={styles.placecontainer}>
            <Left>
              <Text
                style={{
                  fontFamily: 'Inter-Medium',
                  fontSize: 14,
                  color: '#020c26',
                }}>
                Tipo de bici
              </Text>
            </Left>
            <Right style={{flex: 2.5}}>
              <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}>
                <View style={{flexDirection: 'row'}}>
                  {typeofBikes.map((item, idx) => {
                    let selected = false;
                    let foundAt = -1;
                    if (user?.userdata) {
                      foundAt = thistypeofbike?.findIndex(
                        (itm) => itm === item,
                      );
                      if (foundAt > -1) selected = true;
                    }
                    return (
                      <TouchableOpacity
                        style={{margin: 3}}
                        key={'bics' + idx}
                        onPress={() => {
                          const locArr = [...thistypeofbike];
                          selected
                            ? locArr.splice(foundAt, 1)
                            : locArr.push(item);

                          setthistypeofbike(locArr);
                        }}>
                        <View
                          style={{
                            padding: 4,
                            borderRadius: 20,
                            paddingLeft: 12,
                            paddingRight: 12,
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: selected ? '#2E64F8' : 'grey',
                          }}>
                          <Text
                            style={{
                              fontFamily: 'Inter-Regular',
                              fontSize: 12,
                              color: 'white',
                            }}>
                            {item}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              </ScrollView>
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
              {thislevel && (
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
                      thislevel.findIndex((item) => item === 'Inicio') !== -1
                    }
                    onPress={() => Levels('Inicio')}
                  />
                </View>
              )}
              {thislevel && (
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
                      thislevel.findIndex((item) => item === 'medio') !== -1
                    }
                    onPress={() => Levels('medio')}
                  />
                </View>
              )}
              {thislevel && (
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
                      thislevel.findIndex((item) => item === 'Avanzado') !== -1
                    }
                    onPress={() => Levels('Avanzado')}
                  />
                </View>
              )}
              {thislevel && (
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
                      thislevel.findIndex((item) => item === 'Pro') !== -1
                    }
                    onPress={() => Levels('Pro')}
                  />
                </View>
              )}
            </View>
          </View>
          <View style={{height: 15}} />
          <TextInput
            textAlignVertical={'top'}
            style={{
              borderWidth: 0,
              width: '90%',
              borderRadius: 4,
              backgroundColor: '#e2e2e2',
              height: 100,
              padding: 4,
              paddingLeft: 8,
              color: 'black',
              fontFamily: 'Inter-Regular',
              fontSize: 14,
            }}
            placeholder={'Decriptcion de la ruta'}
            value={introduction}
            onChangeText={(text) => setIntrodunction(text)}
            underlineColorAndroid="transparent"
            multiline
          />
          <View style={{height: 0}} />
          <View
            style={{
              height: 105,
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
                justifyContent: 'space-between',
                flexDirection: 'row',
                width: '50%',
              }}>
              <TouchableOpacity
                onPress={() => chooseImage(true)}
                style={{height: 70, width: '80%'}}>
                <Image
                  source={{
                    uri: updateimage
                      ? updateimage
                      : apoinrments.detaildata.image,
                  }}
                  style={{
                    height: 70,
                    width: '100%',
                    borderRadius: 10,
                  }}
                />
              </TouchableOpacity>
            </View>

            {apoinrments.detaildata.latitude ? (
              <View
                style={{
                  height: 70,
                  borderRadius: 10,
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexDirection: 'row',
                  width: '50%',
                }}>
                <TouchableOpacity
                  // onPress={() => setShowBigger(true)}
                  // onLongPress={() => setShowBigger(false)}
                  style={{
                    height: '100%',
                    width: '100%',
                  }}>
                  <MapView
                    provider={PROVIDER_GOOGLE}
                    style={{flex: 1}}
                    region={{
                      latitude: editLat
                        ? parseFloat(editLat)
                        : parseFloat(apoinrments.detaildata.latitude),
                      longitude: editLat
                        ? parseFloat(editLong)
                        : parseFloat(apoinrments.detaildata.longitude),
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
                    <Marker
                      // draggable
                      coordinate={
                        editLat
                          ? {
                              latitude: editLat
                                ? parseFloat(editLat)
                                : '33.6844202',
                              longitude: editLong
                                ? parseFloat(editLong)
                                : '74.35874729999999',
                            }
                          : {
                              latitude: parseFloat(
                                apoinrments.detaildata.latitude,
                              ),
                              longitude: parseFloat(
                                apoinrments.detaildata.longitude,
                              ),
                            }
                      }
                      onDragEnd={(e) => {
                        setDeparture(e.nativeEvent.coordinate);
                        console.log('coordinates', e.nativeEvent.coordinate);
                      }}
                    />
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
                  </MapView>
                  <TouchableOpacity
                    style={{
                      // backgroundColor: 'red',
                      position: 'absolute',
                      height: 70,
                      width: '100%',
                    }}
                    onPress={() => setShowBigger(true)}></TouchableOpacity>
                </TouchableOpacity>
              </View>
            ) : (
              <View
                style={{
                  height: 70,
                  backgroundColor: '#979797',
                  width: '50%',
                  borderRadius: 5,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <MapIcon name={'map-pin'} size={24} color={'grey'} />
              </View>
            )}
          </View>

          <View style={{height: 5}} />
          <View style={{flexDirection: 'row', width: '90%'}}>
            <Left>
              <Text>Ruta</Text>
            </Left>
            <Body></Body>
            <Right>
              <View style={{flexDirection: 'row'}}>
                <View style={{marginRight: 6}}>
                  <TouchableOpacity
                    onPress={() => {
                      setstatus('private');
                    }}
                    style={{
                      padding: 4,
                      paddingRight: 25,
                      paddingLeft: 25,
                      borderRadius: 20,
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor:
                        datastaus === 'private' ? '#46E1FC' : '#979797',
                    }}>
                    <Text style={{color: 'white'}}>Si</Text>
                  </TouchableOpacity>
                </View>
                <View style={{marginRight: 6}}>
                  <TouchableOpacity
                    onPress={() => {
                      setstatus('public');
                    }}
                    style={{
                      padding: 4,
                      paddingRight: 25,
                      paddingLeft: 25,
                      borderRadius: 20,
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor:
                        datastaus === 'public' ? '#46E1FC' : '#979797',
                    }}>
                    <Text style={{color: 'white'}}>No</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Right>
          </View>
        </View>
        <View style={styles.bottomcontainer}>
          <ButtonComp
            onPress={() => EditApointment()}
            style={{backgroundColor: '#9561F1', borderRadius: 6}}
            title={'actualizar y guardar'}
          />
        </View>
      </ScrollView>
      {loading ? <Loader /> : null}
      {myModal1()}
      {myModal2()}
    </View>
  );
};

export default EditApointment;

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
    padding: 10,
    color: '#979797',
    fontFamily: 'Inter-Regular',
    bottom: 25,
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
