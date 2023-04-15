import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';

import {NavigationRoute} from '../enums/NavigationRoute';
import CoinsScreen from '../screens/CoinsScreen';

type CoinsStackProps = {
  [NavigationRoute.coinsScreen]: undefined;
};

export type CoinsScreenNavigationProp = NativeStackNavigationProp<
  CoinsStackProps,
  NavigationRoute.coinsScreen
>;

const Stack = createNativeStackNavigator<CoinsStackProps>();

const CoinsStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={NavigationRoute.coinsScreen}
        component={CoinsScreen}
        options={{
          headerTitle: 'Coins',
          headerTitleStyle: {
            color: 'white',
          },
          headerLargeTitle: true,
          headerTransparent: true,
          headerBlurEffect: 'dark',
        }}
      />
    </Stack.Navigator>
  );
};

export default CoinsStackNavigator;
