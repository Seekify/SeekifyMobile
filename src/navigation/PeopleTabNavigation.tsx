import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import ViewPeopleScreen from '../screens/PeopleScreens/ViewPeopleScreen';

const StackNav = createStackNavigator();

const PeopleTabNavigation = () => {
  return (
    <StackNav.Navigator
      initialRouteName="PeopleScreen"
      screenOptions={{headerShown: false}}>
      <StackNav.Screen name="PeopleScreen" component={ViewPeopleScreen} />
    </StackNav.Navigator>
  );
};

export default PeopleTabNavigation;
