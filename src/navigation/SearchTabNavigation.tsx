import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import SearchScreen from '../screens/SearchScreens/SearchScreen';

const StackNav = createStackNavigator();

const SearchTabNavigation = () => {
  return (
    <StackNav.Navigator
      initialRouteName="SearchScreen"
      screenOptions={{headerShown: false}}>
      <StackNav.Screen name="SearchScreen" component={SearchScreen} />
    </StackNav.Navigator>
  );
};

export default SearchTabNavigation;

