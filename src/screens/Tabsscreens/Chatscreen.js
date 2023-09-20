import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import {Tab, Tabs, TabHeading} from 'native-base';

import GroupsTab from './GroupsTab';
import UsersTab from './UsersTab';

const Chatscreen = ({navigation, route}) => {
  const [currentTab, setCurrentTab] = useState(
    route?.params?.tab ? route?.params?.tab : 0,
  );

  useEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <Image
          source={require('../../assets/Icons/logoapp.png')}
          style={{height: 40, width: 150, resizeMode: 'contain'}}
        />
      ),
      headerLeft: () => null,
      headerStyle: {
        elevation: 0,
      },
      headerTitleAlign: 'center',
    });
  }, []);

  return (
    <View style={{flex: 1, paddingHorizontal: 12, backgroundColor: 'white'}}>
      <Text
        style={{
          textAlign: 'center',
          fontSize: 18,
          color: '#979797',
          fontFamily: 'Inter-Regular',
        }}>
        Chat
      </Text>
      <UsersTab navigation={navigation} />
      {/* <Tabs
        tabContainerStyle={{
          borderBottomWidth: 0.3,
          borderBottomColor: 'grey',
          elevation: 0,
        }}
        tabBarUnderlineStyle={{
          borderBottomWidth: 2,
        }}
        initialPage={currentTab}
        onChangeTab={({i}) => setCurrentTab(i)}>
        <Tab
          tabStyle={{backgroundColor: 'white'}}
          heading={
            <TabHeading
              style={
                currentTab == 0
                  ? styles.activeTabStyle
                  : styles.inactiveTabStyle
              }>
              <Text
                style={
                  currentTab == 0
                    ? styles.activeTextStyle
                    : styles.inactiveTextStyle
                }>
                Chats
              </Text>
            </TabHeading>
          }>
          <UsersTab navigation={navigation} />
        </Tab>
        <Tab
          tabStyle={{backgroundColor: 'white'}}
          heading={
            <TabHeading
              style={
                currentTab == 1
                  ? styles.activeTabStyle
                  : styles.inactiveTabStyle
              }>
              <Text
                style={
                  currentTab == 1
                    ? styles.activeTextStyle
                    : styles.inactiveTextStyle
                }>
                Grupos
              </Text>
            </TabHeading>
          }>
          <GroupsTab navigation={navigation} />
        </Tab>
      </Tabs> */}
    </View>
  );
};

export default Chatscreen;

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
    left: 4,
    fontFamily: 'Inter-Regular',
  },
  activeTabStyle: {
    backgroundColor: 'white',
  },
  inactiveTabStyle: {
    backgroundColor: 'white',
  },
  activeTextStyle: {
    fontSize: 14,
    color: 'black',
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },
  inactiveTextStyle: {
    fontSize: 12,
    color: 'grey',
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },
});
