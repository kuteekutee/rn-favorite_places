import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import OutlinedButton from "../UI/OutlinedButton";
import { Colors } from "../constants/colors";
import { useEffect, useState } from "react";
import { deletePlace, fetchPlaceDetails } from "../util/database";

function PlaceDetails({ route, navigation }) {
  const [fetchedPlace, setFetchedPlace] = useState();

  function showOnMapHandler() {
    navigation.navigate("Map", {
      initialLat: fetchedPlace.location.lat,
      initialLng: fetchedPlace.location.lng,
    });
  }

  const selectedPlaceId = route.params.placeId;

  useEffect(() => {
    async function loadPlaceData() {
      const place = await fetchPlaceDetails(selectedPlaceId);
      setFetchedPlace(place);
      navigation.setOptions({
        title: place.title,
      });
    }
    loadPlaceData();
  }, [selectedPlaceId]);

  if (!fetchedPlace) {
    return (
      <View style={styles.fallback}>
        <Text>Fetching place ...</Text>
      </View>
    );
  }

  async function deletePlaceHandler() {
    await deletePlace(selectedPlaceId);
    navigation.goBack();
  }

  return (
    <ScrollView styles={styles.screen}>
      <Image style={styles.image} source={{ uri: fetchedPlace.imageUri }} />
      <View style={styles.locationContainer}>
        <View style={styles.addressContainer}>
          <Text style={styles.address}>{fetchedPlace.address}</Text>
        </View>
        <View style={styles.outlineButtonsContainer}>
          <OutlinedButton icon="map" onPress={showOnMapHandler}>
            View on Map
          </OutlinedButton>
          <OutlinedButton
            icon="remove-circle-outline"
            onPress={deletePlaceHandler}
          >
            Delete Place
          </OutlinedButton>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    alignItems: "center",
  },
  image: {
    height: "35%",
    minHeight: 300,
    width: "100%",
  },
  locationContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  addressContainer: {
    padding: 20,
  },
  address: {
    color: Colors.primary500,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
  },
  fallback: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  outlineButtonsContainer: {
    flexDirection: "row",
  },
});

export default PlaceDetails;
