import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { getAllPlaces } from '@/services/placesService';
import { Colors, Radius, Spacing, Typography } from '@/constants/theme';

function ActionCard({ icon, title, note, onPress }) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={`${title}. ${note}`}
      style={({ pressed }) => [styles.actionCard, pressed && styles.pressed]}>
      <View style={styles.actionIcon}>
        <Ionicons name={icon} size={24} color={Colors.onPrimary} />
      </View>
      <View style={styles.actionText}>
        <Text style={styles.actionTitle}>{title}</Text>
        <Text style={styles.actionNote}>{note}</Text>
      </View>
      <Ionicons name="chevron-forward" size={20} color={Colors.textSecondary} />
    </Pressable>
  );
}

export default function HomeScreen() {
  const total = getAllPlaces().length;

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>USTP Campus Navigator</Text>
        <Text style={styles.headerSub}>Student Guide</Text>
      </View>

      <Pressable
        onPress={() => router.push('/places')}
        accessibilityRole="button"
        accessibilityLabel="Search buildings, offices and facilities"
        style={styles.search}>
        <Ionicons name="search" size={20} color={Colors.textSecondary} />
        <Text style={styles.searchText}>Search buildings, offices, facilities</Text>
      </Pressable>

      <ActionCard
        icon="chatbubble-ellipses"
        title="Ask about campus"
        note="Find where something is"
        onPress={() => router.push('/ask-ai')}
      />
      <ActionCard
        icon="map"
        title="Campus map"
        note="See places and your location"
        onPress={() => router.push('/map')}
      />
      <ActionCard
        icon="business"
        title="Browse places"
        note={`${total} places listed, none verified yet`}
        onPress={() => router.push('/places')}
      />

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Announcements</Text>
        <Text style={styles.sectionNote}>No approved announcements yet.</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Emergency information</Text>
        <Text style={styles.sectionNote}>
          No verified emergency information has been added to this app yet. In an emergency, ask campus
          security or call your local emergency number.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  content: { padding: Spacing.md, gap: Spacing.md },
  header: {
    backgroundColor: Colors.primary,
    borderRadius: Radius.lg,
    padding: Spacing.lg,
    gap: Spacing.xs,
  },
  headerTitle: { ...Typography.title, color: Colors.onPrimary },
  headerSub: { ...Typography.caption, color: Colors.onPrimary },
  search: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    backgroundColor: Colors.surface,
    borderRadius: Radius.pill,
    borderWidth: 1,
    borderColor: Colors.border,
    paddingHorizontal: Spacing.md,
    height: 46,
  },
  searchText: { ...Typography.body, color: Colors.textSecondary },
  actionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    backgroundColor: Colors.surface,
    borderRadius: Radius.lg,
    borderWidth: 1,
    borderColor: Colors.border,
    padding: Spacing.md,
  },
  pressed: { opacity: 0.7 },
  actionIcon: {
    width: 44,
    height: 44,
    borderRadius: Radius.pill,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionText: { flex: 1 },
  actionTitle: { ...Typography.heading, color: Colors.text },
  actionNote: { ...Typography.caption, color: Colors.textSecondary },
  section: {
    backgroundColor: Colors.surface,
    borderRadius: Radius.lg,
    borderWidth: 1,
    borderColor: Colors.border,
    padding: Spacing.md,
    gap: Spacing.xs,
  },
  sectionTitle: { ...Typography.heading, color: Colors.text },
  sectionNote: { ...Typography.body, color: Colors.textSecondary },
});