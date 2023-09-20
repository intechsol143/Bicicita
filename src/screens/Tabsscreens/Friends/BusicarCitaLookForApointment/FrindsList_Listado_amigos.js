import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  TextInput,
  Platform,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useSelector, useDispatch} from 'react-redux';
import Icon1 from 'react-native-vector-icons/AntDesign';
import FlistComp from '../../../../components/FrindsListcomp';
import ButtonComp from '../../../../components/ButtonComp';
import LoaderComponent from '../../../../components/LoaderComponent';

import {setSelectedUsers} from '../../../../redux/Actions/UsersActionFiles';

const FrindsList_Listado_amigos = ({navigation, route}) => {
  const {user} = useSelector(({stakreducer}) => stakreducer);
  const {allUsersList, selectedUsers} = useSelector(
    ({AppReducer}) => AppReducer,
  );

  const myitem = route?.params?.myitem;
  const edit = route?.params?.edit;
  const id = route?.params?.id;
  const dispatch = useDispatch();

  const [search, setSearch] = useState('');
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <Image
          source={require('../../../../assets/Icons/logoapp.png')}
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

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      if (edit) {
        getSelectedUsers();
      }
    });
    return () => unsubscribe;
  }, []);

  const getSelectedUsers = () => {
    if (selectedUsers.length) return;
    setLoader(true);
    fetch(`https://bicicita.com/app/api/appointment-list-user/${id}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${user?.userdata.api_token}`,
      },
    })
      .then((response) => response.json())
      .then((responseJson) => {
        setLoader(false);
        if ((responseJson.status = 'success')) {
          const newArray = responseJson.invited.map((item) => ({
            friend_id: item.id,
            friend_introduction: item.introduction,
            friend_name: item.name,
            friend_profile_image: item.profile_image,
          }));
          setSelectedUsers(newArray)(dispatch);
        }
      })
      .catch((error) => {
        setLoader(false);
      });
  };

  const onPress = (item) => {
    pressItem(item);
  };

  const pressItem = (newitem) => {
    const newarray = [...selectedUsers];
    const index = newarray.findIndex(
      (item) => item.friend_id == newitem.friend_id,
    );
    if (index >= 0) {
      newarray.splice(index, 1);
    } else {
      if (newarray.length < myitem) {
        newarray.push(newitem);
      } else {
        Alert.alert(`No se puede 
seleccionar más de  ${myitem}`);
      }
    }
    setSelectedUsers(newarray)(dispatch);
  };
  console.log('friends', allUsersList);
  return (
    <View style={styles.container}>
      {loader && (
        <View style={{height: '100%'}}>
          <LoaderComponent />
        </View>
      )}
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
              style={styles.inputStyle}
              autoCorrect={false}
              placeholder="Buscar"
              style={{height: 50, paddingLeft: 10}}
              value={search}
              onChangeText={(text) => setSearch(text)}
              underlineColorAndroid="transparent"
            />
          </View>
        </View>

        <View style={{height: 20}} />
        <FlatList
          data={allUsersList}
          extraData={selectedUsers}
          renderItem={({item}) => {
            const locArr = [...selectedUsers];
            const NewIndex = locArr.findIndex(
              (itemk) => itemk.friend_id === item.friend_id,
            );
            return (
              <FlistComp
                item={item}
                selected={NewIndex !== -1}
                onPress={() => onPress(item)}
              />
            );
          }}
          keyExtractor={(_, index) => `list-${index}`}
        />
      </View>
      <View style={styles.bottomcontainer}>
        <ButtonComp
          onPress={() => {
            if (edit) {
              navigation.navigate('EditApointment');
            } else {
              navigation.navigate('Creatapointment');
            }
          }}
          style={{borderRadius: 6, backgroundColor: '#9561F1'}}
          title={'Seleccionar amigos'}
        />
      </View>
    </View>
  );
};

export default FrindsList_Listado_amigos;

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
