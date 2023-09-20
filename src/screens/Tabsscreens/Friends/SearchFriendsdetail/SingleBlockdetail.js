import {Body, Left, Right} from 'native-base';
import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Platform,
  Image,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import Icons from 'react-native-vector-icons/Feather';
import AddIcon from 'react-native-vector-icons/AntDesign';
import {CheckBox} from 'react-native-elements';
import {useSelector} from 'react-redux';
import ImageView from 'react-native-image-viewing';

import ButtonComp from '../../../../components/ButtonComp';
import Loader from '../../../../components/LoaderComponent';

const SingleBlockdetail = ({navigation, route}) => {
  const {user} = useSelector(({stakreducer}) => stakreducer);
  const [visible, setIsVisible] = useState(false);
  const [images, setImages] = useState([]);
  const [loading, setloading] = useState(false);
  const [userData, setUserData] = useState('');
  const [show, setShow] = useState(true);
  const {user_id} = route.params;

  useEffect(() => {
    navigation.setOptions({
      headerStyle: {
        elevation: 0,
      },
      headerTitle: () => (
        <Image
          source={require('../../../../assets/Icons/logoapp.png')}
          style={{height: 40, width: 150, resizeMode: 'contain'}}
        />
      ),
      headerLeft: () =>
        Platform.OS === 'ios' && (
          <Icon
            name="arrowleft"
            color="black"
            size={20}
            style={{left: 15}}
            onPress={() => navigation.goBack()}
          />
        ),
      headerTitleAlign: 'center',
    });
  }, []);

  useEffect(() => {
    SinglePersonDetail();
  }, []);

  const SinglePersonDetail = () => {
    setloading(true);
    fetch(`https://bicicita.com/app/api/profile/${user_id}`, {
      headers: {
        Authorization: `Bearer ${user?.userdata.api_token}`,
      },
    })
      .then((response) => response.json())
      .then((res) => {
        setloading(false);
        if (res.status === 'success') {
          setUserData(res.userdata);
        }
      })
      .catch((err) => {
        setloading(false);
      });
  };

  const AddFriendFunction = () => {
    fetch(`https://bicicita.com/app/api/addfriend/${userData.id}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${user?.userdata.api_token}`,
      },
    })
      .then((response) => response.json())
      .then((res) => {
        console.log('add friend response', res);
        if (res.status === 'success') {
          Alert.alert(res.message);
        }
      })
      .catch((err) => {
        console.log('add friend error', err);
      });
  };
  const BlockUser = () => {
    fetch(`https://bicicita.com/app/api/block-user/${userData.id}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${user?.userdata.api_token}`,
      },
    })
      .then((response) => response.json())
      .then((res) => {
        console.log('user blocked', res);
        if (res.status == 'success') {
          Alert.alert('Usuario desbloqueado');
          navigation.goBack();
          // console.log('fucking navigate');
        }
      });
  };
  const _imageView = () => {
    setIsVisible(true);
  };

  return (
    <View style={styles.container}>
      {loading && (
        <View style={{height: '100%'}}>
          <Loader />
        </View>
      )}
      <ImageView
        images={images}
        imageIndex={0}
        visible={visible}
        onRequestClose={() => setIsVisible(false)}
      />
      <ScrollView>
        <View style={styles.containerOne}>
          <View style={styles.subcontainerone}>
            <View style={{flexDirection: 'row', marginHorizontal: 40}}>
              <Left>
                {/* {userData.is_friend ? (
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate('Chat', {
                        screen: 'Chatscreen',
                        params: {userdata: userData},
                      })
                    }
                    style={styles.iconview}>
                    <Image
                      source={require('../../../../assets/Icons/chaticon_blue.png')}
                      style={{
                        height: 20,
                        width: 20,
                        tintColor: '#9561f1',
                        resizeMode: 'contain',
                      }}
                    />
                  </TouchableOpacity>
                ) : (
                  <View style={{alignItems: 'center'}}>
                    <TouchableOpacity
                      onPress={() => BlockUser()}
                      style={styles.iconview}>
                      <Icons name="user-x" size={20} color={'#9561f1'} />

                      {/* <AddIcon name={'plus'} size={20} color={'#9561f1'} /> 
                    </TouchableOpacity>
                    <Text style={{fontSize: 12}}>Bloquear</Text>
                  </View>
                )} */}
              </Left>
              <Body>
                <View style={{top: 20, alignItems: 'center'}}>
                  <Image
                    source={{
                      uri: userData.image_url
                        ? userData.image_url
                        : userData.profile_image,
                    }}
                    style={{height: 80, width: 80, borderRadius: 60}}
                  />
                  <Text style={styles.nameanddescription}>{userData.name}</Text>
                  <Text style={styles.nameanddescriptionone}>
                    {userData.city}
                  </Text>
                </View>
              </Body>

              <Right>
                {/* {!userData.is_friend && !(userData.id == user?.userdata.id) ? ( */}
                <View style={{alignItems: 'center'}}>
                  <TouchableOpacity
                    onPress={() => BlockUser()}
                    style={styles.iconview}>
                    {/* <AddIcon name={'plus'} size={20} color={'#9561f1'} /> */}
                    <Icons name="user-plus" size={20} color={'#9561f1'} />
                  </TouchableOpacity>
                  <Text style={{fontSize: 12}}>Desbloquear</Text>
                </View>
                {/* ) : ( */}
                {/* show && (
                    <View style={{alignItems: 'center'}}>
                      <TouchableOpacity
                        onPress={() => {
                          setShow(false);
                          BlockUser();
                        }}
                        style={styles.iconview}>
                        <Icons name="user-x" size={20} color={'#9561f1'} />
                        {/* <AddIcon name={'plus'} size={20} color={'#9561f1'} /> 
                      </TouchableOpacity>
                      <Text style={{fontSize: 12}}>Bloquear</Text>
                    </View>
                  ) */}
                {/* )} */}
              </Right>
            </View>
          </View>
          <View style={styles.subcontainer}>
            <View style={styles.placecontainer}>
              <Left>
                <Text style={{fontFamily: 'Inter-Medium', fontSize: 14}}>
                  Tipo de bici
                </Text>
              </Left>
              <Right style={{flexDirection: 'row', flex: 2.5}}>
                <ScrollView
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}>
                  <View style={{flexDirection: 'row'}}>
                    {userData?.bike?.map((item, index) => {
                      return (
                        <View key={`item -${index}`} style={{margin: 3}}>
                          <View
                            style={{
                              padding: 6,
                              paddingLeft: 12,
                              paddingRight: 12,
                              borderRadius: 20,
                              alignItems: 'center',
                              justifyContent: 'center',
                              backgroundColor: 'red',
                            }}>
                            <Text
                              style={{
                                color: 'white',
                                fontFamily: 'Inter-Bold',
                                fontSize: 12,
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
              <Left style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text style={{fontFamily: 'Inter-Medium'}}>Sexo</Text>
                <View style={{flexDirection: 'row', marginLeft: 60}}>
                  <View style={{marginRight: 6}}>
                    <View
                      style={{
                        padding: 6,
                        paddingLeft: 12,
                        paddingRight: 12,
                        borderRadius: 20,
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: '#46E1FC',
                      }}>
                      <Text
                        style={{
                          color: 'white',
                          fontFamily: 'Inter-Bold',
                          fontSize: 12,
                        }}>
                        {userData.gender}
                      </Text>
                    </View>
                  </View>
                </View>
              </Left>
              <Right></Right>
            </View>
            <View
              style={{
                height: 45,
                borderTopWidth: 0.5,
                borderBottomWidth: 0.5,
                width: '90%',
                borderTopColor: '#d4d4d4',
                borderBottomColor: '#d4d4d4',
                alignItems: 'center',
                justifyContent: 'flex-start',
                flexDirection: 'row',
              }}>
              <Text style={{fontFamily: 'Inter-Medium', fontSize: 14}}>
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
                <View style={{marginLeft: '45%'}}>
                  {userData ? (
                    <CheckBox
                      center
                      checkedIcon={
                        <Image
                          source={require('../../../../assets/Circles/Circlegreen_tick.png')}
                          style={{height: 25, width: 25, resizeMode: 'contain'}}
                        />
                      }
                      uncheckedIcon={
                        <Image
                          source={require('../../../../assets/Circles/Circlegreen.png')}
                          style={{height: 25, width: 25, resizeMode: 'contain'}}
                        />
                      }
                      checked={userData.level === 'Inicio'}
                    />
                  ) : null}
                </View>

                <View style={{right: 15}}>
                  {userData ? (
                    <CheckBox
                      center
                      checkedIcon={
                        <Image
                          source={require('../../../../assets/Circles/Circleorange_tick.png')}
                          style={{height: 25, width: 25, resizeMode: 'contain'}}
                        />
                      }
                      uncheckedIcon={
                        <Image
                          source={require('../../../../assets/Circles/Circleorange.png')}
                          style={{height: 25, width: 25, resizeMode: 'contain'}}
                        />
                      }
                      checked={userData.level === 'medio'}
                    />
                  ) : null}
                </View>
                <View style={{right: 30}}>
                  {userData ? (
                    <CheckBox
                      center
                      checkedIcon={
                        <Image
                          source={require('../../../../assets/Circles/Circleblue_tick.png')}
                          style={{height: 25, width: 25, resizeMode: 'contain'}}
                        />
                      }
                      uncheckedIcon={
                        <Image
                          source={require('../../../../assets/Circles/Circleblue.png')}
                          style={{height: 25, width: 25, resizeMode: 'contain'}}
                        />
                      }
                      checked={userData.level === 'Avanzado'}
                    />
                  ) : null}
                </View>
                <View style={{right: 45}}>
                  {userData ? (
                    <CheckBox
                      center
                      checkedIcon={
                        <Image
                          source={require('../../../../assets/Circles/Circlepink_tick.png')}
                          style={{height: 25, width: 25, resizeMode: 'contain'}}
                        />
                      }
                      uncheckedIcon={
                        <Image
                          source={require('../../../../assets/Circles/Circlepink.png')}
                          style={{height: 25, width: 25, resizeMode: 'contain'}}
                        />
                      }
                      checked={userData.level === 'Pro'}
                    />
                  ) : null}
                </View>
              </View>
            </View>
            <View style={{height: 15}} />
            <View
              style={{
                borderWidth: 0,
                width: '90%',
                borderRadius: 4,
                backgroundColor: '#dfdfdf',
                padding: 8,
              }}>
              <Text style={{fontFamily: 'Inter-Regular', color: 'black'}}>
                {userData.introduction}
              </Text>
            </View>
            <View style={{height: 0}} />
            <Text
              style={{
                textAlign: 'left',
                width: '100%',
                fontSize: 14,
                fontFamily: 'Inter-Medium',
                padding: 16,
              }}>
              Fotos
            </Text>
            <View style={styles.secondcontainer}>
              <View style={styles.imagescontainer}>
                <View style={{height: 180, width: '45%'}}>
                  <TouchableOpacity
                    activeOpacity={0.9}
                    style={{height: 180, width: '100%'}}
                    onPress={() => {
                      setImages([
                        {
                          uri: userData.image1,
                        },
                      ]);
                      _imageView();
                    }}>
                    <ImageBackground
                      borderRadius={10}
                      style={{height: 180, width: '100%'}}
                      source={
                        userData.image1
                          ? {
                              uri: userData.image1,
                              // ? userData.image1
                              // : 'http://www.vvc.cl/wp-content/uploads/2016/09/ef3-placeholder-image.jpg',
                            }
                          : require('../../../../assets/Icons/dummy.png')
                      }></ImageBackground>
                  </TouchableOpacity>
                </View>
                <View style={styles.rightsideimagescontainer}>
                  <TouchableOpacity
                    style={{height: 85}}
                    onPress={() => {
                      setImages([
                        userData.image2
                          ? {
                              uri: userData.image2,
                              // ? userData.image2
                              // : 'http://www.vvc.cl/wp-content/uploads/2016/09/ef3-placeholder-image.jpg',
                            }
                          : require('../../../../assets/Icons/dummy.png'),
                      ]);
                      _imageView();
                    }}>
                    <ImageBackground
                      borderRadius={10}
                      resizeMode="contain"
                      style={{height: 85, width: '100%'}}
                      source={
                        userData.image2
                          ? {
                              uri: userData.image2,
                              // ? userData.image2
                              // : 'http://www.vvc.cl/wp-content/uploads/2016/09/ef3-placeholder-image.jpg',
                            }
                          : require('../../../../assets/Icons/dummy.png')
                      }></ImageBackground>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={{height: 85}}
                    onPress={() => {
                      setImages([
                        userData.image3
                          ? {
                              uri: userData.image3,
                              // ? userData.image3
                              // : 'http://www.vvc.cl/wp-content/uploads/2016/09/ef3-placeholder-image.jpg',
                            }
                          : require('../../../../assets/Icons/dummy.png'),
                      ]);
                      _imageView();
                    }}>
                    <ImageBackground
                      borderRadius={10}
                      resizeMode="contain"
                      style={{height: 85, width: '100%'}}
                      source={
                        userData.image3
                          ? {
                              uri: userData.image3,
                              // ? userData.image3
                              // : 'http://www.vvc.cl/wp-content/uploads/2016/09/ef3-placeholder-image.jpg',
                            }
                          : require('../../../../assets/Icons/dummy.png')
                      }></ImageBackground>
                  </TouchableOpacity>
                </View>
              </View>
              <View style={{height: 15}} />
            </View>
          </View>
          {!userData.is_friend && (
            <View style={styles.bottomcontainer}>
              <ButtonComp
                onPress={() => AddFriendFunction()}
                style={{
                  backgroundColor: '#9561F1',
                  borderRadius: 6,
                  bottom: 12,
                }}
                title={'Solicitar amistad'}
              />
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default SingleBlockdetail;

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
  secondcontainer: {
    flex: 2.5,
    alignItems: 'center',
  },
  rightsideimagescontainer: {
    width: '50%',
    height: 180,
    justifyContent: 'space-between',
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
    height: 35,
    width: 35,
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
  nameanddescriptionone: {
    textAlign: 'center',
    fontFamily: 'Inter-Regular',
    bottom: 8,
    width: 200,
    paddingVertical: 5,
    fontSize: 14,
    color: '#9fa4bc',
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
    padding: 6,
    paddingRight: 12,
    paddingLeft: 12,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FF632B',
  },
  colorchangeviewbtns: {
    padding: 6,
    paddingLeft: 12,
    paddingRight: 12,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2E64F8',
  },
  colorchangeviewbtnsthree: {
    padding: 6,
    paddingLeft: 12,
    paddingRight: 12,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#46E1FC',
  },
  colorchangeviewbtnstwo: {
    padding: 6,
    paddingRight: 12,
    paddingLeft: 12,
    borderRadius: 20,
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
