import React, { useEffect, useState } from "react";
import { Image, StyleSheet, Text, View, ScrollView } from "react-native";
import { Colors } from "../constants/colors";
import { SafeAreaView } from "react-native-safe-area-context";
import { fetchPlaces } from "../util/database";
function WelcomeScreen({ navigation }) {
  const [uploadedPlacesCount, setUploadedPlacesCount] = useState(0);
  const [uploadedImages, setUploadedImages] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  useEffect(() => {
    async function loadPlacesCount() {
      const places = await fetchPlaces();
      setUploadedPlacesCount(places.length);
    }
    async function loadUploadedImages() {
      const places = await fetchPlaces();
      const images = places.map((place) => place.imageUri);
      setUploadedImages(images);
    }
    // Load data when the screen is focused
    const unsubscribe = navigation.addListener("focus", () => {
      loadPlacesCount();
      loadUploadedImages();
    });
    return () => {
      unsubscribe(); // Unsubscribe when the component is unmounted
    };
  }, [navigation]);
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex(
        (prevIndex) => (prevIndex + 1) % uploadedImages.length
      );
    }, 2000);
    return () => {
      clearInterval(timer); // Clear the timer on unmount
    };
  }, [uploadedImages]);
  return (
    <SafeAreaView style={styles.container}>
      <Image
        style={{ width: 300, height: 200 }}
        source={require("../assets/adaptive-icon.png")}
      />
      <Text style={styles.text}>Welcome</Text>
      {uploadedImages.length > 0 && (
        <View style={styles.imageContainer}>
          <Image
            style={styles.uploadedImage}
            source={{ uri: uploadedImages[currentImageIndex] }}
          />
        </View>
      )}
      <Text style={styles.subText}>
        You've been to {uploadedPlacesCount} places.{"\n"}Add more places under
        "My Places" tab.
      </Text>
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
    fontSize: 18,
    marginBottom: 10,
  },
  imageContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  uploadedImage: {
    width: 300,
    height: 300,
    borderRadius: 10,
  },
  subText: {
    color: Colors.primary400,
    fontSize: 14,
    textAlign: "center",
    marginTop: 10,
  },
});
export default WelcomeScreen;
