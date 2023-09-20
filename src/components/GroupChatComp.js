import React from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import {Left, Right, Badge} from 'native-base';
import IconCross from 'react-native-vector-icons/Entypo';
import Fontisto from 'react-native-vector-icons/Fontisto';
import {useSelector} from 'react-redux';

const GroupChatComp = ({
  item,
  navigation,
  onGroupDelete,
  isChatScreen,
  onGroupEdit,
}) => {
  const {user} = useSelector(({stakreducer}) => stakreducer);
  return (
    <View
      style={{
        backgroundColor: 'white',
        marginBottom: 10,
        borderBottomWidth: 0.3,
      }}>
      <TouchableOpacity
        onPress={() => {
          if (isChatScreen) {
            navigation.navigate('GroupChat', {item});
          } else {
            navigation.navigate('Chat', {screen: 'GroupChat', params: {item}});
          }
        }}
        style={{
          ...styles.componentstyle,
          ...{
            margin: isChatScreen ? 0 : 10,
            marginVertical: isChatScreen ? 10 : 0,
          },
        }}>
        <Left>
          <View style={styles.leftsidedataparent}>
            <Image
              source={{
                uri: item?.groupImage
                  ? item?.groupImage
                  : 'https://thumbs.dreamstime.com/b/teamwork-group-friends-logo-image-holding-each-other-39918563.jpg',
              }}
              style={styles.userimagestyle}
            />
            {!isChatScreen && (
              <Fontisto
                style={{
                  position: 'absolute',
                  bottom: 4,
                  left: 38,
                }}
                name="persons"
                size={15}
                color="#007aff"
              />
            )}
            {item.counter > 0 && (
              <View
                style={{
                  backgroundColor: '#9561F1',
                  height: 25,
                  width: 25,
                  borderRadius: 15,
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'absolute',
                  top: -10,
                  left: 30,
                }}>
                <Text
                  style={{
                    fontFamily: 'Inter-Regular',
                    fontSize: 14,
                    color: 'white',
                  }}>
                  {item.counter > 0 && item.counter}
                </Text>
              </View>
            )}
            {item.isActive ? <Badge style={styles.badgeicon} /> : null}
            <View style={{marginLeft: 12}}>
              <Text
                style={{
                  fontSize: 14,
                  color: '#020C26',
                  fontFamily: 'Inter-Medium',
                }}>
                {item?.groupName}
              </Text>
              <Text
                numberOfLines={1}
                style={{
                  fontSize: 12,
                  color: '#9FA4BC',
                  fontFamily: 'Inter-Regular',
                }}>
                {item?.groupDesc}
              </Text>
            </View>
          </View>
        </Left>
        {!isChatScreen && (
          <Right>
            <View style={{flexDirection: 'row'}}>
              {item.creator == user?.userdata.id && (
                <TouchableOpacity onPress={() => onGroupEdit(item)}>
                  <Image
                    source={require('../assets/Icons/EditIcon.png')}
                    style={{
                      height: 25,
                      marginRight: 20,
                      width: 25,
                      resizeMode: 'contain',
                    }}
                  />
                </TouchableOpacity>
              )}
              <IconCross
                onPress={() => onGroupDelete(item)}
                name={'cross'}
                size={25}
                color={'#000'}
                style={{marginRight: 12}}
              />
            </View>
          </Right>
        )}
      </TouchableOpacity>
    </View>
  );
};
export default GroupChatComp;
const styles = StyleSheet.create({
  userimagestyle: {
    height: 50,
    width: 50,
    borderRadius: 50,
  },
  leftsidedataparent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  componentstyle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  badgeicon: {
    height: 12,
    width: 12,
    position: 'absolute',
    borderRadius: 20,
    top: 35,
    left: 35,
    backgroundColor: '#38D836',
  },
});
