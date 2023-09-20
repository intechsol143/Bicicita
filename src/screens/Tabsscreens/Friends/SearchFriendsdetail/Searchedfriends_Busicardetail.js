import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Platform,
  Image,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
// import Geolocation from 'react-native-geolocation-service';
import {useSelector, useDispatch} from 'react-redux';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import Icon from 'react-native-vector-icons/AntDesign';
import Icon1 from 'react-native-vector-icons/Ionicons';
import SinglePersondetailamigos from '../../../../components/Friends_amigos';

const Searchedfriends_Busicardetail = ({navigation, route}) => {
  const [lat, setlatitude] = useState('');
  useEffect(() => {
    navigation.setOptions({
      headerStyle: {
        elevation: 0,
      },
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
      headerTitleAlign: 'center',
    });
    // findCoordinates();
  }, []);
  useEffect(() => {
    findCoordinat();
    // Platform.OS == 'ios' &&
    //   Geolocation.requestAuthorization('always').then((res) => {
    //     cuRRentlocation();
    //     console.log('res', res);
    //   });
    // console.log('i even come here too');
    // // Geolocation.requestAuthorization();
    // Geolocation.setRNConfiguration({authorizationLevel: 'always'});
    // Geolocation.requestAuthorization();
    // Geolocation.getCurrentPosition(
    //   ({coords}) => {
    //     console.log('coordintes', coords);
    //     // setlatitude(coords.latitude);
    //     // setlongitude(coords.longitude);
    //   },
    //   (error) => {},
    //   {enableHighAccuracy: true, timeout: 1000, maximumAge: 1000},
    // );
  }, []);
  const findCoordinat = async () => {
    console.log('i even come here too');
    Geolocation.requestAuthorization('always').then((res) => {
      cuRRentlocation();
    });
    // Geolocation.requestAuthorization();
    // Geolocation.setRNConfiguration({authorizationLevel: 'always'});
    // Geolocation.requestAuthorization();
    // Geolocation.getCurrentPosition(
    //   ({coords}) => {
    //     console.log('coordintes', coords);
    //     // setlatitude(coords.latitude);
    //     // setlongitude(coords.longitude);
    //   },
    //   (error) => {},
    //   {enableHighAccuracy: true, timeout: 1000, maximumAge: 1000},
    // );
  };
  const cuRRentlocation = () => {
    Geolocation.getCurrentPosition(
      (position) => {
        setlatitude(position.coords.latitude);
        // setlongitude(position.coords.longitude);
        // getPlace(position.coords.latitude, position.coords.longitude);
        // // getPlace('47.751076', '-120.740135');
        // console.log('users location', position.coords.longitude);

        // console.log('users location', position.coords.latitude);
      },
      (error) => {
        console.log('error in loc', error);
      },
      {
        enableHighAccuracy: true,
        // timeout: 15000,
        // maximumAge: 10000
      },
    );
  };
  // const cuRRentlocation = () => {
  //   Geolocation.getCurrentPosition(
  //     (position) => {
  //       // setlatitude(position.coords.latitude);
  //       // setlongitude(position.coords.longitude);
  //       // getPlace(position.coords.latitude, position.coords.longitude);
  //       // getPlace('47.751076', '-120.740135');
  //       // console.log('users location', position.coords.longitude);
  //       // console.log('users location', position.coords.latitude);
  //     },
  //     (error) => {
  //       // console.log('error in loc', error);
  //     },
  //     {
  //       enableHighAccuracy: true,
  //       // timeout: 15000,
  //       // maximumAge: 10000
  //     },
  //   );
  // };
  const {user} = useSelector(({stakreducer}) => stakreducer);
  const {data} = route.params;
  console.log('data', data);
  const findCoordinates = () => {
    Geolocation.getCurrentPosition(
      ({coords}) => {
        console.log('coordintes', coords);
        // setlatitude(coords.latitude);
        // setlongitude(coords.longitude);
      },
      (error) => {},
    );
  };
  console.log(
    'user long lat',
    // user.userdata.,
    // user?.userdata?.longitude,
  );
  const list = () => {
    return data.map((element) => {
      // console.log('eleeeeeeeeeeeeeeeement', element);
      // console.log('User Data in Hom', userData);

      const permission = element.is_location;
      // console.log('yes or no', permission, element.level);
      return (
        <>
          {permission && (
            <Marker
              onPress={() =>
                navigation.navigate('Singlpersondetail', {
                  user_id: element.user_id,
                })
              }
              coordinate={{
                latitude: parseFloat(element.user_latitude),
                longitude: parseFloat(element.user_longitude),
                // latitudeDelta: 0.0922,
                // longitudeDelta: 0.0421,
              }}
              // pinColor="red"
              // image={{uri: element.profile_image}}
            >
              <TouchableOpacity
                // style={{backgroundColor: 'red'}}
                onPress={() =>
                  navigation.navigate('Singlpersondetail', {
                    user_id: element.user_id,
                  })
                }>
                {lat ? (
                  <Icon1
                    name="bicycle"
                    size={30}
                    color={
                      element.level == 'Inicio'
                        ? 'green'
                        : element.level == 'medio'
                        ? 'orange'
                        : element.level == 'Avanzado'
                        ? 'purple'
                        : 'red'
                    }
                  />
                ) : null}
              </TouchableOpacity>
            </Marker>
          )}
        </>
        // <Marker
        //   coordinate={{
        //     latitude: parseFloat(element.user_latitude),
        //     longitude: parseFloat(element.user_longitude),
        //     latitudeDelta: 0.0922,
        //     longitudeDelta: 0.0421,
        //   }}
        //   // onPress={() => navigation.navigate('Profile', { element })}
        //   // onPress={() => console.log(userData.useSelector.id == element.user_id)}
        // >
        //   <Icon1 name="location-pin" size={20} />
        // </Marker>
      );
    });
  };

  console.log('data', data);
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{flex: 1}}>
        <Text
          style={{
            textAlign: 'center',
            paddingVertical: 10,
            fontSize: 18,
            fontFamily: 'Inter-Regular',
            color: '#979797',
            bottom: 12,
          }}>
          Encontrar amigos
        </Text>
        <View style={styles.subcontainerOne}>
          <MapView
            // pitchEnabled={false}
            // rotateEnabled={false}
            // scrollEnabled={false}
            // zoomEnabled={false}
            // userInteraction={false}
            provider={PROVIDER_GOOGLE}
            style={styles.map}
            region={{
              latitude: parseFloat(user?.userdata?.latitude),
              longitude: parseFloat(user?.userdata?.longitude),
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            }}>
            {list()}
          </MapView>
        </View>
        <View style={styles.subcontainerTwo}>
          <View style={{height: 10}} />
          <View style={{alignItems: 'center'}}>
            <View
              style={{
                height: 6,
                width: 40,
                borderRadius: 10,
                backgroundColor: '#d1d5e8',
              }}></View>
          </View>
          <View style={{marginTop: 23, marginBottom: 20}}>
            <FlatList
              data={data}
              keyExtractor={(_, index) => 'item' + index}
              renderItem={({item}) => (
                <SinglePersondetailamigos
                  item={item}
                  onPress={() =>
                    navigation.navigate('Singlpersondetail', {
                      user_id: item.user_id,
                    })
                  }
                />
              )}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Searchedfriends_Busicardetail;

const styles = StyleSheet.create({
  subcontainerOne: {
    flex: 3,
  },
  subcontainerTwo: {
    flex: 3,
  },

  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  map: {
    flex: 1,
  },
});
