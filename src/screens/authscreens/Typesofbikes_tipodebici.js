import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, Platform, View, Image} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import Typesofbikes from '../../components/BikesTypeComp';
import RNAndroidLocationEnabler from 'react-native-android-location-enabler';
import Icon from 'react-native-vector-icons/AntDesign';
import ButtonComp from '../../components/ButtonComp';
// import Icon from 'react-native-vector-icons/AntDesign';
const Typesofbikes_tipodebici = ({navigation, route}) => {
  const [arr, setArr] = useState([
    ['E-bike Carretera', 'Carretera'],
    ['Mtb'],
    ['E-bike Mtb', 'Gravel'],
    ['Paseo'],
    ['Descenso', 'Enduro'],
  ]);
  const [latitude, setlatitude] = useState(0);
  const [longitude, setlongitude] = useState(0);
  const [bikescolors, setbikescolors] = useState([]);
  const [bikeserrors, setbikeserrors] = useState(false);
  const [colorsarr] = useState([
    '#0BB2EA',
    '#0B3A4A',
    '#7A13E2',
    '#4B4650',
    '#E8460E',
    '#0B16CB',
    '#15CEDD',
    '#2BC239',
    '#5897AD',
    '#E8460E',
  ]);

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
  useEffect(() => {
    CurrentLoc();
    console.log('useeffect called');
  }, []);

  const CurrentLoc = async () => {
    Platform.OS === 'android' ? getPermissions() : findCoordinates();
    console.log("i am ios i'll come here");
  };

  const getPermissions = () => {
    RNAndroidLocationEnabler.promptForEnableLocationIfNeeded({
      interval: 10000,
      fastInterval: 5000,
    }).then((data) => {
      if (data === 'already-enabled') {
        findCoordinates();
      } else {
        setTimeout(() => {
          findCoordinates();
        }, 5000);
      }
    });
  };

  const findCoordinates = async () => {
    console.log('i even come here too');
    Geolocation.getCurrentPosition(
      (position) => {
        setlatitude(position.coords.latitude);
        setlongitude(position.coords.longitude);
      },
      (error) => {
        // console.log('i am error', error);
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 10000,
        // forceRequestLocation: true,
      },
    );
    // Geolocation.getCurrentPosition(
    //   ({coords}) => {
    //     console.log('coordintes', coords);
    //     setlatitude(coords.latitude);
    //     setlongitude(coords.longitude);
    //   },
    //   (error) => {},
    //   {enableHighAccuracy: true, timeout: 1000, maximumAge: 1000},
    // );
  };

  const {WholeuserDescription} = route.params;

  const BikeSelection = () => {
    if (bikescolors.length <= 0) {
      setbikeserrors(true);
    } else {
      navigation.navigate('Finallvel', {
        bikselection: {
          WholeuserDescription,
          latitude,
          longitude,
          bikescolors,
          arr,
        },
      });
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.topcontainer}>
        <View style={{bottom: 16, alignItems: 'center'}}>
          <Text style={styles.headingtext}>Tipo de bici</Text>
          <Text style={styles.headingtextTwo}>
            Elige una o varias disciplinas
          </Text>
        </View>
      </View>
      <View style={styles.middlecontainer}>
        <View style={styles.mapcontainer}>
          {arr.map((item, index) =>
            item.length == 2 ? (
              <View
                key={`item-${index}`}
                style={{
                  flexDirection: 'row',
                  width: 200,
                  justifyContent: 'space-between',
                }}>
                {item.map((itemInner, index) => {
                  const locArr = [...bikescolors];
                  const NewIndex = locArr.findIndex(
                    (itemk) => itemk === itemInner,
                  );
                  return (
                    <Typesofbikes
                      title={itemInner}
                      key={'Colors' + index}
                      borderColor={
                        NewIndex !== -1 ? colorsarr[NewIndex] : 'black'
                      }
                      backgroundColor={
                        NewIndex !== -1 ? colorsarr[NewIndex] : 'black'
                      }
                      borderWidth={1}
                      selected={NewIndex !== -1}
                      onPress={() => {
                        if (NewIndex === -1) {
                          locArr.length < 8 && locArr.push(itemInner);
                        } else {
                          locArr.splice(NewIndex, 1);
                        }
                        setbikescolors(locArr);
                        setbikeserrors(false);
                      }}
                    />
                  );
                })}
              </View>
            ) : (
              <View
                key={`item-${index}`}
                style={{
                  flexDirection: 'row',
                  width: 200,
                  justifyContent: 'center',
                }}>
                {item.map((itemInner, index) => {
                  const locArr = [...bikescolors];
                  const NewIndex = locArr.findIndex(
                    (itemk) => itemk === itemInner,
                  );
                  return (
                    <Typesofbikes
                      title={itemInner}
                      key={'Colorss' + index}
                      borderColor={
                        NewIndex !== -1 ? colorsarr[NewIndex] : 'black'
                      }
                      backgroundColor={
                        NewIndex !== -1 ? colorsarr[NewIndex] : 'black'
                      }
                      borderWidth={1}
                      selected={NewIndex !== -1}
                      onPress={() => {
                        if (NewIndex === -1) {
                          locArr.length < 8 && locArr.push(itemInner);
                        } else {
                          locArr.splice(NewIndex, 1);
                        }
                        setbikescolors(locArr);
                        setbikeserrors(false);
                      }}
                    />
                  );
                })}
              </View>
            ),
          )}
        </View>
      </View>

      {bikeserrors ? (
        <Text
          style={{
            textAlign: 'center',
            fontSize: 10,
            color: 'red',
            fontFamily: 'Inter-Regular',
          }}>
          Select at least 1 bikes
        </Text>
      ) : null}

      <View style={styles.bottomcontainer}>
        <ButtonComp
          onPress={() => BikeSelection()}
          style={{borderRadius: 6, backgroundColor: '#9561F1'}}
          title={'Continuar'}
        />
      </View>
    </View>
  );
};

export default Typesofbikes_tipodebici;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  headingtext: {
    paddingVertical: 6,
    fontSize: 18,
    color: '#979797',
    fontFamily: 'Inter-Regular',
  },
  headingtextTwo: {
    paddingVertical: 6,
    fontSize: 14,
    color: '#979797',
    fontFamily: 'Inter-Regular',
  },
  topcontainer: {
    flex: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapcontainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    flexWrap: 'wrap',
  },
  middlecontainer: {
    flex: 3,
    flexDirection: 'row',
  },
  bottomcontainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
