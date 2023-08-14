import { useState } from "react";
import { Text, View, Button, Alert, Image, StyleSheet } from "react-native";
import {
  launchCameraAsync,
  useCameraPermissions,
  photoPermissions,
  PermissionStatus,
} from "expo-image-picker";
import { Colors } from "../../constants/colors";
import OutlinedButton from "../../UI/OutlinedButton";

function ImagePicker({ onTakeImage }) {
  const [pickedImage, setPickedImage] = useState();
  const [cameraPermissionInformation, requestPermission] =
    useCameraPermissions();

  async function verifyPermissions() {
    if (cameraPermissionInformation.status === PermissionStatus.UNDETERMINED) {
      const permissionResponse = await requestPermission();
      console.log(permissionResponse.status);
      return permissionResponse.granted;
    }
    if (cameraPermissionInformation.status === PermissionStatus.DENIED) {
      Alert.alert(
        "Insufficient Permissions",
        "You need to grant camera permissions to use this app."
      );
      return false;
    }

    return true;
  }
  async function takeImageHandler() {
    const hasPermission = await verifyPermissions();

    if (!hasPermission) {
      return;
    }

    const image = await launchCameraAsync({
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.5,
    });
    setPickedImage(image.assets[0].uri);
    onTakeImage(image.assets[0].uri);
  }

  let imagePreview = <Text style={styles.textMsg}>No image taken yet</Text>;

  if (pickedImage) {
    imagePreview = <Image style={styles.image} source={{ uri: pickedImage }} />;
  }
  return (
    <View>
      <View style={styles.imagePreview}>{imagePreview}</View>
      <View style={styles.centerButton}>
        <OutlinedButton icon="camera" onPress={takeImageHandler}>
          Take Image
        </OutlinedButton>
      </View>
    </View>
  );
}

export default ImagePicker;

const styles = StyleSheet.create({
  imagePreview: {
    width: "100%",
    height: 200,
    marginVertical: 4,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.primary100,
    borderRadius: 8,
  },
  centerButton: {
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  textMsg: {
    color: Colors.primary400,
  },
});
