import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  KeyboardAvoidingView
} from "react-native";

class InputText extends Component {
  render() {
    const {
      value,
      onChangeText,
      placeholder,
      backgroundColor,
      autoCapitalize,
      keyboardAppearance,
      secureTextEntry,
      keyboardType
    } = this.props;
    return (
      <View
        style={[styles.inputContainer, { backgroundColor: backgroundColor }]}
      >
        <TextInput
          placeholder={placeholder}
          autoCorrect={false}
          keyboardType={keyboardType}
          value={value}
          onChangeText={onChangeText}
          autoCapitalize={autoCapitalize}
          keyboardAppearance={keyboardAppearance}
          secureTextEntry={secureTextEntry}
          style={styles.inputText}
        />
      </View>
    );
  }
}

export { InputText };

const styles = StyleSheet.create({
  inputContainer: {
    width: "100%",
    height: "100%",
    // backgroundColor: "#F5F6F8",
    justifyContent: "center",
    alignItems: "center",
    paddingLeft: 10,
    borderRadius: 5
    // backgroundColor: "orange"
  },

  inputText: {
    width: "100%",
    height: "100%"
    // backgroundColor: "orange"
  }
});
