import React, {useState, useRef} from 'react';
import {View, Text, Image} from 'react-native';
import {Card} from 'native-base';
import {useSelector} from 'react-redux';
import moment from 'moment';
import Sound from 'react-native-sound';
import Slider from '@react-native-community/slider';
import SIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/Entypo';

const ChatBox = ({userId, msg, voice, image, date}) => {
  const [duration, setDuration] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [value, setValue] = useState(0);
  const [minimumValue, setMinimumValue] = useState(0);

  const {user} = useSelector(({stakreducer}) => stakreducer);

  let isCurrentUser =
    userId === user?.userdata.email.replace(/[^a-zA-Z0-9 ]/g, '')
      ? true
      : false;

  const whoosh = useRef(null);

  const playSound = (soundUrl, i) => {
    // console.log('i am called', soundUrl);
    whoosh.current = new Sound(soundUrl, null, (error) => {
      if (error) {
        console.log('err', error);
        return;
      }
      // loaded successfully
      // console.log('i even came here');
      setDuration(whoosh.current.getDuration());

      // Play the sound with an onEnd callback
      setPlaying(true);
      whoosh.current.play((success) => {
        if (success) {
          setPlaying(false);
          whoosh.current.release();
        } else {
        }
      });
    });

    setInterval(() => {
      whoosh.current.getCurrentTime((seconds) => setValue(seconds));
    }, 500);
  };

  const pauseSound = () => {
    whoosh.current.pause();
    setPlaying(false);
  };

  const onValueChange = (time) => {
    whoosh.current.setCurrentTime(time);
  };

  return (
    <Card
      transparent
      style={{
        alignSelf: isCurrentUser ? 'flex-end' : 'flex-start',
      }}>
      {isCurrentUser ? (
        <View
          style={{
            width: '80%',
            alignItems: 'flex-end',
            flexDirection: 'row-reverse',
          }}>
          <View>
            <View
              style={{
                justifyContent: 'flex-start',
                marginRight: 12,
                borderTopLeftRadius: 10,
                paddingRight: 20,
                borderTopRightRadius: 10,
                borderBottomLeftRadius: 10,
                backgroundColor: '#9561F1',
              }}>
              {msg ? (
                <Text
                  style={{
                    padding: 8,
                    fontSize: 14,
                    fontFamily: 'Inter-Regular',
                    color: 'white',
                  }}>
                  {msg}
                </Text>
              ) : voice ? (
                <View
                  style={{
                    marginRight: 12,
                    flexDirection: 'row',
                    borderTopLeftRadius: 10,
                    borderTopRightRadius: 10,
                    borderBottomLeftRadius: 10,
                    backgroundColor: '#9561F1',
                    padding: 8,
                  }}>
                  {playing ? (
                    <SIcon
                      name={'pause'}
                      size={25}
                      color="#313131"
                      onPress={() => pauseSound()}
                    />
                  ) : (
                    <Icon
                      name={'controller-play'}
                      size={25}
                      color="#313131"
                      onPress={() => {
                        console.log('noice', voice);
                        playSound(voice, null);
                      }}
                    />
                  )}
                  <Slider
                    style={{width: '100%'}}
                    minimumValue={minimumValue}
                    maximumValue={duration}
                    minimumTrackTintColor="#FFFFFF"
                    maximumTrackTintColor="#000000"
                    value={value}
                    onValueChange={(vv) => {
                      onValueChange(vv);
                    }}
                  />
                </View>
              ) : (
                <Image
                  resizeMode="cover"
                  source={{
                    uri: image,
                  }}
                  style={{
                    height: 200,
                    width: 250,
                    borderTopLeftRadius: 10,
                    borderTopRightRadius: 10,
                    borderBottomLeftRadius: 10,
                  }}
                />
              )}
            </View>
            <Text
              style={{
                color: 'black',
                fontFamily: 'Inter-Regular',
                fontSize: 10,
                paddingHorizontal: 5,
                alignSelf: 'flex-end',
                marginRight: 12,
              }}>
              {moment(date).format('MM/DD/YY, h:mm a')}
            </Text>
          </View>
        </View>
      ) : (
        <View
          style={{
            width: '80%',
            alignItems: 'flex-end',
            flexDirection: 'row',
          }}>
          <View>
            <View
              style={{
                justifyContent: 'flex-start',
                marginLeft: 12,
                borderTopLeftRadius: 10,
                borderTopRightRadius: 10,
                borderBottomRightRadius: 10,
                paddingRight: 20,
                backgroundColor: '#9561F1',
              }}>
              {msg ? (
                <Text
                  style={{
                    padding: 8,
                    fontSize: 14,
                    fontFamily: 'Inter-Regular',
                    color: 'white',
                  }}>
                  {msg}
                </Text>
              ) : voice ? (
                <View
                  style={{
                    marginRight: 12,
                    flexDirection: 'row',
                    borderTopLeftRadius: 10,
                    borderTopRightRadius: 10,
                    borderBottomLeftRadius: 10,
                    backgroundColor: '#9561F1',
                    padding: 8,
                  }}>
                  {playing ? (
                    <SIcon
                      name={'pause'}
                      size={25}
                      color="#313131"
                      onPress={() => pauseSound()}
                    />
                  ) : (
                    <Icon
                      name={'controller-play'}
                      size={25}
                      color="#313131"
                      onPress={() => {
                        console.log('noice', voice);
                        playSound(voice, null);
                      }}
                    />
                  )}
                  <Slider
                    style={{width: '100%'}}
                    minimumValue={minimumValue}
                    maximumValue={duration}
                    minimumTrackTintColor="#FFFFFF"
                    maximumTrackTintColor="#000000"
                    value={value}
                    onValueChange={(vv) => {
                      onValueChange(vv);
                    }}
                  />
                </View>
              ) : (
                <Image
                  source={{
                    uri: image,
                  }}
                  style={{
                    height: 200,
                    width: 250,
                    borderTopLeftRadius: 10,
                    borderTopRightRadius: 10,
                    borderBottomRightRadius: 10,
                  }}
                />
              )}
            </View>
            <Text
              style={{
                color: 'black',
                fontFamily: 'Inter-Regular',
                fontSize: 10,
                paddingHorizontal: 5,
                alignSelf: 'flex-start',
                marginLeft: 12,
              }}>
              {moment(date).format('MM/DD/YY, h:mm a')}
            </Text>
          </View>
        </View>
      )}
    </Card>
  );
};
export default ChatBox;
