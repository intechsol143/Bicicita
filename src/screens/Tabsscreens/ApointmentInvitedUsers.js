import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Platform,
  Text,
  View,
  Image,
  FlatList,
  TextInput,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useSelector} from 'react-redux';

import AppointmentUsers from '../../components/AppointmentUsers';
import Loader from '../../components/LoaderComponent';
import Icon1 from 'react-native-vector-icons/AntDesign';
const ApointmentInvitedUsers = ({navigation, route}) => {
  const {user} = useSelector(({stakreducer}) => stakreducer);
  const {id} = route.params;

  const [search, setSearch] = useState('');
  const [Friends, setFriends] = useState([]);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    setLoader(true);
    const unsubscribe = navigation.addListener('focus', () => {
      fetch(`https://bicicita.com/app/api/appointment-list-user/${id}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${user?.userdata.api_token}`,
        },
      })
        .then((response) => response.json())
        .then((responseJson) => {
          if ((responseJson.status = 'success')) {
            setFriends(responseJson.invited);
          }
        })
        .catch((error) => {})
        .finally(() => {
          setLoader(false);
        });
    });

    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <Image
          source={require('../../assets/Icons/logoapp.png')}
          style={{height: 40, width: 150, resizeMode: 'contain'}}
        />
      ),
      headerLeft: () =>
        Platform.OS === 'ios' && (
          <Icon1
            name="arrowleft"
            color="black"
            size={20}
            style={{left: 15}}
            onPress={() => navigation.goBack()}
          />
        ),
      headerStyle: {
        elevation: 0,
      },
      headerTitleAlign: 'center',
    });
  }, []);

  return (
    <View style={styles.container}>
      {loader && <Loader />}
      <View style={styles.subcontainer}>
        <Text
          style={{
            textAlign: 'center',
            padding: 10,
            fontSize: 18,
            color: '#979797',
            fontFamily: 'Inter-Regular',
          }}>
          Listado de participantes
        </Text>

        <View style={{height: 20}} />
        <View style={{alignItems: 'center'}}>
          <View style={styles.passwordContainer}>
            <Icon name="search" color="black" size={14} />
            <TextInput
              underlineColorAndroid="transparent"
              style={styles.inputStyle}
              autoCorrect={false}
              style={{height: 50, paddingLeft: 10}}
              // keyboardType="visible-password"
              placeholder="Buscar"
              value={search}
              onChangeText={(text) => setSearch(text)}
            />
          </View>
        </View>

        <View style={{height: 20}} />
        <FlatList
          data={Friends}
          renderItem={({item}) => (
            <AppointmentUsers
              item={item}
              onPress={() =>
                navigation.navigate('Singlpersondetail', {
                  user_id: item.id,
                })
              }
            />
          )}
          keyExtractor={(_, index) => `freinds-${index}`}
        />
      </View>
    </View>
  );
};

export default ApointmentInvitedUsers;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  subcontainer: {
    flex: 5,
  },
  bottomcontainer: {
    flex: 1,

    alignItems: 'center',
    justifyContent: 'center',
  },
  passwordContainer: {
    flexDirection: 'row',
    borderWidth: 0,
    borderRadius: 10,
    paddingHorizontal: 10,
    alignItems: 'center',
    borderColor: '#000',
    width: '90%',
    backgroundColor: '#e2e2e2',
  },
  inputStyle: {
    flex: 1,
    left: 4,
    color: '#9fa4bc',
    fontSize: 14,
    fontFamily: 'Inter-Regular',
  },
  groupview: {
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    width: 40,
    borderRadius: 30,
    backgroundColor: '#e2e2e2',
  },
});
