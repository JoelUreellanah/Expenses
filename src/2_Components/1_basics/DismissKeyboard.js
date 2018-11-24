import React, { Component } from "react";
import { TouchableWithoutFeedback, Keyboard } from "react-native";

const DismissKeyboard = props => {
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      {props.children}
    </TouchableWithoutFeedback>
  );
};

export { DismissKeyboard };
