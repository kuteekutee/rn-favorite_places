import { useEffect, useState } from "react";
import PlacesList from "../components/Places/PlacesList";
import { useIsFocused } from "@react-navigation/native";
import { fetchPlaces } from "../util/database";

function AllPlaces({ route }) {
  const [loadedPlaces, setLoadedPlaces] = useState([]);
  const isFoucused = useIsFocused();
  useEffect(() => {
    async function loadPlaces() {
      const places = await fetchPlaces();
      setLoadedPlaces(places);
    }
    if (isFoucused) {
      loadPlaces();
      // setLoadedPlaces((currPlaces) => [...currPlaces, route.params.place]);
    }
  }, [isFoucused]);
  return <PlacesList places={loadedPlaces} />;
}

export default AllPlaces;
