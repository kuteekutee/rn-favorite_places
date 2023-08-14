import React from "react";
import { Pressable, SafeAreaView, StyleSheet, Text, View } from "react-native";
import { Colors } from "../constants/colors";
import { populatePlace } from "../util/database";
function InfoScreen({ navigation }) {
  function resetPlacesHandler() {
    populatePlace();
    navigation.navigate("MyStack");
  }
  return (
    <SafeAreaView style={styles.container}>
      <Pressable
        onPress={resetPlacesHandler}
        style={({ pressed }) => [
          {
            backgroundColor: pressed ? "rgb(210, 230, 255)" : "white",
          },
          styles.wrapperCustom,
        ]}
      >
        {({ pressed }) => (
          <Text style={styles.text}>
            {pressed ? "Reset Again" : "Reset Places"}
          </Text>
        )}
      </Pressable>
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
    fontSize: 16,
  },
  wrapperCustom: {
    borderRadius: 16,
    padding: 16,
  },
});

export default InfoScreen;
