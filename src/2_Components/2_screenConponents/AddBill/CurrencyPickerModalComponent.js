import React, { Component } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import { Icon } from "../../../3_Assets";

class CurrencyPickerModalComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currency: [
        {
          id: 1,
          name: "GBR",
          description: "British Pound",
          image: "UKFlag"
        },
        {
          id: 2,
          name: "USD",
          description: "US Dollar",
          image: "americaFlag"
        },
        {
          id: 3,
          name: "Euro",
          description: "European Union",
          image: "europeFlag"
        }
      ]
    };
  }
  render() {
    const { onSelect } = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Image source={Icon.currency} style={styles.headerIcon} />
          <Text style={styles.headerText}>Choose your currency</Text>
        </View>

        <View style={styles.currencyListContainer}>
          {this.state.currency.map(currency => (
            <TouchableOpacity
              style={styles.currencyContainer}
              key={currency.id}
              onPress={() => onSelect(currency.name)}
            >
              <View style={styles.iconContainer}>
                <Image
                  source={Icon[currency.image]}
                  style={styles.currencyIcon}
                />
              </View>
              <View style={styles.textContainer}>
                <Text style={styles.currencyName}>{currency.name}</Text>
                <Text style={styles.currencyDescription}>
                  {currency.description}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    );
  }
}

export { CurrencyPickerModalComponent };

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center"
  },

  header: {
    width: "100%",
    height: "33%",
    alignItems: "center",
    justifyContent: "flex-start"
    // backgroundColor: "powderblue"
  },

  headerText: {
    fontSize: 24,
    fontWeight: "700",
    color: "black"
  },

  headerIcon: {
    width: 70,
    height: 70
  },

  currencyListContainer: {
    width: "100%",
    height: "65%",
    justifyContent: "flex-start",
    alignItems: "center"
  },

  currencyContainer: {
    width: "90%",
    height: 70,
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#DFDFDF"
    // backgroundColor: "orange"
  },

  iconContainer: {
    width: "20%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center"
  },

  currencyIcon: {
    width: 30,
    height: 30
  },

  textContainer: {
    width: "80%",
    height: "100%",
    justifyContent: "center"
  },

  currencyName: {
    fontSize: 16,
    fontWeight: "600",
    color: "black"
  },

  currencyDescription: {
    fontSize: 12,
    fontWeight: "600",
    color: "grey"
  }
});
