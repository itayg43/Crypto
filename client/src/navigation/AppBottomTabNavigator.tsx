import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {NavigationRoute} from '../enums/NavigationRoute';
import HomeScreen from '../screens/HomeScreen';
import CoinsStackNavigator from './CoinsStackNavigator';
import HoldingsScreen from '../screens/HoldingsScreen';

const Tab = createBottomTabNavigator();

const AppBottomTabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName={NavigationRoute.homeScreen}
      screenOptions={{
        headerShown: false,
      }}>
      <Tab.Screen
        name={NavigationRoute.holdingsScreen}
        component={HoldingsScreen}
        options={{
          tabBarLabel: 'Holdings',
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons name="wallet" color={color} size={size} />
          ),
        }}
      />

      <Tab.Screen
        name={NavigationRoute.homeScreen}
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}
      />

      <Tab.Screen
        name={NavigationRoute.coinsStack}
        component={CoinsStackNavigator}
        options={{
          tabBarLabel: 'Coins',
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons name="bitcoin" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default AppBottomTabNavigator;
