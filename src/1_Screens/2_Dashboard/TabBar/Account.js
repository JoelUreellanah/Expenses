import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import * as firebase from "firebase";
import { Button } from "../../../2_Components/1_basics";

class Account extends Component {
  state = {};
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.buttonContainer}>
          <Button
            onPress={() => firebase.auth().signOut()}
            title="Logout"
            backgroundColor="#277BFF"
            fontSize={18}
            fontWeight="500"
            color="white"
          />
        </View>
      </View>
    );
  }
}

export { Account };

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%",
    backgroundColor: "white"
  },

  buttonContainer: {
    width: "80%",
    height: "8%"
  }
});
