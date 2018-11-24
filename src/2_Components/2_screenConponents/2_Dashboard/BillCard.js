import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  Animated,
  Dimensions,
  TouchableOpacity
} from "react-native";
import { connect } from "react-redux";
import { Icon } from "../../../3_Assets";
import DateClass from "../../../4_Classes/Date";
// import SwipeView from "../../1_basics/SwipeView";
import SwipeView from "../../1_basics/SwipeView2";

import Bill from "../../../4_Classes/Bill";
import * as Actions from "../../../Redux/Actions";

const SCREEN_HEIGHT = Dimensions.get("window").height;

class BillCard extends Component {
  constructor(props) {
    super(props);
    this.position = new Animated.ValueXY();
    this.state = {};
  }
  formatDate(date) {
    const dateClass = new DateClass();
    const formattedDate = dateClass.formatDate(date);
    return formattedDate;
  }

  isScrollEnabled = bool => {
    // console.warn(bool);
    this.props.onMove(bool);
  };

  onClick = () => {
    console.warn("clicked");
  };

  deleteBill = async (key, navigation) => {
    const bill = new Bill();
    await bill.delete(key).then(() => this.onDeleteSuccess(navigation));
  };

  onDeleteSuccess = navigation => {
    console.log("delete sucess");
    this.props.updateDashboard(true);
    this.props.internalNotificationMessage("Bill deleted successfully!");
    this.props.internalNotificationIcon("trash");
    this.props.showInternalNotification(true);
    navigation.goBack();
  };

  payBill = async (key, navigation) => {
    const bill = new Bill();
    await bill.pay(key).then(() => this.onPaymentSuccess(navigation));
  };

  onPaymentSuccess = navigation => {
    this.props.swiped(true);
    this.props.updateDashboard(true);
    this.props.internalNotificationMessage("Yeah bill paid. Keep it going!");
    this.props.internalNotificationIcon("thumb_up");
    this.props.showInternalNotification(true);
    navigation.goBack();
  };

  render() {
    const {
      data,
      navigation,
      handlePress,
      height,
      topContainerHeight,
      dueDateStatusHeight,
      buttonContainerHeight,
      iconWidth,
      iconHeight,
      opacity
    } = this.props;
    return (
      <Animated.View
        style={{
          transform: [{ translateY: this.position.y }],
          opacity: opacity
        }}
      >
        <SwipeView
          isScrollEnabled={this.isScrollEnabled}
          Delete={() => this.deleteBill(data.key, navigation)}
          Pay={() => this.payBill(data.key, navigation)}
        >
          <TouchableOpacity
            onPress={handlePress}
            style={[styles.container, { height: height }]}
          >
            <Animated.View
              style={{ width: "100%", height: dueDateStatusHeight }}
            />

            <Animated.View
              style={[styles.topContainer, { height: topContainerHeight }]}
            >
              <View style={styles.iconContainer}>
                <Animated.Image
                  source={Icon[data.icon]}
                  style={{ width: iconWidth, height: iconHeight }}
                />
              </View>

              <View style={styles.billDetailsContainer}>
                <View style={styles.billNameContainer}>
                  <Text style={styles.billNameText}>{data.name}</Text>
                </View>
                <View style={styles.billAmountContainer}>
                  <Text style={styles.billAmountText}>{data.amount}</Text>
                </View>
              </View>

              <View style={styles.billDueDateContainer}>
                <Text style={styles.billDueDateText}>
                  {this.formatDate(data.date)}
                </Text>
              </View>
            </Animated.View>

            <Animated.View
              style={{ width: "100%", height: buttonContainerHeight }}
            />
          </TouchableOpacity>
        </SwipeView>
      </Animated.View>
    );
  }
}

function mapStateToProps(state) {
  return {
    state: state
  };
}

export default connect(
  mapStateToProps,
  Actions
)(BillCard);

const styles = StyleSheet.create({
  container: {
    width: "100%",
    // height: 90,
    alignItems: "flex-start",
    justifyContent: "center",
    // flexDirection: "row",
    borderRadius: 6,
    backgroundColor: "white",
    shadowColor: "#E9E9E9",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.7,
    shadowRadius: 2,
    elevation: 5
    // marginBottom: 10
  },

  dueDateStatus: {
    // width: "100%"
  },

  topContainer: {
    width: "100%",
    // height: "100%",
    justifyContent: "center",
    flexDirection: "row"
  },

  iconContainer: {
    width: "25%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center"
    // backgroundColor: "red"
  },

  billIcon: {
    width: 40,
    height: 40
  },

  billDetailsContainer: {
    width: "43%",
    height: "100%",
    alignItems: "flex-start",
    justifyContent: "center"
    // backgroundColor: "blue"
  },

  billNameContainer: {
    width: "100%",
    height: "30%",
    alignItems: "flex-start",
    justifyContent: "flex-end"
  },

  billNameText: {
    fontSize: 18,
    fontWeight: "700",
    color: "black"
  },

  billAmountContainer: {
    width: "100%",
    height: "30%",
    alignItems: "flex-start",
    justifyContent: "flex-start"
  },

  billAmountText: {
    fontSize: 14,
    fontStyle: "italic",
    fontWeight: "500",
    color: "#37373B"
  },

  billDueDateContainer: {
    width: "30%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center"
    // backgroundColor: "pink"
  },

  billDueDateText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#37373B"
  },

  buttonContainer: {
    width: "100%"
  }
});
