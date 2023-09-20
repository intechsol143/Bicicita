import React, {useEffect} from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
const GeolocationConfrmation = ({navigation, route}) => {
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
      headerTitleAlign: 'center',
    });
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.toptext}>¿Permites que la app use tu ubicación?</Text>
      <View style={styles.containertop}>
        <MapView
          provider={PROVIDER_GOOGLE} // remove if not using Google Maps
          style={styles.map}
          region={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121,
          }}></MapView>
      </View>
      <View style={styles.containerbottom}>
        <View style={{top: '5%'}}>
          <View
            style={{
              height: 6,
              width: 50,
              backgroundColor: '#979797',
              borderRadius: 10,
            }}></View>
        </View>
        <Image
          source={require('../../assets/Icons/newshape.png')}
          style={{
            height: 200,
            marginTop: '30%',
            marginLeft: '60%',
            width: '100%',
            resizeMode: 'contain',
          }}
        />
        <View
          style={{
            position: 'absolute',
            alignItems: 'center',
            marginTop: '12%',
          }}>
          <Text
            onPress={() => navigation.navigate('Bottomtabs')}
            style={styles.userpermisionstext}>
            Usar solo una vez
          </Text>
          <Text
            onPress={() => navigation.navigate('Bottomtabs')}
            style={styles.userpermisionstext}>
            Usar al utilizar la app
          </Text>
          <Text
            onPress={() => navigation.navigate('Bottomtabs')}
            style={styles.userpermisionstext}>
            No permitir
          </Text>
        </View>
      </View>
    </View>
  );
};

export default GeolocationConfrmation;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  userpermisionstext: {
    color: '#208BFF',
    paddingVertical: 4,
    fontSize: 16,
    fontFamily: 'Inter-Regular',
  },
  containertop: {
    flex: 2.3,
  },
  map: {
    flex: 1,
  },
  containerbottom: {
    flex: 2.5,

    alignItems: 'center',
    backgroundColor: '#EEF1F2',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  toptext: {
    textAlign: 'center',
    padding: 10,
    color: '#979797',
    bottom: 10,
    fontFamily: 'Inter-Regular',

    fontSize: 16,
  },
});
