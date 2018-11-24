import React from "react";
import {
  StyleSheet,
  SafeAreaView,
  Image,
  Animated,
  Easing
} from "react-native";
import {
  createStackNavigator,
  createBottomTabNavigator
} from "react-navigation";
import * as firebase from "firebase";
import { MaterialIndicator } from "react-native-indicators";
import Welcome from "./src/1_Screens/Welcome";
import Welcome1 from "./src/1_Screens/Welcome1";
import SignUp from "./src/1_Screens/1_Auths/SignUp";
import {
  Search,
  Settings,
  Account,
  RepeatModal,
  CategoryModal,
  CardModal,
  IconModal,
  BillTypeModal,
  CurrencyPickerModal,
  DatePickerModal,
  TimePickerModal
} from "./src/1_Screens/2_Dashboard/TabBar/index";

import BillPage from "./src/1_Screens/2_Dashboard/BillPage";

import Dashboard from "./src/1_Screens/2_Dashboard/TabBar/Dashboard";
import AddBill from "./src/1_Screens/2_Dashboard/TabBar/AddBill";
import { Icon } from "./src/3_Assets/index";

import { createStore } from "redux";
import { Provider } from "react-redux";
import Reducers from "./src/Redux/Reducers";

var config = {
  apiKey: "AIzaSyCf5gKATnsxL5NJpn9YWGbbGXSG16T27p0",
  authDomain: "expenses-71447.firebaseapp.com",
  databaseURL: "https://expenses-71447.firebaseio.com",
  projectId: "expenses-71447",
  storageBucket: "expenses-71447.appspot.com",
  messagingSenderId: "614698182885"
};
firebase.initializeApp(config);

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: null
    };
  }

  componentWillMount() {
    // firebase.auth().signOut();
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({ loggedIn: true });
        console.log("User logged in");
      } else {
        this.setState({ loggedIn: false });
        console.log(" No User logged in");
      }
    });
  }

  // render() {
  //   return (
  //     <SafeAreaView style={{ flex: 1 }}>
  //       <WelcomeRootStackNavigator />
  //     </SafeAreaView>
  //   );
  // }

  render() {
    switch (this.state.loggedIn) {
      case true:
        return (
          <SafeAreaView style={{ flex: 1 }}>
            <Provider store={createStore(Reducers)}>
              <RootStackNavigator />
            </Provider>
          </SafeAreaView>
        );
      case false:
        return (
          <SafeAreaView style={{ flex: 1 }}>
            <WelcomeRootStackNavigator />
          </SafeAreaView>
        );

      default:
        return <MaterialIndicator color="black" />;
    }
    // return <Welcome1 />;
  }
}

const WelcomeRootStackNavigator = createStackNavigator(
  {
    Welcome: {
      screen: Welcome1,
      navigationOptions: ({ navigation }) => ({
        header: null,
        gesturesEnabled: false
      })
    },
    SignUp: {
      screen: SignUp,
      navigationOptions: ({ navigation }) => ({
        header: null,
        gesturesEnabled: false
      })
    }
  },
  {
    initialRouteName: "Welcome",
    headerMode: "none",
    mode: "modal",
    cardStyle: {
      shadowColor: "transparent",
      backgroundColor: "transparent",
      opacity: 1
    },
    transitionConfig: () => ({
      transitionSpec: {
        duration: 0,
        timing: Animated.timing,
        easing: Easing.step0
      }
    })
  }
);

// ------------------------------------ Logged User Stack Navigator --------------------------------

const RootStackNavigator = createStackNavigator(
  {
    BillPage: {
      screen: BillPage,
      navigationOptions: ({ navigation }) => ({
        header: null,
        gesturesEnabled: false
      })
    },
    RepeatModal: {
      screen: RepeatModal,
      navigationOptions: ({ navigation }) => ({
        header: null,
        gesturesEnabled: false
      })
    },
    CategoryModal: {
      screen: CategoryModal,
      navigationOptions: ({ navigation }) => ({
        header: null,
        gesturesEnabled: false
      })
    },
    CardModal: {
      screen: CardModal,
      navigationOptions: ({ navigation }) => ({
        header: null,
        gesturesEnabled: false
      })
    },
    IconModal: {
      screen: IconModal,
      navigationOptions: ({ navigation }) => ({
        header: null,
        gesturesEnabled: false
      })
    },
    BillTypeModal: {
      screen: BillTypeModal,
      navigationOptions: ({ navigation }) => ({
        header: null,
        gesturesEnabled: false
      })
    },
    CurrencyPickerModal: {
      screen: CurrencyPickerModal,
      navigationOptions: ({ navigation }) => ({
        header: null,
        gesturesEnabled: false
      })
    },
    DatePickerModal: {
      screen: DatePickerModal,
      navigationOptions: ({ navigation }) => ({
        header: null,
        gesturesEnabled: false
      })
    },
    TimePickerModal: {
      screen: TimePickerModal,
      navigationOptions: ({ navigation }) => ({
        header: null,
        gesturesEnabled: false
      })
    },
    TabBar: {
      screen: createBottomTabNavigator(
        {
          // Settings: {
          //   screen: Settings,
          //   navigationOptions: {
          //     tabBarLabel: "Setting",
          //     tabBarIcon: ({ tintColor }) => {
          //       return (
          //         <Image
          //           source={Icon.setting}
          //           style={[styles.bottomTabBarIcon, { tintColor: tintColor }]}
          //         />
          //       );
          //     }
          //   }
          // },

          AddBill: {
            screen: AddBill,
            navigationOptions: {
              tabBarLabel: "New Bill",
              tabBarIcon: ({ tintColor }) => {
                return (
                  <Image
                    source={Icon.add}
                    style={[styles.bottomTabBarIcon, { tintColor: tintColor }]}
                  />
                );
              }
            }
          },

          Account: {
            screen: Account,
            navigationOptions: {
              tabBarLabel: "Account",
              tabBarIcon: ({ tintColor }) => {
                return (
                  <Image
                    source={Icon.user}
                    style={[styles.bottomTabBarIcon, { tintColor: tintColor }]}
                  />
                );
              }
            }
          },

          Dashboard: {
            screen: Dashboard,
            navigationOptions: {
              tabBarLabel: "Home",
              tabBarIcon: ({ tintColor }) => {
                return (
                  <Image
                    source={Icon.home}
                    style={[styles.bottomTabBarIcon, { tintColor: tintColor }]}
                  />
                );
              }
            }
          }

          // Search: {
          //   screen: Search,
          //   navigationOptions: {
          //     tabBarLabel: "Search",
          //     tabBarIcon: ({ tintColor }) => {
          //       return (
          //         <Image
          //           source={Icon.search}
          //           style={[styles.bottomTabBarIcon, { tintColor: tintColor }]}
          //         />
          //       );
          //     }
          //   }
          // }
        },
        {
          // Routes config
          initialRouteName: "Dashboard",
          order: ["Dashboard", "AddBill", "Account"],
          navigationOptions: {
            tabBarVisible: true
          },
          tabBarOptions: {
            activeTintColor: "#277BFF",
            inactiveTintColor: "#909090",
            showLabel: false,
            style: {
              backgroundColor: "white"
            }
          }
        }
      ),
      navigationOptions: ({ navigation }) => ({
        header: null
      })
    }
  },
  {
    initialRouteName: "TabBar",
    headerMode: "none",
    mode: "modal",
    cardStyle: {
      shadowColor: "transparent",
      backgroundColor: "transparent",
      opacity: 1
    },
    transitionConfig: () => ({
      transitionSpec: {
        duration: 0,
        timing: Animated.timing,
        easing: Easing.step0
      }
    })
  }
);

const styles = StyleSheet.create({
  container: {},

  bottomTabBarIcon: {
    width: 20,
    height: 20
  }
});
