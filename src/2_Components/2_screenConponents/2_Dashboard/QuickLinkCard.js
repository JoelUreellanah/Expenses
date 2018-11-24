import React, { Component } from "react";
import { StyleSheet, View, Text, TouchableOpacity, Image } from "react-native";
import { Icon } from "../../../3_Assets/index";

const QuickLinkCard = ({ data, onPress }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.iconContainer}>
        <Image
          source={Icon[data.icon]}
          style={[styles.icon, { tintColor: data.iconColor }]}
        />
      </View>

      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>{data.title}</Text>
      </View>
    </TouchableOpacity>
  );
};

export { QuickLinkCard };

const styles = {
  container: {
    width: 110,
    height: 80,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 6,
    backgroundColor: "white",
    shadowColor: "#E9E9E9",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 2,
    marginLeft: 5,
    marginRight: 5
  },

  iconContainer: {
    width: "100%",
    height: "70%",
    alignItems: "center",
    justifyContent: "center"
  },

  icon: {
    width: 40,
    height: 40
  },

  titleContainer: {
    width: "100%",
    height: "30%",
    alignItems: "center",
    justifyContent: "center"
  },

  titleText: {
    fontSize: 11,
    fontWeight: "600",
    color: "#37373B"
  }
};
