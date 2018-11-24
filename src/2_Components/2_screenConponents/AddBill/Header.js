import React, { Component } from "react";
import { StyleSheet, View, Image, TouchableOpacity } from "react-native";
import { Icon } from "../../../3_Assets";

const Header = ({ icon, onPress }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={onPress}>
        <Image source={Icon[icon]} style={styles.headerIcon} />
      </TouchableOpacity>
    </View>
  );
};

export { Header };

const styles = {
  container: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "flex-start",
    paddingLeft: "3%",
    backgroundColor: "white"
  },

  button: {
    width: "8%",
    height: "100%",
    // backgroundColor: "blue",
    // alignItems: "center",
    justifyContent: "center"
  },

  headerIcon: {
    width: 25,
    height: 25
  }
};
