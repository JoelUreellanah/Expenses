import React, { Component } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import { Icon } from "../../../3_Assets";
import { InputText } from "../../1_basics";

class TextForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currency: "GBR"
    };
  }

  openCurrencyModal = navigation => {
    navigation.navigate("CurrencyPickerModal", {
      getSelectedCurrency: this.getSelectedCurrency
    });
  };

  getSelectedCurrency = newCurrency => {
    // console.log(newCurrency.currency);
    this.setState({ currency: newCurrency.currency });
    this.props.onSelectCurrency(newCurrency);
  };

  render() {
    const {
      nameValue,
      amountValue,
      onChangeName,
      onChangeAmount,
      navigation,
      nameBoxColor,
      amountBoxColor
    } = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.nameContainer}>
          <InputText
            value={nameValue}
            onChangeText={onChangeName}
            placeholder="Name"
            autoCapitalize="words"
            keyboardAppearance="dark"
            keyboardType="default"
            backgroundColor={nameBoxColor}
          />
        </View>

        <View style={styles.amountContainer}>
          <TouchableOpacity
            style={styles.currencyContainer}
            onPress={() => this.openCurrencyModal(navigation)}
          >
            <Text style={styles.currencyText}>{this.state.currency}</Text>
            <Image source={Icon.down_arrow} style={styles.currencyIcon} />
          </TouchableOpacity>

          <View style={styles.currencyInputContainer}>
            <InputText
              value={amountValue}
              onChangeText={onChangeAmount}
              placeholder="0.00"
              autoCapitalize="none"
              keyboardAppearance="dark"
              keyboardType="numeric"
              backgroundColor={amountBoxColor}
            />
          </View>
        </View>
      </View>
    );
  }
}

export { TextForm };

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    justifyContent: "space-around"
  },

  nameContainer: {
    width: "100%",
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: "5%"
  },

  nameInput: {
    // backgroundColor: "brown",
    width: "100%",
    height: "100%",
    fontSize: 16,
    fontWeight: "600"
  },

  amountContainer: {
    width: "100%",
    height: 50,
    // backgroundColor: "red",
    flexDirection: "row",
    justifyContent: "space-between"
  },

  currencyContainer: {
    width: "21%",
    height: "100%",
    backgroundColor: "#F5F6F8",
    borderRadius: 5,
    justifyContent: "space-around",
    alignItems: "center",
    flexDirection: "row"
  },

  currencyText: {
    fontSize: 16,
    fontWeight: "600",
    color: "black"
  },

  currencyIcon: {
    width: 13,
    height: 13
  },

  currencyInputContainer: {
    width: "78%",
    height: "100%",
    // backgroundColor: "green",
    alignItems: "flex-end",
    justifyContent: "center"
  },

  currencyInput: {
    width: "95%",
    height: "100%",
    borderBottomWidth: 1,
    borderColor: "#DFDFDF",
    fontSize: 16,
    fontWeight: "600"
  }
});
