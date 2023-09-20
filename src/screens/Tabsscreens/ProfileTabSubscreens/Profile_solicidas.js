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
import IconMap from 'react-native-vector-icons/SimpleLineIcons';
import {useSelector} from 'react-redux';
import Icon from 'react-native-vector-icons/AntDesign';
import Loader from '../../../components/LoaderComponent';

const Profile_Solicidas = ({navigation}) => {
  const {user} = useSelector(({stakreducer}) => stakreducer);
  const [loader, setloading] = useState(false);
  const [requestedusers, setRequestedusers] = useState([]);
  const [requestedError, setrequestedError] = useState(false);

  useEffect(() => {
    setloading(true);
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

    fetch(`https://bicicita.com/app/api/requested`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${user?.userdata.api_token}`,
      },
    })
      .then((response) => response.json())
      .then((responseJson) => {
        setloading(false);
        if (responseJson.status === 'success') {
          setRequestedusers(responseJson.requesteddata);
        } else if (responseJson.status === 'error') {
          setrequestedError(true);
        }
      })
      .catch((error) => {
        setloading(false);
      });
  }, []);

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <Text
        style={{
          textAlign: 'center',
          fontSize: 18,
          fontFamily: 'Inter-Regular',
          color: '#979797',
        }}>
        Citas solicitadas
      </Text>
      <View style={{height: 30}} />
      <FlatList
        contentContainerStyle={{flexGrow: 1}}
        data={requestedusers}
        renderItem={({item}) => (
          <TouchableOpacity
            style={styles.container}
            onPress={() =>
              navigation.navigate('Home', {
                screen: 'BusicarCitaApointment',
                params: {
                  id: item.id,
                },
              })
            }>
            <View
              style={{flexDirection: 'row', paddingHorizontal: 8, margin: 6}}>
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
                  <Text
                    style={{
                      color: '#FF632b',
                      fontSize: 14,
                      fontFamily: 'Inter-Regular',
                      marginRight: 8,
                    }}>
                    {item.time}
                  </Text>
                </View>
              </Right>
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => `${item.id}`}
      />

      {loader ? <Loader /> : null}
      {requestedError ? (
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
            Citas no solicitadas
          </Text>
        </View>
      ) : null}
    </View>
  );
};

export default Profile_Solicidas;

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
