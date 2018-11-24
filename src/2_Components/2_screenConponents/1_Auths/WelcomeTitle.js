import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  KeyboardAvoidingView
} from "react-native";
import Dimensions from "Dimensions";

const width = Dimensions.get("window").width;
// const SCROLLVIEW_REF = "scrollview";

class WelcomeTitle extends Component {
  // state = {
  //   width: 0,
  //   autoPlay: true,
  //   SCROLLVIEW_REF: "scrollview"
  // };
  constructor(props) {
    super(props);
    // this._goToNextPage = this._goToNextPage.bind(this);
    // this._onScroll = this._onScroll.bind(this);
    // this._startAutoPlay = this._startAutoPlay.bind(this);
    // this._stopAutoPlay = this._stopAutoPlay.bind(this);
    // this._onScrollViewLayout = this._onScrollViewLayout.bind(this);

    // this._currentIndex = 0;
    // this._childrenCount = 3;
  }

  // componentDidMount() {
  //   if (this.state.autoPlay) {
  //     this._startAutoPlay();
  //   } else {
  //     this._stopAutoPlay();
  //   }
  // }

  // _startAutoPlay() {
  //   this._timerId = setInterval(this._goToNextPage, 3000);
  // }

  // _stopAutoPlay() {
  //   if (this._timerId) {
  //     clearInterval(this._timerId);
  //     this._timerId = null;
  //   }
  // }

  // _goToNextPage = () => {
  //   this._stopAutoPlay();
  //   let nextIndex = (this._currentIndex + 1) % this._childrenCount;
  //   this.refs[this.state.SCROLLVIEW_REF].scrollTo({
  //     x: this.state.width * nextIndex
  //   });
  // };

  // _onScrollViewLayout(event) {
  //   let { width } = event.nativeEvent.layout;
  //   this.setState({ width: width });
  // }

  // _onScroll(event) {
  //   let { x } = event.nativeEvent.contentOffset,
  //     offset,
  //     position = Math.floor(x / this.state.width);
  //   if (x === this._preScrollX) return;
  //   this._preScrollX = x;
  //   offset = x / this.state.width - position;
  //   if (offset === 0) {
  //     this._currentIndex = position;
  //     this._timerId = setInterval(this._goToNextPage, 3000);
  //   }
  // }
  render() {
    return (
      <View style={[styles.welcomeTextContainer]}>
        <Text style={styles.welcomeText}>Welcome</Text>
        {/*<ScrollView
          horizontal={true}
          onLayout={this._onScrollViewLayout}
          onScroll={this._onScroll}
          ref={this.state.SCROLLVIEW_REF}
          pagingEnabled={true}
          scrollEventThrottle={8}
        >*/}
        <View style={[styles.scrollViewContent, { width: width }]}>
          <Text style={styles.scrollViewTextContent}>
            Manage your bills like a Pro.
          </Text>
        </View>
        {/*<View style={[styles.scrollViewContent, { width: width }]}>
          <Text style={styles.scrollViewTextContent}>
            Never forget when a bill is due.
          </Text>
        </View>

        <View style={[styles.scrollViewContent, { width: width }]}>
          <Text style={styles.scrollViewTextContent}>
            Keep track of your spending.
          </Text>
      </View>*/}
        {/*</ScrollView>*/}
      </View>
    );
  }
}

export { WelcomeTitle };

const styles = StyleSheet.create({
  welcomeTextContainer: {
    width: "100%",
    height: "100%",
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
  }
});
