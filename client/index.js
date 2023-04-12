import {AppRegistry} from 'react-native';
import {Provider as StoreProvider} from 'react-redux';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import FlipperAsyncStorage from 'rn-flipper-async-storage-advanced';

import App from './App';
import {name as appName} from './app.json';
import {store} from './src/redux/store';
import './src/extensions';

const RootApp = () => {
  return (
    <StoreProvider store={store}>
      <FlipperAsyncStorage />
      <GestureHandlerRootView style={{flex: 1}}>
        <App />
      </GestureHandlerRootView>
    </StoreProvider>
  );
};

AppRegistry.registerComponent(appName, () => RootApp);
