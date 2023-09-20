import React, {useState, useEffect} from 'react';
import {View, Text, Image, FlatList, Alert} from 'react-native';
import {Left, Right, Card} from 'native-base';
import {useSelector} from 'react-redux';

import ButtonComp from '../../components/ButtonComp';
import Loader from '../../components/LoaderComponent';

export default function RequestedAsistancesScreen({navigation, route}) {
  const {user} = useSelector(({stakreducer}) => stakreducer);
  const {id} = route.params;

  const [asistanceRequests, setAsistanceRequests] = useState([]);
  const [loading, setloading] = useState(false);

  useEffect(() => {
    _appointmentAsistanceRequests();
    navigation.setOptions({
      headerTitle: () => (
        <Image
          source={require('../../assets/Icons/logoapp.png')}
          style={{height: 40, width: 150, resizeMode: 'contain'}}
        />
      ),
      headerStyle: {
        elevation: 0,
      },
      headerTitleAlign: 'center',
    });
  }, []);

  const _appointmentAsistanceRequests = () => {
    setloading(true);
    fetch(`https://bicicita.com/app/api/get-user-appointment-request/${id}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${user?.userdata.api_token}`,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        setAsistanceRequests(res.user_list);
        setloading(false);
      })
      .catch((err) => {
        setloading(false);
      });
  };

  const _acceptAppointment = (user_id) => {
    setloading(true);
    const data = new FormData();
    data.append('user_id', user_id);
    data.append('appointment_id', id);
    fetch(`https://bicicita.com/app/api/accept-request`, {
      method: 'POST',
      body: data,
      headers: {
        Authorization: `Bearer ${user?.userdata.api_token}`,
      },
    })
      .then((response) => response.json())
      .then((responseJson) => {
        setloading(false);
        if (responseJson.status == 'success') {
          Alert.alert(responseJson.message, '', [
            {text: 'OK', onPress: () => navigation.goBack()},
          ]);
        }
      })
      .catch((err) => {
        setloading(false);
      });
  };

  const _rejectAppointment = (user_id) => {
    setloading(true);
    const data = new FormData();
    data.append('user_id', user_id);
    data.append('appointment_id', id);
    fetch(`https://bicicita.com/app/api/reject-request`, {
      method: 'POST',
      body: data,
      headers: {
        Authorization: `Bearer ${user?.userdata.api_token}`,
      },
    })
      .then((response) => response.json())
      .then((responseJson) => {
        setloading(false);
        if (responseJson.status == 'success') {
          Alert.alert(responseJson.message, '', [
            {text: 'OK', onPress: () => navigation.goBack()},
          ]);
        }
      })
      .catch((err) => {
        setloading(false);
      });
  };

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      {loading && (
        <View style={{height: '100%'}}>
          <Loader />
        </View>
      )}
      <FlatList
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{flexGrow: 1}}
        keyExtractor={(item) => `${item.id}`}
        data={asistanceRequests}
        renderItem={({item}) => {
          return (
            <Card
              style={{
                backgroundColor: 'white',
                borderRadius: 10,
                marginHorizontal: 15,
                height: 150,
                width: '90%',
                alignSelf: 'center',
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  margin: 10,
                  alignItems: 'center',
                }}>
                <Left>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Image
                      source={{
                        uri: item.profile_image,
                      }}
                      style={{height: 50, width: 50, borderRadius: 40}}
                    />

                    <View style={{marginLeft: 12}}>
                      <Text style={{fontSize: 14, fontFamily: 'Inter-Medium'}}>
                        {item.name}
                      </Text>
                      <Text
                        style={{
                          fontSize: 12,
                          color: '#9fa4bc',
                          width: 200,
                          fontFamily: 'Inter-Regular',
                        }}>
                        {item.introduction}
                      </Text>
                    </View>
                  </View>
                </Left>
                <Right></Right>
              </View>
              <View
                style={{
                  alignItems: 'center',
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                  flex: 1,
                }}>
                <ButtonComp
                  onPress={() => _acceptAppointment(item.user_id)}
                  style={{
                    borderRadius: 6,
                    width: '45%',
                    backgroundColor: '#9561F1',
                  }}
                  title={'Aceptar'}
                />
                <ButtonComp
                  onPress={() => _rejectAppointment(item.user_id)}
                  style={{
                    borderRadius: 6,
                    width: '45%',
                    backgroundColor: '#9561F1',
                  }}
                  title={'Rechazar'}
                />
              </View>
            </Card>
          );
        }}
      />
    </View>
  );
}
