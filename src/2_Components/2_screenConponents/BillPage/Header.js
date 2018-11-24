import React, { Component } from "react";
import { StyleSheet, View, Image, TouchableOpacity, Text } from "react-native";
import { Icon } from "../../../3_Assets";

const Header = ({ title, icon, backgroundColor, onPress }) => {
  return (
    <View style={[styles.container, { backgroundColor: backgroundColor }]}>
      <TouchableOpacity style={styles.button} onPress={onPress}>
        <Image source={Icon[icon]} style={styles.headerIcon} />
      </TouchableOpacity>

      <View style={styles.titleContainer}>
        <Text style={styles.text}>{title}</Text>
      </View>

      <View style={styles.emptyView} />
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "flex-start",
    flexDirection: "row",
    borderBottomWidth: 0.5,
    borderColor: "#D1D1D1",

    shadowColor: "#F3F3F3",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 2,
    elevation: 2
  },

  button: {
    width: "15%",
    height: "100%",
    // backgroundColor: "blue",
    // alignItems: "center",
    justifyContent: "center",
    paddingLeft: "3%"
  },

  headerIcon: {
    width: 25,
    height: 25
  },

  titleContainer: {
    width: "70%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center"
  },

  text: {
    fontSize: 18,
    fontWeight: "600",
    color: "black"
  },

  emptyView: {
    width: "15%",
    height: "100%"
  }
});
