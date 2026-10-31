import { StyleSheet, Text, View } from 'react-native';
import CampusMap from '@/components/map/CampusMap';
import { getAllPlaces } from '@/services/placesService';
import { Colors, Radius, Spacing, Typography } from '@/constants/theme';

export default function MapScreen() {
  const all = getAllPlaces();
  const mappable = all.filter((p) => p.latitude !== null && p.longitude !== null);

  return (
    <View style={styles.container}>
      <CampusMap places={mappable} />
      <View style={styles.banner}>
        <Text style={styles.bannerText}>
          {mappable.length === 0
            ? 'No building locations are verified yet. The map shows the approximate campus area only.'
            : `${mappable.length} of ${all.length} places have a map location.`}
        </Text>
      </View>
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