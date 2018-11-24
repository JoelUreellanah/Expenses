import React, { Component } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import { Icon } from "../../../3_Assets";

class AdditionalForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      category: null,
      card: null,
      icon: null
    };
  }

  openModal = navigation => {
    navigation.navigate("CategoryModal", {
      getSelectedCategory: this.getSelectedCategory
    });
  };

  getSelectedCategory = category => {
    this.setState({ category: category.category });
    this.props.onSelectCategory(category);
  };

  openCardModal = navigation => {
    navigation.navigate("CardModal", {
      getSelectedCard: this.getSelectedCard
    });
  };
  getSelectedCard = card => {
    this.setState({ card: card.cardName });
    // console.warn(card.cardKey);
    this.props.onSelectCard(card);
  };

  openIconModal = navigation => {
    navigation.navigate("IconModal", {
      getSelectedIcon: this.getSelectedIcon
    });
  };

  getSelectedIcon = icon => {
    this.setState({ icon: icon.icon });
    this.props.onSelectIcon(icon);
  };

  render() {
    const { navigation, iconTextColor, category, card, icon } = this.props;
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.optionContainer}
          onPress={() => this.openModal(navigation)}
        >
          <Text style={styles.optionText}>Category</Text>
          <Image source={Icon.right_arrow} style={styles.optionIcon} />
          <Text style={styles.optionText}>
            {category === "" ? null : this.state.category}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.optionContainer}
          onPress={() => this.openCardModal(navigation)}
        >
          <View
            style={{
              width: "63%",
              height: "100%",
              flexDirection: "row",
              alignItems: "center"
            }}
          >
            <Text style={styles.optionText}>Cards</Text>
            <Image source={Icon.right_arrow} style={styles.optionIcon} />
            <Text style={styles.optionText}>
              {card === "" ? null : this.state.card}
            </Text>
          </View>
          <View
            style={{
              width: "37%",
              height: "100%",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-around"
            }}
          >
            <Image source={Icon.paypal} style={{ width: 50, height: 50 }} />
            <Image source={Icon.mastercard} style={{ width: 30, height: 30 }} />
            <Image source={Icon.visa} style={{ width: 30, height: 30 }} />
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.optionContainer, { backgroundColor: iconTextColor }]}
          onPress={() => this.openIconModal(navigation)}
        >
          <Text style={styles.optionText}>Icons</Text>
          <Image source={Icon.right_arrow} style={styles.optionIcon} />
          <Text style={styles.optionText}>
            {icon === "" ? null : this.state.icon}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export { AdditionalForm };

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "space-around"
  },

  optionContainer: {
    width: "90%",
    height: "25%",
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "row",
    borderBottomWidth: 1,
    borderColor: "#DFDFDF"
  },

  optionText: {
    fontSize: 18,
    fontWeight: "300",
    color: "#7B7B7B",
    marginRight: 10
  },

  optionIcon: {
    width: 15,
    height: 15,
    tintColor: "#7B7B7B"
  }
});
