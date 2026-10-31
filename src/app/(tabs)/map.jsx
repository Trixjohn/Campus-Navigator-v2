import { useEffect, useMemo, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import CampusMap from '@/components/map/CampusMap';
import SelectedPlaceCard from '@/components/map/SelectedPlaceCard';
import { getAllPlaces } from '@/services/placesService';
import { Colors, Radius, Spacing, Typography } from '@/constants/theme';

export default function MapScreen() {
  const { placeId, t } = useLocalSearchParams();
  const [selectedId, setSelectedId] = useState(null);

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

  return (
    <View style={styles.container}>
      <CampusMap places={mappable} selectedId={selectedId} onSelect={setSelectedId} />
      <View style={styles.banner}>
        <Text style={styles.bannerText}>
          {mappable.length === 0
            ? 'No building locations are verified yet. The map shows the approximate campus area only.'
            : `${mappable.length} of ${all.length} places have a map location.`}
        </Text>
      </View>
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
  },
  bannerText: { ...Typography.caption, color: Colors.text },
});