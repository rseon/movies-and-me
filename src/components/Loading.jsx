import React, { Component } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';

class Loading extends Component {

  displayLoading() {
    const { isLoading, full } = this.props;

    if (isLoading) {
      return (
        <View style={full ? styles.loading_full : styles.loading}>
          <ActivityIndicator size="large" color="#00ff00" />
        </View>
      );
    }
    return null;
  }

  render() {
    return (
      <>
        { this.displayLoading() }
      </>
    );
  }
}

const styles = StyleSheet.create({
  loading_full: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  },
  loading: {
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default Loading;
