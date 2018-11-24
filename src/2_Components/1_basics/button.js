import React, { Component } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

const Button = ({
  title,
  backgroundColor,
  fontSize,
  fontWeight,
  color,
  onPress
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.container, { backgroundColor: backgroundColor }]}
    >
      <Text
        style={{ fontSize: fontSize, fontWeight: fontWeight, color: color }}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export { Button };

const styles = {
  container: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 6
  }
};
