import React from 'react';
import { Platform, StyleSheet, View } from 'react-native';

export default function Test() {

  return (
    <View style={styles.main_container}>
      <View style={styles.subview_container} />
    </View>
  );
}

const styles = StyleSheet.create({
  main_container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  subview_container: {
    ...Platform.select({
      ios: {
        backgroundColor: 'red',
        height: 100,
        width: 50
      },
      android: {
        backgroundColor: 'blue',
        height: 50,
        width: 100
      }
    })
  }
});
