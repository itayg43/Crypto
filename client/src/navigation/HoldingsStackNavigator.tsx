import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';

import {NavigationRoute} from '../enums/NavigationRoute';
import HoldingsScreen from '../screens/HoldingsScreen';
import AppIconButton from '../components/AppIconButton';
import {logoutUserAsync} from '../redux/user/asyncActions/logoutUserAsync';
import {useAppDispatch} from '../hooks/useAppDispatch';
import {useCallback} from 'react';

type HoldingsStackProps = {
  [NavigationRoute.holdingsScreen]: undefined;
};

export type HoldingsScreenNavigationProp = NativeStackNavigationProp<
  HoldingsStackProps,
  NavigationRoute.holdingsScreen
>;

const Stack = createNativeStackNavigator<HoldingsStackProps>();

const HoldingsStackNavigator = () => {
  const dispatch = useAppDispatch();

  const handleLogoutUser = useCallback(() => {
    dispatch(logoutUserAsync());
  }, [dispatch]);

  return (
    <Stack.Navigator>
      <Stack.Screen
        name={NavigationRoute.holdingsScreen}
        component={HoldingsScreen}
        options={{
          headerTitle: 'Holdings',
          headerLargeTitle: true,
          headerTransparent: true,
          headerBlurEffect: 'systemUltraThinMaterialLight',
          headerRight: () => (
            <AppIconButton icon="logout-variant" onPress={handleLogoutUser} />
          ),
        }}
      />
    </Stack.Navigator>
  );
};

export default HoldingsStackNavigator;
