import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Dimensions
} from "react-native";
import { Icon } from "../../../3_Assets";

var { height, width } = Dimensions.get("window");

class RepeatModalComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      repeat: [
        {
          id: 1,
          option: "Never",
          description: "Do not repeat"
        },
        {
          id: 2,
          option: "Daily",
          description: "Repeat every day"
        },
        {
          id: 3,
          option: "Weekly",
          description: "Repeat every week"
        },
        {
          id: 4,
          option: "Monthly",
          description: "Repeat every month"
        },
        {
          id: 5,
          option: "Yearly",
          description: "Repeat every year"
        }
      ]
    };
  }

  render() {
    const { onSelect } = this.props;
    return (
      <View style={[styles.container, { width: width }]}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Remind me every...</Text>
          {/*<Image source={Icon.repeatCalendar} style={styles.headerIcon} />*/}
        </View>

        <View style={styles.optionListContainer}>
          {this.state.repeat.map(option => (
            <TouchableOpacity
              key={option.id}
              style={styles.optionContainer}
              onPress={() => onSelect(option.option)}
            >
              <Text style={styles.optionName}>{option.option}</Text>
              <Text style={styles.optionDescription}>{option.description}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    );
  }
}

export { RepeatModalComponent };

const styles = StyleSheet.create({
  container: {
    // width: "100%"
    // height: "100%"
    // backgroundColor: "pink"
  },

  header: {
    width: "100%",
    height: "20%",
    alignItems: "center",
    justifyContent: "flex-start",
    padding: 10,
    flexDirection: "row"
  },

  headerText: {
    fontSize: 24,
    fontWeight: "600",
    color: "black",
    paddingRight: 15
  },

  headerIcon: {
    width: 30,
    height: 30
  },

  optionListContainer: {
    width: "100%",
    height: "80%",
    alignItems: "center"
  },

  optionContainer: {
    width: "90%",
    height: 65,
    borderBottomWidth: 1,
    borderBottomColor: "#DFDFDF",
    padding: 5,
    justifyContent: "center"
  },

  optionName: {
    fontSize: 16,
    fontWeight: "500",
    color: "black"
  },

  optionDescription: {
    fontSize: 14,
    fontWeight: "300",
    color: "grey"
  }
});
