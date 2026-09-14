import { useCallback, useEffect, useState } from 'react';
import { Image, Pressable, ScrollView, StyleSheet, Text, useColorScheme, View } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import type { Category, Mood } from '@aspekt/types';
import { Screen } from '../../../components/screen';
import { CategoryGridSkeleton } from '../../../components/skeleton';
import { ErrorState } from '../../../components/error-state';
import { darkTheme, lightTheme } from '../../../lib/theme';
import { getCategories, getMoods } from '../../../lib/queries';

export default function ExploreScreen() {
  const scheme = useColorScheme();
  const theme = scheme === 'dark' ? darkTheme : lightTheme;
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>([]);
  const [moods, setMoods] = useState<Mood[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const load = useCallback(() => {
    setLoading(true);
    setError(false);
    Promise.all([getCategories(), getMoods()])
      .then(([cats, ms]) => {
        setCategories(cats);
        setMoods(ms);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  return (
    <Screen edges={['top']}>
      {loading ? (
        <ScrollView contentContainerStyle={styles.container}>
          <View style={styles.headingRow}>
            <Text style={[styles.heading, { color: theme.colors.foreground }]}>Explore</Text>
          </View>
          <Text style={[styles.section, { color: theme.colors.muted }]}>CATEGORIES</Text>
          <CategoryGridSkeleton count={6} />
          <Text style={[styles.section, { color: theme.colors.muted, marginTop: 24 }]}>MOODS</Text>
          <CategoryGridSkeleton count={4} />
        </ScrollView>
      ) : error ? (
        <ErrorState message="Could not load categories." onRetry={load} />
      ) : (
        <ScrollView contentContainerStyle={styles.container}>
          <View style={styles.headingRow}>
            <Text style={[styles.heading, { color: theme.colors.foreground }]}>Explore</Text>
            <Pressable
              style={[styles.searchBtn, { backgroundColor: theme.colors.surface }]}
              onPress={() => router.push('/(tabs)/explore/search' as never)}
              hitSlop={8}
            >
              <Ionicons name="search" size={18} color={theme.colors.muted} />
            </Pressable>
          </View>

          <Text style={[styles.section, { color: theme.colors.muted }]}>CATEGORIES</Text>
          <View style={styles.grid}>
            {categories.map((cat) => (
              <Pressable
                key={cat.id}
                style={[styles.categoryCard, { backgroundColor: theme.colors.surface }]}
                onPress={() => router.push(`/(tabs)/explore/category/${cat.slug}` as never)}
              >
                {cat.cover_url && (
                  <Image
                    source={{ uri: cat.cover_url }}
                    style={StyleSheet.absoluteFill}
                    resizeMode="cover"
                  />
                )}
                <View style={styles.cardOverlay} />
                <Text style={styles.categoryLabel}>{cat.name}</Text>
              </Pressable>
            ))}
          </View>

          <Text style={[styles.section, { color: theme.colors.muted, marginTop: 24 }]}>MOODS</Text>
          <View style={styles.moodGrid}>
            {moods.map((m) => (
              <Pressable
                key={m.id}
                style={[styles.moodCard, { backgroundColor: theme.colors.surface }]}
                onPress={() => router.push(`/(tabs)/explore/mood/${m.slug}` as never)}
              >
                {m.cover_url && (
                  <Image
                    source={{ uri: m.cover_url }}
                    style={StyleSheet.absoluteFill}
                    resizeMode="cover"
                  />
                )}
                <View style={styles.cardOverlay} />
                <Text style={styles.categoryLabel}>{m.name}</Text>
              </Pressable>
            ))}
          </View>
        </ScrollView>
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, paddingBottom: 32 },
  headingRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
  heading: { flex: 1, fontSize: 22, fontWeight: '700' },
  searchBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  section: { fontSize: 11, fontWeight: '600', letterSpacing: 1.2, marginBottom: 10 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  categoryCard: {
    width: '31%',
    aspectRatio: 1,
    borderRadius: 12,
    overflow: 'hidden',
    justifyContent: 'flex-end',
    padding: 8,
  },
  moodGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  moodCard: {
    width: '47%',
    aspectRatio: 16 / 9,
    borderRadius: 12,
    overflow: 'hidden',
    justifyContent: 'flex-end',
    padding: 10,
  },
  cardOverlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(11,11,14,0.45)',
  },
  categoryLabel: { color: '#EDEDF2', fontSize: 12, fontWeight: '700', position: 'relative' },
});
