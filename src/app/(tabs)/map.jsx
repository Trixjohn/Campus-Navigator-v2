import { useEffect, useMemo, useState } from 'react';
import { ActivityIndicator, Pressable, StyleSheet, Text, View } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import CampusMap from '@/components/map/CampusMap';
import SelectedPlaceCard from '@/components/map/SelectedPlaceCard';
import { getAllPlaces } from '@/services/placesService';
import { describeLocationProblem, getUserLocation } from '@/services/locationService';
import { Colors, Radius, Spacing, Typography } from '@/constants/theme';

export default function MapScreen() {
  const { placeId, t } = useLocalSearchParams();
  const [selectedId, setSelectedId] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [locationNotice, setLocationNotice] = useState('');
  const [locating, setLocating] = useState(false);

  const all = useMemo(() => getAllPlaces(), []);
  const mappable = useMemo(
    () => all.filter((p) => p.latitude !== null && p.longitude !== null),
    [all]
  );
  const selected = mappable.find((p) => p.id === selectedId) || null;

  // "t" changes every time, so opening the same place twice still works.
  useEffect(() => {
    if (placeId) {
      setSelectedId(String(placeId));
    }
  }, [placeId, t]);
  async function handleMyLocation() {
    console.log('[location] button pressed');
    setLocating(true);
    setLocationNotice('Checking your location...');

    try {
      const result = await getUserLocation();
      console.log('[location] result status:', result.status);

      if (result.status === 'ok') {
        setUserLocation(result.coords);
        const meters = Math.round(result.accuracy || 0);
        setLocationNotice(
          meters > 0
            ? `Approximate position, about ${meters} m accuracy. It may be less accurate between buildings.`
            : 'Approximate position. It may be less accurate between buildings.'
        );
      } else {
        setUserLocation(null);
        setLocationNotice(describeLocationProblem(result.status));
      }
    } catch (error) {
      setUserLocation(null);
      setLocationNotice(describeLocationProblem('error'));
    } finally {
      setLocating(false);
    }
  }
  return (
    <View style={styles.container}>
      <CampusMap
        places={mappable}
        selectedId={selectedId}
        onSelect={setSelectedId}
        userLocation={userLocation}
      />

      <View style={styles.banner}>
        <Text style={styles.bannerText}>
          {mappable.length === 0
            ? 'No building locations are verified yet. The map shows the approximate campus area only.'
            : `${mappable.length} of ${all.length} places have a map location.`}
        </Text>
        {locationNotice !== '' && <Text style={styles.notice}>{locationNotice}</Text>}
      </View>

      <Pressable
        onPress={handleMyLocation}
        disabled={locating}
        accessibilityRole="button"
        accessibilityLabel="Show my location"
        style={({ pressed }) => [styles.locateButton, selected && styles.locateButtonRaised, pressed && styles.pressed]}>
        {locating ? (
          <ActivityIndicator color={Colors.onPrimary} />
        ) : (
          <Ionicons name="locate" size={24} color={Colors.onPrimary} />
        )}
      </Pressable>

      {selected && <SelectedPlaceCard place={selected} onClose={() => setSelectedId(null)} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  banner: {
    position: 'absolute',
    top: Spacing.md,
    left: Spacing.md,
    right: Spacing.md,
    backgroundColor: Colors.surface,
    borderRadius: Radius.md,
    padding: Spacing.sm,
    borderWidth: 1,
    borderColor: Colors.border,
    gap: Spacing.xs,
  },
  bannerText: { ...Typography.caption, color: Colors.text },
  notice: { ...Typography.caption, color: Colors.textSecondary },
  locateButton: {
    position: 'absolute',
    right: Spacing.md,
    bottom: Spacing.md,
    width: 52,
    height: 52,
    borderRadius: Radius.pill,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
  },
  locateButtonRaised: { bottom: 230 },
  pressed: { opacity: 0.7 },
});