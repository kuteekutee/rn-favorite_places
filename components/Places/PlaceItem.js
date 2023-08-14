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
        <Ionicons name="caret-forward" size={24} color={Colors.gray700} />
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
  },
  pressed: {
    opacity: 0.9,
  },
  image: {
    flex: 4,
    borderBottomLeftRadius: 4,
    borderTopLeftRadius: 4,
    height: 90,
  },
  infoContainer: {
    flex: 8,
    padding: 6,
  },
  info: {
    flex: 1,
    justifyContent: "flex-start",
  },
  title: {
    fontWeight: "bold",
    fontSize: 12,
    color: Colors.gray700,
    marginBottom: 8,
  },
  address: {
    fontSize: 12,
    color: Colors.gray700,
  },
  iconContainer: {
    flex: 1,
  },
});
