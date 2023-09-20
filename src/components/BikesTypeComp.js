import React from 'react';
import {Text, TouchableOpacity} from 'react-native';

const BikesTypeComp = ({
  title,
  onPress,
  borderWidth = 0,
  selected = false,
  borderColor,
  backgroundColor,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        padding: 6,
        paddingLeft: 12,
        paddingRight: 12,
        marginVertical: 10,
        marginRight: 4,
        borderWidth: selected ? borderWidth : 0,
        borderColor: selected ? borderColor : 'black',
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: selected ? backgroundColor : '#e2e2e2',
      }}>
      <Text
        style={{
          color: selected ? 'white' : '#999999',
          fontFamily: 'Inter-Regular',
          fontSize: 14,
        }}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default BikesTypeComp;
