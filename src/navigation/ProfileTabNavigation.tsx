import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import ProfileScreen from '../screens/ProfileScreens/ProfileScreen';

const StackNav = createStackNavigator();

const ProfileTabNavigation = () => {
  return (
    <StackNav.Navigator
      initialRouteName="ProfileScreen"
      screenOptions={{headerShown: false}}>
      <StackNav.Screen name="ProfileScreen" component={ProfileScreen} />
    </StackNav.Navigator>
  );
};

export default ProfileTabNavigation;
