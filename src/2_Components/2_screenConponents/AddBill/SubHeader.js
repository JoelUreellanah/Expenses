import React, { Component } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Icon } from "../../../3_Assets";

const SubHeader = ({ title }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>{title}</Text>
    </View>
  );
};

export { SubHeader };

const styles = {
  container: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "flex-start",
    paddingLeft: "5%"
    // backgroundColor: "blue"
  },

  titleText: {
    fontSize: 36,
    fontWeight: "800",
    color: "black"
  }
};
