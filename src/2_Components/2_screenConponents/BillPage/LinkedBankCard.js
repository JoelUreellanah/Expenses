import React, { Component } from "react";
import { StyleSheet, View, TouchableOpacity, Image, Text } from "react-native";
import { Icon } from "../../../3_Assets";

class LinkedBankCard extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { data, onPress } = this.props;
    return (
      <TouchableOpacity style={styles.cardRootContainer} onPress={onPress}>
        <View style={styles.iconContainer}>
          <Image source={Icon[data.cardIcon]} style={styles.icon} />
        </View>

        <View style={styles.detailsContainer}>
          <Text style={styles.bankNameText}>{data.cardName}</Text>
          <Text style={styles.bankCardNumberText}>
            xxxx xxxx xxxx {data.cardNumber}
          </Text>
        </View>

        <View style={styles.arrowContainer}>
          <Image source={Icon.right_arrow} style={styles.arrowIcon} />
        </View>
      </TouchableOpacity>
    );
  }
}

export default LinkedBankCard;

const styles = StyleSheet.create({
  cardRootContainer: {
    width: "100%",
    height: "100%",
    alignItems: "flex-start",
    justifyContent: "center",
    backgroundColor: "#37373B",
    flexDirection: "row",
    borderRadius: 5,
    overflow: "hidden"
  },

  iconContainer: {
    width: "20%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center"
  },

  icon: {
    width: 40,
    height: 40
  },

  detailsContainer: {
    width: "60%",
    height: "100%",
    alignItems: "flex-start",
    justifyContent: "center"
  },

  bankNameText: {
    fontSize: 16,
    fontWeight: "600",
    color: "white"
  },

  bankCardNumberText: {
    fontSize: 14,
    fontWeight: "400",
    fontStyle: "italic",
    color: "white"
  },

  arrowContainer: {
    width: "20%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#4B4B4B"
  },

  arrowIcon: {
    width: 20,
    height: 20,
    tintColor: "white"
  }
});
