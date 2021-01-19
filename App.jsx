import React from 'react';
import { Provider } from 'react-redux';
import Navigation from './src/navigation/Navigation';
import Store from './src/store/configureStore'
import { useNetInfo } from "@react-native-community/netinfo";
import { SafeAreaView, Text, View } from 'react-native';

export default function App() {

  // Check if connected
  const netInfo = useNetInfo();
  const NotConnected = () => {
    if(!netInfo.isConnected) {
      return (
        <SafeAreaView>
          <Text style={{ color: "white", textAlign: "center", backgroundColor: 'red', padding: 6}}>
            Vous n'êtes pas connecté
          </Text>
        </SafeAreaView>
      );
    }
    return null
  }

  return (
    <Provider store={Store}>
      <Navigation />
      <NotConnected />
    </Provider>
  );
}
