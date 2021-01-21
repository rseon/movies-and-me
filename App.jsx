import React from 'react';
import { Provider } from 'react-redux';
import Toast from 'react-native-fast-toast';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/es/integration/react';
import Navigation from './src/navigation/Navigation';
import Store from './src/store/configureStore';
import { NetworkProvider } from './src/components/NetworkProvider';

export default function App() {

  const persistor = persistStore(Store);

  return (
    <Provider store={Store}>
      <PersistGate persistor={persistor}>
        <NetworkProvider>
          <Navigation />
        </NetworkProvider>
        <Toast
          ref={(ref) => {
            global.toast = ref;
          }}
        />
      </PersistGate>
    </Provider>
  );
}
