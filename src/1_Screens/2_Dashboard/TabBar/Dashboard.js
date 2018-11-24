import React, { Component } from "react";
import { StyleSheet, View, Animated, ScrollView, Text } from "react-native";
import {
  Header,
  MainBillCard,
  QuickLinkCard
} from "../../../2_Components/2_screenConponents/2_Dashboard/index";
import BillCard from "../../../2_Components/2_screenConponents/2_Dashboard/BillCard";
import Notification from "../../../2_Components/2_screenConponents/2_Dashboard/Notification";
import { MaterialIndicator } from "react-native-indicators";
import { Separator } from "../../../2_Components/1_basics/index";
import { connect } from "react-redux";
import Bill from "../../../4_Classes/Bill";
import * as Actions from "../../../Redux/Actions";

const quickLinks = [
  {
    title: "Cards",
    icon: "credit_card",
    iconColor: "#FF585B"
  },
  {
    title: "Statistics",
    icon: "statistics",
    iconColor: "#277BFF"
  },
  {
    title: "Go Premium",
    icon: "premium",
    iconColor: "#FEB536"
  }
];

let ARRAY_OF_BILLS = [];
let FIRST_BILL = null;
let IS_THERE_AT_LEAST_ONE_BILL = true;
let DISPLAY_QUICKLINK_SECTION = false;

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      billsList: [],
      loading: false,
      renderAgain: true,
      internalNotificationHeight: new Animated.Value(-100),
      scrollEnabled: this.props.state.scrollEnabled,
      onScroll: false,
      activeBill: null,
      animatedHeight: 90,
      opacity: 1,
      index: null
    };
    this.loadBillList = this.loadBillList.bind(this);
  }

  componentWillMount() {
    this.allBills = {};
    this.oldPosition = {};
    this.position = new Animated.ValueXY();
    this.dimensions = new Animated.ValueXY();
    this.animation = new Animated.Value(0);
    this.scrollY = new Animated.Value(0);
  }

  handleScroll = () => {
    const { currentlyOpenSwipeable } = this.state;

    if (currentlyOpenSwipeable) {
      currentlyOpenSwipeable.recenter();
    }
  };

  getFunction() {
    console.log("ciao");
  }

  showInternalNotification = () => {
    if (this.props.state.showInternalNotification) {
      setTimeout(() => {
        Animated.spring(this.state.internalNotificationHeight, {
          toValue: 10
        }).start(({ finished }) => {
          setTimeout(() => {
            this.hideInternalNotification();
          }, 3500);
        });
      }, 400);
    }
  };

  hideInternalNotification() {
    Animated.spring(this.state.internalNotificationHeight, {
      toValue: -100
    }).start(({ finished }) => {
      if (finished) {
        this.props.showInternalNotification(false);
      }
    });
  }

  async loadBillList() {
    const bills = new Bill();
    ARRAY_OF_BILLS = await bills.load();

    if (ARRAY_OF_BILLS.length === 0) {
      IS_THERE_AT_LEAST_ONE_BILL = false;
      DISPLAY_QUICKLINK_SECTION = false;
    } else {
      FIRST_BILL = ARRAY_OF_BILLS[0];
      ARRAY_OF_BILLS.shift();
      DISPLAY_QUICKLINK_SECTION = true;
      IS_THERE_AT_LEAST_ONE_BILL = true;
      console.log(ARRAY_OF_BILLS);
    }

    this.props.updateDashboard(false);
  }

  retrieveData() {
    if (this.props.state.updateDashboard) {
      this.loadBillList();
    }
  }

  renderList(navigation) {
    // LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
    return ARRAY_OF_BILLS.map((bill, index) => (
      <View
        style={{
          width: "100%",
          height: 90,
          marginBottom: 10
        }}
        key={bill.key}
        ref={bill => (this.allBills[index] = bill)}
      >
        <BillCard
          data={bill}
          navigation={navigation}
          onMove={this.onMove}
          handlePress={() => this.handleBillCardPress(navigation, bill, index)}
          // handlePress={() => this.makeItInvisible(index)}
          height={90}
          topContainerHeight="100%"
          iconWidth={40}
          iconHeight={40}
          opacity={this.state.index === index ? 0 : 1}
        />
      </View>
    ));
  }

  handleBillCardPress = (navigation, data, index) => {
    // this.refs._scrollView.scrollTo({ x: 5, y: 5, animated: true });
    this.setState({ index: index });

    const variance = 20;
    this.allBills[index].measure((x, y, width, height, pageX, pageY) => {
      this.oldPosition.x = pageX;
      this.oldPosition.y = pageY;
      this.oldPosition.width = width;
      this.oldPosition.height = height;
      this.position.setValue({
        x: pageX,
        y: pageY - 20
      });
      this.dimensions.setValue({
        x: width,
        y: height
      });
      this.setState({ activeBill: ARRAY_OF_BILLS[index] }, () => {
        this.mainBillCardPosition.measure(
          (dx, dy, dWidth, dHeight, dPageX, dPageY) => {
            const duration = 300;
            // const variance = 20;
            const scroll = variance - this.scrollY._value;
            // console.warn(scroll);
            Animated.parallel([
              Animated.timing(this.position.x, {
                toValue: dPageX,
                duration: duration
              }),
              Animated.timing(this.position.y, {
                toValue: dPageY - scroll,
                duration: duration
              }),
              Animated.timing(this.dimensions.x, {
                toValue: dWidth,
                duration: duration
              }),
              Animated.timing(this.dimensions.y, {
                toValue: dHeight,
                duration: duration
              }),
              Animated.timing(this.animation, {
                toValue: 1,
                duration: duration
              })
            ]).start(() => {
              // navigation.navigate("BillPage", { data: data, navigation });
              this.goToBillPage(navigation, data);
            });
          }
        );
      });
    });

    // console.warn(this.state.activeBill);
  };

  renderFirstBill(navigation) {
    if (IS_THERE_AT_LEAST_ONE_BILL) {
      if (FIRST_BILL === null) {
        return (
          <View style={[styles.noBillContainer]}>
            <MaterialIndicator color="black" />
          </View>
        );
      } else {
        return (
          <View
            style={{ width: "100%", height: 160 }}
            ref={view => (this.mainBillCardPosition = view)}
          >
            <MainBillCard
              bill={FIRST_BILL}
              navigation={navigation}
              pay={() => this.payBill(FIRST_BILL.key)}
              handlePress={() => this.goToBillPage(navigation, FIRST_BILL)}
            />
          </View>
        );
      }
    } else {
      return;
    }
  }

  onMove = bool => {
    this.setState({ scrollEnabled: bool });
    console.log(this.state.scrollEnabled);
  };

  payBill = async key => {
    const bill = new Bill();
    let DATA_UPDATED_SUCCESSFULLY = await bill.pay(key);
    if (DATA_UPDATED_SUCCESSFULLY) {
      this.props.updateDashboard(true);
      this.props.internalNotificationMessage("Yeah bill paid. Keep it going!");
      this.props.internalNotificationIcon("thumb_up");
      this.props.showInternalNotification(true);
    }
  };

  goToBillPage = (navigation, data) => {
    navigation.navigate("BillPage", {
      data: data,
      navigation,
      userHasReturnedToThisPage: this.userHasReturnedToThisPage
    });
  };

  userHasReturnedToThisPage = () => {
    const duration = 300;
    Animated.parallel([
      Animated.timing(this.position.x, {
        toValue: this.oldPosition.x,
        duration: duration
      }),
      Animated.timing(this.position.y, {
        toValue: this.oldPosition.y - 20,
        duration: duration
      }),
      Animated.timing(this.dimensions.x, {
        toValue: this.oldPosition.width,
        duration: duration
      }),
      Animated.timing(this.dimensions.y, {
        toValue: this.oldPosition.height,
        duration: duration
      }),
      Animated.timing(this.animation, {
        toValue: 0,
        duration: duration
      })
    ]).start(() => {
      // navigation.navigate("BillPage", { data: data, navigation });
      // this.goToBillPage(navigation, data);
      this.setState({ activeBill: null, index: null });
    });
  };

  renderNoBillsFoundView() {
    if (!IS_THERE_AT_LEAST_ONE_BILL) {
      return (
        <View style={styles.noBillContainer}>
          <Text style={styles.noBillText}>You don't have any bill.</Text>
        </View>
      );
    } else {
      return;
    }
  }

  renderQuickLinkSection() {
    if (IS_THERE_AT_LEAST_ONE_BILL) {
      return (
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          <QuickLinkCard data={quickLinks[0]} />
          <QuickLinkCard data={quickLinks[1]} />
          <QuickLinkCard data={quickLinks[2]} />
        </ScrollView>
      );
    } else {
      // return;
      return (
        <View style={styles.noBillContainer}>
          <Text style={styles.noBillText}>You don't have any bill.</Text>
        </View>
      );
    }
  }

  render() {
    const { navigation } = this.props;

    const animatedOpacity = this.animation.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [1, 0.5, 0]
    });

    const animatedPositionY = this.animation.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [0, 600, 600]
    });

    const animateHeaderPosition = this.animation.interpolate({
      inputRange: [0, 1],
      outputRange: [0, -200]
    });

    const animateMainBillCardPosition = this.animation.interpolate({
      inputRange: [0, 1],
      outputRange: [0, -200]
    });

    const animateOpacityQuickLinkView = this.animation.interpolate({
      inputRange: [0, 0.2, 1],
      outputRange: [1, 0, 0]
    });

    const animatedPosition = {
      transform: [{ translateY: animatedPositionY }],
      opacity: animatedOpacity
    };

    const animateHeaderPos = {
      transform: [{ translateY: animateHeaderPosition }]
    };

    const animateMainBillPosition = {
      transform: [{ translateY: animateMainBillCardPosition }]
    };

    const topContainerHeight = this.animation.interpolate({
      inputRange: [0, 1],
      outputRange: ["100%", "47%"]
    });

    const dueDateStatusHeight = this.animation.interpolate({
      inputRange: [0, 1],
      outputRange: ["0%", "15%"]
    });

    const buttonContainerHeight = this.animation.interpolate({
      inputRange: [0, 1],
      outputRange: ["0%", "40%"]
    });

    const iconWidth = this.animation.interpolate({
      inputRange: [0, 1],
      outputRange: [40, 60]
    });

    const iconHeight = this.animation.interpolate({
      inputRange: [0, 1],
      outputRange: [40, 60]
    });

    const activeImageStyle = {
      width: this.dimensions.x,
      height: this.dimensions.y,
      left: this.position.x,
      top: this.position.y
    };

    let animatedView;
    if (this.state.activeBill !== null) {
      animatedView = (
        <View
          style={[StyleSheet.absoluteFill]}
          pointerEvents={this.state.activeBill ? "auto" : "none"}
        >
          <Animated.View
            style={[activeImageStyle, { borderRasius: 7 }]}
            key={this.state.activeBill.key}
          >
            <BillCard
              data={this.state.activeBill}
              navigation={navigation}
              onMove={this.onMove}
              handlePress={() =>
                this.handleBillCardPress(navigation, bill, index)
              }
              height={this.dimensions.y}
              topContainerHeight={topContainerHeight}
              dueDateStatusHeight={dueDateStatusHeight}
              buttonContainerHeight={buttonContainerHeight}
              iconWidth={iconWidth}
              iconHeight={iconHeight}
            />
          </Animated.View>
        </View>
      );
    }

    return (
      <View style={{ flex: 1, backgroundColor: "#F5F6F8" }}>
        {this.retrieveData()}
        {this.showInternalNotification()}
        {
          // this.renderNoBillsFoundView()
        }

        <Animated.View style={[styles.header, animateHeaderPos]}>
          <Header headerTitle="Dashboard" />
        </Animated.View>

        <Animated.View
          style={[
            styles.notificationContainer,
            { top: this.state.internalNotificationHeight }
          ]}
        >
          <Notification />
        </Animated.View>

        <Animated.View style={{ flex: 1 }}>
          <ScrollView
            contentContainerStyle={[styles.scrollview]}
            scrollEnabled={this.props.state.scrollEnabled}
            onScroll={Animated.event([
              { nativeEvent: { contentOffset: { y: this.scrollY } } }
            ])}
            ref="_scrollView"
          >
            <Separator width="100%" height={10} />

            <Animated.View
              style={[styles.mainBillCard, animateMainBillPosition]}
            >
              {this.renderFirstBill(navigation)}
            </Animated.View>

            <Separator width="100%" height={20} />

            <Animated.View
              style={[
                styles.quickLinkCards,
                { opacity: animateOpacityQuickLinkView }
              ]}
            >
              {this.renderQuickLinkSection()}
            </Animated.View>

            <Animated.View style={[styles.billList, animatedPosition]}>
              {this.renderList(navigation)}
            </Animated.View>
          </ScrollView>
        </Animated.View>

        {animatedView}
      </View>
    );
  }
}

const mapStateToProps = state => {
  console.log(state);
  return {
    // loadDashboard: state.updateDashboard
    state: state
  };
};

export default connect(
  mapStateToProps,
  Actions
)(Dashboard);

const styles = StyleSheet.create({
  scrollview: {
    alignItems: "center",
    justifyContent: "center"
  },

  notificationContainer: {
    position: "absolute",
    height: 70,
    width: "100%",
    justifyContent: "center",
    flexDirection: "row",
    zIndex: 2,
    top: 10
  },

  header: {
    height: 60,
    width: "100%"
  },

  mainBillCard: {
    height: 160,
    width: "95%"
  },

  quickLinkCards: {
    height: 100,
    width: "95%",
    flex: 1
  },

  billList: {
    width: "95%",
    flex: 1
  },

  noBillContainer: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: "center",
    alignItems: "center"
    // backgroundColor: "blue"
  },

  noBillText: {
    fontSize: 16,
    fontWeight: "700",
    color: "black"
  }
});
