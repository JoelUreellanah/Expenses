import React, { Component } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import { Icon } from "../../../3_Assets";

class BillType extends Component {
  constructor(props) {
    super(props);
    this.state = {
      billType: "Choose bill type"
    };
  }

  openBillTypeModal = navigation => {
    navigation.navigate("BillTypeModal", {
      getBillType: this.getBillType
    });
  };

  getBillType = data => {
    // console.log("Add Bill: " + data.contractType);
    this.setState({ billType: data.contractType });
    this.props.onSelectBillType(data);
  };

  render() {
    const { navigation, onSelectBillType, title } = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.containerLeft}>
          <Text style={styles.containerLeftText}>Type</Text>
        </View>

        <View style={styles.containerRight}>
          <TouchableOpacity
            style={styles.pickerBoxContainer}
            onPress={() => this.openBillTypeModal(navigation)}
          >
            <Text style={styles.pickerBoxText}>{this.state.billType}</Text>
            <Image source={Icon.down_arrow} style={styles.pickerBoxIcon} />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export { BillType };

const styles = {
  container: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "flex-start",
    flexDirection: "row"
  },

  containerLeft: {
    width: "20%",
    height: "100%",
    alignItems: "flex-start",
    justifyContent: "center"
  },

  containerLeftText: {
    fontSize: 13,
    fontWeight: "700",
    color: "black"
  },

  containerRight: {
    width: "50%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center"
  },

  pickerBoxContainer: {
    width: "90%",
    height: "100%",
    alignItems: "center",
    justifyContent: "space-around",
    borderColor: "#D5D5D5",
    borderWidth: 1,
    flexDirection: "row"
  },

  pickerBoxText: {
    fontSize: 13,
    fontWeight: "600",
    color: "black"
  },

  pickerBoxIcon: {
    width: 13,
    height: 13
  }
};
