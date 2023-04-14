import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import HomeScreen from '../screens/HomeScreen';
import CoinsScreen from '../screens/CoinsScreen';

const Tab = createBottomTabNavigator();

const AppBottomTabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="home"
      screenOptions={{
        headerStyle: {
          backgroundColor: '#222',
        },
        headerTitleStyle: {
          color: 'white',
          textTransform: 'capitalize',
        },

        tabBarStyle: {
          backgroundColor: '#222',
        },
        tabBarActiveTintColor: 'white',
        tabBarInactiveTintColor: '#555',
      }}>
      <Tab.Screen
        name="home"
        component={HomeScreen}
        options={{
          headerShown: false,
          tabBarLabel: 'Home',
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}
      />

      <Tab.Screen
        name="coins"
        component={CoinsScreen}
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
