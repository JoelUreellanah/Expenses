import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  Animated,
  TextInput
} from "react-native";
import { Icon } from "../../../3_Assets";
import { Button } from "../../1_basics/index";
import { MaterialIndicator } from "react-native-indicators";
import Card from "../../../4_Classes/Card";
// import SwipeView from "../../1_basics/CardSwipeView";
import SwipeView from "../../1_basics/SwipeViewFolder/CardSwipeView";

import { connect } from "react-redux";
import * as Actions from "../../../Redux/Actions";

const cards = new Card();
let CARDS = [];
let CARD_FOUND = false;
let LOADING = false;

class CardModalComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listPosition: new Animated.ValueXY(0, 0),
      headerTextPosition: new Animated.ValueXY(0, 0),
      plusIconPressed: false,
      animationIsComplete: false,
      cardName: "",
      cardNumber: "",
      indexOfIconSelected: null,
      choosenIcon: null,
      indexOfBankSelected: null,
      choosenBank: null,

      bankIcon: [
        {
          id: 1,
          image: "barclays"
        },
        {
          id: 2,
          image: "hsbc"
        },
        {
          id: 3,
          image: "mastercard"
        },
        {
          id: 4,
          image: "paypal"
        },
        {
          id: 5,
          image: "visa"
        }
      ]
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
  }

  selectIcon = (index, icon) => {
    this.setState({ indexOfIconSelected: index, choosenIcon: icon.image });
  };

  selectBank = (index, icon) => {
    this.setState({ indexOfBankSelected: index });
    // console.warn("selected");
  };

  renderCardList(onSelect, listPosition, cardKey) {
    if (this.state.animationIsComplete) {
      // Render the Create Card form
      return (
        <View style={[styles.listContainer]}>
          <View style={styles.inputTextContainer}>
            <TextInput
              placeholder="Card Name"
              value={this.state.cardName}
              onChangeText={cardName => this.setState({ cardName })}
              style={styles.categoryInput}
            />
          </View>
          <View style={styles.inputTextContainer}>
            <TextInput
              placeholder="Card Number"
              value={this.state.cardNumber}
              onChangeText={cardNumber => this.setState({ cardNumber })}
              style={styles.categoryInput}
            />
          </View>

          <View style={styles.iconScrollViewContainer}>
            <Text style={styles.textIcon}>Choose an Icon for your card:</Text>
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{}}
            >
              {this.state.bankIcon.map((icon, index) => (
                <TouchableOpacity
                  key={icon.id}
                  onPress={() => this.selectIcon(index, icon)}
                  style={[
                    styles.bankIconContainer,
                    {
                      backgroundColor:
                        this.state.indexOfIconSelected === index
                          ? "#FEB536"
                          : null
                    }
                  ]}
                >
                  <Image source={Icon[icon.image]} style={styles.cardIcon} />
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          <View style={styles.createCategoryButtonContainer}>
            <View style={styles.buttonContainer}>
              <Button
                onPress={() =>
                  this.handleAddCardButton(
                    this.state.cardName,
                    this.state.cardNumber,
                    this.state.choosenIcon
                  )
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
      // Render the Card List
      if (LOADING) {
        return (
          <View
            style={{
              width: "100%",
              height: 200,
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <MaterialIndicator color="black" />
          </View>
        );
      } else {
        if (!CARD_FOUND) {
          return (
            <View
              style={{
                width: "100%",
                height: 200,
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <Text style={{ fontSize: 18, fontWeight: "600" }}>
                No card found
              </Text>
            </View>
          );
        } else {
          return (
            <Animated.View
              style={[styles.listContainer, listPosition.getLayout()]}
            >
              {CARDS.map((card, index) => (
                <SwipeView
                  isScrollEnabled={this.isScrollEnabled}
                  Delete={() => this.onDelete(card.key)}
                  key={card.key}
                  manageScroll={this.props.manageScroll}
                >
                  <TouchableOpacity
                    onPress={() => [
                      onSelect(
                        card.key,
                        card.cardName,
                        card.cardNumber,
                        card.cardIcon
                      ),
                      this.selectBank(index)
                    ]}
                    style={{ width: "100%", height: 70, flexDirection: "row" }}
                  >
                    <View style={styles.bankIconContainer}>
                      <Image
                        source={Icon[card.cardIcon]}
                        style={styles.cardIcon}
                      />
                    </View>
                    <View style={styles.bankTextContainer}>
                      <Text style={styles.cardText}>{card.cardName}</Text>
                      <Text style={styles.cardSubText}>{card.cardNumber}</Text>
                    </View>

                    <View style={styles.checkMarkContainer}>
                      {this.renderCheckMark(CARDS[index], cardKey)}
                    </View>
                  </TouchableOpacity>
                </SwipeView>
              ))}
            </Animated.View>
          );
        }
      }
    }
  }

  renderCheckMark(data, cardKey) {
    // console.warn(cardKey);
    if (data.key === cardKey) {
      return <Image source={Icon.check_mark} style={styles.checkMarkIcon} />;
    }
  }

  onDelete = async key => {
    const card = new Card();
    await card.delete(key).then(() => this.onDeleteSuccess());
  };

  onDeleteSuccess = () => {
    console.log("delete sucess");
    this.props.updateCardList(true);
  };

  isScrollEnabled = bool => {
    // console.warn(bool);
    this.props.onMove(bool);
  };

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

  handleAddCardButton(cardName, cardNumber, cardIcon) {
    this.addCard(cardName, cardNumber, cardIcon);
  }

  async addCard(cardName, cardNumber, cardIcon) {
    console.log(cardName + cardNumber);
    const IS_CARD_ADDED = await cards.saveCard(cardName, cardNumber, cardIcon);
    if (IS_CARD_ADDED) {
      this.props.updateCardList(true);
      console.log(cardName + " added!");
      this.handleBackIconPressed();
      this.retrieveData();
    } else {
      console.log("Please wait...");
    }

    // this.handleBackIconPressed();
  }

  retrieveData() {
    if (this.props.state.updateCardList) {
      this.loadCardsList();
    }
  }

  async loadCardsList() {
    LOADING = true;
    CARDS = await cards.load();
    // console.warn(CARDS);
    LOADING = false;
    if (CARDS.length === 0) {
      CARD_FOUND = false;
    } else {
      CARD_FOUND = true;
    }

    this.props.updateCardList(false);
  }

  render() {
    const { onSelect, cardKey } = this.props;
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
              Cards
            </Animated.Text>
          </View>
          <TouchableOpacity
            style={styles.headerRight}
            onPress={this.categoryListSwipeEffect}
          >
            {this.renderHeaderIcon()}
          </TouchableOpacity>
        </View>
        {this.renderCardList(onSelect, listPosition, cardKey)}
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
)(CardModalComponent);

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    justifyContent: "flex-start",
    alignItems: "flex-start"
  },

  header: {
    width: "100%",
    height: 70,
    flexDirection: "row",
    alignItems: "center"
    // backgroundColor: "powderblue"
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

  cardsContainer: {
    width: "90%",
    height: 70,
    justifyContent: "flex-start",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#F5F6F8",
    flexDirection: "row"
  },

  bankIconContainer: {
    width: "20%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center"
  },

  cardIcon: {
    width: 50,
    height: 50
  },

  bankTextContainer: {
    width: "60%",
    height: "100%",
    alignItems: "flex-start",
    justifyContent: "center"
  },

  cardText: {
    fontSize: 16,
    fontWeight: "600",
    color: "black"
  },

  cardSubText: {
    fontSize: 14,
    fontWeight: "300",
    color: "grey"
  },

  checkMarkContainer: {
    width: "20%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center"
  },

  checkMarkIcon: {
    width: 20,
    height: 20
  },

  inputTextContainer: {
    width: "80%",
    height: 40,
    backgroundColor: "#F5F6F8",
    justifyContent: "center",
    paddingLeft: 10,
    borderRadius: 5,
    marginBottom: 10
  },

  categoryInput: {
    width: "100%",
    height: "100%"
  },

  createCategoryButtonContainer: {
    width: "100%",
    height: "50%",
    justifyContent: "center",
    alignItems: "center"
    // backgroundColor: "ivory"
  },

  iconScrollViewContainer: {
    width: "80%",
    height: 70,
    alignItems: "flex-start",
    justifyContent: "center",
    marginTop: 20
  },

  textIcon: {
    fontSize: 14,
    fontWeight: "600",
    color: "grey"
  },

  bankIconContainer: {
    width: 70,
    height: "100%",
    alignItems: "center",
    justifyContent: "center"
  },

  buttonContainer: {
    width: "50%",
    height: "35%"
  }
});
