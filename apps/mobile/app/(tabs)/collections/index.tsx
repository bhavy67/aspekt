import { useCallback, useEffect, useState } from 'react';
import { FlatList, Image, Pressable, StyleSheet, Text, useColorScheme, View } from 'react-native';
import { useRouter } from 'expo-router';
import type { Collection } from '@aspekt/types';
import { Screen } from '../../../components/screen';
import { CollectionListSkeleton } from '../../../components/skeleton';
import { ErrorState } from '../../../components/error-state';
import { darkTheme, lightTheme } from '../../../lib/theme';
import { getCollections } from '../../../lib/queries';

export default function CollectionsScreen() {
  const scheme = useColorScheme();
  const theme = scheme === 'dark' ? darkTheme : lightTheme;
  const router = useRouter();
  const [collections, setCollections] = useState<Collection[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const load = useCallback(() => {
    setLoading(true);
    setError(false);
    getCollections()
      .then((data) => {
        setCollections(data);
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
        <Text style={[styles.title, { color: theme.colors.foreground }]}>Collections</Text>
      </View>

      {loading ? (
        <CollectionListSkeleton count={4} />
      ) : error ? (
        <ErrorState message="Could not load collections." onRetry={load} />
      ) : (
        <FlatList
          data={collections}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
          renderItem={({ item }) => (
            <Pressable
              style={[styles.card, { backgroundColor: theme.colors.surface }]}
              onPress={() => router.push(`/collection/${item.slug}`)}
            >
              {item.cover_url && (
                <Image
                  source={{ uri: item.cover_url }}
                  style={StyleSheet.absoluteFill}
                  resizeMode="cover"
                />
              )}
              <View style={styles.cardOverlay} />
              <View style={styles.cardContent}>
                <Text style={styles.cardName}>{item.name}</Text>
                {item.description && (
                  <Text style={styles.cardDesc} numberOfLines={2}>
                    {item.description}
                  </Text>
                )}
                {item.curator_name && (
                  <Text style={styles.cardCurator}>by {item.curator_name}</Text>
                )}
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
  title: { fontSize: 17, fontWeight: '700' },
  list: { padding: 16, gap: 12, paddingBottom: 32 },
  card: { borderRadius: 16, overflow: 'hidden', aspectRatio: 16 / 9, justifyContent: 'flex-end' },
  cardOverlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(11,11,14,0.65)',
  },
  cardContent: { padding: 16, position: 'relative' },
  cardName: { color: '#EDEDF2', fontSize: 16, fontWeight: '700' },
  cardDesc: { color: '#8686A0', fontSize: 12, marginTop: 4 },
  cardCurator: { color: '#46465A', fontSize: 11, marginTop: 6 },
});
