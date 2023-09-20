import React, {useEffect, useState, useCallback} from 'react';
import {StyleSheet, View, FlatList, TextInput} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import database from '@react-native-firebase/database';
import {useSelector} from 'react-redux';

import ChatData from '../../components/ChatstabdatComp';
import GroupChatComp from '../../components/GroupChatComp';
import {ListItem} from 'react-native-elements';

const UsersTabs = ({navigation}) => {
  const [search, setSearch] = useState('');
  const [chatUsers, setChatUsers] = useState([]);
  const [groups, setGroups] = useState([]);

  const {user} = useSelector(({stakreducer}) => stakreducer);

  useEffect(() => {
    _usersList();
    _userGroups();
    return () => {
      _usersList();
      _userGroups();
    };
  }, []);

  const _usersList = useCallback(async () => {
    try {
      database()
        .ref('users/' + user?.userdata.email.replace(/[^a-zA-Z0-9 ]/g, ''))
        .orderByChild('timestamp')
        .on('value', (dataSnapshot) => {
          let users = [];
          dataSnapshot.forEach((child) => {
            users.push(child.val());
          });
          setChatUsers(users.reverse());
        });
    } catch (error) {}
  }, [chatUsers]);

  const _userGroups = useCallback(async () => {
    try {
      database()
        .ref(`users/${user?.userdata.id}/groups`)
        .orderByChild('timestamp')
        .on('value', (dataSnapshot) => {
          let groups = [];
          dataSnapshot.forEach((child) => {
            groups.push(child.val());
          });
          setGroups(groups.reverse());
        });
    } catch (error) {}
  }, [groups]);

  return (
    <View style={{flex: 1, paddingHorizontal: 12, backgroundColor: 'white'}}>
      <View style={styles.passwordContainer}>
        <Icon name="search" color="#979797" size={14} />
        <TextInput
          style={styles.inputStyle}
          autoCorrect={false}
          // keyboardType="visible-password"
          placeholder="Buscar"
          value={search}
          placeholderTextColor={'#9fa4bc'}
          onChangeText={(text) => setSearch(text)}
          underlineColorAndroid="transparent"
        />
      </View>
      <View style={{flex: 1, marginVertical: 12}}>
        <FlatList
          contentContainerStyle={{flexGrow: 1}}
          showsVerticalScrollIndicator={false}
          data={chatUsers.concat(groups).sort(function (x, y) {
            return y.timestamp - x.timestamp;
          })}
          renderItem={({item}) =>
            item.isGroup ? (
              <GroupChatComp isChatScreen item={item} navigation={navigation} />
            ) : (
              <ChatData item={item} navigation={navigation} />
            )
          }
          keyExtractor={(_, index) => `users-${index}`}
        />
      </View>
    </View>
  );
};

export default UsersTabs;

const styles = StyleSheet.create({
  passwordContainer: {
    flexDirection: 'row',
    borderWidth: 0,
    marginTop: 12,
    borderRadius: 10,
    paddingHorizontal: 10,
    alignItems: 'center',
    borderColor: '#000',
    width: '100%',
    backgroundColor: '#e2e2e2',
  },
  inputStyle: {
    fontSize: 14,
    flex: 1,
    height: 50,
    left: 4,
    fontFamily: 'Inter-Regular',
  },
});
