import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Platform,
  Image,
  TextInput,
  Alert,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import {typeofBikes} from '../../Data/data';
import ImagePicker from 'react-native-image-crop-picker';
import ButtonComp from '../../components/ButtonComp';
import IconRemove from 'react-native-vector-icons/FontAwesome';
import IconPlaceholder from 'react-native-vector-icons/FontAwesome';
import {Left, Right} from 'native-base';
import {useSelector, useDispatch} from 'react-redux';
import Loader from '../../components/LoaderComponent';
import Icon from 'react-native-vector-icons/AntDesign';
import IconFor from 'react-native-vector-icons/MaterialIcons';
import {CheckBox} from 'react-native-elements';
import {
  Toggle_Update_User,
  ToggleEditprofileCities,
} from '../../redux/Actions/UsersActionFiles';
const placeholderIcon = require('../../assets/Icons/placeholderIcon.png');
const ProfileIcon = require('../../assets/Icons/profilicon.png');

const EditprofileScreen = ({navigation, route}) => {
  const {user} = useSelector(({stakreducer}) => stakreducer);
  const {editprofilecities} = useSelector(({RegcityReducer}) => RegcityReducer);
  const dispatch = useDispatch();
  const [name, setname] = useState(user?.userdata.name);
  const [description, setdescription] = useState(user?.userdata.introduction);
  const [showimages, setshowimages] = useState(true);
  const [gender, setgender] = useState(user?.userdata.gender);
  const [thistypeofbike, setthistypeofbike] = useState(user?.userdata?.bike);
  const [thislevel, setthislevel] = useState(user?.userdata.level);
  const [image, setimage] = useState(user?.userdata.image);
  const [profileimage, setprofileimage] = useState(
    user?.userdata.image_url
      ? user?.userdata?.image_url
      : user?.userdata?.profile_image,
  );
  const [image1, setimage1] = useState(user?.userdata?.image1);
  const [image2, setimage2] = useState(user?.userdata?.image2);
  const [image3, setimage3] = useState(user?.userdata?.image3);
  const [showimage1, setshowimages1] = useState(
    user?.userdata?.image1 ? true : false,
  );
  const [showimage2, setshowimages2] = useState(
    user?.userdata?.image2 ? true : false,
  );
  const [showimage3, setshowimages3] = useState(
    user?.userdata?.image3 ? true : false,
  );
  const [nameerrortext, setnameerrortext] = useState(false);
  const [descrerrortext, setdescrErrortext] = useState(false);
  const [imagerror, setimagerror] = useState(false);
  const [gendererrror, setgendererror] = useState(false);
  const [WholeError, setwholeError] = useState(false);
  const [updateImage, setUpdateImage] = useState('');
  const [updateimage1, setupdateimage1] = useState('');
  const [updateimage2, setupdateimage2] = useState('');
  const [updateimage3, setupdateimage3] = useState('');
  const [thistypeofbikeError, setthistypeofbikeError] = useState(false);
  const [loading, setloading] = useState(false);
  const [thisLevelErr, setThisLevelErr] = useState('');

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
    const gender = gendermale ? 'Hombre' : 'Mujer';
    if (!name && !description && !gender) {
      setnameerrortext('Enter name');
      setdescrErrortext('Enter description');
      setgendererror('Enter gender');
      return;
    }
    if (!name) {
      setnameerrortext(true);
      return;
    } else if (image.length === 0) {
      setimagerror(true);
    } else if (!gender) {
      setgendererror(true);
      return;
    } else if (!description) {
      setdescrErrortext(true);
      return;
    } else if (!name && !gender && description) {
      setwholeError(true);
    } else {
      Alert.alert('Data update sucessfully');
    }
  };
  const ProfileImage = () => {
    ImagePicker.openPicker({
      multiple: false,
      width: 300,
      height: 400,
      cropping: false,
    }).then((img) => {
      setUpdateImage(img.path);
    });
  };
  const chooseImage = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
    }).then((img) => {
      setimage1(img.path);
      setshowimages(true);
      setshowimages1(true);
      setupdateimage1(img.path);
    });
  };
  const chooseImage2 = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
    }).then((img) => {
      setimage2(img.path);
      setshowimages2(true);
      setupdateimage2(img.path);
    });
  };
  const chooseImage3 = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
    }).then((img) => {
      setimage3(img.path);
      setshowimages3(true);
      setupdateimage3(img.path);
    });
  };
  const RemoveData = (index) => {
    const locIm = [...image];
    locIm.splice(index, 1);
    setimage(locIm);
  };
  const UpdateAndSave = () => {
    setloading(true);
    const data = new FormData();
    data.append('name', name);

    editprofilecities && data.append('city', editprofilecities);
    data.append('gender', gender);

    updateImage &&
      data.append('profile_image', {
        uri: updateImage,
        type: 'image/jpeg',
        name: 'image' + new Date() + '.jpg',
      });
    data.append('introduction', description);
    thistypeofbike?.forEach((item, index) => {
      data.append('bike[]', item);
    });
    data.append('level', thislevel);
    updateimage1 &&
      data.append('image1', {
        uri: updateimage1,
        type: 'image/jpeg',
        name: 'image' + new Date() + '.jpg',
      });
    updateimage2 &&
      data.append('image2', {
        uri: updateimage2,
        type: 'image/jpeg',
        name: 'image' + new Date() + '.jpg',
      });
    updateimage3 &&
      data.append('image3', {
        uri: updateimage3,
        type: 'image/jpeg',
        name: 'image' + new Date() + '.jpg',
      });

    fetch('https://bicicita.com/app/api/edit', {
      method: 'POST',
      body: data,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${user?.userdata.api_token}`,
      },
    })
      .then((response) => response.json())
      .then((responseJson) => {
        setloading(false);
        if (responseJson.status === 'success') {
          Toggle_Update_User(responseJson)(dispatch);
          editprofilecities && ToggleEditprofileCities('')(dispatch);
          navigation.navigate('Profile');
        } else if (responseJson.status === 'error') {
          setloading(false);
        } else {
        }
      })
      .catch((error) => {});
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={{flex: 2.5, alignItems: 'center'}}>
          <TouchableOpacity onPress={ProfileImage}>
            <Image
              source={
                profileimage
                  ? {uri: profileimage}
                  : updateImage
                  ? {uri: updateImage}
                  : ProfileIcon
              }
              style={{height: 100, width: 100, borderRadius: 50}}
            />
          </TouchableOpacity>
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
                  {typeofBikes.map((item, idx) => {
                    let selected = false;
                    let foundAt = -1;
                    if (user?.userdata) {
                      foundAt = thistypeofbike?.findIndex(
                        (itm) => itm === item,
                      );
                      if (foundAt > -1) selected = true;
                    }
                    return (
                      <TouchableOpacity
                        style={{margin: 3}}
                        key={'bics' + idx}
                        onPress={() => {
                          thistypeofbikeError && setthistypeofbikeError(false);
                          const locArr = [...thistypeofbike];
                          if (selected) {
                            locArr.splice(foundAt, 1);
                            thisLevelErr && setThisLevelErr('');
                          } else {
                            locArr.push(item);
                          }
                          setthistypeofbike(locArr);
                        }}>
                        <View
                          style={{
                            padding: 4,
                            borderRadius: 20,
                            paddingLeft: 12,
                            paddingRight: 12,
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: selected ? '#2E64F8' : 'grey',
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
                      </TouchableOpacity>
                    );
                  })}
                </View>
              </ScrollView>
            </Right>
          </View>
          {thisLevelErr !== '' && (
            <Text
              style={{fontSize: 10, fontFamily: 'Inter-Regular', color: 'red'}}>
              Selected Items length should be 3
            </Text>
          )}
          <View style={{height: 20}} />
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
            placeholder="Name"
            placeholderTextColor="grey"
            value={name}
            onChangeText={(text) => {
              setname(text);
              setnameerrortext(false);
            }}
            underlineColorAndroid="transparent"
          />

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
                  setgender('Hombre');
                  setgendererror(false);
                }}
                style={{marginLeft: 50}}>
                <View
                  style={{
                    height: 30,
                    width: 80,
                    backgroundColor:
                      gender === 'Hombre' ? '#46E1FC' : '#979797',
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
                    setgender('Mujer');
                    setgendererror(false);
                  }}
                  style={{
                    height: 30,
                    width: 80,
                    backgroundColor: gender === 'Mujer' ? '#46E1FC' : '#979797',
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
            multiline={true}
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
          />
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
                alignItems: 'flex-end',
                justifyContent: 'center',
                width: '80%',
              }}>
              {user?.userdata && (
                <View style={{marginLeft: '70%'}}>
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
                    checked={thislevel === 'Inicio'}
                    onPress={() => setthislevel('Inicio')}
                  />
                </View>
              )}
              <View style={{right: 15}}>
                {user?.userdata && (
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
                    checked={thislevel === 'medio'}
                    onPress={() => setthislevel('medio')}
                  />
                )}
              </View>
              <View style={{right: 30}}>
                {user?.userdata && (
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
                    checked={thislevel === 'Avanzado'}
                    onPress={() => setthislevel('Avanzado')}
                  />
                )}
              </View>
              <View style={{right: 45}}>
                {user?.userdata && (
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
                    checked={thislevel === 'Pro'}
                    onPress={() => setthislevel('Pro')}
                  />
                )}
              </View>
            </View>
          </View>
          <View style={{height: 10}} />
          <View style={styles.placecontainer}>
            <Left>
              <Text style={{fontSize: 14, fontFamily: 'Inter-Medium'}}>
                Lugar
              </Text>
            </Left>
            <Right>
              <TouchableOpacity
                onPress={() => navigation.navigate('Search', {edituser: true})}
                style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text style={{fontSize: 14, fontFamily: 'Inter-Medium'}}>
                  {editprofilecities ? editprofilecities : user?.userdata.city}
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
                    resizeMode={'contain'}
                    style={{height: 180, width: '100%'}}
                    source={
                      image1
                        ? {uri: image1}
                        : updateimage1
                        ? {uri: updateimage1}
                        : placeholderIcon
                    }>
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
                <TouchableOpacity
                  onPress={chooseImage}
                  style={{
                    height: 80,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Image
                    borderRadius={10}
                    resizeMode={'contain'}
                    style={{height: 85, width: 80}}
                    source={require('../../assets/Icons/dummy.png')}
                  />
                  {/* <IconPlaceholder
                    onPress={chooseImage}
                    name={'image'}
                    size={80}
                    color={'#dfdfdf'}
                  /> */}
                </TouchableOpacity>
              )}

              <View style={styles.rightsideimagescontainer}>
                {showimage2 ? (
                  <View style={{height: 85}}>
                    <ImageBackground
                      borderRadius={10}
                      resizeMode={'contain'}
                      style={{height: 85, width: '100%'}}
                      source={
                        image2
                          ? {uri: image2}
                          : updateimage2
                          ? {uri: updateimage2}
                          : placeholderIcon
                      }>
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
                  <TouchableOpacity
                    onPress={chooseImage2}
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
                    {/* <IconPlaceholder
                      onPress={chooseImage2}
                      name={'image'}
                      size={80}
                      color={'#dfdfdf'}
                    /> */}
                  </TouchableOpacity>
                )}

                {showimage3 ? (
                  <View style={{height: 85}}>
                    <ImageBackground
                      borderRadius={10}
                      resizeMode={'contain'}
                      style={{height: 85, width: '100%'}}
                      source={
                        image3
                          ? {
                              uri: image3,
                            }
                          : updateimage3
                          ? {uri: updateimage3}
                          : placeholderIcon
                      }>
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
                  <TouchableOpacity
                    onPress={chooseImage3}
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
                    {/* <IconPlaceholder
                      onPress={chooseImage3}
                      name={'image'}
                      size={80}
                      color={'#dfdfdf'}
                    /> */}
                  </TouchableOpacity>
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
                onPress={chooseImage}
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
            {gendererrror ? (
              <Text style={{color: 'red', fontSize: 10}}>
                Por favor selecciona género
              </Text>
            ) : null}
            <ButtonComp
              onPress={UpdateAndSave}
              style={{borderRadius: 10, height: 40, backgroundColor: '#9561F1'}}
              title={'guardar y actualizar'}
            />
          </View>
        </View>
      </ScrollView>
      {loading ? <Loader /> : null}
    </View>
  );
};

export default EditprofileScreen;

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
  placecontainer: {
    flexDirection: 'row',
    margin: 14,
  },
  inputStyle: {
    flex: 1,
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: 'black',
    left: 6,
  },
  inputStyleTwo: {
    height: 80,
    flex: 1,
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: 'black',
  },
});
