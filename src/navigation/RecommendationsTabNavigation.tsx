import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import RecommendationsScreen from '../screens/RecommendationScreens/RecommendationsScreen';

const StackNav = createStackNavigator();

const RecommendationsTabNavigation = () => {
  return (
    <StackNav.Navigator
      initialRouteName="RecommendationScreen"
      screenOptions={{headerShown: false}}>
      <StackNav.Screen name="RecommendationScreen" component={RecommendationsScreen} />
    </StackNav.Navigator>
  );
};

export default RecommendationsTabNavigation;

