import React, {useEffect, useState, useCallback} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  TextInput,
  Platform,
  TouchableOpacity,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useSelector, useDispatch} from 'react-redux';
import database from '@react-native-firebase/database';
import Icon1 from 'react-native-vector-icons/AntDesign';
import {
  setGroupInfo,
  selectFriends,
  setGroupState,
  setGroupAllMembers,
} from '../../../../redux/Actions/UsersActionFiles';
import Loader from '../../../../components/LoaderComponent';
import Friend from '../../../../components/Friend';
import GroupsTab from '../../GroupsTab';

const FrindsList = ({navigation}) => {
  const {user} = useSelector(({stakreducer}) => stakreducer);
  const [loader, setLoader] = useState(false);
  const [search, setSearch] = useState('');
  const [Friends, setFriends] = useState([]);

  const dispatch = useDispatch();

  const _getFriendsandRequestLists = () => {
    setLoader(true);
    fetch(`https://bicicita.com/app/api/friend-Requestlist`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${user?.userdata.api_token}`,
      },
    })
      .then((response) => response.json())
      .then((responseJson) => {
        if ((responseJson.status = 'success')) {
          setFriends(responseJson.frienddata.reverse());
        }
      })
      .catch((e) => {})
      .finally(() => {
        setLoader(false);
      });
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      _getFriendsandRequestLists();
    });

    return unsubscribe;
  }, [navigation]);

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

  const _acceptRequest = (id) => {
    setLoader(true);
    fetch(`https://bicicita.com/app/api/acceptfriend/${id}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${user?.userdata.api_token}`,
      },
      body: null,
    })
      .then((response) => response.json())
      .then((res) => {
        if (res) {
          if (res.status === 'success') {
            _getFriendsandRequestLists();
          }
        }
      })
      .catch((e) => {})
      .finally(() => setLoader(false));
  };

  const _deleteRequest = (id) => {
    setLoader(true);
    fetch(`https://bicicita.com/app/api/friend-Deletelist/${id}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${user?.userdata.api_token}`,
      },
      body: null,
    })
      .then((response) => response.json())
      .then((res) => {
        if (res) {
          if (res.status === 'success') {
            _getFriendsandRequestLists();
          }
        }
      })
      .catch((e) => {})
      .finally(() => setLoader(false));
  };

  const _ShowMessage = (isUser, id, group) =>
    Alert.alert(
      isUser ? 'Borrar petición' : 'Eliminar grupo',
      isUser
        ? '¿Estás seguro de que quieres eliminar a un amigo?'
        : '¿Estás seguro de que quieres eliminar un grupo?',
      [
        {
          text: 'Cancelar',
          onPress: () => {},
          style: 'cancel',
        },
        {
          text: 'sí',
          onPress: () => {
            if (isUser) {
              _deleteRequest(id);
            } else {
              _deleteGroup(group);
            }
          },
        },
      ],
    );

  const _deleteGroup = async (group) => {
    _userGroups(group._id);

    try {
      database().ref(`users/${user?.userdata.id}/groups/${group._id}`).remove();
    } catch (error) {}
  };

  const _removeGroup = async (id) => {
    try {
      database().ref(`groups/${id}`).remove();
    } catch (error) {}
  };

  const _updateGroupMembers = async (mem, members, id) => {
    try {
      database()
        .ref(`users/${mem.friend_id}/groups/${id}`)
        .update({members: members});
    } catch (error) {}
  };

  const _userGroups = useCallback(async (id) => {
    try {
      let members = [];
      database()
        .ref(`users/${user?.userdata.id}/groups/${id}/members`)
        .on('value', (dataSnapshot) => {
          dataSnapshot.forEach((child) => {
            members.push(child.val());
          });
          const filtered = members.filter(
            (member) => member.friend_id !== user?.userdata.id,
          );
          const groupMembers = filtered.reduce((pre, cur) => {
            pre[cur.friend_id] = cur;
            return pre;
          }, {});

          function isEmpty(obj) {
            return Object.keys(obj).length === 0;
          }

          if (isEmpty(groupMembers)) {
            _removeGroup(id);
          }

          filtered.forEach((element) => {
            _updateGroupMembers(element, groupMembers, id);
          });
        });
    } catch (error) {}
  }, []);

  const _onEditGroup = (group) => {
    setGroupInfo(group)(dispatch);
    selectFriends([])(dispatch);
    setGroupAllMembers([])(dispatch);
    setGroupState({name: '', Intro: '', image: '', groupImage: ''})(dispatch);
    navigation.navigate('Home', {
      screen: 'Creategroup',
      params: {call: true},
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.subcontainer}>
        <Text
          style={{
            textAlign: 'center',
            padding: 10,
            fontSize: 18,
            color: '#979797',
            fontFamily: 'Inter-Regular',
          }}>
          Listado de Amigos
        </Text>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'flex-start',
            paddingHorizontal: 18,
            flexDirection: 'row',
            width: '100%',
          }}>
          <TouchableOpacity
            onPress={() => {
              setGroupInfo('')(dispatch);
              setGroupAllMembers([])(dispatch);
              setGroupState({name: '', Intro: '', image: '', groupImage: ''})(
                dispatch,
              );
              navigation.navigate('Home', {screen: 'Creategroup'});
            }}
            style={{flexDirection: 'row', alignItems: 'center'}}>
            <View style={styles.groupview}>
              <Image
                source={require('../../../../assets/Icons/PersonIcon.png')}
                style={{height: 20, width: 20, resizeMode: 'contain'}}
              />
            </View>
            <Text
              style={{
                fontSize: 14,
                fontFamily: 'Inter-Medium',
                marginLeft: 12,
              }}>
              Crear Grupo
            </Text>
          </TouchableOpacity>
        </View>

        <View style={{height: 20}} />
        <View style={{alignItems: 'center'}}>
          <View style={styles.passwordContainer}>
            <Icon name="search" color="black" size={14} />
            <TextInput
              style={styles.inputStyle}
              autoCorrect={false}
              // keyboardType="visible-password"
              placeholder="Buscar"
              style={{height: 50, paddingLeft: 10}}
              value={search}
              onChangeText={(text) => setSearch(text)}
              underlineColorAndroid="transparent"
            />
          </View>
        </View>
        {loader ? (
          <View style={{height: '50%', width: '100%'}}>
            <Loader />
          </View>
        ) : (
          <>
            <View style={{height: 20}} />
            <FlatList
              ListHeaderComponent={
                <GroupsTab
                  onGroupEdit={(group) => _onEditGroup(group)}
                  onGroupDelete={(group) =>
                    _ShowMessage(false, undefined, group)
                  }
                  navigation={navigation}
                />
              }
              data={Friends}
              renderItem={({item}) => {
                return (
                  <Friend
                    item={item}
                    onRequestAccept={() => _acceptRequest(item.friend_id)}
                    onRequestDelete={() =>
                      _ShowMessage(true, item.id, undefined)
                    }
                    onPress={() =>
                      navigation.navigate('Home', {
                        screen: 'Singlpersondetail',
                        params: {
                          user_id: item.friend_id,
                        },
                      })
                    }
                  />
                );
              }}
              keyExtractor={(_, index) => `freinds-${index}`}
            />
          </>
        )}
      </View>
    </View>
  );
};

export default FrindsList;

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
