import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Switch,
  Platform,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {Left, Right} from 'native-base';
import MapIcon from 'react-native-vector-icons/SimpleLineIcons';
import IconFor from 'react-native-vector-icons/MaterialIcons';
import {CheckBox} from 'react-native-elements';
import MultiSelect from 'react-native-multiple-select';
import {useSelector, useDispatch} from 'react-redux';
import Icon from 'react-native-vector-icons/AntDesign';
import ButtonComp from '../../../components/ButtonComp';
import Loader from '../../../components/LoaderComponent';
import {ToggleSearchFriends} from '../../../redux/Actions/UsersActionFiles';

const Buscaramigos_Searchfirends = ({navigation}) => {
  const {user} = useSelector(({stakreducer}) => stakreducer);
  const {searrchfriends} = useSelector(({Citiesreducer}) => Citiesreducer);
  const longitude = user?.userdata?.longitude;
  const latitude = user?.userdata?.latitude;

  const dispatch = useDispatch();

  const [check1, setcheck1] = useState(false);
  const [check2, setcheck2] = useState(false);
  const [check3, setcheck3] = useState(false);
  const [check4, setcheck4] = useState(false);
  const [togleon, settoggleon] = useState(false);
  const [male, setmale] = useState(false);
  const [female, setfemale] = useState(false);
  const [bothgenders, setbothgenders] = useState(false);
  const [name, setName] = useState('');
  const [selectedItems, setSelectedItems] = useState([]);
  const [bikes, setbikes] = useState([]);
  const [colorRes, setcolorsRes] = useState([]);
  const [loading, setloading] = useState(false);

  const bikesarray = [
    {
      id: 1,
      name: 'E-bike Carretera',
      color: 'red',
    },
    {
      id: 2,
      name: 'Carretera',
      color: 'blue',
    },
    {
      id: 3,
      name: 'Mtb',
      color: 'orange',
    },
    {
      id: 4,
      name: 'E-bike Mtb',
      color: 'yellow',
    },
    {
      id: 5,
      name: 'Gravel',
      color: 'skyblue',
    },
    {
      id: 6,
      name: 'Paseo',
      color: 'black',
    },
    {
      id: 7,
      name: 'Descenso',
      color: 'brown',
    },
    {
      id: 8,
      name: 'Enduro',
      color: 'grey',
    },
  ];
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

  const HandlleBuscar_LookFor = () => {
    setloading(true);

    const gender = bothgenders
      ? 'Todos'
      : male
      ? 'Hombre'
      : female
      ? 'Mujer'
      : '';
    const data = new FormData();
    const jsonData = {name, gender, level: [], bikes: []};
    togleon && longitude && data.append('longitude', longitude);
    togleon && latitude && data.append('latitude', latitude);
    gender && data.append('gender', gender);
    searrchfriends && data.append('city', searrchfriends);
    name && data.append('name', name);
    check1 && (data.append('level[]', 'Inicio'), jsonData.level.push(1));
    check2 && (data.append('level[]', 'medio'), jsonData.level.push(2));
    check3 && (data.append('level[]', 'Avanzado'), jsonData.level.push(3));
    check4 && (data.append('level[]', 'Pro'), jsonData.level.push(4));
    bikes.forEach((item) => {
      data.append('bike[]', item);
      jsonData.bikes.push(item);
    });
    console.log('data', data);
    fetch('https://bicicita.com/app/api/friend-filter', {
      method: 'POST',
      body: data._parts.length ? data : null,
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${user?.userdata.api_token}`,
      },
    })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log('res', responseJson);
        setloading(false);
        if (responseJson.status === 'success') {
          navigation.navigate('Searchedfriendetail', {
            data: responseJson.userdata,
            colors: colorRes,
          });
        } else if (responseJson.status === 'error') {
          Alert.alert(responseJson.message);
        }
      })
      .catch((error) => {
        console.log('err', error);
      })
      .finally(() => {
        setloading(false);
        settoggleon(false);
        ToggleSearchFriends('')(dispatch);
        setcheck1(false);
        setcheck2(false);
        setcheck3(false);
        setcheck4(false);
        setmale(false);
        setfemale(false);
        setbothgenders(false);
        setbikes([]);
        setName('');
      });
  };

  const onSelectedItemsChange = (selectedItems) => {
    const res = bikesarray.filter((item) => selectedItems.includes(item.id));
    setSelectedItems(selectedItems);
    setcolorsRes(res);
    let data = [];
    res.map((item) => {
      data.push(item.name);
    });
    setbikes(data);
  };
  // console.log('user', user?.userdata.api_token);
  return (
    <View style={styles.conatiner}>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
        }}>
        <View style={styles.subcontainer}>
          <Text style={styles.headerstext}>Buscar amigos</Text>
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
          <View style={styles.passwordContainer}>
            <TextInput
              underlineColorAndroid="transparent"
              style={styles.inputStyle}
              autoCorrect={false}
              // keyboardType="visible-password"
              style={{height: 50}}
              placeholder="Nombre"
              placeholderTextColor="grey"
              value={name}
              onChangeText={(text) => setName(text)}
            />
          </View>

          <View style={styles.placecontainer}>
            <Left>
              <Text style={{fontSize: 14, fontFamily: 'Inter-Medium'}}>
                Lugar
              </Text>
            </Left>
            <Right>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('Search', {searchuser: true})
                }
                style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text style={{fontSize: 14, fontFamily: 'Inter-Medium'}}>
                  {searrchfriends ? searrchfriends : 'Elige localidad'}
                </Text>
                <IconFor name={'keyboard-arrow-right'} size={24} />
              </TouchableOpacity>
            </Right>
          </View>

          <View style={styles.placecontainer}>
            <Left>
              <Text style={{fontFamily: 'Inter-Medium', fontSize: 12}}>
                ¿Qué buscas?
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
          <View style={{width: '90%'}}>
            <MultiSelect
              styleDropdownMenuSubsection={{
                ...styles.selectdropdown,
                ...{paddingLeft: 10, paddingRight: 5, marginTop: 0},
              }}
              hideTags
              items={bikesarray}
              uniqueKey="id"
              onSelectedItemsChange={onSelectedItemsChange}
              selectedItems={selectedItems}
              selectText="Tipo de bici"
              textColor={'#979797'}
              searchInputPlaceholderText=""
              searchIcon={false}
              tagRemoveIconColor={'blue'}
              tagBorderColor={'skyblue'}
              tagTextColor={'skybllue'}
              selectedItemTextColor={'skyblue'}
              selectedItemIconColor={'skyblue'}
              itemTextColor="#000"
              displayKey="name"
              searchInputStyle={{color: '#000'}}
              submitButtonColor={'skyblue'}
              submitButtonText="Select"
              textInputProps={{editable: false, autoFocus: false}}
              styleInputGroup={{display: 'none'}}
            />
          </View>
          <View style={styles.checkboxparents}>
            <Text style={{fontFamily: 'Inter-Medium', fontSize: 14}}>
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
                  onPress={() => {
                    setcheck1(!check1);
                  }}
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
        <View style={styles.bottomcontainer}>
          <ButtonComp
            onPress={HandlleBuscar_LookFor}
            style={{backgroundColor: '#9561F1', borderRadius: 6}}
            title={'Buscar'}
          />
        </View>
      </ScrollView>
      {loading ? <Loader /> : null}
    </View>
  );
};

export default Buscaramigos_Searchfirends;

const styles = StyleSheet.create({
  conatiner: {
    flex: 1,
    backgroundColor: 'white',
  },
  subcontainer: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
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
  inputStyle: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    flex: 1,
    color: '#9fa4bc',

    left: 6,
  },
  checkboxparents: {
    height: 45,
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
    width: '90%',
    borderBottomColor: '#dfdfdf',
    borderTopColor: '#dfdfdf',
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'row',
  },
  firstbtn: {
    padding: 6,
    borderRadius: 20,
    alignItems: 'center',
    paddingLeft: 12,
    paddingRight: 12,
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
  placecontainerone: {
    flexDirection: 'row',
    margin: 14,
    flex: 1,
  },
  bottomcontainer: {
    flex: 1.5,
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'flex-end',
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
    bottom: 12,
    color: '#979797',
    fontFamily: 'Inter-Regular',
  },
  selectdropdown: {
    marginTop: 14,
    backgroundColor: '#dfdfdf',
    height: 40,
    width: '100%',
    justifyContent: 'center',
    borderRadius: 6,
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
