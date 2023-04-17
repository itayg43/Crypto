import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';

import {NavigationRoute} from '../enums/NavigationRoute';
import HoldingsScreen from '../screens/HoldingsScreen';

type HoldingsStackProps = {
  [NavigationRoute.holdingsScreen]: undefined;
};

export type HoldingsScreenNavigationProp = NativeStackNavigationProp<
  HoldingsStackProps,
  NavigationRoute.holdingsScreen
>;

const Stack = createNativeStackNavigator<HoldingsStackProps>();

const HoldingsStackNavigator = () => {
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
        }}
      />
    </Stack.Navigator>
  );
};

export default HoldingsStackNavigator;
