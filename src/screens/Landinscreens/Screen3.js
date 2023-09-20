import React from 'react';
import {StyleSheet, Text, View, ImageBackground, Image} from 'react-native';

const Screen3 = ({navigation}) => {
  return (
    <View style={{flex: 1}}>
      <View
        style={{
          alignItems: 'flex-end',
          justifyContent: 'flex-end',
          width: '100%',
          flexDirection: 'row',
        }}>
        <ImageBackground
          resizeMode={'contain'}
          source={require('../../assets/Icons/Shape-3.png')}
          style={styles.imagestyle}>
          <View>
            <Image
              source={require('../../assets/Icons/Usercopy.png')}
              style={{
                height: 60,
                width: 60,
                marginTop: '5%',
                marginLeft: '1%',
                resizeMode: 'contain',
              }}
            />
            <Image
              source={require('../../assets/Icons/User.png')}
              style={{
                height: 80,
                width: 80,
                marginLeft: '20%',
                resizeMode: 'contain',
                marginTop: '20%',
              }}
            />

            <Image
              source={require('../../assets/Icons/Oval.png')}
              style={{
                marginLeft: '60%',
                height: 50,
                width: 50,
                resizeMode: 'contain',
              }}
            />
          </View>
        </ImageBackground>
      </View>
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'flex-start',
          marginLeft: 20,
          flexDirection: 'row',
          width: '80%',
          bottom: 40,
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <View
            style={{
              height: 40,
              width: 40,
              borderRadius: 30,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#f20732',
            }}>
            <Text
              style={{
                color: 'white',
                fontFamily: 'Inter-Regular',
                fontSize: 20,
              }}>
              3
            </Text>
          </View>
          <Text
            style={{marginLeft: 12, fontSize: 16, fontFamily: 'Inter-Regular'}}>
            Busca amigos
          </Text>
        </View>
      </View>
      <View
        style={{
          alignItems: 'center',
          marginRight: 10,
          bottom: '5%',
          justifyContent: 'flex-end',
          flexDirection: 'row',
        }}>
        <View style={{}}>
          <Text
            style={{color: '#4d4d4d', fontSize: 16, fontFamily: 'Inter-Bold'}}>
            CONOCE RIDERS
          </Text>
          <Text
            style={{
              marginTop: 10,
              fontSize: 12,
              color: '#4d4d4d',
              fontFamily: 'Inter-Regular',
            }}>
            Añade a tu vida personas
          </Text>
          <Text
            style={{
              fontSize: 12,
              color: '#4d4d4d',
              fontFamily: 'Inter-Regular',
            }}>
            que comparten tu pasión
          </Text>
          <Text
            style={{
              fontSize: 12,
              color: '#4d4d4d',
              fontFamily: 'Inter-Regular',
            }}>
            según disciplina, nivel y sexo
          </Text>
        </View>
      </View>
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'flex-end',
          flex: 1,
          marginBottom: '20%',
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
            color: '#007aff',
            top: 8,
            fontFamily: 'Inter-Regular',
          }}>
          Omitir
        </Text>
      </View>
    </View>
  );
};

export default Screen3;

const styles = StyleSheet.create({
  imagestyle: {
    height: 300,
    width: '100%',
    left: '22%',
    marginTop: 10,
    resizeMode: 'contain',
  },
});
