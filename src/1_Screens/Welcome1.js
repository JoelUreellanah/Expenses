import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Animated,
  Dimensions,
  KeyboardAvoidingView,
  ScrollView,
  LayoutAnimation,
  Keyboard
} from "react-native";
import { DismissKeyboard } from "../2_Components/1_basics/index";
import { MaterialIndicator } from "react-native-indicators";
import { Icon } from "../3_Assets";
import { Button, InputText } from "../../src/2_Components/1_basics/index";
import * as firebase from "firebase";
import {
  LoginForm,
  WelcomeTitle
} from "../2_Components/2_screenConponents/1_Auths/index";

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { IconModal } from "./2_Dashboard/TabBar";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

class Welcome1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      logoContainerHeight: new Animated.Value(height - height / 3),
      formContainerOpacity: new Animated.Value(0),

      email: null,
      password: null,
      loading: false,
      errorMessage: "",
      emailInputTextBackgroundColor: "#F5F6F8",
      passwordInputTextBackgroundColor: "#F5F6F8",
      visibleHeight: new Animated.Value(height),
      logoSize: new Animated.Value(150)
    };
  }

  componentWillMount = () => {
    setTimeout(() => {
      Animated.timing(this.state.logoContainerHeight, {
        toValue: height - height / 1.8,
        duration: 300
      }).start(() => {
        // display textBox
        Animated.timing(this.state.formContainerOpacity, {
          toValue: 1,
          duration: 300
        }).start();
      });
    }, 400);

    Keyboard.addListener("keyboardWillShow", this.keyboardDidShow.bind(this));
    Keyboard.addListener("keyboardWillHide", this.keyboardDidHide.bind(this));
  };

  componentWillUnmount() {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  keyboardDidShow(e) {
    // console.warn("show keyboard");
    let newSize = Dimensions.get("window").height - e.endCoordinates.height;
    this.animateLogoSize(90);
    this.animateContainerHeight(
      this.state.logoContainerHeight - e.endCoordinates.height
    );
    this.animateMainContainer(newSize);
    // this.setState({
    //   visibleHeight: newSize
    // });
  }

  keyboardDidHide(e) {
    // console.warn("hide keyboard");
    this.animateContainerHeight(height - height / 1.8);
    this.animateLogoSize(150);
    this.animateMainContainer(Dimensions.get("window").height);
    // this.setState({
    //   visibleHeight: Dimensions.get("window").height
    // });
  }

  animateContainerHeight = size => {
    Animated.timing(this.state.logoContainerHeight, {
      toValue: size,
      duration: 300
    }).start();
  };
  animateLogoSize = size => {
    Animated.spring(this.state.logoSize, {
      toValue: size
    }).start();
  };

  animateMainContainer = size => {
    Animated.timing(this.state.visibleHeight, {
      toValue: size,
      duration: 300
    }).start();
  };

  validateUserInput() {
    if (
      this.state.email === null ||
      this.state.password === null ||
      this.state.password.length < 6
    ) {
      this.handleValidationError("Incorrect Email or Password");
      this.setState({
        emailInputTextBackgroundColor: "#FFDCDC",
        passwordInputTextBackgroundColor: "#FFDCDC"
      });
    } else {
      this.setState({ errorMessage: null });
      this.signInUser(this.state.email, this.state.password);
    }
  }

  signInUser = (email, password) => {
    try {
      this.setState({ loading: true });

      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(this.onLoginSuccess.bind(this))
        .catch(this.handleErrors.bind(this));
    } catch (error) {
      console.log(error.toString());
    }
    console.log("signing in user: " + email + " " + password);
    this.setState({ loading: true });
  };

  handleErrors() {
    this.setState({
      errorMessage: "Ops, something went wrong. Please try again."
    });

    this.setState({
      loading: false,
      emailInputTextBackgroundColor: "#FFDCDC",
      passwordInputTextBackgroundColor: "#FFDCDC"
    });
  }

  handleValidationError = message => {
    this.setState({ errorMessage: message });
  };

  onLoginSuccess() {
    this.setState({
      email: null,
      password: null,
      loading: false,
      error: null,
      errorMessage: null,
      emailInputTextBackgroundColor: "#F5F6F8",
      passwordInputTextBackgroundColor: "#F5F6F8"
    });
  }

  renderSignInButton() {
    if (this.state.loading) {
      return <MaterialIndicator color="black" />;
    } else {
      return (
        <Button
          onPress={() => this.validateUserInput()}
          title="Sign in"
          backgroundColor="#277BFF"
          fontSize={18}
          fontWeight="500"
          color="white"
        />
      );
    }
  }

  render() {
    const { logoSize } = this.state;
    return (
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <Animated.View
          style={{ width: "100%", height: this.state.visibleHeight }}
        >
          <Animated.View
            style={[
              styles.logoContainer,
              { height: this.state.logoContainerHeight }
            ]}
          >
            <Animated.Image
              source={Icon.appIconOfficial}
              style={{ width: logoSize, height: logoSize }}
            />
            <Text style={styles.AppName}>Expenses</Text>
          </Animated.View>

          <Animated.View
            style={[
              styles.formContainer,
              { opacity: this.state.formContainerOpacity }
            ]}
          >
            <View style={styles.inputContainer}>
              <InputText
                value={this.state.email}
                onChangeText={email =>
                  this.setState({
                    email,
                    emailInputTextBackgroundColor: "#F5F6F8"
                  })
                }
                placeholder="Email"
                autoCapitalize="none"
                keyboardAppearance="dark"
                backgroundColor={this.state.emailInputTextBackgroundColor}
              />
            </View>

            <View style={styles.inputContainer}>
              <InputText
                value={this.state.password}
                onChangeText={password =>
                  this.setState({
                    password,
                    passwordInputTextBackgroundColor: "#F5F6F8"
                  })
                }
                placeholder="Password"
                autoCapitalize="none"
                keyboardAppearance="dark"
                secureTextEntry={true}
                backgroundColor={this.state.passwordInputTextBackgroundColor}
              />
            </View>

            <View style={styles.errorContainer}>
              <Text style={styles.errorText}>{this.state.errorMessage}</Text>
            </View>

            <View style={styles.buttonContainer}>
              {this.renderSignInButton()}
            </View>

            <View style={styles.registerForm}>
              <Text style={styles.registerFormText}>
                Don't have an account yet?
              </Text>
              <TouchableOpacity
                style={styles.registerFormButtonContainer}
                onPress={() => this.props.navigation.navigate("SignUp")}
              >
                <Text style={styles.registerFormButtonText}>Sign up</Text>
              </TouchableOpacity>
            </View>
          </Animated.View>
        </Animated.View>
      </ScrollView>
    );
  }
}

export default Welcome1;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#1565C0"
  },

  logoContainer: {
    width: "100%",
    // height: "63%",
    justifyContent: "flex-end",
    alignItems: "center",
    paddingBottom: 25
    // backgroundColor: "orange"
  },

  AppName: {
    fontSize: 30,
    fontWeight: "700",
    color: "white"
  },

  icon: {
    width: 150,
    height: 150
  },

  formContainer: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: 30,
    backgroundColor: "white"
    // backgroundColor: "rgba(52, 52, 52, 0.1)"
  },

  inputContainer: {
    width: "80%",
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: "5%"
  },

  errorContainer: {
    width: "80%",
    height: "6%",
    alignItems: "center"
    // backgroundColor: "red"
  },

  errorText: {
    fontSize: 14,
    fontWeight: "500",
    color: "red"
  },

  buttonContainer: {
    marginTop: "5%",
    marginBottom: "5%",
    width: "60%",
    height: 30
  },

  registerForm: {
    flex: 1,
    width: "100%",
    // backgroundColor: "powderblue",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row"
  },

  registerFormText: {
    fontSize: 12,
    fontWeight: "300",
    color: "black"
  },

  registerFormButtonContainer: {
    width: "25%",
    height: 30,
    borderRadius: 6,
    backgroundColor: "#277BFF",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 5
  },

  registerFormButtonText: {
    color: "white",
    fontSize: 14,
    fontWeight: "500"
  }
});
