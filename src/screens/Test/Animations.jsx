import React from 'react';
import {
  Dimensions, PanResponder, StyleSheet, View
} from 'react-native';

class Animations extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      topPosition: 0,
      leftPosition: 0,
    };

    const { height, width } = Dimensions.get('window');
    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (evt) => {
        const { touches } = evt.nativeEvent;
        if (touches.length === 1) {
          this.setState({
            topPosition: touches[0].pageY - height / 2,
            leftPosition: touches[0].pageX - width / 2
          });
        }
      }
    });
  }

  render() {
    const { topPosition, leftPosition } = this.state;
    const { panHandlers } = this.panResponder;

    return (
      <View style={styles.main_container}>
        <View
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...panHandlers}
          style={[
            styles.animation_view,
            {
              top: topPosition,
              left: leftPosition,
            },
          ]}
        />
      </View>
    );
  }
}

const red = 'red';

const styles = StyleSheet.create({
  main_container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  animation_view: {
    backgroundColor: red,
    width: 100,
    height: 100,
  },
});

export default Animations;
