import React, { Component } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  Image,
  Text,
  Animated
} from "react-native";
import { connect } from "react-redux";
import { MaterialIndicator } from "react-native-indicators";

import Header from "../../2_Components/2_screenConponents/BillPage/Header";
import { Icon } from "../../3_Assets";
import { Button } from "../../2_Components/1_basics";

import MainBillCard from "../../2_Components/2_screenConponents/BillPage/MainBillCard";
import { Separator } from "../../2_Components/1_basics/index";
import LinkedBankCard from "../../2_Components/2_screenConponents/BillPage/LinkedBankCard";

import Bill from "../../4_Classes/Bill";
import DateClass from "../../4_Classes/Date";

import * as Actions from "../../Redux/Actions";

let ARRAY_OF_HISTORY = [];
let data1 = {};

class BillPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: this.props.navigation.state.params.data,
      loading: false,
      ARRAY_OF_HISTORY: []
    };
  }

  componentWillMount() {
    this.props.updateHistory(true);
    this.animatedOpacity = new Animated.Value(0);

    data1 = this.props.navigation.state.params.data;
    // console.warn(data1);
  }

  componentDidMount = () => {
    Animated.timing(this.animatedOpacity, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true
    }).start();
  };

  formatDate(date) {
    const dateClass = new DateClass();
    const formattedDate = dateClass.formatDate(date);
    return formattedDate;
  }

  retrieveData(key) {
    if (this.props.state.updateHistory) {
      this.loadHistory(key);
      // console.warn(key);
    }
  }

  async loadHistory(key) {
    // LOADING = true;
    const data = new Bill();
    this.setState({ ARRAY_OF_HISTORY: await data.loadHistory(key) });
    // console.warn("updating");
    this.props.updateHistory(false);
    // LOADING = false;
  }

  goBack = navigation => {
    navigation.goBack();
  };

  deleteBill = async (key, navigation) => {
    const bill = new Bill();
    await bill.delete(key).then(() => this.onDeleteSuccess(navigation));
  };

  onDeleteSuccess = navigation => {
    console.log("delete sucess");
    this.props.updateDashboard(true);
    this.props.internalNotificationMessage("Bill deleted successfully!");
    this.props.internalNotificationIcon("trash");
    this.props.showInternalNotification(true);

    Animated.timing(this.animatedOpacity, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true
    }).start(() => {
      navigation.goBack();
      this.props.navigation.state.params.userHasReturnedToThisPage();
    });
  };

  renderDeleteButton(data, navigation) {
    if (this.state.loading) {
      return <MaterialIndicator color="black" />;
    } else {
      return (
        <Button
          onPress={() => this.deleteBill(data.key, navigation)}
          title="Delete"
          backgroundColor="#FF4127"
          fontSize={18}
          fontWeight="500"
          color="white"
        />
      );
    }
  }

  payBill = async key => {
    const bill = new Bill();
    let DATA_UPDATED_SUCCESSFULLY = await bill.pay(key);
    if (DATA_UPDATED_SUCCESSFULLY) {
      this.props.updateDashboard(true);
      this.props.updateHistory(true);
      this.props.loading(false);
    }
  };

  formatDate(date) {
    const dateClass = new DateClass();
    const formattedDate = dateClass.formatDate(date);
    return formattedDate;
  }

  goBackToPreviousScreen = navigation => {
    Animated.timing(this.animatedOpacity, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true
    }).start(() => {
      navigation.goBack();
      this.props.navigation.state.params.userHasReturnedToThisPage();
    });
  };

  renderHistoryList() {
    // console.warn(ARRAY_OF_HISTORY);

    return this.state.ARRAY_OF_HISTORY.map((history, index) => (
      <View style={styles.historyRootContainer} key={history.key}>
        <View style={styles.dateContainer}>
          <Text style={styles.dateText}>{this.formatDate(history.date)}</Text>
        </View>
        <View style={styles.statusContainer}>
          <Text style={styles.statusText}>{history.status}</Text>
        </View>
      </View>
    ));
  }

  openCardModal = (navigation, cardKey) => {
    navigation.navigate("CardModal", {
      cardKey: cardKey,
      getSelectedCard: this.getSelectedCard
    });
  };

  getSelectedCard = async card => {
    // this.setState( { card: card.cardName });
    // console.warn(card.cardKey);
    // this.props.onSelectCard(card);
    const bill = new Bill();
    const DATA_UPDATED_SUCCESSFULLY = await bill.updateBillCardDetails(
      this.state.data.key,
      card.cardKey
    );

    if (DATA_UPDATED_SUCCESSFULLY) {
      // let updatedData = {};
      const updatedData = await bill.retrieveSingleBillInformation(
        this.state.data.key
      );
      data1 = updatedData;
      this.props.updateHistory(true);
      this.props.updateDashboard(true);
      // console.warn(data1);
    }
  };

  render() {
    const { navigation } = this.props;
    return (
      <View style={styles.container}>
        {this.retrieveData(data1.key)}
        <View style={styles.header}>
          <Header
            title={"Bill Page"}
            icon="left_arrow"
            backgroundColor={"#F5F6F8"}
            onPress={() => this.goBackToPreviousScreen(navigation)}
          />
        </View>

        <ScrollView contentContainerStyle={styles.scrollViewContainer}>
          <View style={styles.backgroundContainer}>
            <Separator width="100%" height={10} />
            <View style={styles.mainBillCardContainer}>
              <MainBillCard
                bill={data1}
                navigation={navigation}
                pay={() => this.payBill(data1.key)}
              />
            </View>

            <Animated.View
              style={[
                styles.LinkedBankCardContainer,
                { opacity: this.animatedOpacity }
              ]}
            >
              <LinkedBankCard
                data={data1}
                onPress={() => this.openCardModal(navigation, data1.cardKey)}
              />
            </Animated.View>
          </View>

          <Animated.View
            style={[styles.listContainer, { opacity: this.animatedOpacity }]}
          >
            {this.renderHistoryList()}
          </Animated.View>
        </ScrollView>

        <View style={styles.absoluteButtonContainer}>
          <View style={styles.deleteButtonContaniner}>
            {this.renderDeleteButton(data1, navigation)}
          </View>
        </View>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    state: state
  };
}

export default connect(
  mapStateToProps,
  Actions
)(BillPage);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white"
  },

  header: {
    height: 60,
    width: "100%",
    backgroundColor: "white"
  },

  scrollViewContainer: {
    alignItems: "center"
  },

  backgroundContainer: {
    width: "100%",
    height: 300,
    alignItems: "center",
    alignItems: "center",
    backgroundColor: "#F5F6F8"
  },

  mainBillCardContainer: {
    width: "95%",
    height: 160
  },

  LinkedBankCardContainer: {
    width: "95%",
    height: 65,
    marginTop: 20
  },

  historyRootContainer: {
    width: "90%",
    height: 50,
    alignItems: "flex-start",
    justifyContent: "center",
    flexDirection: "row"
  },

  dateContainer: {
    width: "50%",
    height: "100%",
    justifyContent: "center"
  },

  dateText: {
    fontSize: 16,
    fontWeight: "500",
    color: "black"
  },

  statusContainer: {
    width: "50%",
    height: "100%",
    justifyContent: "center",
    alignItems: "flex-end"
  },

  statusText: {
    fontSize: 16,
    fontWeight: "500",
    color: "black"
  },

  absoluteButtonContainer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: 60,
    alignItems: "center",
    justifyContent: "flex-start"
    // backgroundColor: "blue"
  },

  deleteButtonContaniner: {
    width: "90%",
    height: 50
  }
});
