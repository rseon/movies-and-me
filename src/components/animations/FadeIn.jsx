import React from 'react';
import { Animated, Dimensions } from 'react-native';

class FadeIn extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      positionLeft: new Animated.Value(Dimensions.get('window').width)
    };
  }

  componentDidMount() {
    const { positionLeft } = this.state;

    Animated.spring(positionLeft, {
      toValue: 0,
      useNativeDriver: false,
    }).start();
  }

  render() {
    const { positionLeft } = this.state;
    const { children } = this.props;

    return (
      <Animated.View
        style={{ left: positionLeft }}
      >
        {children}
      </Animated.View>
    );
  }
}

export default FadeIn;
