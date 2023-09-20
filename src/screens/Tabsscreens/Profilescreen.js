import {Body, Left, Right} from 'native-base';
import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import SettingIcon from 'react-native-vector-icons/AntDesign';
import {CheckBox} from 'react-native-elements';
import {useSelector, useDispatch} from 'react-redux';
import IconPlaceholder from 'react-native-vector-icons/FontAwesome';

import ProfilScreenBtnsComp from '../../components/ProfilScreenBtnsComp';
import {Toggle_Update_User} from '../../redux/Actions/UsersActionFiles';
const ProfileIcon = require('../../assets/Icons/profilicon.png');

const Profile_Screen = ({navigation}) => {
  const {user} = useSelector(({stakreducer}) => stakreducer);
  const [profileapiresponse, setprofileapiresponse] = useState({});
  const dispatch = useDispatch();

  useEffect(() => {
    navigation.setOptions({
      headerStyle: {
        elevation: 0,
      },

      headerTitle: () => (
        <Image
          source={require('../../assets/Icons/logoapp.png')}
          style={{height: 40, width: 150, resizeMode: 'contain'}}
        />
      ),
      headerTitleAlign: 'center',
    });
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      fetchUserProfile();
    });
    fetchUserProfile();
    return unsubscribe;
  }, [navigation]);

  const fetchUserProfile = () => {
    fetch(`https://bicicita.com/app/api/profile/${user?.userdata.id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${user?.userdata.api_token}`,
      },
    })
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson.status === 'success') {
          Toggle_Update_User(responseJson)(dispatch);
          setprofileapiresponse(responseJson);
        }
      })
      .catch((error) => {});
  };

  const kk = () => {
    navigation.navigate('Credas');
  };
  const ll = () => {
    navigation.navigate('Solicidas');
  };
  const pp = () => {
    navigation.navigate('Aceptedas');
  };
  // console.log('USER', user.userdata);
  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.containerOne}>
          <View style={styles.subcontainerone}>
            <View style={{flexDirection: 'row', marginHorizontal: 40}}>
              <Left>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('Home', {screen: 'Profiletabsetting'})
                  }
                  style={styles.iconview}>
                  <SettingIcon name={'setting'} size={24} />
                </TouchableOpacity>
              </Left>
              <Body style={{flex: 3}}>
                <View style={{top: 25, alignItems: 'center'}}>
                  <Image
                    source={
                      user?.userdata?.image_url
                        ? {uri: user?.userdata?.image_url}
                        : user?.userdata?.profile_image
                        ? {uri: user?.userdata?.profile_image}
                        : ProfileIcon
                    }
                    style={{height: 80, width: 80, borderRadius: 60}}
                  />
                  <Text style={styles.nameanddescription}>
                    {user?.userdata?.name}
                  </Text>
                  <Text style={styles.nameanddescriptionTwo}>
                    {user?.userdata?.city}
                  </Text>
                </View>
              </Body>
              <Right>
                <TouchableOpacity
                  onPress={() => navigation.navigate('Editprofile')}
                  style={styles.iconview}>
                  <Image
                    source={require('../../assets/Icons/EditIcon.png')}
                    style={{height: 25, width: 25, resizeMode: 'contain'}}
                  />
                </TouchableOpacity>
              </Right>
            </View>
          </View>
          <View style={{height: 15}} />
          <View style={styles.subcontainer}>
            <View style={styles.placecontainer}>
              <Left>
                <Text
                  style={{
                    fontFamily: 'Inter-Medium',
                    fontSize: 14,
                    color: '#020c26',
                  }}>
                  Tipo de bici
                </Text>
              </Left>
              <Right style={{flex: 2.5}}>
                <ScrollView
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}>
                  <View style={{flexDirection: 'row'}}>
                    {user?.userdata?.bike?.map((item, index) => {
                      return (
                        <View key={`item-${index}`} style={{margin: 3}}>
                          <View
                            style={{
                              padding: 4,
                              borderRadius: 20,
                              paddingLeft: 12,
                              paddingRight: 12,
                              alignItems: 'center',
                              justifyContent: 'center',
                              backgroundColor: '#2E64F8',
                            }}>
                            <Text
                              style={{
                                fontFamily: 'Inter-Regular',
                                fontSize: 12,
                                color: 'white',
                              }}>
                              {item}
                            </Text>
                          </View>
                        </View>
                      );
                    })}
                  </View>
                </ScrollView>
              </Right>
            </View>
            <View style={styles.placecontainer}>
              <Left>
                <Text
                  style={{
                    fontFamily: 'Inter-Medium',
                    fontSize: 14,
                    color: '#020c26',
                  }}>
                  Sexo
                </Text>
              </Left>
              <Right>
                <View style={{flexDirection: 'row'}}>
                  <View style={{marginRight: 6}}>
                    {user?.userdata.gender && (
                      <View style={styles.colorchangeviewbtnsthree}>
                        <Text
                          style={{
                            fontFamily: 'Inter-Bold',
                            fontSize: 12,
                            color: 'white',
                          }}>
                          {user?.userdata.gender}
                        </Text>
                      </View>
                    )}
                  </View>
                </View>
              </Right>
            </View>

            <View
              style={{
                height: 45,
                borderTopWidth: 0.5,
                borderBottomWidth: 0.5,
                borderBottomColor: '#e2e2e2',
                borderTopColor: '#e2e2e2',
                width: '90%',
                alignItems: 'center',
                justifyContent: 'flex-start',
                flexDirection: 'row',
              }}>
              <Text
                style={{
                  fontSize: 14,
                  color: '#020c26',
                  fontFamily: 'Inter-Medium',
                }}>
                Nivel
              </Text>

              <View
                style={{
                  flexDirection: 'row',
                  marginLeft: 28,
                  alignItems: 'flex-end',
                  justifyContent: 'center',
                  width: '80%',
                }}>
                {profileapiresponse.userdata && (
                  <View style={{marginLeft: '45%'}}>
                    <CheckBox
                      center
                      checkedIcon={
                        <Image
                          source={require('../../assets/Circles/Circlegreen_tick.png')}
                          style={{height: 25, width: 25, resizeMode: 'contain'}}
                        />
                      }
                      uncheckedIcon={
                        <Image
                          source={require('../../assets/Circles/Circlegreen.png')}
                          style={{height: 25, width: 25, resizeMode: 'contain'}}
                        />
                      }
                      checked={profileapiresponse.userdata.level === 'Inicio'}
                    />
                  </View>
                )}
                <View style={{right: 15}}>
                  {profileapiresponse.userdata && (
                    <CheckBox
                      center
                      checkedIcon={
                        <Image
                          source={require('../../assets/Circles/Circleorange_tick.png')}
                          style={{height: 25, width: 25, resizeMode: 'contain'}}
                        />
                      }
                      uncheckedIcon={
                        <Image
                          source={require('../../assets/Circles/Circleorange.png')}
                          style={{height: 25, width: 25, resizeMode: 'contain'}}
                        />
                      }
                      checked={profileapiresponse.userdata.level === 'medio'}
                    />
                  )}
                </View>
                <View style={{right: 30}}>
                  {profileapiresponse.userdata && (
                    <CheckBox
                      center
                      checkedIcon={
                        <Image
                          source={require('../../assets/Circles/Circleblue_tick.png')}
                          style={{height: 25, width: 25, resizeMode: 'contain'}}
                        />
                      }
                      uncheckedIcon={
                        <Image
                          source={require('../../assets/Circles/Circleblue.png')}
                          style={{height: 25, width: 25, resizeMode: 'contain'}}
                        />
                      }
                      checked={profileapiresponse.userdata.level === 'Avanzado'}
                    />
                  )}
                </View>
                <View style={{right: 45}}>
                  {profileapiresponse.userdata && (
                    <CheckBox
                      center
                      checkedIcon={
                        <Image
                          source={require('../../assets/Circles/Circlepink_tick.png')}
                          style={{height: 25, width: 25, resizeMode: 'contain'}}
                        />
                      }
                      uncheckedIcon={
                        <Image
                          source={require('../../assets/Circles/Circlepink.png')}
                          style={{height: 25, width: 25, resizeMode: 'contain'}}
                        />
                      }
                      checked={profileapiresponse.userdata.level === 'Pro'}
                    />
                  )}
                </View>
              </View>
            </View>
            <View style={{height: 15}} />
            <View
              style={{
                borderWidth: 0,
                width: '90%',
                borderRadius: 4,
                backgroundColor: '#e2e2e2',
                padding: 8,
                paddingLeft: 8,
              }}
              placeholder={'Decriptcion'}>
              <Text>{user?.userdata.introduction}</Text>
            </View>
            <View style={{height: 10}} />
            <View
              style={{
                alignItems: 'center',
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'center',
              }}>
              {[
                {title: 'Citas', backgroundColor: 'white', onPress: () => {}},
                {title: 'Creadas', backgroundColor: '#e2e2e2', onPress: kk},
                {title: 'Solicitadas', backgroundColor: '#e2e2e2', onPress: ll},
                {title: 'Aceptadas', backgroundColor: '#e2e2e2', onPress: pp},
              ].map(({title, onPress, backgroundColor}, index) => (
                <ProfilScreenBtnsComp
                  backgroundColor={backgroundColor}
                  style={{
                    marginVertical: 10,
                    borderRadius: 10,
                    backgroundColor,
                  }}
                  key={`item-${index}`}
                  title={title}
                  onPress={() => onPress()}
                />
              ))}
            </View>

            <View style={{height: 15}} />
            <Text
              style={{
                textAlign: 'left',
                fontSize: 14,
                fontFamily: 'Inter-Medium',
                width: '100%',
                padding: 0,
                bottom: 8,
                paddingLeft: 16,
              }}>
              Fotos
            </Text>
            <View style={styles.imagescontainer}>
              <View style={{height: 180, width: '45%'}}>
                {user?.userdata.image1 ? (
                  <Image
                    borderRadius={10}
                    resizeMode={'contain'}
                    style={{height: 180, width: '100%'}}
                    source={{uri: user?.userdata.image1}}
                  />
                ) : (
                  <View
                    style={{
                      height: 80,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <Image
                      borderRadius={10}
                      resizeMode={'contain'}
                      style={{height: 85, width: '100%'}}
                      source={require('../../assets/Icons/dummy.png')}
                    />
                  </View>
                )}
              </View>
              <View style={styles.rightsideimagescontainer}>
                <View style={{height: 85}}>
                  {user?.userdata.image2 ? (
                    <Image
                      borderRadius={10}
                      resizeMode={'contain'}
                      style={{height: 85, width: '100%'}}
                      source={{uri: user?.userdata.image2}}
                    />
                  ) : (
                    <View
                      style={{
                        height: 80,
                        // backgroundColor: 'red',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      {/* <IconPlaceholder
                        name={'image'}
                        size={80}
                        color={'#dfdfdf'}
                      /> */}
                      <Image
                        borderRadius={10}
                        resizeMode={'contain'}
                        style={{height: 85, width: '100%'}}
                        source={require('../../assets/Icons/dummy.png')}
                      />
                    </View>
                  )}
                </View>

                <View style={{height: 85}}>
                  {user?.userdata.image3 ? (
                    <Image
                      borderRadius={10}
                      resizeMode={'contain'}
                      style={{height: 85, width: '100%'}}
                      source={{uri: user?.userdata.image3}}
                    />
                  ) : (
                    <View
                      style={{
                        height: 80,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      <Image
                        borderRadius={10}
                        resizeMode={'contain'}
                        style={{height: 85, width: '100%'}}
                        source={require('../../assets/Icons/dummy.png')}
                      />
                    </View>
                  )}
                </View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Profile_Screen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerOne: {
    flex: 1,
    paddingBottom: 20,
    paddingTop: 20,
    backgroundColor: 'white',
  },
  imagescontainer: {
    height: 180,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '95%',
  },

  subcontainerone: {
    flex: 1,
  },
  iconview: {
    height: 40,
    width: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    backgroundColor: '#f8f8f8',
  },
  nameanddescription: {
    textAlign: 'center',
    paddingVertical: 5,
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: '#020c26',
  },
  nameanddescriptionTwo: {
    textAlign: 'center',
    color: '#9fa4bc',
    fontSize: 14,
    fontFamily: 'Inter-Regular',
  },
  rightsideimagescontainer: {
    width: '50%',
    height: 180,
    justifyContent: 'space-between',
  },

  conatiner: {
    flex: 1,
    backgroundColor: 'white',
  },
  subcontainer: {
    flex: 5,
    alignItems: 'center',
    padding: 10,
  },
  switchcontainer: {
    flexDirection: 'row',
    margin: 14,
  },
  firstbtn: {
    padding: 4,
    borderRadius: 20,
    paddingRight: 12,
    paddingLeft: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FF632B',
  },
  colorchangeviewbtns: {
    padding: 4,
    borderRadius: 20,
    paddingLeft: 12,
    paddingRight: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2E64F8',
  },
  colorchangeviewbtnsthree: {
    padding: 4,
    borderRadius: 20,
    paddingRight: 12,
    paddingLeft: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#46E1FC',
  },
  colorchangeviewbtnstwo: {
    padding: 4,
    borderRadius: 20,
    paddingLeft: 12,
    paddingRight: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#38D836',
  },
  placecontainer: {
    flexDirection: 'row',
    margin: 14,
  },
  bottomcontainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapiconview: {
    height: 35,
    width: 35,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    backgroundColor: '#38D836',
  },
  headerstext: {
    fontSize: 16,
    padding: 10,
    color: 'grey',
  },
  passwordContainer: {
    flexDirection: 'row',
    borderWidth: 0,
    borderRadius: 10,
    paddingHorizontal: 10,
    alignItems: 'center',
    borderColor: '#000',
    width: '90%',
    backgroundColor: '#f8f8f8',
  },
});
