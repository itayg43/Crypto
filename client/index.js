import {AppRegistry} from 'react-native';
import {Provider as StoreProvider} from 'react-redux';

import App from './App';
import {name as appName} from './app.json';
import {store} from './src/redux/store';

const RootApp = () => {
  return (
    <StoreProvider store={store}>
      <App />
    </StoreProvider>
  );
};

AppRegistry.registerComponent(appName, () => RootApp);
