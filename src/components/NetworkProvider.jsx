import React from 'react';
import NetInfo from '@react-native-community/netinfo';
import { StyleSheet, Text, View } from 'react-native';

export const NetworkContext = React.createContext({ isConnected: true });

export class NetworkProvider extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isConnected: true,
    };

    this.unsubscribe = null;

  }

  componentDidMount() {
    this.unsubscribe = NetInfo.addEventListener(this.handleConnectivityChange);
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  handleConnectivityChange = (state) => {
    this.setState({ isConnected: state.isConnected });
  }

  NotConnected = () => {
    const { isConnected } = this.state;

    if (!isConnected) {
      return (
        <View>
          <Text style={styles.text}>Vous n&apos;êtes pas connecté</Text>
        </View>
      );
    }
    return null;
  }

  render() {
    const { children } = this.props;

    return (
      <NetworkContext.Provider value={this.state}>
        {children}
        <this.NotConnected />
      </NetworkContext.Provider>
    );
  }
}

const white = 'white';
const red = 'red';

const styles = StyleSheet.create({
  text: {
    color: white,
    textAlign: 'center',
    backgroundColor: red,
    padding: 6,
  },
});
