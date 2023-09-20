import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';

const ProfilScreenBtnsComp = ({title, backgroundColor, onPress}) => {
  return (
    <View>
      <TouchableOpacity
        onPress={onPress}
        style={{
          padding: 6,
          backgroundColor: backgroundColor,
          margin: 6,
          borderRadius: 30,
        }}>
        <Text style={{fontFamily: 'Inter-Medium', fontSize: 14}}>{title}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ProfilScreenBtnsComp;

const styles = StyleSheet.create({});
