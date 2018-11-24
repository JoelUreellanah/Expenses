import React, { Component } from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import { Icon } from "../../../3_Assets/index";

import { connect } from "react-redux";
import * as Actions from "../../../Redux/Actions";

class Notification extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.iconContainer}>
          <Image
            source={Icon[this.props.state.internalNotificationIcon]}
            style={styles.icon}
          />
        </View>

        <View style={styles.textContainer}>
          <Text style={styles.text}>
            {this.props.state.internalNotificationMessage}
          </Text>
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    state: state
  };
};

export default connect(
  mapStateToProps,
  Actions
)(Notification);

const styles = StyleSheet.create({
  container: {
    width: "90%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    backgroundColor: "#0A6FEA",
    borderRadius: 10,
    shadowColor: "#0A38EA",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.7,
    shadowRadius: 2,
    elevation: 5
  },

  iconContainer: {
    width: "20%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    bottom: 4
    // backgroundColor: "pink"
  },

  icon: {
    width: 35,
    height: 35
  },

  textContainer: {
    width: "65%",
    height: "100%",
    alignItems: "flex-start",
    justifyContent: "center"
    // backgroundColor: "orange"
  },

  text: {
    color: "white",
    fontSize: 16,
    fontWeight: "700"
  }
});
