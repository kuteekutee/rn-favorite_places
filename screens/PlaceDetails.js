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
        title:
          place.title.length <= 30
            ? place.title
            : place.title.substring(0, 30) + " ...",
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
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={{ uri: fetchedPlace.imageUri }} />
      </View>
      <View style={styles.locationContainer}>
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

        <View style={styles.detailsContainer}>
          <View style={styles.labelTextContainer}>
            <Text style={styles.label}>Place</Text>
            <Text style={styles.text}>{fetchedPlace.title}</Text>
          </View>
          <View style={styles.labelTextContainer}>
            <Text style={styles.label}>Address</Text>
            <Text style={styles.text}>{fetchedPlace.location.address}</Text>
          </View>
          <View style={styles.labelTextContainer}>
            <Text style={styles.label}>Latitude</Text>
            <Text style={styles.text}>
              {fetchedPlace.location.lat.toFixed(4)}
            </Text>
          </View>
          <View style={styles.labelTextContainer}>
            <Text style={styles.label}>Longitude</Text>
            <Text style={styles.text}>
              {fetchedPlace.location.lng.toFixed(4)}
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    alignItems: "center",
  },
  imageContainer: {
    padding: 12,
  },
  image: {
    minHeight: 300,
    width: "100%",
    borderColor: Colors.darkbrown,
    borderWidth: 1,
    borderRadius: 8,
  },
  locationContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  detailsContainer: {
    margiTop: 12,
    paddingLeft: 12,
    paddingRight: 12,
    alignItems: "flex-start",
  },
  labelTextContainer: {
    flexDirection: "row",
    marginTop: 8,
    flexWrap: "wrap",
  },
  label: {
    color: Colors.primary700,
    backgroundColor: Colors.primary200,
    textAlign: "center",
    fontWeight: "bold",
    padding: 4,
    borderColor: Colors.primary200,
    borderWidth: 1,
    borderRadius: 8,
    flex: 1,
    textAlignVertical: "center",
  },
  text: {
    color: Colors.primary200,
    textAlign: "center",
    paddingLeft: 4,
    paddingTop: 4,
    flex: 4,
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
