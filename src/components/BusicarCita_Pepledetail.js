import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {Left, Right} from 'native-base';
import Icon from 'react-native-vector-icons/AntDesign';
import IconMap from 'react-native-vector-icons/Entypo';

const BusicarCita_Peopledetails = ({item, onPress}) => {
  return (
    <View style={{flex: 1}}>
      <TouchableOpacity onPress={onPress} style={styles.container}>
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
                  backgroundColor: '#2e64f8',
                }}>
                <IconMap name={'location-pin'} size={24} />
              </View>
              <View>
                <Text style={styles.nametext}>
                  {item.city ? item.city : ''}
                </Text>
                <Text
                  style={{
                    textAlign: 'left',
                    marginLeft: 14,
                    color: '#979797',
                    fontFamily: 'Inter-Regular',
                    fontSize: 12,
                  }}>
                  {item.calendar}
                </Text>
              </View>
            </View>
          </Left>
          <Right>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text
                style={{
                  color: '#FF632b',
                  fontSize: 14,
                  fontFamily: 'Inter-Regular',
                  marginRight: 8,
                }}>
                {item.distance}
              </Text>
              <View style={styles.iconview}>
                <Icon name={'plus'} style={{fontSize: 22}} color={'#181920'} />
              </View>
            </View>
          </Right>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default BusicarCita_Peopledetails;

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
    fontFamily: 'Inter-Medium',
  },
  iconview: {
    height: 30,
    width: 30,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    backgroundColor: '#f8f8f8',
  },
});
