import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Platform,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {Left, Right} from 'native-base';
import moment from 'moment';
import IconMap from 'react-native-vector-icons/SimpleLineIcons';
import {useSelector} from 'react-redux';
import Icon from 'react-native-vector-icons/AntDesign';
import Loader from '../../../components/LoaderComponent';

const Profile_Creadas = ({navigation}) => {
  const {user} = useSelector(({stakreducer}) => stakreducer);
  const [loading, setloading] = useState(false);
  const [createduser, setCreateduser] = useState([]);
  const [apointmenterror, setapointmenterror] = useState(false);

  useEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <Image
          source={require('../../../assets/Icons/logoapp.png')}
          style={{height: 50, width: 150, resizeMode: 'contain'}}
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
      headerStyle: {
        elevation: 0,
      },
    });
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getCreatedApointments();
    });
    return unsubscribe;
  }, [navigation]);

  const getCreatedApointments = () => {
    setloading(true);
    fetch(`https://bicicita.com/app/api/created`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${user?.userdata.api_token}`,
      },
    })
      .then((response) => response.json())
      .then((res) => {
        console.log('res', res);
        setloading(false);

        if (res.status === 'success') {
          setCreateduser(res.created);
        } else if (res.status === 'error') {
          setapointmenterror(true);
        }
      })
      .catch((error) => {
        setloading(false);
      });
  };
  console.log('abc', createduser);
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <Text
        style={{
          textAlign: 'center',
          fontSize: 18,
          fontFamily: 'Inter-Regular',
          color: '#979797',
        }}>
        Citas Creadas
      </Text>
      <View style={{height: 30}} />

      <FlatList
        contentContainerStyle={{flexGrow: 1}}
        data={createduser}
        renderItem={({item}) => (
          <View>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('Apointmentdetail', {id: item.id})
              }
              style={styles.container}>
              <View
                style={{
                  flexDirection: 'row',
                  paddingHorizontal: 8,
                  margin: 6,
                }}>
                <Left>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <View
                      style={{
                        height: 35,
                        width: 35,
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: 30,
                        backgroundColor: '#2e64f8',
                      }}>
                      <IconMap name={'location-pin'} size={24} />
                    </View>
                    <View>
                      <Text style={styles.nametext}>{item.city}</Text>
                      <Text
                        style={{
                          textAlign: 'left',
                          marginLeft: 14,
                          color: '#979797',
                          fontFamily: 'Inter-Regular',
                          fontSize: 12,
                        }}>
                        {item.calendar}
                      </Text>
                    </View>
                  </View>
                </Left>
                <Right>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <View style={styles.iconview}>
                      <Image
                        source={require('../../../assets/Icons/EditIcon.png')}
                        style={{height: 20, width: 20, resizeMode: 'contain'}}
                      />
                    </View>
                  </View>
                </Right>
              </View>
            </TouchableOpacity>
          </View>
        )}
        keyExtractor={(item) => `${item.id}`}
      />
      {loading ? <Loader /> : null}
      {apointmenterror ? (
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
            position: 'absolute',
            left: 0,
            right: 0,
          }}>
          <Text
            style={{
              alignSelf: 'center',
              fontFamily: 'Inter-Regular',
              color: 'red',
            }}>
            Citas no creadas
          </Text>
        </View>
      ) : null}
    </View>
  );
};

export default Profile_Creadas;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderBottomWidth: 0.5,
    paddingVertical: 10,
    borderBottomColor: '#e2e2e2',
  },
  nametext: {
    marginLeft: 12,
    color: 'black',
    fontSize: 14,
    width: 200,
    fontFamily: 'Inter-Medium',
  },
  iconview: {
    height: 30,
    width: 30,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    backgroundColor: '#f8f8f8',
  },
});
