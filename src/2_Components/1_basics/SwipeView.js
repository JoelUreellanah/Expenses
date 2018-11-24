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
import GradientView from "../1_basics/GradientView";
import { Icon } from "../../3_Assets";
import { connect } from "react-redux";
import * as Actions from "../../Redux/Actions";

const SCREEN_WIDTH = Dimensions.get("window").width;

class SwipeView extends Component {
  constructor(props) {
    super(props);
    this.position = new Animated.ValueXY();
    this.state = {
      swipedRight: false,
      swipedLeft: false
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
          } else if (this.props.state.swipedLeft) {
            this.closeOnSwipe(-100, 0);
            // this.setState({ swipedLeft: false });
            this.props.swipedLeft(false);
          } else {
            this.onClick();
          }
        } else {
          if (
            this.position.x._value > -31 &&
            this.state.swipedRight &&
            this.position.x._value < 31
          ) {
            this.closeOnSwipe(0, 0);
            // console.warn("primo");
          } else if (
            this.position.x._value < -30 &&
            !this.state.swipedRight &&
            !this.props.state.swipedLeft
          ) {
            this.closeOnSwipe(-100, 0);
            this.setState({ swipedRight: true });
            // console.warn("secondo");
          } else if (
            this.position.x._value > -30 &&
            this.position.x._value < 30 &&
            !this.state.swipedRight
          ) {
            this.closeOnSwipe(0, 0);
            // console.warn("terzo");
          } else if (this.position.x._value < -31 && this.state.swipedRight) {
            this.closeOnSwipe(0, 0);
            this.setState({ swipedRight: true });
            // console.warn("quarto");
          } else if (
            this.position.x._value > 30 &&
            this.position.x._value < 99 &&
            this.state.swipedRight
          ) {
            this.closeOnSwipe(100, 0);
            this.setState({ swipedRight: false });
            // console.warn("quinto");
          } else if (
            this.position.x._value < 31 &&
            this.position.x._value > -100 &&
            !this.state.swipedRight &&
            this.props.state.swipedLeft
          ) {
            this.closeOnSwipe(-100, 0);
            // this.setState({ swipedLeft: false });
            this.props.swipedLeft(false);

            // console.warn("sesto");
          } else if (
            this.position.x._value > 30 &&
            !this.state.swipedRight &&
            !this.props.state.swipedLeft
          ) {
            this.closeOnSwipe(100, 0);
            // this.setState({ swipedLeft: true });
            this.props.swipedLeft(true);

            // console.warn("settimo");
          } else if (
            this.position.x._value > 30 &&
            this.props.state.swipedLeft
          ) {
            this.closeOnSwipe(0, 0);
            // console.warn("ottavo");
          } else if (
            this.position.x._value < -99 &&
            this.props.state.swipedLeft &&
            !this.state.swipedRight
          ) {
            this.closeOnSwipe(-200, 0);
            this.setState({
              // swipedLeft: false,
              swipedRight: true
            });
            this.props.swipedLeft(false);

            // console.warn("nono");
          } else if (
            this.position.x._value > 99 &&
            !this.props.state.swipedLeft &&
            this.state.swipedRight
          ) {
            this.closeOnSwipe(200, 0);
            this.setState({
              // swipedLeft: true,
              swipedRight: false
            });
            this.props.swipedLeft(true);

            // console.warn("decimo");
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
    const { Delete, Pay } = this.props;
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
            styles.optionContainerLeft,
            { opacity: this.optionsOpacityRight }
          ]}
        >
          <TouchableOpacity
            style={[styles.iconContainer, { backgroundColor: "#30A3F7" }]}
            onPress={Pay}
          >
            <Text style={{ fontSize: 15, fontWeight: "800", color: "white" }}>
              Pay
            </Text>
          </TouchableOpacity>
        </Animated.View>

        <Animated.View
          style={[
            styles.optionContainerRight,
            { opacity: this.optionsOpacityLeft }
          ]}
        >
          <TouchableOpacity
            onPress={Delete}
            style={[styles.iconContainer, { backgroundColor: "red" }]}
          >
            <Image source={Icon.garbage} style={styles.icon} />
          </TouchableOpacity>
        </Animated.View>
        {this.props.children}
      </Animated.View>
    );
  }
}

const mapStateToProps = state => {
  console.log(state);
  return {
    state: state
  };
};

export default connect(
  mapStateToProps,
  Actions
)(SwipeView);

const styles = StyleSheet.create({
  container: {
    // width: "100%",
    // height: "100%",
    // justifyContent: "center",
    // alignItems: "center",
    // backgroundColor: "pink",
    flexDirection: "row"
  },

  optionContainerLeft: {
    right: "99.9%",
    width: "26%",
    height: 90,
    flexDirection: "row",
    position: "absolute",
    marginRight: "2%"
  },

  gradientView: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center"
  },

  optionContainerRight: {
    left: "99.9%",
    width: "26%",
    height: 90,
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
