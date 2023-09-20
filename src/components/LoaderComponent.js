import React from 'react';
import {View, ActivityIndicator} from 'react-native';

function LoaderComponent() {
  return (
    <View
      style={{
        position: 'absolute',
        flex: 1,
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
      }}>
      <ActivityIndicator size="large" color="#9561F1" />
    </View>
  );
}

export default LoaderComponent;
