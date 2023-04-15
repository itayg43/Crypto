import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {NavigationRoute} from '../enums/NavigationRoute';
import HomeScreen from '../screens/HomeScreen';
import CoinsStackNavigator from './CoinsStackNavigator';

const Tab = createBottomTabNavigator();

const AppBottomTabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName={NavigationRoute.homeScreen}
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: '#222',
        },
        tabBarActiveTintColor: 'white',
        tabBarInactiveTintColor: '#555',
      }}>
      <Tab.Screen
        name={NavigationRoute.homeScreen}
        component={HomeScreen}
        options={{
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}
      />

      <Tab.Screen
        name={NavigationRoute.coinsStack}
        component={CoinsStackNavigator}
        options={{
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons name="bitcoin" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default AppBottomTabNavigator;
