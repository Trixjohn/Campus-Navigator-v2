import { useEffect, useRef } from 'react';
import { StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { CAMPUS_CAMERA } from '@/constants/campus';

export default function CampusMap({ places, selectedId, onSelect, userLocation }) {
  const mapRef = useRef(null);

  useEffect(() => {
    const place = places.find((p) => p.id === selectedId);
    if (place && mapRef.current) {
      mapRef.current.animateToRegion(
        {
          latitude: place.latitude,
          longitude: place.longitude,
          latitudeDelta: 0.002,
          longitudeDelta: 0.002,
        },
        400
      );
    }
  }, [selectedId, places]);

  useEffect(() => {
    if (userLocation && mapRef.current) {
      mapRef.current.animateToRegion(
        {
          latitude: userLocation.latitude,
          longitude: userLocation.longitude,
          latitudeDelta: 0.003,
          longitudeDelta: 0.003,
        },
        400
      );
    }
  }, [userLocation]);

  return (
    <MapView
      ref={mapRef}
      style={styles.map}
      initialRegion={CAMPUS_CAMERA}
      showsUserLocation={Boolean(userLocation)}
      accessibilityLabel="Campus map">
      {places.map((place) => (
        <Marker
          key={place.id}
          coordinate={{ latitude: place.latitude, longitude: place.longitude }}
          title={place.name}
          description={place.verified ? place.category : `${place.category} (unverified)`}
          onPress={() => onSelect(place.id)}
        />
      ))}
    </MapView>
  );
}

const styles = StyleSheet.create({
  map: { flex: 1 },
});