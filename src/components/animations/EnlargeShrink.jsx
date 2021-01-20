import React from 'react';
import { Animated } from 'react-native';

class EnlargeShrink extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      viewSize: new Animated.Value(this.getSize()),
    };
  }

  componentDidUpdate() {
    const { viewSize } = this.state;
    Animated.spring(viewSize, {
      toValue: this.getSize(),
      useNativeDriver: false,
    }).start();
  }

  getSize() {
    const { shouldEnlarge } = this.props;
    if (shouldEnlarge) {
      return 80;
    }
    return 40;
  }

  render() {
    const { viewSize } = this.state;
    const { children } = this.props;

    return (
      <Animated.View style={{ width: viewSize, height: viewSize }}>
        {children}
      </Animated.View>
    );
  }
}

export default EnlargeShrink;
