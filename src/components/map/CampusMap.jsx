import { StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { CAMPUS_CAMERA } from '@/constants/campus';

export default function CampusMap({ places }) {
  return (
    <MapView
      style={styles.map}
      initialRegion={CAMPUS_CAMERA}
      accessibilityLabel="Campus map">
      {places.map((place) => (
        <Marker
          key={place.id}
          coordinate={{ latitude: place.latitude, longitude: place.longitude }}
          title={place.name}
          description={place.verified ? place.category : `${place.category} (unverified)`}
        />
      ))}
    </MapView>
  );
}

const styles = StyleSheet.create({
  map: { flex: 1 },
});