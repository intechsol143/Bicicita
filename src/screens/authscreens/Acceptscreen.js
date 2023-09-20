import React, {useEffect} from 'react';
import {StyleSheet, Platform, Text, View, Image} from 'react-native';
import ButtonComp from '../../components/ButtonComp';

import Icon from 'react-native-vector-icons/AntDesign';
const Acceptscreen = ({navigation, route}) => {
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
  const {userDescription} = route.params;
  console.log('userDescription', userDescription);
  return (
    <View style={styles.container}>
      <View style={styles.container1}>
        <Text
          style={{
            textAlign: 'center',
            paddingVertical: 6,
            color: '#979797',
            bottom: 10,
            fontSize: 18,
            fontFamily: 'Inter-Regular',
          }}>
          Recibirás notificaciones.{'\n'} Podrás modificarlo en tu perfil
        </Text>
      </View>
      <View style={styles.container2}>
        <Image
          source={require('../../assets/Icons/Group43.png')}
          style={{height: 100, width: 100, resizeMode: 'contain'}}
        />
      </View>
      <View style={styles.container3}>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'flex-end',
            flexDirection: 'row',
            width: '100%',
          }}>
          <Image
            source={require('../../assets/Icons/newshape.png')}
            style={{
              height: 200,
              width: 200,
              left: '15%',
              resizeMode: 'contain',
            }}
          />
        </View>
        <View
          style={{
            flex: 1,
            position: 'absolute',
            width: '100%',
            alignItems: 'center',
          }}>
          <ButtonComp
            onPress={() =>
              navigation.navigate('Termsandcondition', {
                WholeuserDescription: userDescription,
              })
            }
            style={{backgroundColor: '#9561F1bb', borderRadius: 6}}
            title={'Acepto'}
          />
          <Text style={{color: '#007aff', top: 8, fontFamily: 'Inter-Regular'}}>
            Ahora no
          </Text>
        </View>
      </View>
    </View>
  );
};

export default Acceptscreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  container1: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  container2: {
    flex: 3.8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container3: {
    flex: 1.2,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
