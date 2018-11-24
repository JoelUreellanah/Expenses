import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  FlatList
} from "react-native";
import { Icon } from "../../../3_Assets";

const numColumns = 4;
class IconModalComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      icons: [
        {
          key: 1,
          name: "netflix",
          image: "netflix"
        },
        {
          key: 2,
          name: "spotify",
          image: "spotify"
        },
        {
          key: 3,
          name: "amazon",
          image: "amazon"
        },
        {
          key: 4,
          name: "three",
          image: "three"
        },
        {
          key: 5,
          name: "itunes",
          image: "itunes"
        },
        {
          key: 6,
          name: "icon",
          image: "custom_bill_icon"
        }
      ]
    };
  }

  renderItem = ({ item, index }) => {
    return (
      <TouchableOpacity
        style={styles.iconContainer}
        onPress={() => this.props.onSelect(item.image)}
      >
        <Image source={Icon[item.image]} style={styles.icon} />
        <Text style={styles.iconText}>{item.name}</Text>
      </TouchableOpacity>
    );
  };
  render() {
    const { onSelect } = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Choose an icon</Text>
        </View>
        <FlatList
          data={this.state.icons}
          style={styles.iconListContainer}
          renderItem={this.renderItem}
          numColumns={numColumns}
        />
      </View>
    );
  }
}

export { IconModalComponent };

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    justifyContent: "flex-start",
    alignItems: "center"
  },

  header: {
    width: "100%",
    height: "20%",
    justifyContent: "center",
    alignItems: "flex-start"
  },

  headerText: {
    paddingLeft: 10,
    fontSize: 24,
    fontWeight: "600",
    color: "black"
  },

  iconListContainer: {
    width: "100%",
    height: "80%"
    // backgroundColor: "orange"
  },

  iconContainer: {
    width: "25%",
    height: 80,
    alignItems: "center",
    justifyContent: "center",
    // backgroundColor: "pink",
    marginRight: 1
  },

  icon: {
    width: 50,
    height: 50
  },

  iconText: {
    fontSize: 12,
    fontWeight: "300",
    color: "grey"
  }
});
