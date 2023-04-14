import {AppRegistry} from 'react-native';
import {Provider as StoreProvider} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import FlipperAsyncStorage from 'rn-flipper-async-storage-advanced';

import App from './App';
import {name as appName} from './app.json';
import {store} from './src/redux/store';
import './src/extensions';

const RootApp = () => {
  return (
    <StoreProvider store={store}>
      <FlipperAsyncStorage />
      <NavigationContainer>
        <App />
      </NavigationContainer>
    </StoreProvider>
  );
};

AppRegistry.registerComponent(appName, () => RootApp);
