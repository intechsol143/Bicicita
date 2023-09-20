import React, {useEffect} from 'react';
import {StyleSheet, Platform, Text, View, Image} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
const PrivacyPolicy = ({navigation}) => {
  useEffect(() => {
    navigation.setOptions({
      headerStyle: {
        elevation: 0,
      },
      headerTitle: () => (
        <Image
          source={require('../../../assets/Icons/logoapp.png')}
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
  return (
    <View style={styles.container}>
      <View style={{paddingHorizontal: 10}}>
        <Text
          style={{
            textAlign: 'center',
            fontSize: 18,
            color: '#979797',
            padding: 10,
            fontFamily: 'Inter-Regular',
          }}>
          Politica de servicio
        </Text>
        <Text style={styles.text1}>
          Entrada en vigor el 12 de Junio de 2020. Nuestra politica de
          privacidad...
        </Text>
        <Text style={styles.text2}>Plantea tus preguntas o sugerencias.</Text>
        <Text style={styles.text3}>info@bicicita.com</Text>
      </View>
    </View>
  );
};

export default PrivacyPolicy;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  text1: {
    padding: 10,
    fontSize: 16,
    color: '#020c26',
    fontFamily: 'Inter-Regular',
  },
  text2: {
    paddingTop: 60,
    padding: 10,
    fontFamily: 'Inter-Regular',
    fontSize: 14,
  },
  text3: {
    padding: 10,
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    bottom: 20,
    color: '#60ABFF',
  },
});
