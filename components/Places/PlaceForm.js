import { useCallback, useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { Colors } from "../../constants/colors";
import ImagePicker from "./ImagePicker";
import LocationPicker from "./LocationPicker";
import Button from "../../UI/Button";
import { Place } from "../../models/place";

function PlaceForm({ onCreatePlace }) {
  const [enteredTitle, setEnteredTitle] = useState("");
  const [selectedImage, setSelectedImage] = useState();
  const [pickedLocation, setPickedLocation] = useState();

  function changeTitleHandler(enteredText) {
    setEnteredTitle(enteredText);
  }

  function takeImageHandler(imageUri) {
    setSelectedImage(imageUri);
  }

  const pickLocationHandler = useCallback((location) => {
    setPickedLocation(location);
  }, []);

  function savePlaceHandler() {
    // console.log(enteredTitle);
    // console.log(selectedImage);
    // console.log(pickedLocation); {lat:, lng:, address}

    const placeData = new Place(enteredTitle, selectedImage, pickedLocation);
    onCreatePlace(placeData);
  }
  return (
    <ScrollView style={styles.form}>
      <View>
        {/* <Text style={styles.label}>Title</Text> */}
        <TextInput
          placeholder="Place title or short description"
          style={styles.input}
          onChangeText={changeTitleHandler}
          value={enteredTitle}
        />
      </View>
      <ImagePicker onTakeImage={takeImageHandler} />
      <LocationPicker onPickLocation={pickLocationHandler} />
      {enteredTitle && selectedImage && pickedLocation && (
        <View style={{ flex: 1, alignItems: "center", marginTop: 6 }}>
          <Pressable style={styles.saveButton} onPress={savePlaceHandler}>
            <Text style={styles.saveText}>Save Place</Text>
          </Pressable>
        </View>
      )}
    </ScrollView>
  );
}

export default PlaceForm;

const styles = StyleSheet.create({
  form: {
    flex: 1,
    padding: 10,
    backgroundColor: Colors.gray700,
  },
  label: {
    fontWeight: "bold",
    marginBottom: 4,
    color: Colors.primary200,
    fontSize: 16,
  },
  input: {
    borderRadius: 8,
    marginVertical: 6,
    paddingHorizontal: 8,
    paddingVertical: 4,
    fontSize: 16,
    backgroundColor: Colors.primary100,
  },
  saveButton: {
    width: "30%",
    paddingHorizontal: 12,
    paddingVertical: 6,
    margin: 4,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: Colors.primary400,
    borderRadius: 8,
  },
  saveText: {
    color: "#fff",
  },
});
