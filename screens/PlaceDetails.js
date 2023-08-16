import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Share,
} from "react-native";
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

      const title =
        place.title.length <= 30
          ? place.title
          : place.title.substring(0, 30) + " ...";
      navigation.setOptions({
        title: title,
        headerRight: () => (
          <Pressable
            onPress={() => {
              Share.share({
                message: `Place: ${"" + title}\n\nAddress: ${
                  "" + place.location?.address
                }\n\n`,
                url: place?.imageUri,
              })
                .then((result) => console.log(result))
                .catch((errorMsg) => console.log(errorMsg));
            }}
          >
            <Image
              style={{ width: 30, height: 30 }}
              source={require("../assets/share-icon.png")}
            />
          </Pressable>
        ),
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

        <View style={styles.addressContainer}>
          <Text style={styles.label}>Place:{" " + fetchedPlace.title}</Text>
          <Text style={styles.label}>
            Address:{" " + fetchedPlace.location.address}
          </Text>
          <Text style={styles.label}>
            Latitude:{" " + fetchedPlace.location.lat.toFixed(4)}
          </Text>
          <Text style={styles.label}>
            Longitude:{" " + fetchedPlace.location.lng.toFixed(4)}
          </Text>
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
    marginTop: 6,
  },
  addressContainer: {
    paddingLeft: 12,
    paddingRight: 12,
    alignItems: "flex-start",
  },
  label: {
    color: Colors.primary200,
    textAlign: "center",
    // fontWeight: "bold",
    fontSize: 18,
    marginVertical: 8,
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
