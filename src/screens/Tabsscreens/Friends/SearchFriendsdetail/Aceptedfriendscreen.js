import React, {useEffect} from 'react';
import {StyleSheet, Text, View, Image, Alert} from 'react-native';
import ButtonComp from '../../../../components/ButtonComp';

const Aceptedfriendscreen = ({navigation, route}) => {
  const {fullresponse} = route.params;

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
      headerTitleAlign: 'center',
    });
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.subcontainer}>
        <Text
          style={{
            padding: 10,
            fontSize: 18,
            fontFamily: 'Inter-Regular',
            color: '#f20732',
          }}>
          Has sido aceptado como amigo por:
        </Text>
      </View>
      <View style={styles.middlecontainer}>
        <Image
          source={{uri: fullresponse.userdata.profile_image}}
          style={{height: 80, width: 80, borderRadius: 50}}
        />
        <Text
          style={{
            paddingVertical: 4,
            fontSize: 16,
            fontFamily: 'Inter-Medium',
            color: '#020c26',
          }}>
          {fullresponse.userdata.name}
        </Text>
        <Text
          style={{color: '#9fa4bc', fontFamily: 'Inter-Regular', fontSize: 14}}>
          {fullresponse.userdata.introduction}
        </Text>
      </View>
      <View style={styles.bottomcontainer}>
        <ButtonComp
          onPress={() =>
            navigation.navigate('Chatscreen', {
              userdata: fullresponse.userdata,
            })
          }
          style={{borderRadius: 6, backgroundColor: '#9561F1'}}
          title={'Enviar mensaje'}
        />
      </View>
    </View>
  );
};

export default Aceptedfriendscreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  subcontainer: {
    flex: 1,
    alignItems: 'center',
  },
  middlecontainer: {
    flex: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomcontainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
