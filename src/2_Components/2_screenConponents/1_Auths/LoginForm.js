import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  TextInput,
  ScrollView
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import * as firebase from "firebase";
import { MaterialIndicator } from "react-native-indicators";
import { Button, InputText } from "../../1_basics/index";

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: null,
      password: null,
      loading: false,
      errorMessage: "",
      emailInputTextBackgroundColor: "#F5F6F8",
      passwordInputTextBackgroundColor: "#F5F6F8"
    };
  }

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
    return (
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <InputText
            value={this.state.email}
            onChangeText={email =>
              this.setState({ email, emailInputTextBackgroundColor: "#F5F6F8" })
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

        <View style={styles.buttonContainer}>{this.renderSignInButton()}</View>

        <View style={styles.forgotPasswordSection}>
          <TouchableOpacity
            style={styles.forgotPasswordContainer}
            onPress={() => console.log("go to forgot Oassword modal")}
          >
            <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export { LoginForm };

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center"
  },

  inputContainer: {
    width: "80%",
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: "5%"
  },

  inputText: {
    width: "100%",
    height: "100%"
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

  forgotPasswordSection: {
    width: "100%",
    height: "10%",
    alignItems: "center",
    justifyContent: "center"
    // backgroundColor: "orange"
  },

  forgotPasswordContainer: {
    width: "60%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center"
  },

  forgotPasswordText: {
    fontSize: 12,
    fontWeight: "400",
    color: "black"
  }
});
