import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TouchableHighlight,
  Image,
  Animated,
  TextInput
} from "react-native";
import { MaterialIndicator } from "react-native-indicators";
import { Icon } from "../../../3_Assets";
import { Button } from "../../1_basics/index";
import Category from "../../../4_Classes/Category";
import SwipeView from "../../1_basics/SwipeViewFolder/CategorySwipeView";

import { connect } from "react-redux";
import * as Actions from "../../../Redux/Actions";

const categories = new Category();
let CATEGORIES = [];

class CategoryModalComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listPosition: new Animated.ValueXY(0, 0),
      headerTextPosition: new Animated.ValueXY(0, 0),
      plusIconPressed: false,
      animationIsComplete: false,
      categoryName: "",
      loading: true
    };
  }

  renderHeaderIcon() {
    if (this.state.plusIconPressed) {
      return;
    } else {
      return <Image source={Icon.add} style={styles.headerIcon} />;
    }
  }

  renderBackIcon() {
    if (this.state.plusIconPressed) {
      return (
        <TouchableOpacity onPress={() => this.handleBackIconPressed()}>
          <Image source={Icon.left_arrow} style={styles.headerIcon} />
        </TouchableOpacity>
      );
    } else {
      return;
    }
  }

  handleBackIconPressed() {
    this.setState({ plusIconPressed: false });
    Animated.timing(this.state.headerTextPosition, {
      toValue: { x: 0, y: 0 },
      duration: 300
    }).start();

    this.setState({ animationIsComplete: false });
    Animated.timing(this.state.listPosition, {
      toValue: { x: 0, y: 0 },
      duration: 300
    }).start(result => {
      if (result.finished) {
        // console.log("animation is complete");
      }
    });

    // console.log("back");
  }

  renderCategoryList(onSelect, listPosition) {
    if (this.state.animationIsComplete) {
      // Render the Create Category form
      return (
        <View style={[styles.listContainer]}>
          <View style={styles.inputTextContainer}>
            <TextInput
              placeholder="Name"
              value={this.state.categoryName}
              onChangeText={categoryName => this.setState({ categoryName })}
              style={styles.categoryInput}
            />
          </View>
          <View style={styles.createCategoryButtonContainer}>
            <View style={styles.buttonContainer}>
              <Button
                onPress={() =>
                  this.handleAddCategoryButton(this.state.categoryName)
                }
                title="Create"
                backgroundColor="#277BFF"
                fontSize={18}
                fontWeight="500"
                color="white"
              />
            </View>
          </View>
        </View>
      );
    } else {
      // Render the Category List
      if (CATEGORIES[0] === undefined) {
        if (this.props.updateCategoryList) {
          return <MaterialIndicator color="black" />;
        }
      } else {
        return (
          <Animated.View
            style={[styles.listContainer, listPosition.getLayout()]}
          >
            {CATEGORIES.map(category => (
              <SwipeView
                isScrollEnabled={this.isScrollEnabled}
                onClick={() => onSelect(category.name)}
                Delete={() => this.deleteCategory(category.key)}
                key={category.key}
                manageScroll={this.props.manageScroll}
              >
                <TouchableOpacity
                  onPress={() => onSelect(category.name)}
                  style={styles.categoryContainer}
                  key={category.key}
                >
                  <Image
                    source={Icon[category.image]}
                    style={styles.categoryIcon}
                  />
                  <Text style={styles.categoryText}>{category.name}</Text>
                </TouchableOpacity>
              </SwipeView>
            ))}
          </Animated.View>
        );
      }
    }
  }

  isScrollEnabled = bool => {
    // console.warn(bool);
    this.props.onMove(bool);
  };

  retrieveData() {
    if (this.props.state.updateCategoryList) {
      this.loadCategoriesList();
    }
  }

  async loadCategoriesList() {
    CATEGORIES = await categories.load();
    this.props.updateCategoryList(false);
  }

  deleteCategory = async key => {
    const category = new Category();
    await category.deleteCategory(key).then(() => this.onDeleteSuccess());
  };

  onDeleteSuccess() {
    this.props.updateCategoryList(true);
  }

  headerTextSwipeEffect = () => {
    Animated.timing(this.state.headerTextPosition, {
      toValue: { x: 20, y: 0 },
      duration: 300
    }).start();
  };

  categoryListSwipeEffect = () => {
    this.headerTextSwipeEffect();
    this.setState({ plusIconPressed: true });
    Animated.timing(this.state.listPosition, {
      toValue: { x: -400, y: 0 },
      duration: 300
    }).start(result => {
      if (result.finished) {
        // console.log("animation is complete");
        this.setState({ animationIsComplete: true });
      }
    });
  };

  async addCategory(categoryName) {
    const IS_CATEGORY_ADDED = await categories.saveCategory(categoryName);
    if (IS_CATEGORY_ADDED) {
      this.props.updateCategoryList(true);
      console.log(categoryName + " added!");
      this.handleBackIconPressed();
      this.retrieveData();
    } else {
      console.log("Please wait...");
    }
  }

  handleAddCategoryButton(categoryName) {
    this.addCategory(categoryName);
  }

  render() {
    const { onSelect } = this.props;
    const { listPosition, headerTextPosition } = this.state;
    return (
      <View style={styles.container}>
        {this.retrieveData()}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            {this.renderBackIcon()}
            <Animated.Text
              style={[styles.headerText, headerTextPosition.getLayout()]}
            >
              Category
            </Animated.Text>
          </View>
          <TouchableOpacity
            style={styles.headerRight}
            onPress={this.categoryListSwipeEffect}
          >
            {this.renderHeaderIcon()}
          </TouchableOpacity>
        </View>
        {this.renderCategoryList(onSelect, listPosition)}
      </View>
    );
  }
}

const mapStateToProps = state => {
  return { state: state };
};

export default connect(
  mapStateToProps,
  Actions
)(CategoryModalComponent);

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    justifyContent: "flex-start",
    alignItems: "flex-start"
  },

  header: {
    width: "100%",
    height: 100,
    flexDirection: "row",
    alignItems: "center"
  },

  headerLeft: {
    width: "85%",
    height: "100%",
    padding: 10,
    alignItems: "center",
    justifyContent: "flex-start",
    flexDirection: "row"
    // backgroundColor: "powderblue"
  },

  headerText: {
    fontSize: 32,
    fontWeight: "800",
    color: "black"
  },

  headerRight: {
    width: "15%",
    height: "100%",
    padding: 20,
    alignItems: "flex-end",
    justifyContent: "center"
  },

  headerIcon: {
    width: 20,
    height: 20,
    tintColor: "#277BFF"
  },

  listContainer: {
    width: "100%",
    height: "85%",
    alignItems: "center"
    // backgroundColor: "orange"
  },

  categoryContainer: {
    width: "100%",
    paddingLeft: 5,
    height: 60,
    justifyContent: "flex-start",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#DDD",
    flexDirection: "row"
  },

  categoryIcon: {
    width: 20,
    height: 20
  },

  categoryText: {
    fontSize: 16,
    fontWeight: "400",
    color: "black",
    paddingLeft: 10
  },

  inputTextContainer: {
    width: "80%",
    height: 40,
    backgroundColor: "#F5F6F8",
    justifyContent: "center",
    paddingLeft: 10,
    borderRadius: 5
  },

  categoryInput: {
    width: "100%",
    height: "100%"
  },

  createCategoryButtonContainer: {
    width: "100%",
    height: "60%",
    justifyContent: "center",
    alignItems: "center"
    // backgroundColor: "ivory"
  },

  buttonContainer: {
    width: "50%",
    height: "50%"
  }
});
