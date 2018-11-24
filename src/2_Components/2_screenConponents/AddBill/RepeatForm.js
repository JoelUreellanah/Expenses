import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Switch
} from "react-native";
import { Icon } from "../../../3_Assets";

class RepeatForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      switchToggled: false,
      choosenOption: null
    };
  }

  openModal = navigation => {
    // navigation.navigate("RepeatModal");
    navigation.navigate("RepeatModal", {
      getSelectedRepeat: this.getSelectedRepeat
    });
    if (this.state.switchToggled) {
      return;
    } else {
      this.setState({ switchToggled: !this.state.switchToggled });
    }
  };

  getSelectedRepeat = option => {
    this.setState({ choosenOption: option.option });
    this.props.onSelectRepeatOption(option);
  };

  switchPressed = navigation => {
    if (this.state.switchToggled && this.state.choosenOption !== null) {
      this.setState({ switchToggled: !this.state.switchToggled });
      this.setState({ choosenOption: null });
    } else if (this.state.switchToggled && this.state.choosenOption !== null) {
      this.setState({ switchToggled: !this.state.switchToggled });
      this.openModal(navigation);
    } else {
      this.setState({ switchToggled: !this.state.switchToggled });
      this.openModal(navigation);
    }
  };
  render() {
    const { navigation, repeatOption } = this.props;
    return (
      <TouchableOpacity
        style={styles.container}
        onPress={() => this.openModal(navigation)}
      >
        <View style={styles.header}>
          <Text style={styles.headerText}>Repeat</Text>
          <Image source={Icon.right_arrow} style={styles.headerIcon} />
          <Text style={styles.headerText}>
            {repeatOption === "" || this.state.choosenOption === null
              ? null
              : this.state.choosenOption}
          </Text>
        </View>
        <View style={styles.switchContainer}>
          <Switch
            style={{ transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }] }}
            value={
              this.state.choosenOption === null || repeatOption === ""
                ? false
                : true
            }
            // value={this.state.switchToggled}
            onValueChange={() => this.switchPressed(navigation)}
          />
        </View>
      </TouchableOpacity>
    );
  }
}

export { RepeatForm };

const styles = {
  container: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    flexDirection: "row"
    // backgroundColor: "gold"
  },

  header: {
    width: "50%",
    height: "100%",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center"
  },

  headerText: {
    fontSize: 16,
    fontWeight: "300",
    color: "black",
    marginRight: 10
  },

  headerIcon: {
    width: 13,
    height: 13
  },

  switchContainer: {
    width: "50%",
    alignItems: "flex-end",
    justifyContent: "center"
  }
};
