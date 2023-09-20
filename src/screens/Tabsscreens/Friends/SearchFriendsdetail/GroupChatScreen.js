import React, {useEffect, useState, useRef} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  // Platform,
  Keyboard,
  TextInput,
  FlatList,
  TouchableOpacity,
  Platform,
  PermissionsAndroid,
} from 'react-native';
import {Left, Body, Right} from 'native-base';
import IconAdd from 'react-native-vector-icons/AntDesign';
import MICicon from 'react-native-vector-icons/FontAwesome';
import {AudioRecorder, AudioUtils} from 'react-native-audio';
import ImagePicker from 'react-native-image-crop-picker';
import * as Animatable from 'react-native-animatable';
import {useSelector} from 'react-redux';
import database from '@react-native-firebase/database';

import {senderMsg} from '../../../../components/GroupChatUtilis';
import ChatBox from '../../../../components/ChatBoxComp';
import GroupChatBox from '../../../../components/GroupChatBox';

const GroupChatScreen = ({navigation, route}) => {
  const [message, setmessage] = useState('');
  const [newmessages, setnewmessages] = useState([]);
  const [recordingState, setRecordingState] = useState(null);
  const [timer, setTimer] = useState(0);
  const [uploadingImage, setUploadingImage] = useState(null);
  const checkForUpdate = useRef(false);
  const [keyHeight, setKeyHeight] = useState(0);
  const [keyboardStatus, setKeyboardStatus] = useState(false);

  const audioPath = AudioUtils.DocumentDirectoryPath + '/test.aac';
  const timerInterval = useRef(null);
  const {user} = useSelector(({stakreducer}) => stakreducer);
  const {item} = route.params;

  useEffect(() => {
    if (recordingState === 'recording') {
      timerInterval.current = setInterval(() => {
        setTimer(timer + 1);
      }, 1000);
    }

    return () => {
      if (timerInterval.current) {
        clearInterval(timerInterval.current);
        if (recordingState === 'uploading') setTimer(0);
      }
    };
  }, [timer, recordingState]);
  useEffect(() => {
    const showSubscription = Keyboard.addListener(
      'keyboardDidShow',
      (e: KeyboardEvent) => {
        setKeyboardStatus(true);
        setKeyHeight(e.endCoordinates.height);
        console.log('i am the height ', e.endCoordinates.height);
      },
    );
    const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardStatus(false);
      setKeyHeight(0);
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);
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
    _getMeesages();
    checkPermission();
    return () => {
      _getMeesages();
      checkPermission();
    };
  }, []);

  useEffect(() => {
    _updateChatCount();
    return () => {
      if (checkForUpdate.current === false) _updateChatCount();
    };
  }, []);
  useEffect(() => {
    navigation.setOptions({
      headerStyle: {
        elevation: 0,
        backgroundColor: 'white',
      },

      headerTitle: () => (
        <Image
          // source={require('../../assets/Icons/logoapp.png')}
          source={require('../../../../assets/Icons/logoapp.png')}
          style={{height: 50, width: 180, resizeMode: 'contain'}}
        />
      ),
      headerLeft: () =>
        Platform.OS === 'ios' && (
          <IconAdd
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
  const _updateChatCount = async () => {
    try {
      database()
        .ref(`users/${user?.userdata.id}/groups/${item._id}`)
        .once('value', (snapshot) => {
          if (snapshot.val() != null) {
            database()
              .ref(`users/${user?.userdata.id}/groups/${item._id}`)
              .update({
                counter: 0,
              });
          }
        });
    } catch (error) {}
  };

  const checkPermission = async () => {
    if (Platform.OS !== 'android') {
      return Promise.resolve(true);
    }

    let result;
    try {
      result = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
        {
          title: 'Microphone Permission',
          message:
            'Enter the Gunbook needs access to your microphone so you can search with voice.',
        },
      );
    } catch (error) {}
    return result === true || result === PermissionsAndroid.RESULTS.GRANTED;
  };

  const _getMeesages = async () => {
    try {
      database()
        .ref(`groups/${item._id}/messages`)
        .on('value', (dataSnapshot) => {
          let msgs = [];
          dataSnapshot.forEach((child) => {
            msgs.push({
              msg: child.val().message.text,
              sendBy: child.val().message.sendBy,
              senderName: child.val().message.senderName,
              profile_image: child.val().message.profile_image,
              date: child.val().message.date,
              voice: child.val().message.voice,
              image: child.val().message.image,
            });
          });
          setnewmessages(msgs.reverse());
        });
    } catch (error) {}
  };

  const handleSend = (type, voice, image) => {
    setmessage('');

    if (type === 'text') {
      if (message) {
        senderMsg(
          message,
          null,
          null,
          `${user?.userdata.id}`,
          item._id,
          Date.now(),
          `${user?.userdata.name}`,
          user?.userdata.profile_image,
        )
          .then(() => {
            _chatGroups();
          })
          .catch((err) => {});
      }
    } else if (type === 'voice') {
      if (voice) {
        senderMsg(
          null,
          voice,
          null,
          `${user?.userdata.id}`,
          item._id,
          Date.now(),
          `${user?.userdata.name}`,
          user?.userdata.profile_image,
        )
          .then(() => {
            _chatGroups();
          })
          .catch((err) => {});
      }
    } else if (type === 'image') {
      if (image) {
        senderMsg(
          null,
          null,
          image,
          `${user?.userdata.id}`,
          item._id,
          Date.now(),
          `${user?.userdata.name}`,
          user?.userdata.profile_image,
        )
          .then(() => {
            _chatGroups();
          })
          .catch((err) => {});
      }
    }
  };

  const recordAudio = async () => {
    try {
      prepareRecordingPath(audioPath);
      const filePath = await AudioRecorder.startRecording();
    } catch (error) {}
  };

  const prepareRecordingPath = (audioPath) => {
    AudioRecorder.prepareRecordingAtPath(audioPath, {
      SampleRate: 22050,
      Channels: 1,
      AudioQuality: 'Low',
      AudioEncoding: 'aac',
      AudioEncodingBitRate: 32000,
    });
  };

  const stopRecording = async () => {
    const filePath = await AudioRecorder.stopRecording();
    goForFetch(filePath);
  };

  const createFormData = (audio) => {
    const data1 = new FormData();
    data1.append('voice', {
      uri: Platform.OS === 'android' ? 'file://' + audio : audio,
      name: 'test.aac',
      type: 'audio/aac',
    });

    return data1;
  };

  const goForFetch = async (voice) => {
    await fetch('https://bicicita.com/app/api/voice', {
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      body: createFormData(voice),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        setRecordingState(null);
        handleSend('voice', responseJson.linedata, null);
      })
      .catch((error) => {});
  };

  const chooseImage = () => {
    ImagePicker.openPicker({
      multiple: false,
      mediaType: 'photo',
      height: 200,
      width: 250,
      cropping: true,
    }).then((image) => {
      setUploadingImage('uploading');
      uploadImage(image.path);
    });
  };

  const uploadImage = async (image) => {
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
        setRecordingState(null);
        setUploadingImage(null);
        handleSend('image', null, responseJson.linedata);
      })
      .catch((error) => {});
  };

  const _chatGroups = async () => {
    try {
      database().ref(`users/${user?.userdata.id}/groups/${item._id}`).update({
        timestamp: database.ServerValue.TIMESTAMP,
        counter: 0,
      });

      database()
        .ref(`users/${user?.userdata.id}/groups/${item._id}/members`)
        .on('value', (snapshot) => {
          snapshot.forEach((member) => {
            if (member.key != user?.userdata.id) {
              database()
                .ref(`users/${member.key}/groups/${item._id}`)
                .once('value', (snapshot) => {
                  const counts = snapshot?.val()?.counter;
                  database()
                    .ref(`users/${member.key}/groups/${item._id}`)
                    .update({
                      timestamp: database.ServerValue.TIMESTAMP,
                      counter: counts ? counts + 1 : 1,
                    });
                });
            }
          });
        });
    } catch (error) {}
  };
  console.log('agdf', newmessages);
  return (
    <View style={styles.container}>
      <View style={styles.subcontaiber}>
        <View style={{flexDirection: 'row'}}>
          <Left>
            <View style={styles.chatuser}>
              <Image
                source={{
                  uri: item.groupImage
                    ? item.groupImage
                    : 'https://thumbs.dreamstime.com/b/teamwork-group-friends-logo-image-holding-each-other-39918563.jpg',
                }}
                style={styles.userimagestyle}
              />
              <Text
                style={{
                  fontSize: 16,
                  color: 'black',
                  marginLeft: 15,
                  fontFamily: 'Inter-Medium',
                }}>
                {item.groupName}
              </Text>
            </View>
          </Left>
          <Right />
        </View>
        <FlatList
          showsVerticalScrollIndicator={false}
          inverted
          data={newmessages}
          renderItem={({item}) => (
            <GroupChatBox
              msg={item.msg}
              voice={item.voice}
              image={item.image}
              userId={item.sendBy}
              date={item.date}
              senderName={item.senderName}
              profile_image={item.profile_image}
            />
          )}
          keyExtractor={(_, index) => `message-${index}`}
        />
        {recordingState !== null && (
          <View
            style={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              left: 12,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <View
              style={{
                borderRadius: 20,
                width: '90%',
                height: '40%',
                backgroundColor: '#000000BB',
                justifyContent: 'center',
                alignItems: 'center',
                alignSelf: 'center',
              }}>
              <Animatable.View
                animation={
                  recordingState === 'recording' ? 'pulse' : 'fadeOutUp'
                }
                easing={
                  recordingState === 'recording'
                    ? 'ease-in-back'
                    : 'ease-in-out'
                }
                iterationCount="infinite"
                useNativeDriver={true}>
                <MICicon name={'microphone'} size={100} color="#9561F1" />
              </Animatable.View>
              <Text
                style={{color: '#fff', fontWeight: 'bold', marginTop: '10%'}}>
                {recordingState === 'recording'
                  ? new Date(timer * 1000).toISOString().substr(11, 8)
                  : 'Sending...'}
              </Text>
            </View>
          </View>
        )}
        {uploadingImage !== null && (
          <View
            style={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              left: 12,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <View
              style={{
                borderRadius: 20,
                width: '90%',
                height: '40%',
                backgroundColor: '#000000BB',
                justifyContent: 'center',
                alignItems: 'center',
                alignSelf: 'center',
              }}>
              <Animatable.View
                animation={
                  uploadingImage === 'recording' ? 'pulse' : 'fadeOutUp'
                }
                easing={
                  uploadingImage === 'recording'
                    ? 'ease-in-back'
                    : 'ease-in-out'
                }
                iterationCount="infinite"
                useNativeDriver={true}>
                <IconAdd name={'upload'} size={100} color="#9561F1" />
              </Animatable.View>
              <Text
                style={{color: '#fff', fontWeight: 'bold', marginTop: '10%'}}>
                Sending...
              </Text>
            </View>
          </View>
        )}
      </View>

      <View
        style={[
          styles.bottomcontaiber.alignItems,
          {
            marginBottom:
              keyboardStatus && Platform.OS === 'ios' ? keyHeight : 0,
          },
        ]}>
        <View style={{flexDirection: 'row'}}>
          <Left>
            <View style={styles.iconsview}>
              <IconAdd
                onPress={() => chooseImage()}
                name={'plus'}
                size={20}
                color={'#181920'}
              />
            </View>
          </Left>
          <Body style={{flex: 3, marginRight: 34}}>
            <TextInput
              style={{
                borderRadius: 30,
                maxHeight: 40,
                backgroundColor: '#e2e2e2',
                width: '100%',
                height: 50,
                paddingVertical: 5,
                paddingHorizontal: 10,
              }}
              editable={!(recordingState === 'uploading')}
              value={message}
              onChangeText={(text) => setmessage(text)}
              multiline
              underlineColorAndroid="transparent"
            />
          </Body>
          <Right
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-around',
            }}>
            <View style={{marginRight: 10}}>
              <TouchableOpacity
                disabled={recordingState === 'uploading'}
                onLongPress={() => {
                  recordAudio();
                  setRecordingState('recording');
                }}
                onPressOut={() => {
                  if (recordingState === 'recording') {
                    stopRecording();
                    setRecordingState('uploading');
                  }
                }}
                style={styles.iconsview}>
                <Image
                  source={require('../../../../assets/Icons/Mic.png')}
                  style={{height: 20, width: 20, resizeMode: 'contain'}}
                />
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              onPress={() => handleSend('text', null, null)}
              style={styles.iconsviewupload}>
              <Image
                source={require('../../../../assets/Icons/Bag.png')}
                style={{height: 20, width: 20, resizeMode: 'contain'}}
              />
            </TouchableOpacity>
          </Right>
        </View>
      </View>
    </View>
  );
};

export default GroupChatScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  usernamestyle: {
    marginLeft: 12,
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: 'white',
  },
  video_mbs: {
    paddingVertical: 1,
    color: 'white',
  },
  downloadview: {
    height: 30,
    width: 30,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  iconsview: {
    height: 30,
    width: 30,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f8f8f8',
    borderRadius: 30,
  },
  iconsviewupload: {
    height: 30,
    width: 30,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#9561F1',
    borderRadius: 30,
  },
  chatuserTwo: {
    padding: 6,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#9561F1',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    borderBottomLeftRadius: 15,
  },
  playiconview: {
    height: 20,
    width: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#9561F1',
    borderRadius: 20,
  },
  chatuseraudio: {
    padding: 6,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: 'white',
    elevation: 1,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    borderBottomLeftRadius: 15,
  },
  chatuser: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  chatuserFourth: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 4,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    borderBottomLeftRadius: 15,
    backgroundColor: '#9561F1',
  },
  chatuserThree: {
    height: 110,
    width: 160,
    justifyContent: 'center',
    borderTopRightRadius: 15,
    borderBottomRightRadius: 15,
    borderTopLeftRadius: 15,
    backgroundColor: '#E7E9F3',
    alignItems: 'center',
  },
  chatuserFive: {
    height: 60,
    width: 160,
    justifyContent: 'center',
    borderTopRightRadius: 15,
    borderBottomRightRadius: 15,
    borderTopLeftRadius: 15,
    backgroundColor: 'grey',
    alignItems: 'center',
  },
  subcontaiber: {
    flex: 5,
    paddingHorizontal: 12,
  },
  userimagestyle: {
    height: 50,
    width: 50,
    borderRadius: 50,
  },
  userimagestyleTwo: {
    height: 100,
    width: 150,
    borderRadius: 10,
  },

  bottomcontaiber: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 12,
    justifyContent: 'center',
  },
});
