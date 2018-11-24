import React, { Component } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";

const contract = "contract";
const part_payment = "part-payment";

class BillTypeModalComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { onSelect } = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>Choose a type</Text>
        </View>

        <TouchableOpacity
          style={styles.optionContainer}
          onPress={() => onSelect(contract)}
        >
          <View style={styles.optionIcon} />
          <View style={styles.optionContentContainer}>
            <View style={styles.optionTitle}>
              <Text style={styles.optionTitleText}>Contract</Text>
            </View>
            <View style={styles.optionSubTitle}>
              <Text style={styles.optionSubTitleText}>
                Contract type defines an amount that need to be paid every month
                on a monthly basis.
              </Text>
            </View>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.optionContainer}
          onPress={() => onSelect(part_payment)}
        >
          <View style={styles.optionIcon} />
          <View style={styles.optionContentContainer}>
            <View style={styles.optionTitle}>
              <Text style={styles.optionTitleText}>Part-Payment</Text>
            </View>
            <View style={styles.optionSubTitle}>
              <Text style={styles.optionSubTitleText}>
                Part-Payment type defines an amount that can be paid in smaller
                amount on a monthly basis until the full amount has been repaid.
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

export { BillTypeModalComponent };

const styles = {
  container: {
    width: "100%",
    height: "100%"
  },

  headerContainer: {
    width: "100%",
    height: 40,
    justifyContent: "center"
  },

  headerText: {
    fontSize: 18,
    fontWeight: "600",
    color: "black"
  },

  optionContainer: {
    width: "90%",
    height: 80,
    flexDirection: "row",
    borderBottomWidth: 1,
    borderColor: "#DFDFDF",
    marginBottom: 10
  },

  optionIcon: {
    width: "20%",
    height: "100%",
    // backgroundColor: "gold",
    alignItems: "center",
    justifyContent: "center"
  },

  optionContentContainer: {
    width: "80%",
    height: "100%",
    justifyContent: "center",
    alignItems: "flex-start"
  },

  optionTitle: {
    width: "100%",
    height: "40%",
    justifyContent: "flex-end",
    alignItems: "flex-start"
    // backgroundColor: "pink"
  },

  optionTitleText: {
    fontSize: 15,
    fontWeight: "600",
    color: "black"
  },

  optionSubTitle: {
    width: "100%",
    height: "50%",
    justifyContent: "flex-start",
    alignItems: "flex-start"
  },

  optionSubTitleText: {
    fontSize: 11,
    fontWeight: "400",
    color: "grey"
  }
};
