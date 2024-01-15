import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import AllListScreen from '../screens/ListScreens/AllListScreen';

const StackNav = createStackNavigator();

const ListStackNavigation = () => {
  return (
    <StackNav.Navigator
      initialRouteName="LoginScreen"
      screenOptions={{headerShown: false}}>
      <StackNav.Screen name="AllListScreen" component={AllListScreen} />
    </StackNav.Navigator>
  );
};

export default ListStackNavigation;
