import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {NavigationRoute} from '../enums/NavigationRoute';
import HoldingsStackNavigator from './HoldingsStackNavigator';
import CoinsStackNavigator from './CoinsStackNavigator';

const Tab = createBottomTabNavigator();

const AppBottomTabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName={NavigationRoute.coinsStack}
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
      }}>
      <Tab.Screen
        name={NavigationRoute.holdingsStack}
        component={HoldingsStackNavigator}
        options={{
          tabBarLabel: 'Holdings',
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons name="wallet" color={color} size={size} />
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
