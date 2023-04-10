import {AppRegistry} from 'react-native';
import {Provider as StoreProvider} from 'react-redux';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

import App from './App';
import {name as appName} from './app.json';
import {store} from './src/redux/store';

const RootApp = () => {
  return (
    <StoreProvider store={store}>
      <GestureHandlerRootView style={{flex: 1}}>
        <App />
      </GestureHandlerRootView>
    </StoreProvider>
  );
};

AppRegistry.registerComponent(appName, () => RootApp);
