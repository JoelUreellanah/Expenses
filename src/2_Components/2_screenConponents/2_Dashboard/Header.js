import React, { Component } from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import { Icon } from "../../../3_Assets/index";

const Header = ({ headerTitle }) => {
  return (
    <View style={styles.container}>
      <View style={styles.headerTitleContainer}>
        <Image
          source={Icon.appIconOfficial}
          style={{ width: 30, height: 30 }}
        />
        <Text style={styles.headerTitle}>{headerTitle}</Text>
      </View>

      {/*<View style={styles.headerIconContainer}>
        <Image source={Icon.notification} style={styles.headerIcon} />
  </View>*/}
    </View>
  );
};

export { Header };

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white"
  },

  headerTitleContainer: {
    flexDirection: "row",
    height: "70%",
    width: "70%",
    alignItems: "center",
    justifyContent: "center",
    paddingLeft: "3%",
    paddingBottom: "3%"
    // backgroundColor: "red"
  },

  headerTitle: {
    fontSize: 25,
    fontWeight: "700",
    marginLeft: 10
  },

  headerIconContainer: {
    height: "70%",
    width: "30%",
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: "3%"
    // backgroundColor: "blue"
  },

  headerIcon: {
    width: 20,
    height: 20
  }
});
