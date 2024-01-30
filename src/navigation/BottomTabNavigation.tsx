/* eslint-disable prettier/prettier */
import React, { useContext, useEffect, useState } from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { Activity, Heart, List, Search, User, Users } from 'react-native-feather';
import ListStackNavigation from './ListStackNavigation';
import ActivityTabNavigation from './ActivityTabNavigation';
import ProfileTabNavigation from './ProfileTabNavigation';
import { createStackNavigator } from '@react-navigation/stack';
import AuthenticationStackNavigation from './AuthenticationStackNavigation';
import { AuthContext } from '../context/AuthContext';
import SearchTabNavigation from './SearchTabNavigation';
import FavoritesTabNavigation from './FavoritesTabNavigation';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const BottomTabNavigation = () => {

  const { updateUser, user } = useContext(AuthContext); // Use AuthContext

  useEffect(() => {
    updateUser();
  }, []);

  return (
    <NavigationContainer>
      {
        user != null
          ? (
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
                  name="Search"
                  key="Search"
                  component={SearchTabNavigation}
                  options={{
                    tabBarShowLabel: false,
                    // eslint-disable-next-line react/no-unstable-nested-components
                    tabBarIcon: ({size, color}) => (<Search stroke={'black'} height={22} width={22} />),
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
                  name="Favorites"
                  key="Favorites"
                  component={FavoritesTabNavigation}
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
            )
          : <AuthenticationStackNavigation />
      }
    </NavigationContainer>
  );
};

export default BottomTabNavigation;
