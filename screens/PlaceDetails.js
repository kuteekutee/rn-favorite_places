import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
  Share,
} from "react-native";
// import OutlinedButton from "../UI/OutlinedButton";
import { Colors } from "../constants/colors";
import { useEffect, useState } from "react";
import { deletePlace, fetchPlaceDetails } from "../util/database";

import { MaterialIcons } from "@expo/vector-icons"; // Import

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

  function deletePlaceHandler() {
    Alert.alert(
      "Delete Place",
      `Are you sure you want to delete your favorite place ${fetchedPlace.title}`,
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "OK",
          onPress: async () => {
            await deletePlace(selectedPlaceId);
            navigation.goBack();
            console.log("OK Pressed");
          },
        },
      ]
    );
  }

  const OutlinedButton = ({ icon, onPress, children }) => {
    return (
      <TouchableOpacity style={styles.button} onPress={onPress}>
        <MaterialIcons name={icon} size={24} color={Colors.primary200} />
        <Text style={styles.buttonText}>{children}</Text>
      </TouchableOpacity>
    );
  };

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

        <View style={styles.addressContainer}>
          <Text style={styles.title}>Place:</Text>
          <Text style={styles.addressText}>{fetchedPlace.title}</Text>
          <Text style={styles.title}>Address:</Text>
          <Text style={styles.addressText}>
            {fetchedPlace.location.address}
          </Text>
          <View style={{ flexDirection: "row" }}>
            <Text style={styles.title}>Lat:</Text>
            <Text style={styles.label}>
              {"  " + fetchedPlace.location.lat.toFixed(4) + "  "}
            </Text>
            <Text style={styles.title}>Long:</Text>
            <Text style={styles.label}>
              {"  " + fetchedPlace.location.lng.toFixed(4) + "  "}
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
    // marginTop: 10,
    // top: 10,
  },
  addressContainer: {
    paddingLeft: 12,
    paddingRight: 12,
    alignItems: "center",
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
  title: {
    color: Colors.primary200,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 20,
    marginVertical: 2,
    textTransform: "uppercase",
    textDecorationLine: "underline",
    top: 5,
  },
  addressText: {
    color: Colors.primary200,
    textAlign: "center",
    fontSize: 15,
    marginVertical: 13,
    top: -10,
  },
  button: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 50, // Make the button oval-shaped
    backgroundColor: "transparent",
    elevation: 2, // Elevation (for shadow)
    shadowColor: "black",
    shadowOpacity: 0.2,
    shadowRadius: 4,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    marginVertical: 10, // Adjust this value for spacing
    marginHorizontal: 10, // Adjust this value for spacing
  },
  buttonText: {
    color: Colors.primary200,
    fontSize: 16,
    marginLeft: 8,
  },
});

export default PlaceDetails;
