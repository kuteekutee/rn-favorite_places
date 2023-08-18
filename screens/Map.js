import { useCallback, useLayoutEffect, useState } from "react";
import { Alert, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";
import IconButton from "../UI/IconButton";

function Map({ navigation, route }) {
  // const [defaultLocation, setDefaultLocation] = useState();

  // const getLocation = async () => {
  //   let location = await getCurrentPositionAsync({});

  //   return {
  //     lat: location.coords.latitude,
  //     lng: location.coords.longitude,
  //   };
  // };

  const initialLocation = route.params
    ? {
        lat: route.params.initialLat,
        lng: route.params.initialLng,
      }
    : null;

  const [selectedLocation, setSelectedLocation] = useState(initialLocation);

  const region = {
    latitude: initialLocation ? initialLocation.lat : 1.347797,
    longitude: initialLocation ? initialLocation.lng : 103.9477,
    latitudeDelta: 0.005,
    longitudeDelta: 0.005,
  };

  function selectLocationHandler(event) {
    if (initialLocation) {
      return;
    }
    const lat = event.nativeEvent.coordinate.latitude;
    const lng = event.nativeEvent.coordinate.longitude;

    setSelectedLocation({ lat: lat, lng: lng });
  }

  const savedPickedLocationhandler = useCallback(() => {
    if (!selectedLocation) {
      Alert.alert(
        "No location picked!",
        "You have to pick a location by tapping on the map"
      );
      return;
    }
    navigation.navigate("AddPlace", {
      pickedLat: selectedLocation.lat,
      pickedLng: selectedLocation.lng,
    });
  }, [navigation, selectedLocation]);

  useLayoutEffect(() => {
    if (initialLocation) {
      return;
    }
    navigation.setOptions({
      headerRight: ({ tintColor }) => (
        <IconButton
          icon="save"
          size={24}
          color={tintColor}
          onPress={savedPickedLocationhandler}
        />
      ),
    });
  }, [navigation, savedPickedLocationhandler]);
  return (
    <MapView
      style={styles.map}
      initialRegion={region}
      onPress={selectLocationHandler}
    >
      {selectedLocation && (
        <Marker
          title="Picked Location"
          coordinate={{
            latitude: selectedLocation.lat,
            longitude: selectedLocation.lng,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
          }}
        />
      )}
    </MapView>
  );
}

export default Map;

const styles = StyleSheet.create({
  map: {
    margin: 20,
    borderRadius: 20,
    flex: 1,
  },
});
