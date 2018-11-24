import React, { Component } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { DismissKeyboard } from "../2_Components/1_basics/index";
import { Icon } from "../3_Assets";
import {
  LoginForm,
  WelcomeTitle
} from "../2_Components/2_screenConponents/1_Auths/index";

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

class Welcome extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View style={styles.container}>
        <KeyboardAwareScrollView contentContainerStyle={{ flex: 1 }}>
          <View style={styles.imageContainer}>
            <Image
              source={Icon.welcomePageImage}
              style={styles.image}
              resizeMode="center"
            />
          </View>

          <View style={styles.welcomeTitleContainer}>
            <WelcomeTitle />
          </View>

          <View style={styles.loginFormContainer}>
            <LoginForm />
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
        </KeyboardAwareScrollView>
      </View>
    );
  }
}

export default Welcome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "white"
  },

  imageContainer: {
    width: "100%",
    height: "38%",
    alignItems: "center",
    justifyContent: "center"
    // backgroundColor: "orange"
  },

  image: {
    width: "100%",
    height: "100%"
  },

  welcomeTitleContainer: {
    width: "100%",
    height: "10%"
  },

  welcomeTextContainer: {
    width: "100%",
    height: "10%",
    marginTop: 5,
    alignItems: "center",
    justifyContent: "center"
    // backgroundColor: "orange"
  },

  welcomeText: {
    fontSize: 36,
    fontWeight: "700",
    color: "black"
  },

  scrollViewContent: {
    // width: 350,
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: "pink",
    marginRight: 1
  },

  scrollViewTextContent: {
    fontSize: 15,
    fontWeight: "600",
    color: "#BABABA"
  },

  loginFormContainer: {
    width: "100%",
    height: "40%"
    // backgroundColor: "pink"
    // flex: 1
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
    height: "30%",
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
