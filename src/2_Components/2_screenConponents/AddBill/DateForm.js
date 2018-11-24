import React, { Component } from "react";
import { StyleSheet, View, Text, TouchableOpacity, Image } from "react-native";
import { Icon } from "../../../3_Assets";
import DateClass from "../../../4_Classes/Date";

class DateForm extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  openDateModal = navigation => {
    navigation.navigate("DatePickerModal", {
      getSelectedDate: this.getSelectedDate
    });
  };

  getSelectedDate = newDate => {
    // console.log(newDate.date);
    this.setState({ date: newDate.date });
    if (this.state.date === null) {
      return;
    } else {
      this.props.onSelectDate(this.formatDate(newDate.date), newDate.date);
    }
  };

  formatDate = date => {
    // const date = new Date();

    const DAY = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    const MONTH = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "Jun",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "Dicember"
    ];

    const day = DAY[date.getDay()];

    let month;
    if (date.getMonth() < 6) {
      month = MONTH[date.getMonth()];
    } else {
      month = MONTH[date.getMonth() + 1];
    }

    let dayDate = "";
    if (date.getDate() == 1) {
      dayDate = "st";
    } else if (date.getDate() == 2) {
      dayDate = "nd";
    } else if (date.getDate() == 3) {
      dayDate = "rd";
    } else {
      dayDate = "th";
    }
    return day + " - " + date.getDate() + dayDate + " " + month;
  };

  openTimeModal = navigation => {
    navigation.navigate("TimePickerModal", {
      getSelectedTime: this.getSelectedTime
    });
  };

  getSelectedTime = newTime => {
    // console.log(newTime.time);
    // this.state.date.setHours(newTime.hours);
    // this.state.date.setMinutes(newTime.mins);
    // console.log(this.state.date);
    this.setState({ time: newTime.time });
    // this.props.onSelectTime(this.formatTime(newTime.time), this.state.date);

    this.props.onSelectTime(newTime.hours, newTime.mins);
  };

  formatTime = date => {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    return hours + ":" + minutes;
  };

  render() {
    const { navigation, dateBoxColor, date, time } = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.dateContainer}>
          <Text style={styles.dateTitle}>Date</Text>
          <TouchableOpacity
            style={[styles.dateBoxContainer, { backgroundColor: dateBoxColor }]}
            onPress={() => this.openDateModal(navigation)}
          >
            <Text style={styles.dateText}>
              {date === null ? "Select Date" : this.formatDate(this.state.date)}
            </Text>
            <Image source={Icon.down_arrow} style={styles.icon} />
          </TouchableOpacity>
        </View>

        <View style={styles.timeContainer}>
          <Text style={styles.timeTitle}>Time</Text>
          <TouchableOpacity
            style={styles.timeBoxContainer}
            onPress={() => this.openTimeModal(navigation)}
          >
            <Text style={styles.timeText}>
              {time === null ? "Select Time" : this.formatTime(this.state.time)}
            </Text>
            <Image source={Icon.down_arrow} style={styles.icon} />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export { DateForm };

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    flexDirection: "row",
    justifyContent: "space-between"
  },

  dateContainer: {
    width: "55%",
    height: "100%",
    justifyContent: "space-around"
  },

  dateTitle: {
    fontSize: 14,
    fontWeight: "300",
    width: "100%",
    height: "30%"
  },

  dateBoxContainer: {
    width: "100%",
    height: "65%",
    borderWidth: 1,
    borderColor: "#D5D5D5",
    borderRadius: 2,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row"
  },

  dateText: {
    fontSize: 13,
    fontWeight: "600",
    color: "black",
    marginRight: 5
  },

  timeContainer: {
    width: "35%",
    height: "100%",
    justifyContent: "space-around"
  },

  timeTitle: {
    fontSize: 14,
    fontWeight: "300",
    width: "100%",
    height: "30%"
  },

  timeBoxContainer: {
    width: "100%",
    height: "60%",
    borderWidth: 1,
    borderColor: "#D5D5D5",
    borderRadius: 2,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row"
  },

  timeText: {
    fontSize: 13,
    fontWeight: "600",
    marginRight: 5
  },

  icon: {
    width: 13,
    height: 13
  }
});
