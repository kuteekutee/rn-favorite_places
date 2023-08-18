import { Image, View, Text, Pressable, StyleSheet } from "react-native";
import { Colors } from "../../constants/colors";
import Ionicons from "@expo/vector-icons/Ionicons";

function PlaceItem({ place, onSelect }) {
  return (
    <Pressable
      style={({ pressed }) => [styles.item, pressed && styles.pressed]}
      onPress={onSelect.bind(this, place.id)}
    >
      <Image style={styles.image} source={{ uri: place.imageUri }} />
      <View style={styles.infoContainer}>
        <View style={styles.info}>
          <Text style={styles.title}>{place.title}</Text>
          <Text style={styles.address}>{place.location.address}</Text>
        </View>
      </View>
      <View style={styles.iconContainer}>
        <Ionicons name="caret-forward" size={24} color={Colors.darkbrown} />
      </View>
    </Pressable>
  );
}

export default PlaceItem;

const styles = StyleSheet.create({
  item: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 8,
    marginVertical: 8,
    marginHorizontal: 8,
    backgroundColor: Colors.primary200,
    elevation: 2,
    shadowColor: "black",
    shadowOpacity: 0.15,
    shadowOffset: { width: 1, height: 1 },
    shadowRadius: 2,
    borderRadius: 8,
    height: 100,
  },
  pressed: {
    opacity: 0.9,
  },
  image: {
    flex: 4,
    borderBottomLeftRadius: 4,
    borderTopLeftRadius: 4,
    height: 100,
    overflow: "hidden",
  },
  infoContainer: {
    flex: 8,
    padding: 6,
  },
  info: {
    flex: 1,
    justifyContent: "space-evenly",
  },
  title: {
    fontWeight: "bold",
    fontSize: 16,
    color: Colors.darkbrown,
    // marginBottom: 8,
  },
  address: {
    fontSize: 14,
    color: Colors.darkbrown,
  },
  iconContainer: {
    flex: 1,
  },
});
