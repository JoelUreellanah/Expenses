import React, { Component } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import * as firebase from "firebase";
import { MaterialIndicator } from "react-native-indicators";
import { InputText, Button } from "../../1_basics/index";

class SignUpForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: null,
      surname: null,
      email: null,
      password: null,
      loading: false,
      errorMessage: null,
      inputTextBackgroundColor: "#F5F6F8",
      categories: [
        {
          name: "Entertainment",
          image: "entertainment"
        },
        {
          name: "Transportation",
          image: "transportation"
        },
        {
          name: "Phone",
          image: "phone"
        },
        {
          name: "Home",
          image: "home"
        },
        {
          name: "Education",
          image: "education"
        },
        {
          name: "BroadBand",
          image: "broadband"
        },
        {
          name: "Medical",
          image: "medical"
        },
        {
          name: "Tax",
          image: "tax"
        }
      ]
    };
  }

  validateUserInput() {
    if (
      this.state.name === null ||
      this.state.surname === null ||
      this.state.email === null ||
      this.state.password === null
    ) {
      this.handleValidationError("Please complete all fields.");
    } else if (this.state.password.length < 6) {
      this.handleValidationError("Password must be more than 6 character.");
    } else {
      this.setState({ errorMessage: null });
      this.signUpUser(this.state.email, this.state.password);
    }
  }

  handleValidationError(message) {
    this.setState({ errorMessage: message });
  }

  signUpUser = (email, password) => {
    try {
      this.setState({ loading: true });

      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(this.onSignUpSuccess.bind(this))
        .catch(this.handleSignUpError.bind(this));
    } catch (error) {
      console.log(error.toString());
    }
  };

  onSignUpSuccess() {
    this.SaveUserCredential();
    this.SaveUserCategories();
    this.setState({
      name: "",
      surname: "",
      email: "",
      password: "",
      loading: false,
      error: ""
    });
    console.log("user registered successfully");
  }

  handleSignUpError() {
    this.setState({
      errorMessage: "Ops, something went wrong. PLease try again"
    });
  }

  SaveUserCredential() {
    const { currentUser } = firebase.auth();

    // firebase.database().ref(`/users/${currentUser.uid}/Credentials`)
    //   .push({this.state.name, this.state.surname, this.state.email, this.state.password });

    const database = firebase.database();
    const ref = database.ref(`/users/${currentUser.uid}/Credentials`);

    const data = {
      name: this.state.name,
      surname: this.state.surname,
      email: this.state.email,
      password: this.state.password
    };

    ref.push(data);
  }

  SaveUserCategories() {
    const { currentUser } = firebase.auth();
    const database = firebase.database();
    const ref = database.ref(`/users/${currentUser.uid}/Categories`);

    for (var i = 0; i < this.state.categories.length; i++) {
      ref.push(this.state.categories[i]);
    }

    // ref.push(this.state.categories);
  }

  renderSignUpButton() {
    if (this.state.loading) {
      return <MaterialIndicator color="black" />;
    } else {
      return (
        <Button
          onPress={() => this.validateUserInput()}
          title="Sign up"
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
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>Sign up</Text>
        </View>

        <View style={styles.formContainer}>
          <View style={styles.inputContainer}>
            <InputText
              value={this.state.name}
              onChangeText={name => this.setState({ name })}
              placeholder="Name"
              keyboardAppearance="dark"
              backgroundColor={this.state.inputTextBackgroundColor}
            />
          </View>

          <View style={styles.inputContainer}>
            <InputText
              value={this.state.surname}
              onChangeText={surname => this.setState({ surname })}
              placeholder="Surname"
              keyboardAppearance="dark"
              backgroundColor={this.state.inputTextBackgroundColor}
            />
          </View>

          <View style={styles.inputContainer}>
            <InputText
              value={this.state.email}
              onChangeText={email => this.setState({ email })}
              placeholder="Email"
              autoCapitalize="none"
              keyboardAppearance="dark"
              backgroundColor={this.state.inputTextBackgroundColor}
            />
          </View>

          <View style={styles.inputContainer}>
            <InputText
              value={this.state.password}
              onChangeText={password => this.setState({ password })}
              placeholder="Password"
              autoCapitalize="none"
              keyboardAppearance="dark"
              secureTextEntry={true}
              backgroundColor={this.state.inputTextBackgroundColor}
            />
          </View>

          <View style={styles.termAndConditionsContainer}>
            <Text style={styles.termAndConditionsText}>
              By signing up you are agreeing to our Terms and Conditions
            </Text>
          </View>

          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{this.state.errorMessage}</Text>
          </View>

          <View style={styles.buttonContainer}>
            {this.renderSignUpButton()}
          </View>
        </View>
      </View>
    );
  }
}

export { SignUpForm };

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "flex-start"
    // backgroundColor: "orange"
  },

  headerContainer: {
    width: "100%",
    height: 45,
    paddingLeft: 20,
    // backgroundColor: "pink",
    justifyContent: "center"
  },

  headerText: {
    fontSize: 26,
    fontWeight: "800",
    color: "black"
  },

  formContainer: {
    width: "100%",
    height: 380,
    // backgroundColor: "brown",
    alignItems: "center",
    justifyContent: "center"
  },

  inputContainer: {
    width: "80%",
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: "5%"
  },

  inputText: {
    width: "100%",
    height: "100%"
  },

  termAndConditionsContainer: {
    width: "80%",
    height: 30,
    alignItems: "center",
    justifyContent: "center"
  },

  termAndConditionsText: {
    fontSize: 12,
    fontWeight: "300",
    color: "grey"
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
    // marginTop: "3%",
    marginBottom: "5%",
    width: "60%",
    height: 40
  }
});
