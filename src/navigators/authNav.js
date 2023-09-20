import React, {Fragment} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {useSelector} from 'react-redux';

import Landingscreen from '../screens/Landinscreens/LandingIndex';
import LoginScreen from '../screens/authscreens/Loginscreen';
import Registerscreen from '../screens/authscreens/Registrationscreen';
import ProfileConfirmation from '../screens/authscreens/ProfileConfirmation';
import Acceptscreen from '../screens/authscreens/Acceptscreen';
import Termsandconditions from '../screens/authscreens/Termsandconditions';
import GeolocationConfrmation from '../screens/authscreens/GeolocationConfrmation';
import Typesofbikes from '../screens/authscreens/Typesofbikes_tipodebici';
import FinalLvel from '../screens/authscreens/FinalLevel_Nivel';
import EmailVerifictionScreen from '../screens/authscreens/EmailVerifictionScreen';
import Forgotpass from '../screens/authscreens/Forgotscreen';
import Newpassscreen from '../screens/authscreens/Newpassscreen';
import Verificationcode from '../screens/authscreens/Codeveriscreen';
import BotomNav from '../navigators/BottomNav';
import Searchscreen from '../components/Searchscreen';
import {navigationRef} from '../../config/NavigationService';

const Stack = createStackNavigator();

function AuthNavigator() {
  const {user} = useSelector(({stakreducer}) => stakreducer);
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator
        screenOptions={{
          headerShown: true,
        }}>
        {!user ? (
          <Fragment>
            <Stack.Screen name="Landingscreen" component={Landingscreen} />
            <Stack.Screen name="Loginscreen" component={LoginScreen} />
            <Stack.Screen
              name="Registerscreen"
              component={Registerscreen}
              // options={{title: 'adfdsfsdfdsfsfsdfsdfs'}}
            />
            <Stack.Screen name="Newpass" component={Newpassscreen} />
            <Stack.Screen name="Acceptscreen" component={Acceptscreen} />
            <Stack.Screen
              name="GeolocationConfrmation"
              component={GeolocationConfrmation}
            />
            <Stack.Screen
              name="Termsandcondition"
              component={Termsandconditions}
            />
            <Stack.Screen name="Typesofbikes" component={Typesofbikes} />
            <Stack.Screen name="Finallvel" component={FinalLvel} />
            <Stack.Screen name="Forgotpass" component={Forgotpass} />
            <Stack.Screen name="Search" component={Searchscreen} />
            <Stack.Screen
              name="Verificationcode"
              component={Verificationcode}
            />
            <Stack.Screen
              name="ProfileConfirmation"
              component={ProfileConfirmation}
            />
            <Stack.Screen
              name="EmailVerifiction"
              component={EmailVerifictionScreen}
            />
          </Fragment>
        ) : (
          <Fragment>
            <Stack.Screen
              options={{headerShown: false}}
              name={'Bottomtabs'}
              component={BotomNav}
            />
            <Stack.Screen name="Forgotpass" component={Forgotpass} />
            <Stack.Screen name="Search" component={Searchscreen} />
            <Stack.Screen
              name="Verificationcode"
              component={Verificationcode}
            />
          </Fragment>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AuthNavigator;
