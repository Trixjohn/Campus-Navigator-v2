import { Pressable, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import { Colors, Radius, Spacing, Typography } from '@/constants/theme';

export default function PlaceCard({ place }) {
  const hasLocation = place.latitude !== null && place.longitude !== null;
  const floorLine =
    place.floorInfo && place.floorInfo.length > 0 ? place.floorInfo[0] : place.description;
  const statusLabel = place.isSample ? 'Sample' : place.verified ? null : 'Unverified';

  return (
    <Pressable
      onPress={() => router.push(`/place/${place.id}`)}
      accessibilityRole="button"
      accessibilityLabel={`${place.name}, ${place.category}. Open details`}
      style={({ pressed }) => [styles.card, pressed && styles.pressed]}>
      <View style={styles.plate}>
        <Text style={styles.plateText} numberOfLines={2} adjustsFontSizeToFit minimumFontScale={0.6}>
          {place.shortName || place.name}
        </Text>
      </View>

      <View style={styles.body}>
        <Text style={styles.name}>{place.name}</Text>
        <Text style={styles.floor}>{floorLine}</Text>
        <View style={styles.metaRow}>
          {statusLabel && (
            <View style={styles.tag}>
              <Text style={styles.tagText}>{statusLabel}</Text>
            </View>
          )}
          {!hasLocation && <Text style={styles.noMap}>No map location yet</Text>}
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: Colors.surface,
    borderRadius: Radius.md,
    borderWidth: 1,
    borderColor: Colors.border,
    marginBottom: Spacing.sm,
    overflow: 'hidden',
  },
  pressed: { opacity: 0.7 },
  plate: {
    width: 76,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    padding: Spacing.xs,
  },
  plateText: {
    color: Colors.accent,
    fontSize: 15,
    fontWeight: '800',
    textAlign: 'center',
  },
  body: { flex: 1, padding: Spacing.md, gap: Spacing.xs },
  name: { ...Typography.heading, color: Colors.text },
  floor: { ...Typography.caption, color: Colors.textSecondary },
  metaRow: { flexDirection: 'row', alignItems: 'center', gap: Spacing.sm },
  tag: {
    backgroundColor: Colors.accent,
    paddingHorizontal: Spacing.sm,
    paddingVertical: 2,
    borderRadius: Radius.sm,
  },
  tagText: { fontSize: 12, fontWeight: '700', color: Colors.text },
  noMap: { ...Typography.caption, color: Colors.textSecondary },
});