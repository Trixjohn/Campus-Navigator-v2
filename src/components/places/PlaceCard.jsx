import { Pressable, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import { Colors, Radius, Spacing, Typography } from '@/constants/theme';

export default function PlaceCard({ place }) {
  const hasLocation = place.latitude !== null && place.longitude !== null;

  return (
    <Pressable
      onPress={() => router.push(`/place/${place.id}`)}
      accessibilityRole="button"
      accessibilityLabel={`${place.name}, ${place.category}. Open details`}
      style={({ pressed }) => [styles.card, pressed && styles.pressed]}>
      <View style={styles.headerRow}>
        <Text style={styles.name}>{place.name}</Text>
        {place.isSample && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>SAMPLE</Text>
          </View>
        )}
      </View>
      <Text style={styles.category}>{place.category}</Text>
      <Text style={styles.description}>{place.description}</Text>
      {!hasLocation && <Text style={styles.warning}>Map location not verified yet</Text>}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.surface,
    borderRadius: Radius.lg,
    padding: Spacing.md,
    marginBottom: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.border,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  pressed: { opacity: 0.7 },
  headerRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: Spacing.sm },
  name: { ...Typography.heading, color: Colors.text, flex: 1 },
  badge: {
    backgroundColor: Colors.accent,
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    borderRadius: Radius.sm,
  },
  badgeText: { fontSize: 11, fontWeight: '700', color: Colors.text },
  category: { ...Typography.caption, color: Colors.primary, marginTop: Spacing.xs },
  description: { ...Typography.body, color: Colors.textSecondary, marginTop: Spacing.sm },
  warning: { ...Typography.caption, color: Colors.danger, marginTop: Spacing.sm },
});