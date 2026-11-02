import { Pressable, ScrollView, StyleSheet, Text } from 'react-native';
import { Colors, Radius, Spacing, Typography } from '@/constants/theme';

export default function CategoryChips({ categories, selected, onSelect }) {
  const all = [null, ...categories];

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.scroll}
      contentContainerStyle={styles.row}>
      {all.map((category) => {
        const isSelected = category === selected;
        return (
          <Pressable
            key={category || 'all'}
            onPress={() => onSelect(category)}
            accessibilityRole="button"
            accessibilityState={{ selected: isSelected }}
            style={[styles.chip, isSelected && styles.chipSelected]}>
            <Text style={[styles.label, isSelected && styles.labelSelected]}>
              {category || 'All'}
            </Text>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: { flexGrow: 0, flexShrink: 0 },
  row: { gap: Spacing.sm, paddingVertical: Spacing.sm, alignItems: 'center' },
  chip: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: Radius.pill,
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  chipSelected: { backgroundColor: Colors.primary, borderColor: Colors.primary },
  label: { ...Typography.caption, color: Colors.text },
  labelSelected: { color: Colors.onPrimary, fontWeight: '600' },
});