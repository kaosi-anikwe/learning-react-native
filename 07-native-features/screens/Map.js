import { Alert, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { useIsFocused } from "@react-navigation/native";
import { useCallback, useEffect, useLayoutEffect, useState } from "react";

import IconButton from "../components/UI/IconButton";

export default function Map({ navigation, route }) {
  const [selectedLocation, setSelectedLocation] = useState();
  const isFocused = useIsFocused();

  const readOnly = route.params?.readOnly;

  useEffect(() => {
    if (isFocused && route.params) {
      const mapPickedLocation = {
        lat: route.params.pickedLat,
        lng: route.params.pickedLng,
      };
      setSelectedLocation(mapPickedLocation);
    }
  }, []);

  const region = {
    latitude: 37.4219983,
    longitude: -122.084,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  function selectLocationHandler(event) {
    if (readOnly) {
      return;
    }

    const lat = event.nativeEvent.coordinate.latitude;
    const lng = event.nativeEvent.coordinate.longitude;

    setSelectedLocation({ lat, lng });
  }

  const savePicedLocationHandler = useCallback(() => {
    if (!selectedLocation) {
      Alert.alert(
        "No location picked!",
        "You have to pick a location (by tapping on the map) first!",
      );
      return;
    }

    navigation.navigate("AddPlace", {
      pickedLat: selectedLocation.lat,
      pickedLng: selectedLocation.lng,
    });
  }, [navigation, selectedLocation]);

  useLayoutEffect(() => {
    if (readOnly) {
      return;
    }

    navigation.setOptions({
      headerRight: ({ tintColor }) => (
        <IconButton
          icon="save"
          size={24}
          color={tintColor}
          onPress={savePicedLocationHandler}
        />
      ),
    });
  }, [navigation, route, savePicedLocationHandler]);

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
          }}
        />
      )}
    </MapView>
  );
}

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
});
