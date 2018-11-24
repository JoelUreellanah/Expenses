import React, { Component } from "react";
import { StyleSheet, View, DatePickerIOS, Text, Image } from "react-native";
import { Icon } from "../../../3_Assets";
import { Button } from "../../1_basics/index";

class TimePickerModalComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTime: new Date()
    };
  }

  render() {
    const { onDateChange, onSelect, pickedTime } = this.props;
    return (
      <View style={styles.container}>
        <Image source={Icon.clock} style={styles.icon} />
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>Pick your Time</Text>
        </View>
        <DatePickerIOS
          style={{ width: "100%" }}
          date={pickedTime === null ? this.state.currentTime : pickedTime}
          onDateChange={onDateChange}
          mode="time"
        />

        <View style={styles.buttonContainer}>
          <Button
            onPress={onSelect}
            title="Pick"
            backgroundColor="#277BFF"
            fontSize={18}
            fontWeight="500"
            color="white"
          />
        </View>
      </View>
    );
  }
}

export { TimePickerModalComponent };

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "center"
  },

  icon: {
    width: 65,
    height: 65
  },

  headerContainer: {
    width: "90%",
    height: "10%",
    alignItems: "center",
    justifyContent: "center"
    // backgroundColor: "ivory"
  },

  headerText: {
    fontSize: 24,
    fontWeight: "700",
    color: "black"
  },

  buttonContainer: {
    width: "80%",
    height: "12%"
  }
});
