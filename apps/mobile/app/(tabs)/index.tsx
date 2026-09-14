import { useCallback, useEffect, useState } from 'react';
import { FlatList, Image, Pressable, StyleSheet, Text, useColorScheme, View } from 'react-native';
import { useRouter } from 'expo-router';
import type { Wallpaper } from '@aspekt/types';
import { Screen } from '../../components/screen';
import { WallpaperGridSkeleton } from '../../components/skeleton';
import { ErrorState } from '../../components/error-state';
import { darkTheme, lightTheme } from '../../lib/theme';
import { getWallpapers } from '../../lib/queries';

export default function HomeScreen() {
  const scheme = useColorScheme();
  const theme = scheme === 'dark' ? darkTheme : lightTheme;
  const router = useRouter();
  const [wallpapers, setWallpapers] = useState<Wallpaper[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const load = useCallback(() => {
    setLoading(true);
    setError(false);
    getWallpapers({ limit: 30 })
      .then((data) => {
        setWallpapers(data);
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
      <View style={[styles.header, { borderBottomColor: theme.colors.border }]}>
        <Text style={[styles.title, { color: theme.colors.foreground }]}>ASPEKT</Text>
      </View>

      {loading ? (
        <WallpaperGridSkeleton count={12} />
      ) : error ? (
        <ErrorState message="Could not load wallpapers." onRetry={load} />
      ) : (
        <FlatList
          data={wallpapers}
          keyExtractor={(item) => item.id}
          numColumns={2}
          contentContainerStyle={styles.grid}
          columnWrapperStyle={styles.row}
          renderItem={({ item }) => (
            <Pressable style={styles.card} onPress={() => router.push(`/wallpaper/${item.slug}`)}>
              <Image
                source={{ uri: item.thumbnail_url }}
                style={[styles.cardImage, { backgroundColor: theme.colors.surface }]}
                resizeMode="cover"
              />
              <View style={styles.cardOverlay}>
                <Text style={styles.cardTitle} numberOfLines={1}>
                  {item.title}
                </Text>
              </View>
            </Pressable>
          )}
        />
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  title: { fontSize: 17, fontWeight: '700', letterSpacing: 2, textTransform: 'uppercase' },
  grid: { padding: 8, paddingBottom: 32 },
  row: { gap: 8 },
  card: { flex: 1, borderRadius: 12, overflow: 'hidden', marginBottom: 8, aspectRatio: 16 / 9 },
  cardImage: { width: '100%', height: '100%', position: 'absolute' },
  cardOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 8,
    backgroundColor: 'rgba(11,11,14,0.55)',
  },
  cardTitle: { color: '#EDEDF2', fontSize: 11, fontWeight: '600' },
});
