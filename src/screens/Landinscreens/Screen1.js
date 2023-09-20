import React from 'react';
import {
  StyleSheet,
  Text,
  Platform,
  View,
  ImageBackground,
  Image,
} from 'react-native';

const Screen1 = ({navigation}) => {
  return (
    <View style={{flex: 1}}>
      <View style={{alignItems: 'center', marginTop: '10%'}}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-start',
            width: '80%',
          }}>
          <View
            style={{
              height: 40,
              alignItems: 'center',
              justifyContent: 'center',
              width: 40,
              borderRadius: 40,
              backgroundColor: '#9561F1',
            }}>
            <Text
              style={{
                color: 'white',
                fontSize: 20,
                fontFamily: 'Inter-Regular',
              }}>
              1
            </Text>
          </View>
          <Text
            style={{
              marginLeft: 15,
              fontSize: 16,
              color: '#4d4d4d',
              fontFamily: 'Inter-Regular',
            }}>
            Busca rutas cerca de tí
          </Text>
        </View>
      </View>
      <View style={{alignItems: 'flex-end'}}>
        <Image
          source={require('../../assets/Icons/MapIcon.png')}
          style={{
            height: 80,
            marginTop: '10%',
            width: 80,
            marginRight: '10%',
          }}
        />
      </View>
      <View style={styles.subcontainer}>
        <ImageBackground
          resizeMode={'contain'}
          source={require('../../assets/Icons/Shape.png')}
          style={styles.imageone}>
          <View
            style={{
              marginLeft: '55%',
              marginTop: Platform.OS === 'android' ? '30%' : '25%',
            }}>
            <Text
              style={{
                fontSize: 16,
                width: 200,
                fontFamily: 'Inter-Bold',
                color: '#4d4d4d',
              }}>
              CONOCE NUEVAS RUTAS
            </Text>
            <View style={{height: 15}} />
            <Text style={styles.textstyle}>Filtra tus búsquedas</Text>
            <Text style={styles.textstyle}>por lugar, día</Text>
            <Text style={styles.textstyle}>disciplina, sexo y nivel</Text>
          </View>
        </ImageBackground>
        <View
          style={{
            alignItems: 'flex-end',
            height: '100%',
            position: 'absolute',
            width: '100%',
            flex: 1,
            justifyContent: 'center',
            top: '23%',
            bottom: 0,
            left: 0,
            right: 0,
          }}>
          <Image
            source={require('../../assets/Icons/logoapp.png')}
            style={{
              height: 45,
              width: '100%',
              resizeMode: 'contain',
            }}
          />
          <Text
            onPress={() => navigation.navigate('Loginscreen')}
            style={{
              textAlign: 'center',
              top: 8,
              width: '100%',
              fontFamily: 'Inter-Regular',
              color: '#2e64f8',
            }}>
            Omitir
          </Text>
        </View>
      </View>
    </View>
  );
};

export default Screen1;

const styles = StyleSheet.create({
  subcontainer: {
    flex: 1,
    alignItems: 'flex-end',
    flexDirection: 'row',
  },
  imageone: {
    height: 300,

    width: 300,
    marginBottom: '20%',
    right: '8%',
    resizeMode: 'contain',
  },
  textstyle: {
    width: 200,
    color: '#626579',
    fontFamily: 'Inter-Regular',
  },
});
