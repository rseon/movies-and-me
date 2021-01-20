import React from 'react';
import { Button, StyleSheet, View } from 'react-native';
import HelloWorld from './Test/HelloWorld';

export default function Test(props) {

  return (
    <View style={styles.main_container}>
      <Button
        title="Différents styles"
        onPress={() => props.navigation.navigate('TestDifferentStyles')}
      />

      <Button
        title="Animations"
        onPress={() => props.navigation.navigate('TestAnimations')}
      />

      <View style={styles.view}>
        <HelloWorld />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  main_container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  view: {
    marginTop: 20
  }
});
