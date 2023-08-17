import React from "react";
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Colors } from "../constants/colors";
import { populatePlace } from "../util/database";
import { Ionicons } from "@expo/vector-icons";

function InfoScreen({ navigation }) {
  function resetPlacesHandler() {
    populatePlace();
    navigation.navigate("MyStack");
  }
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.paragraphContainer}>
          <Text style={styles.paragraphHeader}>In a nutshell ... </Text>
          <Text style={styles.paragraph}>
            A simple RN mobile app that can capture and save all your favorite
            places. All that is requires is tht you enable the use of your phone
            Location and allow permissions to use its Camera.
          </Text>
        </View>
        <View style={styles.paragraphContainer}>
          <Text style={styles.paragraphHeader}>Usage</Text>
          <Text style={styles.paragraph}>
            · Tab on "My Place" from the bottom navigation bar
          </Text>
          <Text style={styles.paragraph}>
            · Tab on{" "}
            <Ionicons
              name="add-circle-outline"
              size={30}
              color={Colors.primary100}
            />{" "}
            at the upper right hand corner on the screen
          </Text>
          <Text style={styles.paragraph}>
            · In "Add A Place Favorite" screen provide a placw title or short
            description
          </Text>
          <Text style={styles.paragraph}>
            · Tab "Take Image" to take a picture
          </Text>
          <Text style={styles.paragraph}>
            · For the location, either Tab on "Locate User" or "Pick On Map"
          </Text>
          <Text style={styles.paragraph}>
            · Note that only after having completed all the inputs will a "Save
            Place" button be shown!
          </Text>
          <Text style={styles.paragraph}>
            · Tab on "Save Place" and your entry will be added to the top on the
            list in "My Places" screen.
          </Text>
        </View>
        <View style={styles.resetContainer}>
          <View style={styles.paragraphContainer}>
            <Text style={styles.paragraphHeader}>Reset Application</Text>
            <Text style={styles.paragraph}>
              Clear all favorite places and repopulate sample data for demo
              purposes.
            </Text>
          </View>
          <Pressable
            // onPress={() => {}}
            onPress={resetPlacesHandler}
            style={({ pressed }) => [
              {
                backgroundColor: pressed
                  ? Colors.primary100
                  : Colors.primary200,
              },
              styles.wrapperCustom,
            ]}
          >
            {({ pressed }) => (
              <Text style={styles.resetText}>
                {pressed ? "Reset Again" : "Reset Places"}
              </Text>
            )}
          </Pressable>
          <Text style={styles.warningText}>!!! ALL DATA WILL BE LOST !!!</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.darkbrown,
  },
  resetContainer: {
    alignItems: "center",
    alignContent: "center",
  },
  resetText: {
    color: Colors.primary700,
  },
  wrapperCustom: {
    borderRadius: 8,
    padding: 8,
  },
  paragraphContainer: {
    marginHorizontal: 12,
    marginTop: 12,
  },
  paragraphHeader: {
    color: Colors.primary100,
    fontWeight: "bold",
  },
  paragraph: {
    color: Colors.primary200,
    paddingVertical: 6,
    paddingLeft: 10,
  },
  warningText: {
    padding: 16,
    fontSize: 18,
    color: Colors.primary800,
  },
});

export default InfoScreen;
