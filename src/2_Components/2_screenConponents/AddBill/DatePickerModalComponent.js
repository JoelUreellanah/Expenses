import React, { Component } from "react";
import { StyleSheet, View, DatePickerIOS, Text, Image } from "react-native";
import { Icon } from "../../../3_Assets";
import { Button } from "../../1_basics/index";

class DatePickerModalComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentDate: new Date()
    };
  }

  render() {
    const { onDateChange, onSelect, pickedDate } = this.props;
    return (
      <View style={styles.container}>
        <Image source={Icon.calendar} style={styles.icon} />
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>Pick your date</Text>
        </View>
        <DatePickerIOS
          style={{ width: "100%" }}
          date={pickedDate === null ? this.state.currentDate : pickedDate}
          onDateChange={onDateChange}
          mode="date"
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

export { DatePickerModalComponent };

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "center"
  },

  icon: {
    width: 60,
    height: 60
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
