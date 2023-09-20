import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Platform,
  ImageBackground,
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import IconRemove from 'react-native-vector-icons/FontAwesome';
import IconPlaceholder from 'react-native-vector-icons/FontAwesome';
import {Left, Right} from 'native-base';
import IconFor from 'react-native-vector-icons/MaterialIcons';
import {useSelector} from 'react-redux';
import Icon from 'react-native-vector-icons/AntDesign';
import ButtonComp from '../../components/ButtonComp';

const ProfileConfirmation = ({navigation, route}) => {
  const {regcities} = useSelector(({RegcityReducer}) => RegcityReducer);
  const [name, setname] = useState('');
  const [description, setdescription] = useState('');
  const [showimages, setshowimages] = useState(false);
  const [gendermale, setgendermale] = useState(false);
  const [genderfemale, setgenderfemale] = useState(false);
  const [image1, setimage1] = useState('');
  const [image2, setimage2] = useState('');
  const [image3, setimage3] = useState('');
  const [nameerrortext, setnameerrortext] = useState(false);
  const [descrerrortext, setdescrErrortext] = useState(false);
  const [imagerror, setimagerror] = useState(false);
  const [gendererrror, setgendererror] = useState(false);
  const [WholeError, setwholeError] = useState(false);
  const [showimage1, setshowimages1] = useState(true);
  const [showimage2, setshowimages2] = useState(false);
  const [showimage3, setshowimages3] = useState(false);
  const {facebookdata, regInfo, userData, social} = route.params;
  console.log('userdata', facebookdata);
  useEffect(() => {
    navigation.setOptions({
      headerStyle: {
        elevation: 0,
      },
      headerTitle: () => (
        <Image
          source={require('../../assets/Icons/logoapp.png')}
          style={{height: 80, width: 150, resizeMode: 'contain'}}
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

  const NameSexDescripImageData = () => {
    const gender = gendermale ? 'Hombre' : genderfemale ? 'Mujer' : '';
    if (!name && !description && !image1) {
      setnameerrortext('Enter name');
      setdescrErrortext('Enter description');
      // setgendererror('Enter gender');
      setimagerror('Por favor selecciona una imagen');
      return;
    } else if (!social && !name) {
      setnameerrortext('Enter name');
      return;
    } else if (!description) {
      setdescrErrortext(true);
      return;
    } else if (!image1) {
      setimagerror('Por favor selecciona una imagen');
      return;
    } else if (!name && description) {
      setwholeError(true);
    } else {
      navigation.navigate('Acceptscreen', {
        userDescription: {
          name,
          description,
          image1,
          image2,
          image3,
          userData,
          gender,
          regcities,
          facebookdata,
          regInfo,
        },
      });
    }
  };

  const chooseImage = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      compressImageQuality: 0.5,
    }).then((img) => {
      setimage1(img.path);
      setimagerror('');
      setshowimages(true);
      setshowimages1(true);
    });
  };
  const chooseImage2 = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      compressImageQuality: 0.5,
    }).then((img) => {
      setimage2(img.path);
      setshowimages2(true);
    });
  };
  const chooseImage3 = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      compressImageQuality: 0.5,
    }).then((img) => {
      setimage3(img.path);
      setshowimages3(true);
    });
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={{flex: 2.5, alignItems: 'center'}}>
          <Text
            style={{
              padding: 12,
              fontSize: 20,
              color: '#979797',
              fontFamily: 'Inter-Regular',
            }}>
            Crea tu cuenta
          </Text>
          {social !== true && (
            <TextInput
              style={{
                height: 40,
                color: 'black',
                fontSize: 14,
                width: '90%',
                backgroundColor: '#dfdfdf',
                fontFamily: 'Inter-Regular',
                borderWidth: nameerrortext ? 0.3 : 0,
                borderColor: nameerrortext ? 'red' : null,
                borderRadius: 4,
                padding: 8,
              }}
              placeholder="Nombre"
              placeholderTextColor="grey"
              value={name}
              onChangeText={(text) => {
                setname(text);
                setnameerrortext(false);
              }}
              underlineColorAndroid="transparent"
            />
          )}
          <View
            style={{
              paddingTop: 24,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'flex-start',
              width: '85%',
            }}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text
                style={{
                  fontSize: 16,
                  fontFamily: 'Inter-Medium',
                  color: '#020c26',
                }}>
                Sexo
              </Text>
              <TouchableOpacity
                onPress={() => {
                  setgendermale(!gendermale);
                  setgenderfemale(false);
                  setgendererror(false);
                }}
                style={{marginLeft: 50}}>
                <View
                  style={{
                    height: 30,
                    width: 80,
                    backgroundColor: gendermale ? '#46E1FC' : '#979797',
                    borderRadius: 20,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Text style={styles.textstyle}>Hombre</Text>
                </View>
              </TouchableOpacity>
              <View style={{marginLeft: 10}}>
                <TouchableOpacity
                  onPress={() => {
                    setgenderfemale(!genderfemale);
                    setgendermale(false);
                    setgendererror(false);
                  }}
                  style={{
                    height: 30,
                    width: 80,
                    backgroundColor: genderfemale ? '#46E1FC' : '#979797',
                    borderRadius: 20,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Text style={styles.textstyle}>Mujer</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View style={{height: 10}} />
          <TextInput
            textAlignVertical={'top'}
            style={{
              height: 100,
              color: 'black',
              fontSize: 14,
              width: '90%',
              backgroundColor: '#dfdfdf',
              fontFamily: 'Inter-Regular',
              borderWidth: descrerrortext ? 0.3 : 0,
              borderColor: descrerrortext ? 'red' : null,
              borderRadius: 4,
              padding: 8,
            }}
            placeholder="Escribe algo sobre tí..."
            placeholderTextColor="grey"
            value={description}
            onChangeText={(text) => {
              setdescription(text);
              setdescrErrortext(false);
            }}
            underlineColorAndroid="transparent"
            multiline
          />
          <View style={{height: 10}} />
          <View style={styles.placecontainer}>
            <Left>
              <Text style={{fontSize: 14, fontFamily: 'Inter-Medium'}}>
                Lugar
              </Text>
            </Left>
            <Right>
              <TouchableOpacity
                onPress={() => navigation.navigate('Search', {regval: true})}
                style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text style={{fontSize: 14, fontFamily: 'Inter-Medium'}}>
                  {regcities ? regcities : 'Elige ciudad'}
                </Text>
                <IconFor name={'keyboard-arrow-right'} size={24} />
              </TouchableOpacity>
            </Right>
          </View>
        </View>
        <View style={{height: 30}} />
        <View style={styles.secondcontainer}>
          {showimages ? (
            <View
              style={{
                height: 180,
                flexDirection: 'row',
                alignItems: 'center',
                borderRadius: 6,
                justifyContent: 'space-around',
                width: '90%',
              }}>
              {showimage1 ? (
                <View
                  style={{
                    height: 180,
                    width: '45%',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <ImageBackground
                    borderRadius={10}
                    style={{height: 180, width: '100%'}}
                    source={{uri: image1}}>
                    <View
                      style={{
                        alignItems: 'center',
                        justifyContent: 'flex-end',
                        flexDirection: 'row',
                      }}>
                      <IconRemove
                        name={'remove'}
                        size={24}
                        onPress={() => setshowimages1(false)}
                        color={'grey'}
                        style={{bottom: 6, left: 6}}
                      />
                    </View>
                  </ImageBackground>
                </View>
              ) : (
                <View
                  style={{
                    height: 80,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <IconPlaceholder
                    onPress={chooseImage}
                    name={'image'}
                    size={80}
                    color={'#725489'}
                  />
                </View>
              )}

              <View style={styles.rightsideimagescontainer}>
                {showimage2 ? (
                  <View style={{height: 85}}>
                    <ImageBackground
                      borderRadius={10}
                      style={{height: 85, width: '100%'}}
                      source={{uri: image2}}>
                      <View
                        style={{
                          alignItems: 'center',
                          justifyContent: 'flex-end',
                          flexDirection: 'row',
                        }}>
                        <IconRemove
                          name={'remove'}
                          size={24}
                          color={'grey'}
                          onPress={() => setshowimages2(false)}
                          style={{bottom: 6, left: 6}}
                        />
                      </View>
                    </ImageBackground>
                  </View>
                ) : (
                  <View
                    style={{
                      height: 80,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <IconPlaceholder
                      onPress={chooseImage2}
                      name={'image'}
                      size={80}
                      color={'#dfdfdf'}
                    />
                  </View>
                )}

                {showimage3 ? (
                  <View style={{height: 85}}>
                    <ImageBackground
                      borderRadius={10}
                      style={{height: 85, width: '100%'}}
                      source={{uri: image3}}>
                      <View
                        style={{
                          alignItems: 'center',
                          justifyContent: 'flex-end',
                          flexDirection: 'row',
                        }}>
                        <IconRemove
                          name={'remove'}
                          size={24}
                          color={'grey'}
                          onPress={() => setshowimages3(false)}
                          style={{bottom: 6, left: 6}}
                        />
                      </View>
                    </ImageBackground>
                  </View>
                ) : (
                  <View
                    style={{
                      height: 80,
                      // backgroundColor: 'red',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <IconPlaceholder
                      onPress={chooseImage3}
                      name={'image'}
                      size={80}
                      color={'#dfdfdf'}
                    />
                  </View>
                )}
              </View>
            </View>
          ) : (
            <View
              style={{
                height: 180,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <IconPlaceholder
                onPress={() => chooseImage()}
                name={'image'}
                size={80}
                color={'#dfdfdf'}
              />
            </View>
          )}

          <View style={{height: 15}} />
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'flex-end',
              width: '100%',
              paddingBottom: 20,
              flex: 1,
            }}>
            {imagerror ? (
              <Text style={{color: 'red', fontSize: 10}}>{imagerror}</Text>
            ) : null}

            <ButtonComp
              onPress={() => NameSexDescripImageData()}
              style={{borderRadius: 10, height: 40, backgroundColor: '#9561F1'}}
              title={'Continuar'}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default ProfileConfirmation;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  headingtextView: {
    alignItems: 'flex-end',
    alignSelf: 'center',
    flex: 1,
    justifyContent: 'flex-end',
  },
  imagescontainer: {
    height: 180,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    justifyContent: 'space-around',
    width: '95%',
  },
  secondcontainer: {
    flex: 2.5,
    alignItems: 'center',
    // backgroundColor: 'red',
  },
  rightsideimagescontainer: {
    width: '45%',
    height: 180,
    justifyContent: 'space-between',
  },
  containerkeyboard: {
    flex: 1,
  },
  textstyle: {
    color: 'white',
    fontFamily: 'Inter-Bold',
    fontSize: 14,
  },
  passwordContainer: {
    flexDirection: 'row',
    borderWidth: 0,
    borderRadius: 10,
    paddingHorizontal: 10,
    alignItems: 'center',
    borderColor: '#000',
    width: '100%',
    backgroundColor: '#dfdfdf',
  },
  inputView: {
    width: '90%',
    backgroundColor: '#dfdfdf',
    height: 40,
    margin: 15,
    marginTop: 20,
    borderRadius: 10,
    justifyContent: 'center',
  },
  inputViewtwo: {
    width: '90%',
    backgroundColor: '#dfdfdf',
    height: 100,
    margin: 15,
    marginTop: 20,
    borderRadius: 10,
    justifyContent: 'center',
  },
  ContainerTwo: {
    flexDirection: 'row',
    borderWidth: 0,
    marginTop: 15,
    borderRadius: 10,
    height: 80,
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
    color: 'black',
    left: 6,
  },
  placecontainer: {
    flexDirection: 'row',
    margin: 14,
    bottom: 12,
  },
  inputStyleTwo: {
    height: 80,
    flex: 1,
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: 'black',
  },
});
