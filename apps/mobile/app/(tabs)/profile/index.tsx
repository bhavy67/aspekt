import { useCallback, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import { useFocusEffect, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { Wallpaper } from '@aspekt/types';
import { Screen } from '../../../components/screen';
import { darkTheme, lightTheme } from '../../../lib/theme';
import { getWallpapers } from '../../../lib/queries';

const FAVOURITES_KEY = '@aspekt_favourites';

export default function SavedScreen() {
  const router = useRouter();
  const scheme = useColorScheme();
  const theme = scheme === 'dark' ? darkTheme : lightTheme;
  const [wallpapers, setWallpapers] = useState<Wallpaper[]>([]);
  const [loading, setLoading] = useState(true);

  useFocusEffect(
    useCallback(() => {
      let active = true;
      async function load() {
        setLoading(true);
        try {
          const raw = await AsyncStorage.getItem(FAVOURITES_KEY);
          const slugs: string[] = raw ? (JSON.parse(raw) as string[]) : [];
          if (!slugs.length) {
            if (active) {
              setWallpapers([]);
              setLoading(false);
            }
            return;
          }
          // Fetch all wallpapers and filter to saved slugs in order
          const all = await getWallpapers({ limit: 200, offset: 0 });
          const slugSet = new Set(slugs);
          const saved = all.filter((w) => slugSet.has(w.slug));
          // Preserve saved order (most recently added first)
          const slugIndex = Object.fromEntries(slugs.map((s, i) => [s, i]));
          saved.sort((a, b) => (slugIndex[a.slug] ?? 0) - (slugIndex[b.slug] ?? 0));
          if (active) setWallpapers(saved);
        } catch {
          if (active) setWallpapers([]);
        } finally {
          if (active) setLoading(false);
        }
      }
      void load();
      return () => {
        active = false;
      };
    }, []),
  );

  const fg = theme.colors.foreground;
  const muted = theme.colors.muted;

  return (
    <Screen edges={['top']}>
      <View style={styles.header}>
        <Text style={[styles.heading, { color: fg }]}>Saved</Text>
      </View>

      {loading ? (
        <View style={styles.center}>
          <ActivityIndicator color="#818CF8" />
        </View>
      ) : wallpapers.length === 0 ? (
        <View style={styles.center}>
          <Ionicons name="bookmark-outline" size={48} color={theme.colors.subtle} />
          <Text style={[styles.emptyTitle, { color: fg }]}>No saved wallpapers yet</Text>
          <Text style={[styles.emptyDesc, { color: muted }]}>
            Tap the heart on any wallpaper to save it here.
          </Text>
        </View>
      ) : (
        <FlatList
          data={wallpapers}
          keyExtractor={(item) => item.id}
          numColumns={2}
          contentContainerStyle={styles.grid}
          columnWrapperStyle={styles.row}
          ListHeaderComponent={
            <Text style={[styles.count, { color: muted }]}>{wallpapers.length} saved</Text>
          }
          renderItem={({ item }) => (
            <Pressable
              style={styles.card}
              onPress={() => router.push(`/wallpaper/${item.slug}` as never)}
            >
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
  header: { paddingHorizontal: 16, paddingTop: 8, paddingBottom: 12 },
  heading: { fontSize: 22, fontWeight: '700' },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingHorizontal: 32,
  },
  emptyTitle: { fontSize: 16, fontWeight: '600', textAlign: 'center', marginTop: 8 },
  emptyDesc: { fontSize: 13, textAlign: 'center', lineHeight: 19 },
  count: { fontSize: 12, paddingHorizontal: 8, paddingBottom: 4 },
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
