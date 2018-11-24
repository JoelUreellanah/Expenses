import React, { Component } from "react";
import { StyleSheet, View, Text, TouchableOpacity, Image } from "react-native";
import { Icon } from "../../../3_Assets/index";
import GradientView from "../../1_basics/GradientView";
import DateClass from "../../../4_Classes/Date";

import { MaterialIndicator } from "react-native-indicators";

import { connect } from "react-redux";
import * as Actions from "../../../Redux/Actions";

class MainBillCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false
    };
  }
  calculateRemainingDate(dueDate) {
    const date = new DateClass();
    const remainingDays = date.calculateDifferenceInDate(dueDate);
    return remainingDays;
  }

  formatDate(date) {
    const dateClass = new DateClass();
    const formattedDate = dateClass.formatDate(date);
    return formattedDate;
  }

  renderPayButton() {
    if (this.props.state.loading) {
      return <MaterialIndicator color="white" />;
    } else {
      return (
        <GradientView
          style={{
            width: "100%",
            height: "100%",
            alignItems: "center",
            justifyContent: "center"
          }}
          fromColor={"#30A3F7"}
          toColor={"#4F6DF2"}
          cornerRadius={8.0}
        >
          <Text style={styles.buttonText}>Pay</Text>
        </GradientView>
      );
    }
  }

  pay() {
    if (this.props.state.loading) {
      return;
    } else {
      this.props.loading(true);
      this.props.pay();
    }
  }
  render() {
    const { bill, navigation, pay } = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.dueDateContainer}>
          <Text style={styles.dueDate}>Pending</Text>
        </View>

        <View style={styles.topContainer}>
          <View style={styles.billIconContainer}>
            <Image source={Icon[bill.icon]} style={styles.billIcon} />
          </View>

          <View style={styles.billDetailsContainer}>
            <Text style={styles.billName}>{bill.name}</Text>
            <Text style={styles.billAmountText}>{bill.amount}</Text>
          </View>

          <View style={styles.billDateContainer}>
            <Text style={styles.billDateText}>
              {this.formatDate(bill.date)}
            </Text>
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={() => this.pay()}>
            {this.renderPayButton()}
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => {
  console.log(state);
  return {
    // loadDashboard: state.updateDashboard
    state: state
  };
};

export default connect(
  mapStateToProps,
  Actions
)(MainBillCard);

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    borderRadius: 7,
    backgroundColor: "white",
    alignItems: "flex-start",
    justifyContent: "center",
    shadowColor: "#E3E3E3",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 2,
    elevation: 2
  },

  dueDateContainer: {
    width: "100%",
    height: "15%",
    alignItems: "center",
    justifyContent: "center"
    // backgroundColor: "pink"
  },

  dueDate: {
    fontSize: 14,
    fontWeight: "700",
    // color: "#3FAA81",
    color: "#5D5D5D"
  },

  topContainer: {
    width: "100%",
    height: "47%",
    justifyContent: "center",
    flexDirection: "row"
    // backgroundColor: "orange"
  },

  billIconContainer: {
    width: "25%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center"
    // backgroundColor: "yellow"
  },

  billIcon: {
    width: 60,
    height: 60
  },

  billDetailsContainer: {
    width: "43%",
    height: "100%",
    alignItems: "flex-start",
    justifyContent: "center"
    // backgroundColor: "orange"
  },

  billName: {
    fontSize: 18,
    fontWeight: "700",
    color: "black"
  },

  billAmountText: {
    fontSize: 14,
    fontWeight: "700",
    fontStyle: "italic",
    // color: "#394955",
    color: "#37373B"
  },

  billDateContainer: {
    width: "30%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center"
    // backgroundColor: "red"
  },

  billDateText: {
    fontSize: 14,
    fontWeight: "700",
    color: "black"
  },

  buttonContainer: {
    width: "100%",
    height: "40%",
    alignItems: "center",
    justifyContent: "center"
    // backgroundColor: "powderblue"
  },

  button: {
    width: "92%",
    height: "75%",
    borderRadius: 8,
    backgroundColor: "#4F6DF2",
    alignItems: "center",
    justifyContent: "center"
  },

  linearGradient: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center"
  },

  buttonText: {
    fontSize: 16,
    fontWeight: "700",
    color: "white"
  }
});
