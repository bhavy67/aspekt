import { useEffect, useState } from 'react';
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
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import type { Wallpaper } from '@aspekt/types';
import { Screen } from '../../../components/screen';
import { darkTheme, lightTheme } from '../../../lib/theme';
import { useAuth } from '../../../context/auth-context';
import { getFavourites } from '../../../lib/queries';

export default function FavouritesScreen() {
  const router = useRouter();
  const scheme = useColorScheme();
  const theme = scheme === 'dark' ? darkTheme : lightTheme;
  const { user } = useAuth();
  const [wallpapers, setWallpapers] = useState<Wallpaper[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }
    getFavourites(user.id).then((data) => {
      setWallpapers(data);
      setLoading(false);
    });
  }, [user]);

  return (
    <Screen edges={['top']}>
      <View style={[styles.header, { borderBottomColor: theme.colors.border }]}>
        <Pressable style={styles.backBtn} onPress={() => router.back()} hitSlop={12}>
          <Ionicons name="chevron-back" size={22} color={theme.colors.foreground} />
        </Pressable>
        <Text style={[styles.title, { color: theme.colors.foreground }]}>Favourites</Text>
        <View style={{ width: 36 }} />
      </View>

      {loading ? (
        <View style={styles.center}>
          <ActivityIndicator color="#818CF8" />
        </View>
      ) : !user ? (
        <View style={styles.center}>
          <Ionicons name="heart-outline" size={40} color={theme.colors.subtle} />
          <Text style={[styles.emptyTitle, { color: theme.colors.foreground }]}>
            Sign in to see favourites
          </Text>
          <Pressable style={styles.signInBtn} onPress={() => router.push('/auth/sign-in' as never)}>
            <Text style={styles.signInText}>Sign in</Text>
          </Pressable>
        </View>
      ) : wallpapers.length === 0 ? (
        <View style={styles.center}>
          <Ionicons name="heart-outline" size={40} color={theme.colors.subtle} />
          <Text style={[styles.emptyTitle, { color: theme.colors.foreground }]}>
            No favourites yet
          </Text>
          <Text style={[styles.emptyDesc, { color: theme.colors.muted }]}>
            Tap the ♡ on any wallpaper to save it here.
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
            <Text style={[styles.count, { color: theme.colors.muted }]}>
              {wallpapers.length} saved
            </Text>
          }
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
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  backBtn: { width: 36, height: 36, alignItems: 'center', justifyContent: 'center' },
  title: { flex: 1, textAlign: 'center', fontSize: 17, fontWeight: '700' },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingHorizontal: 32,
  },
  emptyTitle: { fontSize: 16, fontWeight: '600', textAlign: 'center' },
  emptyDesc: { fontSize: 13, textAlign: 'center', lineHeight: 19 },
  signInBtn: {
    marginTop: 8,
    backgroundColor: '#818CF8',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 28,
  },
  signInText: { color: '#0B0B0E', fontSize: 14, fontWeight: '700' },
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
