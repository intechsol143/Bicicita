import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Platform,
  Text,
  View,
  Image,
  FlatList,
  TextInput,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useSelector, useDispatch} from 'react-redux';
import Icon1 from 'react-native-vector-icons/AntDesign';
import AllFrindscomp from '../../../components/AllFriendsComponent';
import ButtonComp from '../../../components/ButtonComp';

import {
  selectFriends,
  selectMembers,
} from '../../../redux/Actions/UsersActionFiles';

function useSelectionChange(items) {
  const [selectionMode, setSelectionMode] = useState(null);
  useEffect(() => {
    if (items?.filter((i) => i.selected).length > 0) {
      setSelectionMode(true);
    } else {
      setSelectionMode(false);
    }
  });
  return selectionMode;
}
const SelectFriendsGroup = ({navigation}) => {
  const {user} = useSelector(({stakreducer}) => stakreducer);
  const {selectedMembers, Newelectedata} = useSelector(
    ({friendsReducer}) => friendsReducer,
  );
  const {groupInfo} = useSelector(({AppReducer}) => AppReducer);
  const [search, setSearch] = useState('');
  const [selecteddataarray, setselecteddataarray] = useState(
    selectedMembers.length ? selectedMembers : Newelectedata,
  );
  const [itemslenght, setItemslength] = useState(0);
  const [Friends, setFriends] = useState([]);
  const [items, setItems] = useState(Friends.frienddata);

  const selectionMode = useSelectionChange(items);
  const arraylength = Friends?.frienddata?.length;

  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      fetch(`https://bicicita.com/app/api/friendlist`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${user?.userdata.api_token}`,
        },
      })
        .then((response) => response.json())
        .then((res) => {
          if ((res.status = 'success')) {
            setFriends(res.frienddata);
          }
        })
        .catch((err) => {});
    });

    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    setItemslength(arraylength);
  }, []);

  useEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <Image
          source={require('../../../assets/Icons/logoapp.png')}
          style={{height: 40, width: 150, resizeMode: 'contain'}}
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
      headerStyle: {
        elevation: 0,
      },
      headerTitleAlign: 'center',
    });
  }, []);

  const onPress = (item) => {
    pressItem(item);
  };

  const pressItem = (newitem) => {
    const newarray = [...selecteddataarray];
    const index = newarray.findIndex(
      (item) => item.friend_id == newitem.friend_id,
    );
    if (index >= 0) {
      newarray.splice(index, 1);
    } else {
      newarray.push(newitem);
      setselecteddataarray(newitem);
    }
    setselecteddataarray(newarray);
  };
  const RemoveData = (index) => {
    const ggg = [...items];
    ggg.splice(index, 1);
    setItems(ggg);
  };

  return (
    <View style={styles.container}>
      <View style={styles.subcontainer}>
        <Text
          style={{
            textAlign: 'center',
            padding: 10,
            fontSize: 18,
            color: '#979797',
            fontFamily: 'Inter-Regular',
          }}>
          Listado de Amigos
        </Text>

        <View style={{height: 20}} />
        <View style={{alignItems: 'center'}}>
          <View style={styles.passwordContainer}>
            <Icon name="search" color="black" size={14} />
            <TextInput
              underlineColorAndroid="transparent"
              style={styles.inputStyle}
              autoCorrect={false}
              style={{height: 50, paddingLeft: 10}}
              // keyboardType="visible-password"
              placeholder="Buscar"
              value={search}
              onChangeText={(text) => setSearch(text)}
            />
          </View>
        </View>

        <View style={{height: 20}} />
        <FlatList
          data={Friends}
          extraData={selecteddataarray}
          renderItem={({item, index}) => {
            const locArr = [...selecteddataarray];
            const NewIndex = locArr.findIndex(
              (itemk) => itemk.friend_id === item.friend_id,
            );
            return (
              <AllFrindscomp
                item={item}
                itemslenght={itemslenght}
                selectionMode={selectionMode}
                selected={NewIndex !== -1}
                onPress={() => onPress(item)}
                onPressTwo={() => RemoveData(index)}
              />
            );
          }}
          keyExtractor={(_, index) => `freinds-${index}`}
        />
      </View>
      <View style={styles.bottomcontainer}>
        <ButtonComp
          onPress={() => {
            if (groupInfo) {
              selectMembers(selecteddataarray)(dispatch);
            } else {
              selectFriends(selecteddataarray)(dispatch);
            }

            navigation.navigate('Home', {
              screen: 'Creategroup',
              params: {
                call: false,
              },
            });
          }}
          style={{borderRadius: 6, backgroundColor: '#9561F1'}}
          title={'Seleccionar amigos'}
        />
      </View>
    </View>
  );
};

export default SelectFriendsGroup;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  subcontainer: {
    flex: 5,
  },
  bottomcontainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  passwordContainer: {
    flexDirection: 'row',
    borderWidth: 0,
    borderRadius: 10,
    paddingHorizontal: 10,
    alignItems: 'center',
    borderColor: '#000',
    width: '90%',
    backgroundColor: '#e2e2e2',
  },
  inputStyle: {
    flex: 1,
    left: 4,
    color: '#9fa4bc',
    fontSize: 14,
    fontFamily: 'Inter-Regular',
  },
  groupview: {
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    width: 40,
    borderRadius: 30,
    backgroundColor: '#e2e2e2',
  },
});
