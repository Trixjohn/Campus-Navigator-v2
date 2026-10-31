import { Pressable, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import { Colors, Radius, Spacing, Typography } from '@/constants/theme';

export default function SelectedPlaceCard({ place, onClose }) {
  return (
    <View style={styles.card}>
      <View style={styles.headerRow}>
        <Text style={styles.name}>{place.name}</Text>
        <Pressable
          onPress={onClose}
          accessibilityRole="button"
          accessibilityLabel="Close place card"
          hitSlop={8}>
          <Text style={styles.close}>Close</Text>
        </Pressable>
      </View>
      <Text style={styles.category}>{place.category}</Text>
      {!place.verified && <Text style={styles.warning}>Unverified - location may be inaccurate</Text>}
      {place.floorInfo.map((line) => (
        <Text key={line} style={styles.body}>
          {'\u2022'} {line}
        </Text>
      ))}
      <Pressable
        onPress={() => router.push(`/place/${place.id}`)}
        accessibilityRole="button"
        accessibilityLabel={`Open details for ${place.name}`}
        style={({ pressed }) => [styles.button, pressed && styles.pressed]}>
        <Text style={styles.buttonText}>View details</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    position: 'absolute',
    bottom: Spacing.md,
    left: Spacing.md,
    right: Spacing.md,
    backgroundColor: Colors.surface,
    borderRadius: Radius.lg,
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.border,
    gap: Spacing.xs,
    elevation: 4,
  },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', gap: Spacing.sm },
  name: { ...Typography.heading, color: Colors.text, flex: 1 },
  close: { ...Typography.caption, color: Colors.primary, fontWeight: '600' },
  category: { ...Typography.caption, color: Colors.primary },
  warning: { ...Typography.caption, color: Colors.danger },
  body: { ...Typography.body, color: Colors.text },
  button: {
    marginTop: Spacing.sm,
    backgroundColor: Colors.primary,
    borderRadius: Radius.pill,
    paddingVertical: Spacing.sm,
    alignItems: 'center',
  },
  pressed: { opacity: 0.7 },
  buttonText: { ...Typography.body, color: Colors.onPrimary, fontWeight: '600' },
});