import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Platform,
  Image,
  Switch,
  TouchableOpacity,
  Alert,
} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {Left, Right} from 'native-base';
import MapIcon from 'react-native-vector-icons/SimpleLineIcons';
import IconFor from 'react-native-vector-icons/MaterialIcons';
import {CheckBox} from 'react-native-elements';
import moment from 'moment';
import DateTimePicker from '@react-native-community/datetimepicker';
import {useSelector, useDispatch} from 'react-redux';
import Icon from 'react-native-vector-icons/AntDesign';
import ButtonComp from '../../../components/ButtonComp';
import Loader from '../../../components/LoaderComponent';
import {ToggleLookApointment} from '../../../redux/Actions/UsersActionFiles';

const Buscacita_Lookforapointmnt = ({navigation}) => {
  const {user} = useSelector(({stakreducer}) => stakreducer);
  const {lookApointment} = useSelector(({RegcityReducer}) => RegcityReducer);
  const longitude = user?.userdata?.longitude;
  const latitude = user?.userdata?.latitude;

  const [check1, setcheck1] = useState(false);
  const [check2, setcheck2] = useState(false);
  const [check3, setcheck3] = useState(false);
  const [check4, setcheck4] = useState(false);
  const [togleon, settoggleon] = useState(false);
  const [date, setDate] = useState('');
  const [male, setmale] = useState(false);
  const [female, setfemale] = useState(false);
  const [bothgenders, setbothgenders] = useState(false);
  const [showAnd, setShowAnd] = useState(false);
  const [showAnd2, setShowAnd2] = useState(false);
  const [loading, setloading] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <Image
          source={require('../../../assets/Icons/logoapp.png')}
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
  const showDatePicker = () => {
    setShowAnd(true);
  };

  const hideDatePicker = () => {
    setShowAnd(false);
  };

  const handleConfirm = (date) => {
    // console.warn('A date has been picked: ', date);
    setDate(moment(date).format('YYYY-MM-DD'));
    hideDatePicker();
  };
  const ApointmentLooking = () => {
    setloading(true);

    let gender = male
      ? 'Hombre'
      : female
      ? 'Mujer'
      : bothgenders
      ? 'Todos'
      : '';

    const data = new FormData();
    togleon && longitude && data.append('longitude', longitude);
    togleon && latitude && data.append('latitude', latitude);
    lookApointment && data.append('city', lookApointment);
    gender && data.append('gender[]', gender);
    date && data.append('calendar', date);
    check1 && data.append('level[]', 'Inicio');
    check2 && data.append('level[]', 'medio');
    check3 && data.append('level[]', 'Avanzado');
    check4 && data.append('level[]', 'Pro');
    gender = '';

    fetch(`https://bicicita.com/app/api/appointment-filter`, {
      method: 'POST',
      body: data._parts.length ? data : null,
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${user?.userdata?.api_token}`,
      },
    })
      .then((response) => response.json())
      .then((responseJson) => {
        setloading(false);
        if (responseJson.status === 'success') {
          navigation.navigate('Busicar_Geolocationmap', {respo: responseJson});
        } else if (responseJson.status === 'error') {
          Alert.alert(responseJson.message);
          setloading(false);
        }
      })
      .catch(() => {})
      .finally(() => {
        setDate('');
        setShowAnd2(false);
        ToggleLookApointment('')(dispatch);
        setmale(false);
        setfemale(false);
        setbothgenders(false);
        setcheck1(false);
        setcheck2(false);
        setcheck3(false);
        setcheck4(false);
        settoggleon(false);
        setloading(false);
      });
  };
  return (
    <View style={styles.conatiner}>
      <View style={styles.subcontainer}>
        <Text style={styles.headerstext}>Buscar Cita</Text>
        <View style={styles.switchcontainer}>
          <Left style={{flexDirection: 'row', alignItems: 'center'}}>
            <View style={styles.mapiconview}>
              <MapIcon name={'location-pin'} size={22} color={'white'} />
            </View>
            <Text style={{paddingLeft: 12, fontFamily: 'Inter-Medium'}}>
              Cerca de mí (100km)
            </Text>
          </Left>
          <Right>
            <Switch
              value={togleon}
              trackColor={{false: '#D1D5E8', true: '#9561F1'}}
              thumbColor={'#FFFFFF'}
              onValueChange={() => settoggleon(!togleon)}
            />
          </Right>
        </View>

        <View style={styles.placecontainer}>
          <Left>
            <Text style={{fontSize: 14, fontFamily: 'Inter-Medium'}}>
              Lugar
            </Text>
          </Left>
          <Right>
            <TouchableOpacity
              onPress={() => {
                if (lookApointment) {
                  ToggleLookApointment('')(dispatch);
                } else {
                  navigation.navigate('Search', {ApointmentLook: true});
                }
              }}
              style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style={{fontSize: 14, fontFamily: 'Inter-Medium'}}>
                {lookApointment ? lookApointment : 'Elige localidad'}
              </Text>
              <IconFor name={'keyboard-arrow-right'} size={24} />
            </TouchableOpacity>
          </Right>
        </View>
        <View style={styles.placecontainer}>
          <Left>
            <Text style={{fontFamily: 'Inter-Medium', fontSize: 12}}>
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
            <Text style={{fontFamily: 'Inter-Medium', fontSize: 14}}>
              Fecha
            </Text>
          </Left>
          <Right>
            <TouchableOpacity
              onPress={() => {
                showDatePicker();
              }}
              style={{flexDirection: 'row', alignItems: 'center'}}>
              {!date ? (
                <Text style={{fontSize: 14, fontFamily: 'Inter-Medium'}}>
                  Calendario
                </Text>
              ) : (
                <Text style={{fontSize: 14, fontFamily: 'Inter-Medium'}}>
                  {date}
                </Text>
              )}
              <IconFor name={'keyboard-arrow-right'} size={24} />
            </TouchableOpacity>
          </Right>
          <DateTimePickerModal
            isVisible={showAnd}
            mode="date"
            locale={'es'}
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
          />
          {/* {showAnd && (
            <DateTimePicker
              value={new Date()}
              mode={'date'}
              minimumDate={new Date(1950, 0, 1)}
              is24Hour={true}
              display={'default'}
              onChange={(_event, selectedDate) => {
                setShowAnd(false);
                setShowAnd2(true);
                setDate(moment(selectedDate).format('YYYY-MM-DD'));
              }}
            />
          )} */}
        </View>

        <View
          style={{
            height: 45,
            borderTopWidth: 0.5,
            borderBottomWidth: 0.5,
            width: '90%',
            alignItems: 'center',
            borderBottomColor: '#e2e2e2',
            borderTopColor: '#e2e2e2',
            justifyContent: 'flex-start',
            flexDirection: 'row',
          }}>
          <Text style={{fontSize: 14, fontFamily: 'Inter-Medium'}}>Nivel</Text>
          <View
            style={{
              flexDirection: 'row',
              marginLeft: 28,
              alignItems: 'flex-end',
              justifyContent: 'center',
              width: '80%',
            }}>
            <View style={{marginLeft: '45%'}}>
              <CheckBox
                center
                checkedIcon={
                  <Image
                    source={require('../../../assets/Circles/Circlegreen_tick.png')}
                    style={{height: 25, width: 25, resizeMode: 'contain'}}
                  />
                }
                uncheckedIcon={
                  <Image
                    source={require('../../../assets/Circles/Circlegreen.png')}
                    style={{height: 25, width: 25, resizeMode: 'contain'}}
                  />
                }
                checked={check1}
                onPress={() => setcheck1(!check1)}
              />
            </View>

            <View style={{right: 15}}>
              <CheckBox
                center
                checkedIcon={
                  <Image
                    source={require('../../../assets/Circles/Circleorange_tick.png')}
                    style={{height: 25, width: 25, resizeMode: 'contain'}}
                  />
                }
                uncheckedIcon={
                  <Image
                    source={require('../../../assets/Circles/Circleorange.png')}
                    style={{height: 25, width: 25, resizeMode: 'contain'}}
                  />
                }
                checked={check2}
                onPress={() => setcheck2(!check2)}
              />
            </View>
            <View style={{right: 30}}>
              <CheckBox
                center
                checkedIcon={
                  <Image
                    source={require('../../../assets/Circles/Circleblue_tick.png')}
                    style={{height: 25, width: 25, resizeMode: 'contain'}}
                  />
                }
                uncheckedIcon={
                  <Image
                    source={require('../../../assets/Circles/Circleblue.png')}
                    style={{height: 25, width: 25, resizeMode: 'contain'}}
                  />
                }
                checked={check3}
                onPress={() => setcheck3(!check3)}
              />
            </View>
            <View style={{right: 45}}>
              <CheckBox
                center
                checkedIcon={
                  <Image
                    source={require('../../../assets/Circles/Circlepink_tick.png')}
                    style={{height: 25, width: 25, resizeMode: 'contain'}}
                  />
                }
                uncheckedIcon={
                  <Image
                    source={require('../../../assets/Circles/Circlepink.png')}
                    style={{height: 25, width: 25, resizeMode: 'contain'}}
                  />
                }
                checked={check4}
                onPress={() => setcheck4(!check4)}
              />
            </View>
          </View>
        </View>
      </View>
      <View style={{height: 10}} />
      <View style={styles.bottomcontainer}>
        <ButtonComp
          onPress={() => ApointmentLooking()}
          style={{backgroundColor: '#9561F1', borderRadius: 6}}
          title={'Buscar'}
        />
      </View>
      {loading ? <Loader /> : null}
    </View>
  );
};

export default Buscacita_Lookforapointmnt;

const styles = StyleSheet.create({
  conatiner: {
    flex: 1,
    backgroundColor: 'white',
  },
  subcontainer: {
    flex: 5,
    alignItems: 'center',
    padding: 10,
    // backgroundColor: 'red',
  },
  switchcontainer: {
    flexDirection: 'row',
    margin: 14,
  },
  text: {
    color: 'white',
    fontFamily: 'Inter-Bold',
    fontSize: 10,
  },
  firstbtn: {
    padding: 6,
    paddingRight: 12,
    paddingLeft: 12,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FF632B',
  },
  colorchangeviewbtns: {
    padding: 6,
    paddingLeft: 12,
    paddingRight: 12,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#46E1FC',
  },
  placecontainer: {
    flexDirection: 'row',
    marginHorizontal: 10,
    marginVertical: 14,
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
    backgroundColor: '#9561F1',
  },
  headerstext: {
    fontSize: 18,
    padding: 10,
    color: '#979797',
    fontFamily: 'Inter-Regular',
    bottom: 12,
  },
  passwordContainer: {
    flexDirection: 'row',
    borderWidth: 0,
    borderRadius: 10,
    paddingHorizontal: 10,
    alignItems: 'center',
    borderColor: '#000',
    width: '90%',
    backgroundColor: '#dfdfdf',
  },
});
