import React from "react";
import { Image, StyleSheet, Text } from "react-native";
import { Colors } from "../constants/colors";
import { SafeAreaView } from "react-native-safe-area-context";

function WelcomeScreen(props) {
  return (
    <SafeAreaView style={styles.container}>
      <Image
        style={{ width: 300, height: 200 }}
        source={require("../assets/adaptive-icon.png")}
      />
      <Text style={styles.text}>Welcome</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.darkbrown,
  },
  text: {
    color: Colors.primary400,
  },
});

export default WelcomeScreen;
