import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from '../screens/AuthenticationScreens/LoginScreen';
import SignupScreen from '../screens/AuthenticationScreens/SignupScreen';
import ForgotPasswordScreen from '../screens/AuthenticationScreens/ForgotPasswordScreen';

const StackNav = createStackNavigator();

const AuthenticationStackNavigation = () => {
  return (
    <StackNav.Navigator
      initialRouteName="LoginScreen"
      screenOptions={{headerShown: false}}>
      <StackNav.Screen name="LoginScreen" component={LoginScreen} />
      <StackNav.Screen name="SignupScreen" component={SignupScreen} />
      <StackNav.Screen name="ForgotScreen" component={ForgotPasswordScreen} />
    </StackNav.Navigator>
  );
};

export default AuthenticationStackNavigation;
