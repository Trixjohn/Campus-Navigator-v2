import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Stack, useLocalSearchParams } from 'expo-router';
import { getPlaceById } from '@/services/placesService';
import { Colors, Radius, Spacing, Typography } from '@/constants/theme';

export default function PlaceDetailScreen() {
  const { id } = useLocalSearchParams();
  const place = getPlaceById(String(id));

  const headerOptions = {
    headerShown: true,
    title: 'Place details',
    headerStyle: { backgroundColor: Colors.primary },
    headerTintColor: Colors.onPrimary,
  };

  if (!place) {
    return (
      <View style={styles.centered}>
        <Stack.Screen options={headerOptions} />
        <Text style={styles.title}>Place not found</Text>
        <Text style={styles.note}>This place is not in the verified directory. Go back and try another search.</Text>
      </View>
    );
  }

  const hasLocation = place.latitude !== null && place.longitude !== null;

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Stack.Screen options={headerOptions} />

      <View style={styles.card}>
        {place.isSample && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>SAMPLE DATA - NOT A REAL USTP LOCATION</Text>
          </View>
        )}
        <Text style={styles.title}>{place.name}</Text>
        <Text style={styles.category}>{place.category}</Text>
        <Text style={styles.body}>{place.description}</Text>
      </View>
            <View style={styles.card}>
        <Text style={styles.heading}>Floor information</Text>
        {place.floorInfo.map((line) => (
          <Text key={line} style={styles.body}>
            {'\u2022'} {line}
          </Text>
        ))}
        <Text style={styles.note}>From published USTP pages. Room numbers are not available yet.</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.heading}>Facilities</Text>
        {place.facilities.length > 0 ? (
          place.facilities.map((item) => (
            <Text key={item} style={styles.body}>
              {'\u2022'} {item}
            </Text>
          ))
        ) : (
          <Text style={styles.note}>No facilities listed.</Text>
        )}
      </View>

      <View style={styles.card}>
        <Text style={styles.heading}>Location</Text>
        <Text style={hasLocation ? styles.body : styles.warning}>
          {hasLocation
            ? 'A verified map location exists. Map and directions are coming in a later phase.'
            : 'Map location not verified yet. Directions are not available for this place.'}
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.heading}>Information status</Text>
        <Text style={styles.body}>{place.verified ? 'Verified' : 'Not verified yet'}</Text>
        <Text style={styles.note}>Source: {place.sourceNote}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  content: { padding: Spacing.md, gap: Spacing.md },
  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: Spacing.lg,
    backgroundColor: Colors.background,
  },
  card: {
    backgroundColor: Colors.surface,
    borderRadius: Radius.lg,
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.border,
    gap: Spacing.xs,
  },
  badge: {
    alignSelf: 'flex-start',
    backgroundColor: Colors.accent,
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    borderRadius: Radius.sm,
    marginBottom: Spacing.sm,
  },
  badgeText: { fontSize: 11, fontWeight: '700', color: Colors.text },
  title: { ...Typography.title, color: Colors.text },
  category: { ...Typography.caption, color: Colors.primary },
  heading: { ...Typography.heading, color: Colors.text, marginBottom: Spacing.xs },
  body: { ...Typography.body, color: Colors.text },
  note: { ...Typography.caption, color: Colors.textSecondary },
  warning: { ...Typography.body, color: Colors.danger },
});