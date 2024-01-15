/* eslint-disable prettier/prettier */
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { Activity, Heart, List, User, Users } from 'react-native-feather';
import ListStackNavigation from './ListStackNavigation';
import PeopleTabNavigation from './PeopleTabNavigation';
import ActivityTabNavigation from './ActivityTabNavigation';
import RecommendationsTabNavigation from './RecommendationsTabNavigation';
import ProfileTabNavigation from './ProfileTabNavigation';

const BottomTabNavigation = () => {
  const Tab = createBottomTabNavigator();

  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={{headerShown: false}}>
        <Tab.Screen
          name="Lists"
          key="Lists"
          component={ListStackNavigation}
          options={{
            tabBarShowLabel: false,
            // eslint-disable-next-line react/no-unstable-nested-components
            tabBarIcon: ({size, color}) => (<List stroke={'black'} height={22} width={22} />),
          }}/>
        <Tab.Screen
          name="People"
          key="People"
          component={PeopleTabNavigation}
          options={{
            tabBarShowLabel: false,
            // eslint-disable-next-line react/no-unstable-nested-components
            tabBarIcon: ({size, color}) => (<Users stroke={'black'} height={22} width={22} />),
          }}/>
        <Tab.Screen
          name="Activity"
          key="Activity"
          component={ActivityTabNavigation}
          options={{
            tabBarShowLabel: false,
            // eslint-disable-next-line react/no-unstable-nested-components
            tabBarIcon: ({size, color}) => (<Activity stroke={'black'} height={22} width={22} />),
          }}/>
        <Tab.Screen
          name="Recommendations"
          key="Recommendations"
          component={RecommendationsTabNavigation}
          options={{
            tabBarShowLabel: false,
            // eslint-disable-next-line react/no-unstable-nested-components
            tabBarIcon: ({size, color}) => (<Heart stroke={'black'} height={22} width={22} />),
          }}/>
        <Tab.Screen
          name="Profile"
          key="Profile"
          component={ProfileTabNavigation}
          options={{
            tabBarShowLabel: false,
            // eslint-disable-next-line react/no-unstable-nested-components
            tabBarIcon: ({size, color}) => (<User stroke={'black'} height={22} width={22} />),
          }}/>
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default BottomTabNavigation;
