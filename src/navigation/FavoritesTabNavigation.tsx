import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import FavoriteScreen from '../screens/FavoritesScreens/FavoriteScreen';

const StackNav = createStackNavigator();

const FavoritesTabNavigation = () => {
  return (
    <StackNav.Navigator
      initialRouteName="FavoritesScreen"
      screenOptions={{headerShown: false}}>
      <StackNav.Screen name="FavoritesScreen" component={FavoriteScreen} />
    </StackNav.Navigator>
  );
};

export default FavoritesTabNavigation;

