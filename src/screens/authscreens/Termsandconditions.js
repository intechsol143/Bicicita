import React, {useEffect} from 'react';
import {StyleSheet, Platform, Text, View, Image} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import ButtonComp from '../../components/ButtonComp';

const Termsandconditions = ({navigation, route}) => {
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

  const {WholeuserDescription} = route.params;

  return (
    <View style={styles.container}>
      <View style={styles.container2}>
        <View style={{flexDirection: 'row', width: '100%'}}>
          <Text style={{margin: 10, color: '#979797'}}>{'\u2B24'}</Text>
          <Text style={styles.agreementtext}>
            Completa tu perfil. Tienes que hacerte ver, cuentanos cosas sobre ti
            y sube al menos una foto de tu bici.
          </Text>
        </View>
        <View style={{flexDirection: 'row', width: '100%'}}>
          <Text style={{margin: 10, color: '#979797'}}>{'\u2B24'}</Text>
          <Text style={styles.agreementtext}>
            Mantente conectado. Conoce a nuevos amig@s e invita a los tuyos a
            unirse.
          </Text>
        </View>
        <View style={{flexDirection: 'row', width: '100%'}}>
          <Text style={{margin: 10, color: '#979797'}}>{'\u2B24'}</Text>
          <Text style={styles.agreementtext}>
            Encuentra citas cerca de ti. O crea las tuyas compartiendo tus rutas
            preferidas.
          </Text>
        </View>
        <View style={{flexDirection: 'row', width: '100%'}}>
          <Text style={{margin: 10, color: '#979797'}}>{'\u2B24'}</Text>
          <Text style={styles.agreementtext}>
            Actúa con seguridad. No compartas tu información personal a la
            ligera.
          </Text>
        </View>
        <View style={{flexDirection: 'row', width: '100%'}}>
          <Text style={{margin: 10, color: '#979797'}}>{'\u2B24'}</Text>
          <Text style={styles.agreementtext}>Estamos a la escucha.</Text>
        </View>
        <View style={{flexDirection: 'row', width: '100%'}}>
          <Text style={styles.agreementtextone}>info@bicicita.com</Text>
        </View>
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
          style={{position: 'absolute', width: '100%', alignItems: 'center'}}>
          <ButtonComp
            onPress={() =>
              navigation.navigate('Typesofbikes', {
                WholeuserDescription: WholeuserDescription,
              })
            }
            style={{backgroundColor: '#9561F1bb', borderRadius: 6}}
            title={'Continuar'}
          />
        </View>
      </View>
    </View>
  );
};

export default Termsandconditions;

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
    flex: 5,
    alignItems: 'center',
    margin: 12,
    padding: 16,
  },
  container3: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  agreementtext: {
    marginLeft: 12,
    color: '#979797',
    opacity: 0.6,
    margin: 10,
    fontFamily: 'Inter-Regular',
    fontSize: 14,
  },
  agreementtextone: {
    marginLeft: 41,
    color: '#007aff',
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    margin: 10,
  },
});
