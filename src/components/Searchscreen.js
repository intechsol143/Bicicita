import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TextInput,
  Image,
  Platform,
  TouchableOpacity,
  Alert,
} from 'react-native';
import ButtonComp from './ButtonComp';
import {useDispatch, useSelector} from 'react-redux';
import {ToggleCities} from '../redux/Actions/UsersActionFiles';
import Loader from '../components/LoaderComponent';
import Icon from 'react-native-vector-icons/AntDesign';
import {
  ToggleRegCities,
  ToggleApointments,
  ToggleLookApointment,
  ToggleEditprofileCities,
  ToggleSearchFriends,
} from '../redux/Actions/UsersActionFiles';
const Searchscreen = ({navigation, route}) => {
  const {apoinrments} = useSelector(({RegcityReducer}) => RegcityReducer);
  const dispatch = useDispatch();

  const [citylist, setcitylist] = useState([]);
  const [searchcity, setsearchcity] = useState('');
  const regval = route?.params?.regval;
  const editparam = route?.params?.editparam;
  const ApointmentLook = route?.params?.ApointmentLook;
  const edituser = route?.params?.edituser;
  const searchuser = route?.params?.searchuser;
  const [loading, setloading] = useState(false);
  const [btnselection, setbtnselection] = useState(false);
  useEffect(() => {
    CitiesList();
    navigation.setOptions({
      headerTitle: () => (
        <Image
          source={require('../assets/Icons/logoapp.png')}
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

  const CitiesList = (text) => {
    setloading(true);
    if (text) {
      const data = new FormData();
      text && data.append('keyword', text);
      fetch(`https://bicicita.com/app/api/city`, {
        method: 'POST',
        body: data,
      })
        .then((response) => response.json())
        .then((responseJson) => {
          setloading(false);
          setcitylist(responseJson.city);
        })
        .catch((error) => {});
    } else {
      fetch(`https://bicicita.com/app/api/city`, {
        method: 'POST',
      })
        .then((response) => response.json())
        .then((res) => {
          setloading(false);
          setcitylist(res.city);
        })
        .catch((error) => {});
    }
  };
  const ItemView = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() => {
          setsearchcity(item.city), setbtnselection(true);
        }}
        style={{
          backgroundColor: 'red',
          marginHorizontal: 16,
          margin: 2,
          paddingTop: 6,
          backgroundColor: 'white',
        }}>
        <Text style={{color: '#777555', fontSize: 17}}>{item.city}</Text>
      </TouchableOpacity>
    );
  };
  const getItem = (item) => {
    alert(item);
  };
  return (
    <View style={{alignItems: 'center', backgroundColor: 'white', flex: 1}}>
      <View
        style={{
          width: '100%',
          margin: 12,
          marginHorizontal: 12,
          alignItems: 'center',
        }}>
        <TextInput
          style={{
            height: 40,
            borderWidth: 0.3,
            // padd
            borderRadius: 4,
            width: '90%',
            paddingLeft: Platform.OS === 'android' ? 10 : 10,
          }}
          onChangeText={(text) => {
            setsearchcity(text);
            CitiesList(text);
            setbtnselection(false);
          }}
          value={searchcity}
          placeholder="Buscar localidad"
          autoCorrect={false}
          underlineColorAndroid="transparent"
          // keyboardType="visible-password"
        />
        <FlatList
          style={{
            width: '100%',
          }}
          data={citylist}
          keyExtractor={(_, index) => index.toString()}
          renderItem={ItemView}
        />
      </View>
      <View
        style={{
          position: 'absolute',
          alignItems: 'center',
          justifyContent: 'flex-end',
          bottom: 0,
          width: '100%',
          margin: 10,
        }}>
        {btnselection ? (
          <ButtonComp
            onPress={() => {
              if (regval === true) {
                ToggleRegCities(searchcity)(dispatch);
                navigation.navigate('ProfileConfirmation');
              } else if (ApointmentLook === true) {
                ToggleLookApointment(searchcity)(dispatch);
                navigation.navigate('Lookforapointment');
              } else if (edituser === true) {
                ToggleEditprofileCities(searchcity)(dispatch);
                navigation.navigate('Editprofile');
              } else if (searchuser === true) {
                ToggleSearchFriends(searchcity)(dispatch);
                navigation.navigate('Searchfriends');
              } else if (editparam === true) {
                const data = apoinrments;
                data.detaildata.city = searchcity;
                ToggleApointments(data)(dispatch);
                navigation.navigate('EditApointment');
              } else {
                ToggleCities(searchcity)(dispatch);
                navigation.navigate('Home');
              }
            }}
            style={{
              height: 40,
              width: '90%',
              borderRadius: 5,
              backgroundColor: '#9561F1',
            }}
            title={'Seleccionar localidad'}
          />
        ) : null}
      </View>
      {loading ? <Loader /> : null}
    </View>
  );
};

export default Searchscreen;

const styles = StyleSheet.create({});
