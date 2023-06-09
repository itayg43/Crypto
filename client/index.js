import {AppRegistry} from 'react-native';
import {Provider as StoreProvider} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import {Provider as PaperProvider} from 'react-native-paper';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

import App from './App';
import {name as appName} from './app.json';
import {store} from './src/redux/store';
import './src/extensions';

const RootApp = () => {
  return (
    <StoreProvider store={store}>
      <PaperProvider>
        <NavigationContainer>
          <GestureHandlerRootView style={{flex: 1}}>
            <App />
          </GestureHandlerRootView>
        </NavigationContainer>
      </PaperProvider>
    </StoreProvider>
  );
};

AppRegistry.registerComponent(appName, () => RootApp);
