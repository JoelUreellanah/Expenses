import React, { Component } from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";

class Settings extends Component {
  render() {
    const { navigation } = this.props;
    return (
      <View style={styles.container}>
        <Text>Settings</Text>
      </View>
    );
  }
}

export { Settings };

const styles = {
  container: {
    flex: 1,
    backgroundColor: "white"
  }
};
