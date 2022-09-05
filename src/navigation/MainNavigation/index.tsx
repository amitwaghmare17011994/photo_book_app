import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from '../../screens/SplashScreen';
import HomeScreen from '../../screens/HomeScreen';

import { NativeBaseProvider, extendTheme } from 'native-base';
import OtpScreen from '../../screens/OtpScreen';
import PhoneNumberValidationScreen from '../../screens/PhoneNumberValidationScreen';
import { ROUTES } from '../../constants';


const Stack = createNativeStackNavigator();

const MainNavigation = () => {
   

  const theme = extendTheme({
    colors: {
       purple: {
        'primary': '#6a1b9a',
       
      }
    },
  });

  return (
    <NativeBaseProvider theme={theme}>

      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name={ROUTES.SPLASH_SCREEN} component={SplashScreen} options={{
            headerShown: false,
          }} />
          <Stack.Screen name={ROUTES.HOME_SCREEN} component={HomeScreen} options={{
            headerShown: false,
          }} />
          <Stack.Screen name={ROUTES.PHONE_VALIDATION_SCREEN} component={PhoneNumberValidationScreen} options={{
            headerShown: false,
          }} />

          <Stack.Screen name={ROUTES.OTP_SCREEN} component={OtpScreen} options={{
            headerShown: false,
          }} />



        </Stack.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  );
}

export default MainNavigation;