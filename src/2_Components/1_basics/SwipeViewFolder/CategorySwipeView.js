import React, { Component } from "react";
import {
  StyleSheet,
  Dimensions,
  PanResponder,
  Animated,
  TouchableOpacity,
  Image,
  Text
} from "react-native";
import { Icon } from "../../../3_Assets";

import { connect } from "react-redux";
import * as Actions from "../../../Redux/Actions";

const SCREEN_WIDTH = Dimensions.get("window").width;

class SwipeView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      containerTranslateX: new Animated.Value(0),
      rightActionsOpen: false,
      leftActionsOpen: false,
      inAnimationComplete: true
    };

    this.position = new Animated.ValueXY();
    this._animatedValueX = 0;
    this._animatedValueY = 0;

    this.position.x.addListener(value => (this._animatedValueX = value.value));
    this.position.y.addListener(value => (this._animatedValueY = value.value));

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

    this.panResponder = PanResponder.create({
      onMoveShouldSetResponderCapture: () => true, //Tell iOS that we are allowing the movement
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => {
        return gestureState.dx != 0 && gestureState.dy != 0;
      },
      // shouldSetPanResponder: (evt, gestureState) => true,
      onPanResponderGrant: (evt, gestureState) => {
        // this.position.extractOffset();
        this.position.setOffset({
          x: this._animatedValueX,
          y: this._animatedValueY
        });
        this.position.setValue({ x: 0, y: 0 });
        // this.props.scrollEnabled(false);
      },
      // onPanResponderMove: Animated.event([
      //   null,
      //   {
      //     dx: this.position.x,
      //     dy: 0
      //   }
      // ]),

      onPanResponderMove: (evt, gestureState) => {
        // console.warn(gestureState.dx);
        if (gestureState.dx < -8 || gestureState.dx > 8) {
          this.props.manageScroll(false);
          //   console.warn("false");
        } else {
          this.props.manageScroll(true);
          //   console.warn("true");
        }

        Animated.event([null, { dx: this.position.x, dy: 0 }])(
          evt,
          gestureState
        );
      },
      onPanResponderRelease: (evt, gestureState) => {
        const { rightActionsOpen, leftActionsOpen } = this.state;

        if (gestureState.dx < 2 && gestureState.dx > -2) {
          if (leftActionsOpen) {
            this.closeOnSwipe(-100, 0, false, false, "closing leftSide");
          } else if (rightActionsOpen) {
            this.closeOnSwipe(100, 0, false, false, "closing rightSide");
          }
        } else {
          // if trying to open right side but threshold not achieved
          if (
            this.position.x._value < 0 &&
            this.position.x._value >= -30 &&
            !leftActionsOpen &&
            !rightActionsOpen
          ) {
            this.closeOnSwipe(0, 0, false, false, "primo");
          }

          // open fully right side
          else if (
            this.position.x._value <= -31 &&
            !rightActionsOpen &&
            !leftActionsOpen
          ) {
            this.closeOnSwipe(-100, 0, false, true, "secondo");
          }

          // if right side is open and user try to keep opening
          else if (
            this.position.x._value < 0 &&
            rightActionsOpen &&
            !leftActionsOpen
          ) {
            this.closeOnSwipe(0, 0, false, true, "terzo");
          }

          //if trying to close right side but threshold not achieved
          else if (
            this.position.x._value > 0 &&
            this.position.x._value <= 30 &&
            rightActionsOpen &&
            !leftActionsOpen
          ) {
            this.closeOnSwipe(0, 0, false, true, "quarto");
          }

          // close right side fully
          else if (
            this.position.x._value >= 31 &&
            rightActionsOpen &&
            !leftActionsOpen
          ) {
            this.closeOnSwipe(100, 0, false, false, "quinto");
          }

          // trying to open left side
          else if (this.position.x._value >= 0 && !leftActionsOpen) {
            this.closeOnSwipe(0, 0, false, false, "sesto");
          }
        }
      },
      onPanResponderTerminate: (evt, gestureState) => {
        const { rightActionsOpen, leftActionsOpen } = this.state;

        if (leftActionsOpen) {
          this.closeOnSwipe(
            -100,
            0,
            !leftActionsOpen,
            rightActionsOpen,
            "scrollViewEnabled"
          );
        } else if (rightActionsOpen) {
          this.closeOnSwipe(
            100,
            0,
            leftActionsOpen,
            !rightActionsOpen,
            "scrollViewEnabled"
          );
        } else {
          this.closeOnSwipe(
            0,
            0,
            leftActionsOpen,
            rightActionsOpen,
            "scrollViewEnabled"
          );
        }
      }
    });
  }

  closeOnSwipe(
    XPoint,
    YPoint,
    leftButtonIsOpen,
    rightButtonIsOpen,
    debugMessage
  ) {
    Animated.timing(this.position, {
      toValue: { x: XPoint, y: YPoint },
      duration: 200
    }).start(() => {
      this.setState({
        leftActionsOpen: leftButtonIsOpen,
        rightActionsOpen: rightButtonIsOpen
      });
      this.props.scrollEnabled(true);
      // console.warn(debugMessage);
    });
  }

  render() {
    const { Delete, Pay } = this.props;
    return (
      <Animated.View
        {...this.panResponder.panHandlers}
        style={[
          styles.container,
          {
            transform: this.position.getTranslateTransform()
          }
        ]}
      >
        <Animated.View
          style={[
            styles.optionContainerLeft,
            { opacity: this.optionsOpacityRight }
          ]}
        >
          {/*<TouchableOpacity
            style={[styles.iconContainer, { backgroundColor: "#30A3F7" }]}
            onPress={Pay}
          >
            <Text style={{ fontSize: 15, fontWeight: "800", color: "white" }}>
              Pay
            </Text>
          </TouchableOpacity>*/}
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
    height: "100%",
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
    height: "100%",
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
    width: 30,
    height: 30,
    tintColor: "white"
  }
});
