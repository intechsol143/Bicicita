import React from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import {Left, Right} from 'native-base';
import Icon from 'react-native-vector-icons/AntDesign';

const Singlepersondetail_amigos = ({item, onPress}) => {
  return (
    <View>
      <TouchableOpacity onPress={onPress} style={styles.container}>
        <View style={{flexDirection: 'row', paddingHorizontal: 8, margin: 6}}>
          <Left>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Image
                source={{
                  uri: item.image_url ? item.image_url : item.profile_image,
                }}
                style={{height: 50, width: 50, borderRadius: 30}}
              />
              <Text style={styles.nametext}>{item.name}</Text>
            </View>
          </Left>
          <Right>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text
                style={{
                  color: '#ff632b',
                  marginRight: 8,
                  fontFamily: 'Inter-Regular',
                }}>
                {item.distance}
              </Text>
              <View style={styles.iconview}>
                <Icon name={'plus'} style={{fontSize: 22}} color={'#9561f1'} />
              </View>
            </View>
          </Right>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default Singlepersondetail_amigos;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderBottomWidth: 0.5,
    borderBottomColor: '#dfdfdf',
  },
  nametext: {
    marginLeft: 12,
    color: '#020c26',
    fontSize: 14,

    fontFamily: 'Inter-Medium',
  },
  iconview: {
    height: 30,
    width: 30,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    backgroundColor: '#F8F8F8',
  },
});
