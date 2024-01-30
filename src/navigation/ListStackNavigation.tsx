import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import AllListScreen from '../screens/ListScreens/AllListScreen';
import SingleListScreen from '../screens/ListScreens/SingleListScreen';
import AddListScreen from '../screens/ListScreens/AddListScreen';
import AddPlaceToListScreen from '../screens/ListScreens/AddPlaceToListScreen';
import SinglePlaceScreen from '../screens/ListScreens/SinglePlaceScreen';
import ListDetailsScreen from '../screens/ListScreens/ListDetailsScreen';

const StackNav = createStackNavigator();

const ListStackNavigation = () => {
  return (
    <StackNav.Navigator
      initialRouteName="LoginScreen"
      screenOptions={{headerShown: false}}>
      <StackNav.Screen name="AllListScreen" component={AllListScreen} />
      <StackNav.Screen name="AddListScreen" component={AddListScreen} />
      <StackNav.Screen name="SingleListScreen" component={SingleListScreen} />
      <StackNav.Screen name="AddPlaceToListScreen" component={AddPlaceToListScreen} />
      <StackNav.Screen name="SinglePlaceScreen" component={SinglePlaceScreen} />
      <StackNav.Screen name="ListDetailsScreen" component={ListDetailsScreen} />
    </StackNav.Navigator>
  );
};

export default ListStackNavigation;
