import React from "react";
import NetInfo from "@react-native-community/netinfo";
import { Text, View } from "react-native";

export const NetworkContext = React.createContext({ isConnected: true });

export class NetworkProvider extends React.PureComponent {
    constructor(props) {
        super(props)
        this.unsubscribe = null

    }
  state = {
    isConnected: true,
  };

  componentDidMount() {
    this.unsubscribe = NetInfo.addEventListener(this.handleConnectivityChange);
  }

  componentWillUnmount() {
    this.unsubscribe()
  }

  handleConnectivityChange = (state) => {
      this.setState({ isConnected: state.isConnected })
  }

  NotConnected = () => {
    if(!this.state.isConnected) {
      return (
        <View>
          <Text
            style={{
              color: "white",
              textAlign: "center",
              backgroundColor: "red",
              padding: 6,
            }}
          >
            Vous n'êtes pas connecté
          </Text>
        </View>
      );
    }
    return null
  }

  render() {
    return (
      <NetworkContext.Provider value={this.state}>
        {this.props.children}
        <this.NotConnected />
      </NetworkContext.Provider>
    );
  }
}
