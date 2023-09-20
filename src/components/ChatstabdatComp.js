import React from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import {Left, Right, Badge} from 'native-base';
const ChatstabdatComp = ({item, navigation}) => {
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('Chatscreen', {userdata: item.user})}
      style={styles.componentstyle}>
      <Left>
        <View style={styles.leftsidedataparent}>
          <Image
            source={{
              uri: item?.user?.profile_image
                ? item?.user?.profile_image
                : 'data:image/png;base64,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',
            }}
            style={styles.userimagestyle}
          />
          {item.isActive ? <Badge style={styles.badgeicon} /> : null}
          <View style={{marginLeft: 12}}>
            <Text
              style={{
                fontSize: 14,
                color: '#020C26',
                fontFamily: 'Inter-Medium',
              }}>
              {item?.user?.name}
            </Text>
            <Text
              numberOfLines={1}
              style={{
                fontSize: 12,
                color: '#9FA4BC',
                fontFamily: 'Inter-Regular',
              }}>
              {item?.latestMessage}
            </Text>
          </View>
        </View>
      </Left>
      <Right>
        {item.counter > 0 && (
          <View
            style={{
              backgroundColor: '#007aff',
              padding: 5,
              height: 30,
              width: 30,
              borderRadius: 15,
              alignItems: 'center',
              justifyContent: 'center',
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
      </Right>
    </TouchableOpacity>
  );
};
export default ChatstabdatComp;
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
    paddingVertical: 8,
    borderBottomWidth: 0.3,
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
