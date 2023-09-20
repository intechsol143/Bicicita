import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {Left, Right} from 'native-base';
import Icon from 'react-native-vector-icons/AntDesign';
import IconMap from 'react-native-vector-icons/Entypo';

const CrearcitascreenComp = ({item, navigation}) => {
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('BusicarCitaApointment', {item: item})}
      style={styles.container}>
      <View style={{flexDirection: 'row', paddingHorizontal: 8, margin: 6}}>
        <Left>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <View
              style={{
                height: 35,
                width: 35,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 30,
                backgroundColor: '#007aff',
              }}>
              <IconMap name={'location-pin'} size={24} />
            </View>
            <View>
              <Text style={styles.nametext}>{item.name}</Text>
              <Text
                style={{
                  textAlign: 'left',
                  marginLeft: 14,
                  color: '#4d4d4d',
                  opacity: 0.6,
                  fontSize: 12,
                }}>
                {item.date}
              </Text>
            </View>
          </View>
        </Left>
        <Right>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={{color: '#FF8A60', marginRight: 8}}>
              {item.distance}
            </Text>
            <View style={styles.iconview}>
              <Icon name={'plus'} style={{fontSize: 22}} />
            </View>
          </View>
        </Right>
      </View>
    </TouchableOpacity>
  );
};

export default CrearcitascreenComp;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderBottomWidth: 0.5,
    paddingVertical: 10,
    borderBottomColor: '#e2e2e2',
  },
  nametext: {
    marginLeft: 12,
    color: 'black',
    fontSize: 14,
  },
  iconview: {
    height: 30,
    width: 30,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    backgroundColor: '#e2e2e2',
  },
});
