import { useMemo, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import SearchBar from '@/components/ui/SearchBar';
import CategoryChips from '@/components/places/CategoryChips';
import PlaceCard from '@/components/places/PlaceCard';
import { getCategories, searchPlaces } from '@/services/placesService';
import { Colors, Spacing, Typography } from '@/constants/theme';

export default function PlacesScreen() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState(null);

  const categories = useMemo(() => getCategories(), []);
  const results = useMemo(() => searchPlaces(query, category), [query, category]);

  return (
    <View style={styles.container}>
      <SearchBar value={query} onChangeText={setQuery} placeholder="Search buildings, offices, facilities" />
      <CategoryChips categories={categories} selected={category} onSelect={setCategory} />

      <FlatList
        data={results}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <PlaceCard place={item} />}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyTitle}>No places found</Text>
            <Text style={styles.emptyNote}>
              Try a different word, or choose All. If a place is missing, it has not been verified yet.
            </Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background, padding: Spacing.md },
  list: { paddingTop: Spacing.sm, paddingBottom: Spacing.lg },
  empty: { alignItems: 'center', padding: Spacing.xl },
  emptyTitle: { ...Typography.heading, color: Colors.text, marginBottom: Spacing.sm },
  emptyNote: { ...Typography.body, color: Colors.textSecondary, textAlign: 'center' },
});