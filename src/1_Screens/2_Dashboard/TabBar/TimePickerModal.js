import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Animated,
  TouchableWithoutFeedback,
  PanResponder
} from "react-native";
import { TimePickerModalComponent } from "../../../2_Components/2_screenConponents/AddBill";
import DateClass from "../../../4_Classes/Date";

let userTime = null;

class TimePickerModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      opacity: new Animated.Value(0),
      modalHeight: new Animated.Value(0),
      userDate: ""
    };
  }

  componentWillMount() {
    Animated.spring(this.state.opacity, {
      toValue: 0.4
    }).start(({ finished }) => {
      if (finished) {
        // console.log("finished");
      }
    });
    Animated.spring(this.state.modalHeight, {
      toValue: 400
    }).start();

    this.animation = new Animated.ValueXY({ x: 0, y: 0 });
    this.panResponder = PanResponder.create({
      onMoveShouldSetPanResponder: (evt, gestureState) => {
        if (
          (this.state.isScrollEnabled &&
            this.scrollOffset <= 0 &&
            gestureState.dy > 0) ||
          (!this.state.isScrollEnabled && gestureState.dy < 0)
        ) {
          return true;
        } else {
          return false;
        }
      },
      onPanResponderGrant: (evt, gestureState) => {
        this.animation.extractOffset();
      },
      onPanResponderMove: (evt, gestureState) => {
        if (gestureState.dy > 0) {
          this.animation.setValue({ x: 0, y: gestureState.dy });
        }
      },
      onPanResponderRelease: (evt, gestureState) => {
        if (gestureState.dy < 0) {
          this.setState({ isScrollEnabled: true });
          Animated.timing(this.animation.y, {
            toValue: 0,
            duration: 200,
            tension: 1
          }).start();
        } else if (gestureState.dy > 100) {
          this.closeModal();
        } else if (gestureState.dy > 0 && gestureState.dy < 100)
          this.setState({ isScrollEnabled: false });
        Animated.spring(this.animation.y, {
          toValue: 0,
          duration: 200,
          tension: 40
        }).start();
      }
    });
  }

  closeModal(time) {
    Animated.spring(this.state.opacity, {
      toValue: 0
    }).start(({ finished }) => {
      if (finished) {
        // console.log("finished");
      }
    });

    Animated.timing(this.state.modalHeight, {
      toValue: 0,
      duration: 200
    }).start(({ finished }) => {
      if (finished) {
        if (time === null) {
          this.props.navigation.goBack();
        } else {
          const splitDate = new DateClass();
          const hours = splitDate.getHour(time);
          const mins = splitDate.getMins(time);
          // console.warn("time: " + hours + " and " + mins);
          this.props.navigation.goBack();
          this.props.navigation.state.params.getSelectedTime({
            time,
            hours,
            mins
          });
        }
      }
    });
  }

  onSelect = time => {
    // console.warn(time);
    userTime = time;
  };

  setDate = () => {
    this.closeModal(userTime);
  };

  render() {
    const animatedHeight = {
      transform: this.animation.getTranslateTransform()
    };

    let { opacity, modalHeight } = this.state;

    return (
      <View
        style={{ flex: 1, flexDirection: "column", justifyContent: "flex-end" }}
      >
        <TouchableWithoutFeedback onPress={() => this.closeModal(userTime)}>
          <Animated.View
            style={{
              flex: 1,
              flexDirection: "column",
              backgroundColor: "black",
              opacity: opacity
            }}
          />
        </TouchableWithoutFeedback>

        <Animated.View
          style={[animatedHeight, styles.container, { height: modalHeight }]}
          {...this.panResponder.panHandlers}
        >
          <View style={styles.dragableViewContainer}>
            <TimePickerModalComponent
              onDateChange={this.onSelect}
              onSelect={this.setDate}
              pickedTime={userTime}
            />
          </View>
        </Animated.View>
      </View>
    );
  }
}

export { TimePickerModal };

const styles = {
  container: {
    position: "absolute",
    // height: '60%',
    width: "100%",
    backgroundColor: "white",
    // borderWidth: 2,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    alignItems: "center",
    justifyContent: "flex-end"
  },

  dragableViewContainer: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center"
    // backgroundColor: "powderblue"
  }
};
