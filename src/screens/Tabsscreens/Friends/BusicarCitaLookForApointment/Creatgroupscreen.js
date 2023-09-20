import {Left, Right} from 'native-base';
import React, {useEffect, useState, useLayoutEffect} from 'react';
import {
  StyleSheet,
  Platform,
  Text,
  View,
  Image,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import database from '@react-native-firebase/database';
import IconPlus from 'react-native-vector-icons/AntDesign';
import ImageIcon from 'react-native-vector-icons/Entypo';
import ImagePicker from 'react-native-image-crop-picker';
import IconPlaceholder from 'react-native-vector-icons/FontAwesome';
import {useSelector, useDispatch} from 'react-redux';
import Icon from 'react-native-vector-icons/AntDesign';
import ButtonComp from '../../../../components/ButtonComp';
import Loader from '../../../../components/LoaderComponent';

import {
  selectFriends,
  selectMembers,
  setGroupInfo,
  setGroupState,
  setGroupAllMembers,
} from '../../../../redux/Actions/UsersActionFiles';

const Creatgroupscreen = ({navigation, route}) => {
  const {user} = useSelector(({stakreducer}) => stakreducer);
  const {Newelectedata, selectedMembers} = useSelector(
    ({friendsReducer}) => friendsReducer,
  );
  const {groupInfo, groupState, groupAllMembers} = useSelector(
    ({AppReducer}) => AppReducer,
  );
  const call = route?.params?.call;

  const [name, setName] = useState(
    groupInfo ? groupInfo.groupName : groupState.name,
  );
  const [Intro, setIntro] = useState(
    groupInfo ? groupInfo.groupDesc : groupState.Intro,
  );
  const [image, setimage] = useState(
    groupInfo ? groupInfo.groupImage : groupState.image,
  );
  const [loading, setloading] = useState(false);
  const [groupImage, setGroupImage] = useState(
    groupInfo ? groupInfo.groupImage : groupState.groupImage,
  );
  const [nameErr, setNameErr] = useState('');
  const [friendErr, setFriendsErr] = useState('');
  const [descErr, setDescErr] = useState('');
  const [imageErr, setImageErr] = useState('');
  const [imageUpload, setImageUpload] = useState('');
  const [groupMembers, setGroupMembers] = useState([]);
  const [groupUsers, setGroupUsers] = useState([]);

  const dispatch = useDispatch();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <Image
          source={require('../../../../assets/Icons/logoapp.png')}
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
      headerStyle: {
        elevation: 0,
      },
      headerTitleAlign: 'center',
    });
  }, []);

  useEffect(() => {
    if (groupInfo && call) {
      let newArray = [];
      Object.entries(groupInfo.members).forEach(([_, value]) =>
        newArray.push(value),
      );
      setGroupAllMembers(newArray)(dispatch);
      selectMembers(newArray)(dispatch);
    }
  }, []);

  useEffect(() => {
    if (!groupInfo) {
      {
        const newUser = {
          friend_id: user?.userdata.id,
          friend_introduction: user?.userdata.introduction,
          friend_name: user?.userdata.name,
          friend_profile_image: user?.userdata.profile_image,
        };

        const addedUsers = Newelectedata ? [...Newelectedata, newUser] : [];
        const members = addedUsers.reduce((pre, cur) => {
          pre[cur.friend_id] = cur;
          return pre;
        }, {});
        setGroupUsers(addedUsers);
        setGroupMembers(members);
        selectMembers([])(dispatch);
      }
    }
  }, [Newelectedata]);

  useEffect(() => {
    if (groupInfo) {
      const members = selectedMembers.reduce((pre, cur) => {
        pre[cur.friend_id] = cur;
        return pre;
      }, {});
      setGroupMembers(members);
    }
  }, [selectedMembers]);

  const chooseImage = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      compressImageQuality: 0.8,
    }).then((img) => {
      setimage(img.path);
      uploadImage(img.path);
    });
  };

  const uploadImage = async (image) => {
    setloading(true);
    setImageUpload('Espere a que se cargue la imagen');
    const data = new FormData();
    data.append('image', {
      uri: Platform.OS === 'android' ? image : image.replace('file://', ''),
      type: 'image/jpeg',
      name: 'image' + new Date() + '.jpg',
    });
    await fetch('https://bicicita.com/app/api/upload', {
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data',
        accept: 'application/json',
      },
      body: data,
    })
      .then((response) => response.json())
      .then((responseJson) => {
        setGroupImage(responseJson.linedata);
        setloading(false);
        setImageUpload('');
      })
      .catch((error) => {
        setloading(false);
        setImageUpload('');
      });
  };

  const _createGroup = async () => {
    const groupsRef = database().ref('groups').push();

    if (validate()) {
      try {
        groupsRef.set({
          _id: groupsRef.key,
          groupName: name,
          groupDesc: Intro,
          members: groupMembers,
          timestamp: database.ServerValue.TIMESTAMP,
          groupImage: groupImage,
          counter: 0,
          isGroup: true,
          creator: user?.userdata.id,
        });

        groupUsers.forEach((member) => {
          database()
            .ref(`users/${member.friend_id}`)
            .child(`groups/${groupsRef.key}`)
            .set({
              _id: groupsRef.key,
              groupName: name,
              groupDesc: Intro,
              members: groupMembers,
              timestamp: database.ServerValue.TIMESTAMP,
              groupImage: groupImage,
              counter: 0,
              isGroup: true,
              creator: user?.userdata.id,
            });
        });
        setName('');
        setIntro('');
        setimage('');
        setGroupImage('');
        setloading(false);
        selectFriends([])(dispatch);
        setGroupState({name: '', Intro: '', image: '', groupImage: ''})(
          dispatch,
        );
        navigation.goBack();
      } catch (error) {}
    }
  };

  const _updateGroup = async () => {
    const removeMembers = groupAllMembers.filter(function (obj) {
      return selectedMembers.indexOf(obj) == -1;
    });

    if (validate()) {
      try {
        selectedMembers.forEach((member) => {
          database()
            .ref(`users/${member.friend_id}`)
            .child(`groups/${groupInfo._id}`)
            .update({
              _id: groupInfo._id,
              groupName: name,
              groupDesc: Intro,
              groupImage: groupImage,
              members: groupMembers,
              timestamp: database.ServerValue.TIMESTAMP,
              isGroup: true,
            });
        });

        database().ref(`groups/${groupInfo._id}`).update({
          groupName: name,
          groupDesc: Intro,
          groupImage: groupImage,
          members: groupMembers,
          timestamp: database.ServerValue.TIMESTAMP,
        });

        removeMembers.forEach((member) => {
          database()
            .ref(`users/${member.friend_id}/groups/${groupInfo._id}`)
            .remove();
        });

        setName('');
        setIntro('');
        setimage('');
        setGroupImage('');
        setloading(false);
        selectFriends([])(dispatch);
        selectMembers([])(dispatch);
        setGroupInfo('')(dispatch);
        setGroupAllMembers([])(dispatch);
        navigation.goBack();
      } catch (error) {}
    }
  };

  const validate = () => {
    if (!name.trim()) {
      setNameErr('Ingrese el nombre del grupo');
      return false;
    } else if (!Newelectedata.length && !selectedMembers.length) {
      setFriendsErr('Por favor selecciona amigos');
      return false;
    } else if (!Intro.trim()) {
      setDescErr('Ingrese la descripción del grupo');
      return false;
    } else if (!image || !groupImage) {
      setImageErr('Cargue la imagen del grupo');
      return false;
    }
    return true;
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.subcontainer}>
          <Text
            style={{
              textAlign: 'center',
              fontSize: 18,
              padding: 10,
              color: '#979797',
              fontFamily: 'Inter-Regular',
            }}>
            Crear grupo
          </Text>
          <View style={{height: 18}} />
          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.inputStyle}
              autoCorrect={false}
              placeholder="Nombre del grupo"
              value={name}
              style={{height: 50}}
              onChangeText={(text) => {
                setName(text);
                setNameErr('');
              }}
              underlineColorAndroid="transparent"
            />
          </View>
          {nameErr ? <Text style={{color: 'red'}}>{nameErr}</Text> : null}
          <View style={{height: 20}} />
          <View style={{flexDirection: 'row'}}>
            <Left>
              <Text
                style={{
                  fontSize: 14,
                  fontFamily: 'Inter-Medium',
                  color: '#020c26',
                }}>
                Añadir amigos
              </Text>
            </Left>
            <Right>
              <TouchableOpacity
                onPress={() => {
                  setGroupState({name, Intro, image, groupImage})(dispatch);
                  navigation.navigate('Custom', {screen: 'SelectFriends'});
                  setFriendsErr('');
                }}
                style={{
                  padding: 10,
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: '#f8f8f8',
                  borderRadius: 30,
                }}>
                <IconPlus name={'plus'} color={'#9561f1'} size={15} />
              </TouchableOpacity>
            </Right>
          </View>
          <View
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              alignItems: 'center',
              width: '100%',
            }}>
            {selectedMembers.length
              ? selectedMembers?.map((item) => (
                  <View
                    key={`key-${item.friend_id}`}
                    style={{
                      backgroundColor: '#5E51F7',
                      padding: 10,
                      marginRight: 5,
                      borderRadius: 30,
                      marginBottom: 5,
                    }}>
                    <Text style={{color: '#FFF'}}>{item.friend_name}</Text>
                  </View>
                ))
              : Newelectedata?.map((item) => (
                  <View
                    key={`key-${item.friend_id}`}
                    style={{
                      backgroundColor: '#5E51F7',
                      padding: 10,
                      marginRight: 5,
                      borderRadius: 30,
                      marginBottom: 5,
                    }}>
                    <Text style={{color: '#FFF'}}>{item.friend_name}</Text>
                  </View>
                ))}
          </View>
          {friendErr ? <Text style={{color: 'red'}}>{friendErr}</Text> : null}
          <View style={{height: 20}} />
          <TextInput
            placeholder={'Descripción del grupo'}
            textAlignVertical={'top'}
            style={{
              height: 100,
              borderWidth: 0,
              borderRadius: 10,
              backgroundColor: '#e2e2e2',
              padding: 4,
              paddingLeft: 8,
              color: '#9fa4bc',
              fontFamily: 'Inter-Regular',
              fontSize: 14,
            }}
            value={Intro}
            onChangeText={(text) => {
              setIntro(text);
              setDescErr('');
            }}
            underlineColorAndroid="transparent"
          />
          {descErr ? <Text style={{color: 'red'}}>{descErr}</Text> : null}
          <View style={{height: 15}} />
          <View>
            <View style={{alignItems: 'center'}}>
              {image ? (
                <Pressable
                  onPress={() => {
                    chooseImage();
                    setImageErr('');
                  }}
                  style={{height: 150}}>
                  <Image
                    style={{height: 150, width: 200, borderRadius: 5}}
                    source={{uri: image}}
                  />
                </Pressable>
              ) : (
                <View
                  style={{
                    height: 80,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <IconPlaceholder
                    onPress={() => {
                      chooseImage();
                      setImageErr('');
                    }}
                    name={'image'}
                    size={80}
                    color={'#dfdfdf'}
                  />
                </View>
              )}

              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  width: '20%',
                }}>
                <Text
                  style={{
                    color: '#979797',
                    paddingVertical: 6,
                    fontSize: 14,
                    fontFamily: 'Inter-Regular',
                  }}>
                  Foto
                </Text>
                <ImageIcon name={'image'} color={'#979797'} />
              </View>
              {imageErr ? <Text style={{color: 'red'}}>{imageErr}</Text> : null}
            </View>
          </View>
        </View>
        <View style={{height: 20}} />
        <View style={styles.bottomcontainer}>
          <ButtonComp
            onPress={() => {
              groupInfo ? _updateGroup() : _createGroup();
            }}
            style={{borderRadius: 6, backgroundColor: '#9561F1'}}
            title={groupInfo ? 'Actualizar grupo' : 'Crear grupo'}
          />
        </View>
      </ScrollView>
      {loading ? <Loader /> : null}
      {imageUpload ? (
        <Text style={{color: 'red', textAlign: 'center'}}>{imageUpload}</Text>
      ) : null}
    </View>
  );
};

export default Creatgroupscreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingBottom: 20,
  },
  subcontainer: {
    flex: 5,
    paddingHorizontal: 12,
  },
  passwordContainer: {
    flexDirection: 'row',
    borderWidth: 0,
    borderRadius: 10,
    paddingHorizontal: 10,
    alignItems: 'center',
    borderColor: '#000',
    width: '100%',
    backgroundColor: '#f8f8f8',
  },
  inputStyle: {
    flex: 1,
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#9fa4bc',
  },
  bottomcontainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
