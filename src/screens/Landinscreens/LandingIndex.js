import React, {useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import {TouchableOpacity} from 'react-native-gesture-handler';
import IconFor from 'react-native-vector-icons/AntDesign';

import Screen1 from '../Landinscreens/Screen1';
import Screen2 from '../Landinscreens/Screen2';
import Screen3 from '../Landinscreens/Screen3';

const introslider = ({navigation}) => {
  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  const slides = [
    {
      key: '1',
      count: '1',
      title: 'Title 1',
      coustdescription: 'Busca rutas cerca de tí',
      tt1: 'CONOCE NUEVAS RUTAS',
      text: 'Filtra tus búsquedas,\n por lugar, día,\n disciplina, sexo y nivel',
      image: require('../../assets/Icons/Shape.png'),
      backgroundColor: '#59b2ab',
      pertextdatastyle: {
        bottom: 200,
        marginLeft: 30,
        alignItems: 'center',
      },
      countstyle: {
        height: 30,
        width: 30,
        backgroundColor: '#9561F1',
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 30,
      },
      styles: {
        resizeMode: 'contain',
        height: 400,
        top: 20,
        width: 200,
      },
      countViewstyle: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
      },
    },
    {
      key: '2',
      count: '2',
      coustdescription: 'Crea tus rutas',
      title: 'Title 2',
      tt1: 'COMPARTE TUS RUTAS PREFERIDAS',
      text: 'Sube tu ruta ideal y queda con amigos de tu nivel, disciplina y sexo. Invita a una o varias personas',
      image: require('../../assets/Icons/Shape-2.png'),
      backgroundColor: '#febe29',
      pertextdatastyle: {
        bottom: 180,
        alignItems: 'center',
      },
      countstyle: {
        height: 30,
        width: 30,
        backgroundColor: 'orange',
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 30,
      },
      styles: {
        resizeMode: 'contain',
        height: 400,
        alignSelf: 'flex-end',
        width: 200,
      },
      countViewstyle: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
      },
    },
    {
      key: '3',
      count: '3',
      coustdescription: 'Crea tus rutas',
      title: 'Title 2',
      tt1: 'CONOCE RIDERS',
      text: 'Añade a tu vida personas\n que comparten tu pasión\n según disciplina, nivel y sexo',
      image: require('../../assets/Icons/Shape-3.png'),
      backgroundColor: '#febe29',
      pertextdatastyle: {
        bottom: 180,
        alignItems: 'center',
        marginLeft: 100,
      },
      countViewstyle: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        top: 150,
        right: 100,
      },
      countstyle: {
        height: 30,
        width: 30,
        backgroundColor: 'blue',
        alignSelf: 'center',

        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 30,
      },
      styles: {
        resizeMode: 'contain',
        height: 400,
        alignSelf: 'flex-end',
        width: 200,
        bottom: 40,
      },
    },
  ];

  const _renderItem = ({item, index}) => {
    if (index === 0) {
      return <Screen1 item={item} navigation={navigation} />;
    } else if (index === 1) {
      return <Screen2 item={item} navigation={navigation} />;
    } else if (index === 2) {
      return <Screen3 item={item} navigation={navigation} />;
    }
  };
  const _renderNextButton = () => {
    return (
      <View style={styles.buttonCircleone}>
        <IconFor name={'arrowright'} color={'white'} size={24} />
      </View>
    );
  };
  const _renderDoneButton = () => {
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('Loginscreen')}
        style={styles.buttonCircleDone}>
        <IconFor name={'arrowright'} color={'white'} size={24} />
      </TouchableOpacity>
    );
  };
  const _onDone = () => {
    return (
      <TouchableOpacity style={styles.buttonCircleSkip}>
        <Text
          style={{
            fontSize: 15,
            color: 'black',
          }}>
          SKIP
        </Text>
      </TouchableOpacity>
    );
  };
  const _renderSkip = () => {
    return (
      <View style={styles.buttonCircletWO}>
        <IconFor name={'arrowleft'} color={'white'} size={24} />
      </View>
    );
  };
  const _renderPrev = () => {
    return (
      <View style={styles.buttonCircleSkip}>
        <IconFor name={'arrowleft'} color={'white'} size={24} />
      </View>
    );
  };
  return (
    <AppIntroSlider
      data={slides}
      activeDotStyle={{backgroundColor: '#007aff', width: 10, height: 10}}
      dotStyle={{height: 10, width: 10, backgroundColor: '#c7c7cc'}}
      // indicatorStyle={{width: 40}}
      showSkipButton={true}
      renderSkipButton={_renderSkip}
      renderDoneButton={_renderDoneButton}
      renderNextButton={_renderNextButton}
      renderItem={_renderItem}
      onDone={_onDone}
      showPrevButton={true}
      renderPrevButton={_renderPrev}
    />
  );
};

export default introslider;

const styles = StyleSheet.create({
  text: {
    textAlign: 'center',
    color: '#828282',
    width: 250,
    opacity: 0.5,
    marginTop: 10,
  },
  buttonCircleone: {
    backgroundColor: 'black',
    height: 30,
    width: 30,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
    borderRadius: 30,
  },
  buttonCircletWO: {
    backgroundColor: '#979797',
    height: 30,
    width: 30,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
    borderRadius: 30,
  },
  buttonCircleDone: {
    backgroundColor: 'black',
    height: 30,
    width: 30,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
    borderRadius: 30,
  },
  buttonCircleSkip: {
    backgroundColor: 'black',
    height: 30,
    width: 30,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
    borderRadius: 30,
  },
  slide: {
    flex: 1,
    backgroundColor: 'white',
  },
});
