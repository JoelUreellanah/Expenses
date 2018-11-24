import React, { Component } from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import * as firebase from "firebase";
import { MaterialIndicator } from "react-native-indicators";
import {
  Header,
  SubHeader,
  BillType,
  TextForm,
  DateForm,
  RepeatForm,
  AdditionalForm
} from "../../../2_Components/2_screenConponents/AddBill";
import { Button } from "../../../2_Components/1_basics/index";
import { connect } from "react-redux";
import Bill from "../../../4_Classes/Bill";
import * as Actions from "../../../Redux/Actions";
import DateClass from "../../../4_Classes/Date";

class AddBill extends Component {
  constructor(props) {
    super(props);
    this.state = {
      billType: "",
      currency: "",
      billName: "",
      currency: "GBR",
      billAmount: "",
      date: null,
      formattedDate: "",
      time: null,
      mins: null,
      hours: null,
      repeat: "",
      category: "",
      cardKey: "",
      cardName: "",
      cardNumber: "",
      cardIcon: "",
      icon: "",

      nameBoxColor: "#F5F6F8",
      amountBoxColor: "#F5F6F8",
      dateBoxColor: "white",
      repeatBoxColor: "white",
      iconTextColor: "#F5F6F8",

      loading: false,
      errorMessage: null
    };
    this.createBill = this.createBill.bind(this);
  }

  validateUserInput = async () => {
    if (this.state.billName === "") {
      this.setState({
        errorMessage: "Please give your bill a name!",
        nameBoxColor: "#FFDCDC"
      });
    } else if (this.state.billAmount === "") {
      this.setState({
        errorMessage: "Please give your bill an amount!",
        amountBoxColor: "#FFDCDC"
      });
    } else if (this.state.date === "" || this.state.date === null) {
      this.setState({
        errorMessage: "Please choose a date!",
        dateBoxColor: "#FFDCDC"
      });
    } else if (this.state.repeat === "") {
      this.setState({
        errorMessage: "Please choose a repeat option!",
        repeatBoxColor: "#FFDCDC"
      });
    } else if (this.state.icon === "") {
      this.setState({
        errorMessage: "Please choose an icon for your bill!",
        iconTextColor: "#FFDCDC"
      });
    } else {
      if (!this.state.billAmount.includes(".")) {
        //check if amount is well formatted
        this.setState({ billAmount: this.state.billAmount + ".00" }, () =>
          this.createBill()
        );
      } else {
        this.createBill();
      }
    }
  };

  async createBill() {
    this.setState({ loading: true });
    const date = new DateClass();
    const finalDate = await date.joinDateAndTime(
      this.state.date,
      this.state.hours,
      this.state.mins
    );
    const bill = new Bill();
    const ADDED_DATA = await bill.add(
      this.state.billType,
      this.state.billName,
      this.state.currency,
      this.state.billAmount,
      // this.state.time,
      finalDate,
      this.state.repeat,
      this.state.category,
      this.state.cardKey,
      this.state.cardName,
      this.state.cardNumber,
      this.state.cardIcon,
      this.state.icon
    );
    if (ADDED_DATA) {
      this.setState(
        {
          errorMessage: null,
          billType: "",
          currency: "",
          billName: "",
          currency: "GBR",
          billAmount: "",
          date: null,
          formattedDate: "",
          time: null,
          repeat: "",
          category: "",
          cardKey: "",
          cardName: "",
          cardNumber: "",
          cardIcon: "",
          icon: "",
          loading: false
        },
        () => {
          this.props.updateAddBill(true);
          this.props.updateAddBill(true);
          this.props.updateDashboard(true);
          this.props.internalNotificationMessage("Bill added successfully!");
          this.props.internalNotificationIcon("thumb_up");
          this.props.showInternalNotification(true);
          this.props.navigation.navigate("Dashboard");
        }
      );
    } else {
      console.log("error");
    }
    // this.onCreateBillSuccess.bind(this);
  }

  onSelectBillType = billType => {
    this.setState({ billType: billType.contractType });
    // console.log(billType);
  };

  onSelectCurrency = currency => {
    // console.log("addbill: " + currency.currency);
    this.setState({ currency: currency.currency });
    // this.props.currency(currency.currency);
  };

  onSelectDate = (date, objectDate) => {
    this.setState({
      date: objectDate.toString(),
      dateBoxColor: "white"
      // time: objectDate.toString()
    });
    // console.warn("addbill: " + objectDate); // <= date object
  };

  onSelectTime = (hours, mins) => {
    this.setState({ hours: hours, mins: mins });
    // console.warn(hours + " " + mins);
  };

  onSelectRepeatOption = option => {
    // console.log("Addbill: " + option.option);
    this.setState({
      repeat: option.option,
      repeatBoxColor: "white",
      errorMessage: ""
    });
  };

  onSelectCategory = category => {
    this.setState({ category: category.category });
  };

  onSelectCard = card => {
    this.setState({
      cardKey: card.cardKey,
      cardName: card.cardName,
      cardNumber: card.cardNumber,
      cardIcon: card.cardIcon
    });
    // console.warn(card.key);
  };

  onSelectIcon = icon => {
    this.setState({ icon: icon.icon, iconTextColor: "#F5F6F8" });
    // console.log(icon);
  };

  onChangeAmount = amount => {
    this.setState({ billAmount: amount, amountBoxColor: "#F5F6F8" });
  };

  renderButton() {
    if (this.state.loading) {
      return <MaterialIndicator color="black" />;
    } else {
      return (
        <Button
          onPress={this.validateUserInput}
          title="Create"
          backgroundColor="#277BFF"
          fontSize={18}
          fontWeight="500"
          color="white"
        />
      );
    }
  }

  setBillName = billName => {
    this.setState({ billName: billName, nameBoxColor: "#F5F6F8" });
    // this.props.billName(billName);
  };

  render() {
    const { navigation } = this.props;
    return (
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollview}>
          <View style={styles.subHeader}>
            <SubHeader title="New Bill" />
          </View>

          <View style={styles.textForm}>
            <TextForm
              nameValue={this.state.billName}
              onChangeName={this.setBillName}
              nameBoxColor={this.state.nameBoxColor}
              amountValue={this.state.billAmount}
              onChangeAmount={this.onChangeAmount}
              amountBoxColor={this.state.amountBoxColor}
              navigation={navigation}
              onSelectCurrency={this.onSelectCurrency}
              currency={this.state.currency}
            />
          </View>

          <View style={styles.dateForm}>
            <DateForm
              navigation={navigation}
              onSelectDate={this.onSelectDate}
              date={this.state.date}
              time={this.state.time}
              onSelectTime={this.onSelectTime}
              dateBoxColor={this.state.dateBoxColor}
            />
          </View>

          <View
            style={[
              styles.repeatForm,
              { backgroundColor: this.state.repeatBoxColor }
            ]}
          >
            <RepeatForm
              navigation={navigation}
              onSelectRepeatOption={this.onSelectRepeatOption}
              repeatOption={this.state.repeat}
            />
          </View>

          <View style={styles.additionalForm}>
            <AdditionalForm
              navigation={navigation}
              category={this.state.category}
              onSelectCategory={this.onSelectCategory}
              card={this.state.cardName}
              onSelectCard={this.onSelectCard}
              icon={this.state.icon}
              onSelectIcon={this.onSelectIcon}
              iconTextColor={this.state.iconTextColor}
            />
          </View>

          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{this.state.errorMessage}</Text>
          </View>

          <View style={styles.buttonContainer}>{this.renderButton()}</View>
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    // updateDashboard: state.updateDashboard,
    state: state
  };
};

export default connect(
  mapStateToProps,
  Actions
)(AddBill);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white"
  },

  header: {
    height: 50,
    width: "100%"
    // backgroundColor: "red"
  },

  scrollview: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white"
  },

  subHeader: {
    width: "100%",
    height: 70,
    marginBottom: 20
    // backgroundColor: "blue"
  },

  billType: {
    width: "90%",
    height: 40
    // backgroundColor: "pink"
  },

  textForm: {
    width: "90%",
    height: 120,
    marginBottom: 20
    // backgroundColor: "red"
  },

  dateForm: {
    width: "90%",
    height: 60,
    marginBottom: 10
    // backgroundColor: "green"
  },

  repeatForm: {
    width: "90%",
    height: 40,
    marginBottom: 10
    // backgroundColor: "gray"
  },

  additionalForm: {
    width: "100%",
    height: 150,
    backgroundColor: "#F5F6F8",
    marginBottom: 10
  },

  errorContainer: {
    width: "80%",
    height: 25,
    alignItems: "center",
    justifyContent: "center"
    // backgroundColor: "green"
  },

  errorText: {
    fontSize: 14,
    fontWeight: "500",
    color: "red"
  },

  buttonContainer: {
    width: "70%",
    height: 40
  }
});
