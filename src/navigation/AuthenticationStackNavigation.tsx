import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from '../screens/AuthenticationScreens/LoginScreen';
import SignupScreen from '../screens/AuthenticationScreens/SignupScreen';
import ForgotPasswordScreen from '../screens/AuthenticationScreens/ForgotPasswordScreen';
import ConfirmEmailScreen from '../screens/AuthenticationScreens/ConfirmEmailScreen';

const StackNav = createStackNavigator();

const AuthenticationStackNavigation = () => {
  return (
    <StackNav.Navigator
      initialRouteName="LoginScreen"
      screenOptions={{headerShown: false}}>
      <StackNav.Screen name="LoginScreen" component={LoginScreen} />
      <StackNav.Screen name="SignupScreen" component={SignupScreen} />
      <StackNav.Screen name="ForgotScreen" component={ForgotPasswordScreen} />
      <StackNav.Screen name="ConfirmEmailScreen" component={ConfirmEmailScreen} />
    </StackNav.Navigator>
  );
};

export default AuthenticationStackNavigation;
