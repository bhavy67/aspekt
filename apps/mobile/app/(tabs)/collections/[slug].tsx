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
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import type { CollectionDetail } from '@aspekt/types';
import { Screen } from '../../../components/screen';
import { darkTheme, lightTheme } from '../../../lib/theme';
import { getCollection } from '../../../lib/queries';

const COVER_HEIGHT = 220;

export default function CollectionDetailScreen() {
  const { slug } = useLocalSearchParams<{ slug: string }>();
  const router = useRouter();
  const scheme = useColorScheme();
  const theme = scheme === 'dark' ? darkTheme : lightTheme;
  const [collection, setCollection] = useState<CollectionDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (slug) {
      getCollection(slug).then((data) => {
        setCollection(data);
        setLoading(false);
      });
    }
  }, [slug]);

  return (
    <Screen edges={['top']}>
      {loading ? (
        <View style={styles.center}>
          <ActivityIndicator color="#818CF8" />
        </View>
      ) : !collection ? (
        <View style={styles.center}>
          <Text style={{ color: theme.colors.muted }}>Collection not found.</Text>
        </View>
      ) : (
        <FlatList
          data={collection.wallpapers}
          keyExtractor={(item) => item.id}
          numColumns={2}
          contentContainerStyle={styles.list}
          columnWrapperStyle={styles.row}
          ListHeaderComponent={
            <View>
              {/* Cover */}
              <View style={[styles.cover, { backgroundColor: theme.colors.surface }]}>
                {collection.cover_url && (
                  <Image
                    source={{ uri: collection.cover_url }}
                    style={StyleSheet.absoluteFill}
                    resizeMode="cover"
                  />
                )}
                <View style={styles.coverOverlay} />
                <Pressable style={styles.backBtn} onPress={() => router.back()} hitSlop={12}>
                  <Ionicons name="chevron-back" size={20} color="#EDEDF2" />
                </Pressable>
              </View>

              {/* Info */}
              <View style={styles.info}>
                <Text style={[styles.name, { color: theme.colors.foreground }]}>
                  {collection.name}
                </Text>
                {collection.curator_name && (
                  <Text style={[styles.curator, { color: theme.colors.muted }]}>
                    Curated by {collection.curator_name}
                  </Text>
                )}
                {collection.description && (
                  <Text style={[styles.desc, { color: theme.colors.muted }]}>
                    {collection.description}
                  </Text>
                )}
                <Text style={[styles.count, { color: theme.colors.subtle }]}>
                  {collection.wallpapers.length} wallpaper
                  {collection.wallpapers.length !== 1 ? 's' : ''}
                </Text>
              </View>
            </View>
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
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  list: { paddingBottom: 32 },
  row: { paddingHorizontal: 8, gap: 8 },
  cover: { height: COVER_HEIGHT, width: '100%' },
  coverOverlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(11,11,14,0.3)',
  },
  backBtn: {
    position: 'absolute',
    top: 16,
    left: 16,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(11,11,14,0.55)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  info: { padding: 16, paddingBottom: 20 },
  name: { fontSize: 20, fontWeight: '700', marginBottom: 4 },
  curator: { fontSize: 12, marginBottom: 8 },
  desc: { fontSize: 13, lineHeight: 19, marginBottom: 8 },
  count: { fontSize: 11 },
  card: {
    flex: 1,
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 8,
    aspectRatio: 9 / 16,
  },
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
