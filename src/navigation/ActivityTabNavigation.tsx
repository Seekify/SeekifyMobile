import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import ActivityHomeScreen from '../screens/ActivityScreens/ActivityHomeScreen';

const StackNav = createStackNavigator();

const ActivityTabNavigation = () => {
  return (
    <StackNav.Navigator
      initialRouteName="ViewActivityScreen"
      screenOptions={{headerShown: false}}>
      <StackNav.Screen name="ViewActivityScreen" component={ActivityHomeScreen} />
    </StackNav.Navigator>
  );
};

export default ActivityTabNavigation;