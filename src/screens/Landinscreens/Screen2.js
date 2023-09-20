import React from 'react';
import {StyleSheet, Text, View, Image, ImageBackground} from 'react-native';

const Screen2 = ({navigation}) => {
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
              borderRadius: 50,
              backgroundColor: '#f27405',
            }}>
            <Text
              style={{
                color: 'white',
                fontSize: 20,
                fontFamily: 'Inter-Regular',
              }}>
              2
            </Text>
          </View>
          <Text
            style={{
              marginLeft: 15,
              fontSize: 16,
              color: '#4d4d4d',
              fontFamily: 'Inter-Regular',
            }}>
            Crea tus rutas
          </Text>
        </View>
      </View>

      <View style={{alignItems: 'flex-end', flex: 1}}>
        <ImageBackground
          resizeMode={'contain'}
          source={require('../../assets/Icons/Shape-2.png')}
          style={styles.imagestyle}>
          <View style={{marginTop: '55%', right: '10%'}}>
            <Text
              style={{
                color: '#4d4d4d',
                fontSize: 16,
                fontFamily: 'Inter-Bold',
              }}>
              COMPARTE TUS RUTAS PREFERIDAS
            </Text>
            <View style={{height: 15}} />
            <Text
              style={{
                color: '#4d4d4d',
                marginTop: 10,
                fontFamily: 'Inter-Regular',
              }}>
              Sube tu ruta ideal y queda con amigos
            </Text>
            <Text
              style={{
                color: '#4d4d4d',
                right: 4,
                fontFamily: 'Inter-Regular',
              }}>
              {' '}
              de tu nivel disciplina y sexo. Invita a
            </Text>
            <Text
              style={{
                color: '#4d4d4d',
                fontFamily: 'Inter-Regular',
              }}>
              una o varias personas
            </Text>
          </View>
        </ImageBackground>
      </View>
      <View
        style={{
          alignItems: 'center',
          position: 'absolute',
          justifyContent: 'flex-end',
          width: '100%',
          top: 0,
          left: 0,
          bottom: '12%',
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
            fontFamily: 'Inter-Regular',
            top: 8,
            color: '#007aff',
          }}>
          Omitir
        </Text>
      </View>
    </View>
  );
};

export default Screen2;

const styles = StyleSheet.create({
  imagestyle: {
    height: 300,
    width: '100%',
    marginTop: '5%',
    left: '18%',
    resizeMode: 'contain',
  },
});
