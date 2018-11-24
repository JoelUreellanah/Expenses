import React, { Component } from "react";
import {
  StyleSheet,
  View,
  PanResponder,
  Animated,
  Text,
  Dimensions,
  TouchableOpacity,
  Image
} from "react-native";
import { Icon } from "../../3_Assets";

const SCREEN_WIDTH = Dimensions.get("window").width;

class SwipeView extends Component {
  constructor(props) {
    super(props);
    this.position = new Animated.ValueXY();
    this.state = {
      swipedRight: false
    };

    this.optionsOpacityLeft = this.position.x.interpolate({
      inputRange: [-SCREEN_WIDTH / 4, 0, SCREEN_WIDTH / 4],
      outputRange: [1, 0, 0],
      extrapolate: "clamp"
    });

    this.optionsOpacityRight = this.position.x.interpolate({
      inputRange: [-SCREEN_WIDTH / 4, 0, SCREEN_WIDTH / 4],
      outputRange: [0, 0, 1],
      extrapolate: "clamp"
    });
  }

  componentWillMount() {
    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => {
        console.log("click event");
        // this.onMove(false);
        return true;
      },

      onPanResponderGrant: (evt, gestureState) => {
        this.position.extractOffset();
      },
      onPanResponderMove: (evt, gestureState) => {
        this.position.setValue({ x: gestureState.dx, y: 0 });
        // console.warn(this.position.x._value);
        if (gestureState.dy < 0 && gestureState.dx > 0) {
          this.onMove(true);
        } else if (gestureState.dx < 0 || gestureState.dx > 0) {
          this.onMove(false);
        }
      },

      onPanResponderRelease: (evt, gestureState) => {
        if (gestureState.dx < 2 && gestureState.dx > -2) {
          if (this.state.swipedRight) {
            this.closeOnSwipe(100, 0);
            this.setState({ swipedRight: false });
          } else {
            this.onClick();
          }
        } else {
          if (this.position.x._value > -30 && !this.state.swipedRight) {
            this.closeOnSwipe(0, 0);
          } else if (this.position.x._value < -29 && !this.state.swipedRight) {
            this.closeOnSwipe(-100, 0);
            this.setState({ swipedRight: true });
          } else if (this.position.x._value < -29 && this.state.swipedRight) {
            this.closeOnSwipe(0, 0);
          } else if (this.position.x._value > 29 && this.state.swipedRight) {
            this.closeOnSwipe(100, 0);
            this.setState({ swipedRight: false });
          } else if (this.position.x._value < 30 && this.state.swipedRight) {
            this.closeOnSwipe(0, 0);
          }
        }
        this.onMove(true);
      }
    });
  }

  closeOnSwipe(XPoint, YPoint) {
    Animated.timing(this.position, {
      toValue: { x: XPoint, y: YPoint },
      duration: 200
    }).start();
  }

  onMove(bool) {
    this.props.isScrollEnabled(bool);
    // console.warn(bool);
  }

  onClick() {
    this.props.onClick();
  }

  render() {
    const { onDelete } = this.props;
    return (
      <Animated.View
        {...this.panResponder.panHandlers}
        style={[
          { transform: this.position.getTranslateTransform() },
          styles.container
        ]}
      >
        <Animated.View
          style={[
            styles.optionContainerRight,
            { opacity: this.optionsOpacityLeft }
          ]}
        >
          <TouchableOpacity
            style={[styles.iconContainer, { backgroundColor: "red" }]}
            onPress={onDelete}
          >
            <Image source={Icon.garbage} style={styles.icon} />
          </TouchableOpacity>
        </Animated.View>
        {this.props.children}
      </Animated.View>
    );
  }
}

export default SwipeView;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 70,
    // justifyContent: "center",
    // alignItems: "center",
    // backgroundColor: "pink",
    justifyContent: "flex-start",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#F5F6F8",
    flexDirection: "row"
  },

  optionContainerLeft: {
    right: "99.9%",
    width: "26%",
    height: 70,
    flexDirection: "row",
    position: "absolute",
    marginRight: "2%"
  },

  optionContainerRight: {
    left: "99.9%",
    width: "26%",
    height: 70,
    flexDirection: "row",
    position: "absolute",
    marginLeft: "2%"
  },

  iconContainer: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 6
  },

  icon: {
    width: 20,
    height: 20,
    tintColor: "white"
  }
});
