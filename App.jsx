import React from "react";
import { Provider } from 'react-redux';
import Navigation from './src/navigation/Navigation';
import Store from './src/store/configureStore'
import { NetworkProvider } from "./src/components/NetworkProvider";
import Toast from "react-native-fast-toast";

export default function App() {

  return (
    <Provider store={Store}>
      <NetworkProvider>
        <Navigation />
      </NetworkProvider>
      <Toast ref={(ref) => (global["toast"] = ref)} />
    </Provider>
  );
}
