import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';

const ButtonComp = ({title, onPress, style, disabled}) => {
  return (
    <TouchableOpacity
      disabled={disabled}
      style={[styles.btnstyle, style]}
      onPress={onPress}>
      <Text style={styles.titlecolor}>{title}</Text>
    </TouchableOpacity>
  );
};

export default ButtonComp;

const styles = StyleSheet.create({
  btnstyle: {
    backgroundColor: '#5E51F7',
    height: 40,
    width: '90%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titlecolor: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'Inter-Regular',
  },
});
