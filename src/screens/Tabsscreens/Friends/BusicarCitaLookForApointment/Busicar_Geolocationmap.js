import React, {useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  Platform,
  ScrollView,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import BusicarCita_Peopledetails from '../../../../components/BusicarCita_Pepledetail';
import Icon from 'react-native-vector-icons/AntDesign';
import Icon1 from 'react-native-vector-icons/Ionicons';
const Busicar_Geolocationmap = ({navigation, route}) => {
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
  }, []);

  const {respo} = route.params;
  const {user} = useSelector(({stakreducer}) => stakreducer);
  const list = () => {
    return respo.userdata.map((element) => {
      // console.log('eleeeeeeeeeeeeeeeement', element);
      // console.log('User Data in Hom', userData);
      return (
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
        <Marker
          coordinate={{
            latitude: parseFloat(element.latitude),
            longitude: parseFloat(element.longitude),
            // latitudeDelta: 0.0922,
            // longitudeDelta: 0.0421,
          }}
          // pinColor="red"
          // image={{uri: element.profile_image}}
        />
      );
    });
  };
  console.log('res', respo);
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{flex: 1}}>
        <Text
          style={{
            textAlign: 'center',
            paddingVertical: 10,
            fontSize: 18,
            color: '#979797',
            fontFamily: 'Inter-Regular',
            bottom: 12,
          }}>
          Resultado busqueda
        </Text>
        <View style={styles.subcontainerOne}>
          <MapView
            provider={PROVIDER_GOOGLE}
            style={styles.map}
            region={{
              latitude: parseFloat(user.userdata.latitude),
              longitude: parseFloat(user.userdata.longitude),
              latitudeDelta: 0.922,
              longitudeDelta: 0.421,
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
          <View style={{marginTop: 27}}>
            <FlatList
              data={respo.userdata}
              renderItem={({item}) => {
                return (
                  <BusicarCita_Peopledetails
                    item={item}
                    onPress={() =>
                      navigation.navigate('BusicarCitaApointment', {
                        id: item.user_id,
                      })
                    }
                  />
                );
              }}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Busicar_Geolocationmap;

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
