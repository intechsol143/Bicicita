import React, {useEffect, useState, useCallback} from 'react';
import {View, FlatList} from 'react-native';
import database from '@react-native-firebase/database';
import {useSelector} from 'react-redux';

import GroupChatComp from '../../components/GroupChatComp';

const GroupsTab = ({navigation, onGroupDelete, onGroupEdit}) => {
  const [groups, setGroups] = useState([]);

  const {user} = useSelector(({stakreducer}) => stakreducer);

  useEffect(() => {
    _userGroups();
    return () => {
      _userGroups();
    };
  }, []);

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
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <View
        style={{
          flex: 1,
          marginTop: 12,
        }}>
        <FlatList
          contentContainerStyle={{flexGrow: 1}}
          showsVerticalScrollIndicator={false}
          data={groups}
          renderItem={({item}) => (
            <GroupChatComp
              onGroupEdit={onGroupEdit}
              onGroupDelete={onGroupDelete}
              item={item}
              navigation={navigation}
            />
          )}
          keyExtractor={(_, index) => `users-${index}`}
        />
      </View>
    </View>
  );
};

export default GroupsTab;
