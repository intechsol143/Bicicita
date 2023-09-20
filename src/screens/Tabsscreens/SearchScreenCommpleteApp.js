import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Platform,
  TextInput,
  Image,
  ScrollView,
} from 'react-native';

import Icon1 from 'react-native-vector-icons/AntDesign';
import Icon from 'react-native-vector-icons/FontAwesome';
const SearchScreenCommpleteApp = ({navigation}) => {
  const [search, setSearch] = useState('');
  useEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <Image
          source={require('../../assets/Icons/logoapp.png')}
          style={{height: 40, width: 180, resizeMode: 'contain'}}
        />
      ),
      headerLeft: () =>
        Platform.OS === 'ios' && (
          <Icon1
            name="arrowleft"
            color="black"
            size={20}
            style={{left: 15}}
            onPress={() => navigation.goBack()}
          />
        ),
      headerTitleAlign: 'center',
      headerStyle: {
        elevation: 0,
      },
    });
  }, []);
  const A_realtedData = [
    {
      a: 'A',
    },
    {
      a: 'A',
    },
    {
      a: 'A',
    },
    {
      a: 'A',
    },
  ];
  const B_realtedData = [
    {
      b: 'b',
    },
    {
      b: 'b',
    },
    {
      b: 'b',
    },
    {
      b: 'b',
    },
    {
      b: 'b',
    },
    {
      b: 'b',
    },
  ];
  const C_realtedData = [
    {
      b: 'b',
    },
    {
      b: 'b',
    },
    {
      b: 'b',
    },
    {
      b: 'b',
    },
  ];
  const D_realtedData = [
    {
      b: 'b',
    },
    {
      b: 'b',
    },
    {
      b: 'b',
    },
    {
      b: 'b',
    },
  ];
  const E_realtedData = [
    {
      b: 'b',
    },
    {
      b: 'b',
    },
    {
      b: 'b',
    },
    {
      b: 'b',
    },
  ];

  return (
    <View style={styles.container}>
      <View style={{alignItems: 'center', marginTop: 20}}>
        <Text
          style={{
            textAlign: 'center',
            padding: 10,
            color: '#979797',
            fontFamily: 'Inter-Medium',
          }}>
          Elig Ceudad
        </Text>
        <View style={styles.passwordContainer}>
          <Icon name="search" color="black" size={14} />
          <TextInput
            style={styles.inputStyle}
            autoCorrect={false}
            placeholder="Search"
            value={search}
            onChangeText={(text) => setSearch(text)}
            underlineColorAndroid="transparent"
          />
        </View>
      </View>
      <View>
        <ScrollView>
          <View>
            <View>
              <View
                style={{
                  flexDirection: 'row',
                  width: '80%',

                  justifyContent: 'space-around',
                }}>
                <View>
                  <Text style={{fontSize: 18, fontFamily: 'Inter-Bold'}}>
                    A
                  </Text>
                  {A_realtedData.map((item) => {
                    return (
                      <View>
                        <Text>{item.a}</Text>
                      </View>
                    );
                  })}
                </View>

                <View>
                  <Text style={{fontSize: 18, fontFamily: 'Inter-Bold'}}>
                    B
                  </Text>
                  {B_realtedData.map((item) => {
                    return (
                      <View>
                        <Text>{item.b}</Text>
                      </View>
                    );
                  })}
                  <View></View>
                </View>
              </View>
            </View>

            <View>
              <View
                style={{
                  flexDirection: 'row',
                  width: '80%',

                  justifyContent: 'space-around',
                }}>
                <View>
                  <Text style={{fontSize: 18, fontFamily: 'Inter-Bold'}}>
                    C
                  </Text>
                  {C_realtedData.map((item) => {
                    return (
                      <View>
                        <Text>{item.b}</Text>
                      </View>
                    );
                  })}
                </View>

                <View>
                  <Text style={{fontSize: 18, fontFamily: 'Inter-Bold'}}>
                    D
                  </Text>
                  {D_realtedData.map((item) => {
                    return (
                      <View>
                        <Text>{item.b}</Text>
                      </View>
                    );
                  })}
                  <View></View>
                </View>
              </View>
            </View>

            <View>
              <View
                style={{
                  flexDirection: 'row',
                  width: '80%',

                  justifyContent: 'space-around',
                }}>
                <View>
                  <Text style={{fontSize: 18, fontFamily: 'Inter-Bold'}}>
                    E
                  </Text>
                  {C_realtedData.map((item) => {
                    return (
                      <View>
                        <Text>{item.b}</Text>
                      </View>
                    );
                  })}
                </View>

                <View>
                  <Text style={{fontSize: 18, fontFamily: 'Inter-Bold'}}>
                    F
                  </Text>
                  {D_realtedData.map((item) => {
                    return (
                      <View>
                        <Text>{item.b}</Text>
                      </View>
                    );
                  })}
                  <View></View>
                </View>
              </View>
            </View>

            <View>
              <View
                style={{
                  flexDirection: 'row',
                  width: '80%',

                  justifyContent: 'space-around',
                }}>
                <View>
                  <Text style={{fontSize: 18, fontFamily: 'Inter-Bold'}}>
                    G
                  </Text>
                  {C_realtedData.map((item) => {
                    return (
                      <View>
                        <Text>{item.b}</Text>
                      </View>
                    );
                  })}
                </View>

                <View>
                  <Text style={{fontSize: 18, fontFamily: 'Inter-Bold'}}>
                    H
                  </Text>
                  {D_realtedData.map((item) => {
                    return (
                      <View>
                        <Text>{item.b}</Text>
                      </View>
                    );
                  })}
                  <View></View>
                </View>
              </View>
            </View>
            <View>
              <View
                style={{
                  flexDirection: 'row',
                  width: '80%',

                  justifyContent: 'space-around',
                }}>
                <View>
                  <Text style={{fontSize: 18, fontFamily: 'Inter-Bold'}}>
                    I
                  </Text>
                  {C_realtedData.map((item) => {
                    return (
                      <View>
                        <Text>{item.b}</Text>
                      </View>
                    );
                  })}
                </View>

                <View>
                  <Text style={{fontSize: 18, fontFamily: 'Inter-Bold'}}>
                    J
                  </Text>
                  {D_realtedData.map((item) => {
                    return (
                      <View>
                        <Text>{item.b}</Text>
                      </View>
                    );
                  })}
                  <View></View>
                </View>
              </View>
            </View>
            <View>
              <View
                style={{
                  flexDirection: 'row',
                  width: '80%',

                  justifyContent: 'space-around',
                }}>
                <View>
                  <Text style={{fontSize: 18, fontFamily: 'Inter-Bold'}}>
                    K
                  </Text>
                  {C_realtedData.map((item) => {
                    return (
                      <View>
                        <Text>{item.b}</Text>
                      </View>
                    );
                  })}
                </View>

                <View>
                  <Text style={{fontSize: 18, fontFamily: 'Inter-Bold'}}>
                    L
                  </Text>
                  {D_realtedData.map((item) => {
                    return (
                      <View>
                        <Text>{item.b}</Text>
                      </View>
                    );
                  })}
                  <View></View>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default SearchScreenCommpleteApp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  passwordContainer: {
    flexDirection: 'row',
    borderWidth: 0,
    borderRadius: 10,
    paddingHorizontal: 10,
    alignItems: 'center',
    borderColor: '#000',
    width: '90%',
    backgroundColor: '#dfdfdf',
  },
  inputStyle: {
    flex: 1,
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#9fa4bc',

    left: 6,
  },
});
