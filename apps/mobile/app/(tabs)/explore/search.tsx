import { useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  useColorScheme,
  View,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import type { Wallpaper } from '@aspekt/types';
import { Screen } from '../../../components/screen';
import { darkTheme, lightTheme } from '../../../lib/theme';
import { searchWallpapers } from '../../../lib/queries';

export default function SearchScreen() {
  const router = useRouter();
  const scheme = useColorScheme();
  const theme = scheme === 'dark' ? darkTheme : lightTheme;
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Wallpaper[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const inputRef = useRef<TextInput>(null);
  const debounce = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  function handleChange(text: string) {
    setQuery(text);
    if (debounce.current) clearTimeout(debounce.current);
    if (!text.trim()) {
      setResults([]);
      setSearched(false);
      setLoading(false);
      return;
    }
    setLoading(true);
    debounce.current = setTimeout(async () => {
      const data = await searchWallpapers(text.trim());
      setResults(data);
      setLoading(false);
      setSearched(true);
    }, 400);
  }

  function handleClear() {
    setQuery('');
    setResults([]);
    setSearched(false);
    inputRef.current?.focus();
  }

  return (
    <Screen edges={['top']}>
      {/* Search bar */}
      <View style={[styles.searchBar, { borderBottomColor: theme.colors.border }]}>
        <Pressable style={styles.backBtn} onPress={() => router.back()} hitSlop={12}>
          <Ionicons name="chevron-back" size={22} color={theme.colors.foreground} />
        </Pressable>
        <View style={[styles.inputWrap, { backgroundColor: theme.colors.surface }]}>
          <Ionicons name="search" size={16} color={theme.colors.muted} />
          <TextInput
            ref={inputRef}
            style={[styles.input, { color: theme.colors.foreground }]}
            placeholder="Search wallpapers…"
            placeholderTextColor={theme.colors.muted}
            value={query}
            onChangeText={handleChange}
            returnKeyType="search"
            autoCorrect={false}
            autoCapitalize="none"
          />
          {query.length > 0 && (
            <Pressable onPress={handleClear} hitSlop={8}>
              <Ionicons name="close-circle" size={16} color={theme.colors.muted} />
            </Pressable>
          )}
        </View>
      </View>

      {/* Results */}
      {loading ? (
        <View style={styles.center}>
          <ActivityIndicator color="#818CF8" />
        </View>
      ) : searched && results.length === 0 ? (
        <View style={styles.center}>
          <Ionicons name="search-outline" size={40} color={theme.colors.subtle} />
          <Text style={[styles.emptyTitle, { color: theme.colors.foreground }]}>
            No results for "{query}"
          </Text>
          <Text style={[styles.emptyDesc, { color: theme.colors.muted }]}>
            Try different keywords or browse categories.
          </Text>
        </View>
      ) : !searched ? (
        <View style={styles.center}>
          <Ionicons name="search-outline" size={40} color={theme.colors.subtle} />
          <Text style={[styles.emptyTitle, { color: theme.colors.foreground }]}>
            Search wallpapers
          </Text>
          <Text style={[styles.emptyDesc, { color: theme.colors.muted }]}>
            Try "dark minimal", "nature", or "gradient".
          </Text>
        </View>
      ) : (
        <FlatList
          data={results}
          keyExtractor={(item) => item.id}
          numColumns={2}
          contentContainerStyle={styles.grid}
          columnWrapperStyle={styles.row}
          ListHeaderComponent={
            <Text style={[styles.resultCount, { color: theme.colors.muted }]}>
              {results.length} result{results.length !== 1 ? 's' : ''}
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
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  backBtn: { width: 36, height: 36, alignItems: 'center', justifyContent: 'center' },
  inputWrap: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  input: { flex: 1, fontSize: 15 },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingHorizontal: 32,
  },
  emptyTitle: { fontSize: 16, fontWeight: '600', textAlign: 'center' },
  emptyDesc: { fontSize: 13, textAlign: 'center', lineHeight: 19 },
  resultCount: { fontSize: 12, paddingHorizontal: 8, paddingBottom: 4 },
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
