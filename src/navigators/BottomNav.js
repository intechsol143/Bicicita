import React from 'react';
import {Image, Platform} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useSelector} from 'react-redux';
import Icon from 'react-native-vector-icons/AntDesign';
import Home from '../screens/Tabsscreens/Homescreen';
import Chatscreen from '../screens/Tabsscreens/Chatscreen';
import ProfiletabData from '../screens/Tabsscreens/Profilescreen';
import EditProfiletabData from '../screens/Tabsscreens/Editprofilscreen';
import Notification from '../screens/Tabsscreens/Notificationscreen';
// Home tab sub screens
import Lookforapointment from '../screens/Tabsscreens/Friends/Buscacita_Lookforapointmnt';
import ApointmentInvitedUsers from '../screens/Tabsscreens/ApointmentInvitedUsers';
import Creatapontment from '../screens/Tabsscreens/Friends/Crearcita_Createapointment';
import Searchfriends from '../screens/Tabsscreens/Friends/Buscaramigos_Searchfirends';
import Searcheedfirendsdetail from '../screens/Tabsscreens/Friends/SearchFriendsdetail/Searchedfriends_Busicardetail';
import SinglePersondetail from '../screens/Tabsscreens/Friends/SearchFriendsdetail/SinglePersonProfiledetail_amigos';
import SingleBlockdetail from '../screens/Tabsscreens/Friends/SearchFriendsdetail/SingleBlockdetail';
import Aceptedfriendscreen from '../screens/Tabsscreens/Friends/SearchFriendsdetail/Aceptedfriendscreen';
import Chatscreen_busicaramigos from '../screens/Tabsscreens/Friends/SearchFriendsdetail/Chatscreen_busicaramigos';
import GroupChatScreen from '../screens/Tabsscreens/Friends/SearchFriendsdetail/GroupChatScreen';
import Busicar_Geolocationmap from '../screens/Tabsscreens/Friends/BusicarCitaLookForApointment/Busicar_Geolocationmap';
import BusicarCita_Apointment from '../screens/Tabsscreens/Friends/BusicarCitaLookForApointment/Cita_Apointmentscreen';
import Confirmed_Apointment from '../screens/Tabsscreens/Friends/BusicarCitaLookForApointment/ConfirmedApointmentscreen';
import FrindsList_Listado from '../screens/Tabsscreens/Friends/BusicarCitaLookForApointment/FrindsList_Listado_amigos';
import Creatgroupscreen from '../screens/Tabsscreens/Friends/BusicarCitaLookForApointment/Creatgroupscreen';
import Profiletabsetting from '../screens/Tabsscreens/ProfileTabSubscreens/Profilesetting';
import ChangePassword from '../screens/Tabsscreens/ProfileTabSubscreens/ChangePassword';
import PrivacyPolicy from '../screens/Tabsscreens/ProfileTabSubscreens/PrivacyPolicy';
import Creadas from '../screens/Tabsscreens/ProfileTabSubscreens/Profile_Citas_Creadas';
import Solicitidas from '../screens/Tabsscreens/ProfileTabSubscreens/Profile_solicidas';
import Aceptedas from '../screens/Tabsscreens/ProfileTabSubscreens/Profile_Aceptedas';
import SearchAllApp from '../screens/Tabsscreens/SearchScreenCommpleteApp';
import Apointmentdetail from '../screens/Tabsscreens/Friends/SearchFriendsdetail/Apointmentdetail';
import RequestedAsistancesScreen from '../screens/Tabsscreens/RequestedAsistancesScreen';
import EditApointment from '../screens/Tabsscreens/Friends/SearchFriendsdetail/EditApointment';
import AllFriendslist from '../screens/Tabsscreens/Friends/BusicarCitaLookForApointment/AllFreindsList';
import SelectFriendsGroup from '../screens/Tabsscreens/Friends/SelectFriendsGroup';
import BlockedUsers from '../screens/Tabsscreens/ProfileTabSubscreens/BlockedUsers';
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const Header = {
  headerTitle: () => (
    <Image
      source={require('../assets/Icons/logoapp.png')}
      style={{height: 40, width: 150, resizeMode: 'contain'}}
    />
  ),
  // headerLeft: () =>
  //   Platform.OS === 'ios' && (
  //     <Icon
  //       name="arrowleft"
  //       color="black"
  //       size={20}
  //       style={{left: 15}}
  //       onPress={() => navigation.goBack()}
  //     />
  //   ),
  headerStyle: {
    elevation: 0,
  },
  headerTitleAlign: 'center',
};

const Homestack = () => (
  <Stack.Navigator
    screenOptions={{
      ...Header,
    }}>
    <Stack.Screen name={'Home'} component={Home} />
    <Stack.Screen name={'Lookforapointment'} component={Lookforapointment} />
    <Stack.Screen
      name={'ApointmentInvitedUsers'}
      component={ApointmentInvitedUsers}
    />
    <Stack.Screen name={'Creatapointment'} component={Creatapontment} />
    <Stack.Screen name={'Searchfriends'} component={Searchfriends} />
    <Stack.Screen name={'AceptedFriend'} component={Aceptedfriendscreen} />
    <Stack.Screen
      name={'Searchedfriendetail'}
      component={Searcheedfirendsdetail}
    />
    <Stack.Screen name={'Singlpersondetail'} component={SinglePersondetail} />
    <Stack.Screen name={'SingleBlockdetail'} component={SingleBlockdetail} />
    <Stack.Screen name={'Chatscreen'} component={Chatscreen_busicaramigos} />
    <Stack.Screen name={'GroupChat'} component={GroupChatScreen} />
    <Stack.Screen
      name={'Busicar_Geolocationmap'}
      component={Busicar_Geolocationmap}
    />
    <Stack.Screen
      name={'BusicarCitaApointment'}
      component={BusicarCita_Apointment}
    />
    <Stack.Screen
      name={'Confirmedapointment'}
      component={Confirmed_Apointment}
    />
    <Stack.Screen name={'Friendslist'} component={FrindsList_Listado} />
    <Stack.Screen name={'Creategroup'} component={Creatgroupscreen} />
    <Stack.Screen name={'Profiletabsetting'} component={Profiletabsetting} />
    <Stack.Screen name={'BlockedUsers'} component={BlockedUsers} />
    <Stack.Screen name={'ChangePassword'} component={ChangePassword} />
    <Stack.Screen name={'Privacypolicy'} component={PrivacyPolicy} />
    <Stack.Screen name={'Apointmentdetail'} component={Apointmentdetail} />
    <Stack.Screen name={'SearchAllApp'} component={SearchAllApp} />
  </Stack.Navigator>
);

const Imogies = () => (
  <Stack.Navigator>
    <Stack.Screen name={'Imog'} component={AllFriendslist} />
    <Stack.Screen name="SelectFriends" component={SelectFriendsGroup} />
  </Stack.Navigator>
);
const Chats = () => (
  <Stack.Navigator
    screenOptions={{
      ...Header,
    }}>
    <Stack.Screen name={'Chat'} component={Chatscreen} />
    <Stack.Screen name={'Chatscreen'} component={Chatscreen_busicaramigos} />
    <Stack.Screen name={'GroupChat'} component={GroupChatScreen} />
  </Stack.Navigator>
);
const Profile = () => (
  <Stack.Navigator
    screenOptions={{
      ...Header,
    }}>
    <Stack.Screen name={'Profile'} component={ProfiletabData} />
    <Stack.Screen name={'Credas'} component={Creadas} />
    <Stack.Screen name={'Solicidas'} component={Solicitidas} />
    <Stack.Screen name={'Aceptedas'} component={Aceptedas} />
    <Stack.Screen name={'Editprofile'} component={EditProfiletabData} />
    <Stack.Screen name={'Apointmentdetail'} component={Apointmentdetail} />
    <Stack.Screen
      name={'RequestedAsistances'}
      component={RequestedAsistancesScreen}
    />
    <Stack.Screen name={'EditApointment'} component={EditApointment} />
  </Stack.Navigator>
);
const Notifications = () => (
  <Stack.Navigator>
    <Stack.Screen name={'Notific'} component={Notification} />
  </Stack.Navigator>
);

export default function bottomtabs() {
  const {badge} = useSelector(({stakreducer}) => stakreducer);

  return (
    <Tab.Navigator
      tabBarOptions={{
        labelStyle: {
          fontSize: 13,
        },
        activeTintColor: '#007aff',
        inactiveTintColor: '#9fa4bc',
        tabStyle: {
          backgroundColor: 'white',
          paddingVertical: 4,
          elevation: 0,
        },
      }}
      lazy={false}>
      <Tab.Screen
        name="Home"
        component={Homestack}
        options={{
          tabBarLabel: 'Inicio',

          tabBarIcon: ({focused}) =>
            focused ? (
              <Image
                source={require('../assets/Icons/Home_blue.png')}
                style={{height: 20, width: 20, resizeMode: 'contain'}}
              />
            ) : (
              <Image
                source={require('../assets/Icons/Home.png')}
                style={{height: 20, width: 20, resizeMode: 'contain'}}
              />
            ),
        }}
        listeners={({navigation}) => ({
          blur: () => navigation.setParams({screen: undefined}),
        })}
      />
      <Tab.Screen
        name="Custom"
        component={Imogies}
        options={{
          tabBarLabel: 'Amigos',
          // unmountOnBlur: true,
          tabBarIcon: ({focused}) =>
            focused ? (
              <Image
                source={require('../assets/Icons/Persones_blue.png')}
                style={{height: 20, width: 20, resizeMode: 'contain'}}
              />
            ) : (
              <Image
                source={require('../assets/Icons/Persones.png')}
                style={{height: 20, width: 20, resizeMode: 'contain'}}
              />
            ),
        }}
        listeners={({navigation}) => ({
          blur: () => navigation.setParams({screen: undefined}),
        })}
      />

      <Tab.Screen
        name="Notification"
        component={Notifications}
        options={{
          tabBarBadgeStyle: {
            position: 'absolute',
            top: -20,
            left: -10,
          },
          tabBarBadge: badge > 0 ? badge : null,
          tabBarLabel: 'Avisos',
          tabBarIcon: ({focused}) =>
            focused ? (
              <Image
                source={require('../assets/Icons/blure_notification.png')}
                style={{
                  height: 20,
                  width: 20,
                  resizeMode: 'contain',
                }}
              />
            ) : (
              <Image
                source={require('../assets/Icons/On.png')}
                style={{height: 20, width: 20, resizeMode: 'contain'}}
              />
            ),
        }}
      />

      <Tab.Screen
        name="Chat"
        component={Chats}
        options={{
          tabBarLabel: 'Chat',
          tabBarIcon: ({focused}) =>
            focused ? (
              <Image
                source={require('../assets/Icons/chaticon_blue.png')}
                style={{height: 20, width: 20, resizeMode: 'contain'}}
              />
            ) : (
              <Image
                source={require('../assets/Icons/Icon4.png')}
                style={{height: 20, width: 20, resizeMode: 'contain'}}
              />
            ),
        }}
      />

      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: 'Perfil',
          tabBarIcon: ({focused}) =>
            focused ? (
              <Image
                source={require('../assets/Icons/Person_blue.png')}
                style={{height: 20, width: 20, resizeMode: 'contain'}}
              />
            ) : (
              <Image
                source={require('../assets/Icons/Person.png')}
                style={{height: 20, width: 20, resizeMode: 'contain'}}
              />
            ),
        }}
      />
    </Tab.Navigator>
  );
}
