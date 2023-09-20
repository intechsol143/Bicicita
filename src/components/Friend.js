import React from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import {Left, Right} from 'native-base';
import IconCheck from 'react-native-vector-icons/AntDesign';
import IconCross from 'react-native-vector-icons/Entypo';
import Fontisto from 'react-native-vector-icons/Fontisto';

const Friend = ({item, onRequestAccept, onRequestDelete, onPress}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        backgroundColor: 'white',
        marginBottom: 10,
        borderBottomWidth: 0.3,
      }}>
      <View style={styles.componentcontainer}>
        <Left>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Image
              source={{
                uri: item.friend_profile_image
                  ? item.friend_profile_image
                  : 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=334&q=80',
              }}
              style={{height: 50, width: 50, borderRadius: 40}}
            />
            <Fontisto
              style={{
                position: 'absolute',
                bottom: 4,
                left: 38,
              }}
              name="person"
              size={18}
              color="#007aff"
            />

            <View style={{marginLeft: 12}}>
              <Text style={{fontSize: 14, fontFamily: 'Inter-Medium'}}>
                {item.friend_name}
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
        <Right>
          <View style={{flexDirection: 'row'}}>
            {!item.status && (
              <IconCheck
                onPress={onRequestAccept}
                name={'check'}
                size={25}
                color={'#000'}
                style={{marginRight: 12}}
              />
            )}
            <IconCross
              onPress={onRequestDelete}
              name={'cross'}
              size={25}
              color={'#000'}
              style={{marginRight: 12}}
            />
          </View>
        </Right>
      </View>
    </TouchableOpacity>
  );
};

export default Friend;

const styles = StyleSheet.create({
  badgestyle: {
    position: 'absolute',
    height: 12,
    width: 12,
    top: 40,
    left: 30,
    borderRadius: 20,
    backgroundColor: '#38D836',
  },
  componentcontainer: {
    flexDirection: 'row',
    margin: 10,
    alignItems: 'center',
  },
});
