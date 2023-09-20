import React, {useEffect} from 'react';
import {Modal, Alert, Text, ActivityIndicator, View} from 'react-native';
// import colors from '../styles';
const myModal = (showModal) => {
  // showModal && console.log('i awake after the transaction', showModal);
  // <Modal animationType="slide" transparent={true} visible={showModal}>
  return (
    showModal === true && (
      <Modal
        transparent={true}
        visible={showModal}
        // onRequestClose={() => {
        //   Alert.alert("Modal has been closed.");
        //   setModalVisible(!modalVisible);
        // }}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: '#00000088',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 200,
            left: 0,
            top: 0,
            right: 0,
            bottom: 0,
            position: 'absolute',
          }}>
          <View
            style={{
              height: 50,
              width: 50,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'white',
              borderRadius: 25,
            }}>
            <ActivityIndicator size="small" color={'#9561f1'} />
          </View>
        </View>
      </Modal>
    )
  );

  // </Modal>
};
export default myModal;
