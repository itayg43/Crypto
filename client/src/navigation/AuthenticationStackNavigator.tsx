import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';

import {NavigationRoute} from '../enums/NavigationRoute';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';

type AuthenticationStackProps = {
  [NavigationRoute.loginScreen]: undefined;
  [NavigationRoute.registerScreen]: undefined;
};

export type LoginScreenNavigationProp = NativeStackNavigationProp<
  AuthenticationStackProps,
  NavigationRoute.loginScreen
>;

export type RegisterScreenNavigationProp = NativeStackNavigationProp<
  AuthenticationStackProps,
  NavigationRoute.registerScreen
>;

const Stack = createNativeStackNavigator<AuthenticationStackProps>();

const AuthenticationStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={NavigationRoute.loginScreen}
        component={LoginScreen}
        options={{
          headerTitle: 'Login',
          headerLargeTitle: true,
          headerTransparent: true,
        }}
      />

      <Stack.Screen
        name={NavigationRoute.registerScreen}
        component={RegisterScreen}
        options={{
          headerTitle: 'Register',
          headerLargeTitle: true,
          headerTransparent: true,
        }}
      />
    </Stack.Navigator>
  );
};

export default AuthenticationStackNavigator;
