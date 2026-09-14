import { useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  Animated,
  Image,
  Platform,
  Pressable,
  ScrollView,
  Share,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { WallpaperDetail } from '@aspekt/types';
import { darkTheme, lightTheme } from '../../lib/theme';
import { getWallpaper } from '../../lib/queries';

const FAVOURITES_KEY = '@aspekt_favourites';
const HEADER_HEIGHT = 380;

async function getSlugs(): Promise<string[]> {
  const raw = await AsyncStorage.getItem(FAVOURITES_KEY);
  return raw ? (JSON.parse(raw) as string[]) : [];
}

async function saveSlugs(slugs: string[]): Promise<void> {
  await AsyncStorage.setItem(FAVOURITES_KEY, JSON.stringify(slugs));
}

export default function WallpaperDetailScreen() {
  const { slug } = useLocalSearchParams<{ slug: string }>();
  const router = useRouter();
  const scheme = useColorScheme();
  const theme = scheme === 'dark' ? darkTheme : lightTheme;
  const [wallpaper, setWallpaper] = useState<WallpaperDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [favourited, setFavourited] = useState(false);
  const [favLoading, setFavLoading] = useState(false);
  const scrollY = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (slug) {
      getWallpaper(slug).then((data) => {
        setWallpaper(data);
        setLoading(false);
      });
    }
  }, [slug]);

  // Load favourited state from AsyncStorage
  useEffect(() => {
    if (!slug) return;
    getSlugs().then((slugs) => setFavourited(slugs.includes(slug)));
  }, [slug]);

  async function handleShare() {
    if (!wallpaper) return;
    try {
      await Share.share({
        message: `Check out "${wallpaper.title}" on ASPEKT`,
        url: wallpaper.thumbnail_url,
      });
    } catch {
      // share dismissed
    }
  }

  function handleSetWallpaper() {
    if (!wallpaper) return;
    router.push(`/wallpaper/customize?slug=${wallpaper.slug}` as never);
  }

  async function toggleFavourite() {
    if (!slug || !wallpaper || favLoading) return;
    setFavLoading(true);
    try {
      const slugs = await getSlugs();
      if (favourited) {
        await saveSlugs(slugs.filter((s) => s !== slug));
        setFavourited(false);
      } else {
        await saveSlugs([slug, ...slugs]);
        setFavourited(true);
      }
    } finally {
      setFavLoading(false);
    }
  }

  const headerOpacity = scrollY.interpolate({
    inputRange: [HEADER_HEIGHT - 80, HEADER_HEIGHT - 40],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });

  if (loading) {
    return (
      <View style={[styles.center, { backgroundColor: theme.colors.background }]}>
        <ActivityIndicator color="#818CF8" />
      </View>
    );
  }

  if (!wallpaper) {
    return (
      <View style={[styles.center, { backgroundColor: theme.colors.background }]}>
        <Text style={{ color: theme.colors.muted }}>Wallpaper not found.</Text>
      </View>
    );
  }

  return (
    <View style={[styles.root, { backgroundColor: theme.colors.background }]}>
      <StatusBar barStyle="light-content" />

      {/* Floating back button */}
      <Pressable
        style={[styles.backBtn, { backgroundColor: 'rgba(11,11,14,0.6)' }]}
        onPress={() => router.back()}
        hitSlop={12}
      >
        <Ionicons name="chevron-back" size={22} color="#EDEDF2" />
      </Pressable>

      {/* Floating share button */}
      <Pressable
        style={[styles.shareBtn, { backgroundColor: 'rgba(11,11,14,0.6)' }]}
        onPress={handleShare}
        hitSlop={12}
      >
        <Ionicons name="share-outline" size={20} color="#EDEDF2" />
      </Pressable>

      {/* Floating heart button */}
      <Pressable
        style={[styles.heartBtn, { backgroundColor: 'rgba(11,11,14,0.6)' }]}
        onPress={toggleFavourite}
        disabled={favLoading}
        hitSlop={12}
      >
        <Ionicons
          name={favourited ? 'heart' : 'heart-outline'}
          size={20}
          color={favourited ? '#EF4444' : '#EDEDF2'}
        />
      </Pressable>

      {/* Sticky title bar (appears on scroll) */}
      <Animated.View
        style={[
          styles.stickyBar,
          { backgroundColor: theme.colors.background, opacity: headerOpacity },
        ]}
      >
        <Text style={[styles.stickyTitle, { color: theme.colors.foreground }]} numberOfLines={1}>
          {wallpaper.title}
        </Text>
      </Animated.View>

      <Animated.ScrollView
        contentContainerStyle={[styles.scroll, { backgroundColor: theme.colors.background }]}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], {
          useNativeDriver: true,
        })}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
      >
        {/* Hero image */}
        <View style={styles.hero}>
          <Image
            source={{ uri: wallpaper.image_url }}
            style={styles.heroImage}
            resizeMode="cover"
          />
          <View style={styles.heroOverlay} />
        </View>

        {/* Metadata */}
        <View style={styles.meta}>
          {/* Badges row */}
          <View style={styles.badgeRow}>
            {wallpaper.is_free && (
              <View style={[styles.badge, { backgroundColor: 'rgba(34,211,238,0.15)' }]}>
                <Text style={[styles.badgeText, { color: '#22D3EE' }]}>FREE</Text>
              </View>
            )}
            {wallpaper.is_premium && (
              <View style={[styles.badge, { backgroundColor: 'rgba(129,140,248,0.15)' }]}>
                <Text style={[styles.badgeText, { color: '#818CF8' }]}>PREMIUM</Text>
              </View>
            )}
            <View style={[styles.badge, { backgroundColor: theme.colors.surface }]}>
              <Text style={[styles.badgeText, { color: theme.colors.muted }]}>
                {wallpaper.width} × {wallpaper.height}
              </Text>
            </View>
          </View>

          <Text style={[styles.title, { color: theme.colors.foreground }]}>{wallpaper.title}</Text>
          {wallpaper.artist_name && (
            <Text style={[styles.artist, { color: theme.colors.muted }]}>
              by {wallpaper.artist_name}
            </Text>
          )}

          {/* Color palette */}
          {wallpaper.color_palette?.length > 0 && (
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.paletteScroll}
              contentContainerStyle={styles.paletteRow}
            >
              {wallpaper.color_palette.map((hex: string, i: number) => (
                <View key={i} style={[styles.swatch, { backgroundColor: hex }]} />
              ))}
            </ScrollView>
          )}

          {/* Categories */}
          {wallpaper.categories?.length > 0 && (
            <View style={styles.chipSection}>
              <Text style={[styles.chipLabel, { color: theme.colors.muted }]}>CATEGORIES</Text>
              <View style={styles.chipRow}>
                {wallpaper.categories.map((cat) => (
                  <Pressable
                    key={cat.id}
                    style={[styles.chip, { backgroundColor: theme.colors.surface }]}
                    onPress={() => router.push(`/(tabs)/explore/category/${cat.slug}` as never)}
                  >
                    <Text style={[styles.chipText, { color: theme.colors.foreground }]}>
                      {cat.name}
                    </Text>
                  </Pressable>
                ))}
              </View>
            </View>
          )}

          {/* Moods */}
          {wallpaper.moods?.length > 0 && (
            <View style={styles.chipSection}>
              <Text style={[styles.chipLabel, { color: theme.colors.muted }]}>MOODS</Text>
              <View style={styles.chipRow}>
                {wallpaper.moods.map((mood) => (
                  <Pressable
                    key={mood.id}
                    style={[styles.chip, { backgroundColor: 'rgba(129,140,248,0.1)' }]}
                    onPress={() => router.push(`/(tabs)/explore/mood/${mood.slug}` as never)}
                  >
                    <Text style={[styles.chipText, { color: '#818CF8' }]}>{mood.name}</Text>
                  </Pressable>
                ))}
              </View>
            </View>
          )}

          {/* Tags */}
          {wallpaper.tags?.length > 0 && (
            <View style={styles.chipSection}>
              <Text style={[styles.chipLabel, { color: theme.colors.muted }]}>TAGS</Text>
              <View style={styles.chipRow}>
                {wallpaper.tags.map((tag: string) => (
                  <View key={tag} style={[styles.chip, { backgroundColor: theme.colors.surface }]}>
                    <Text style={[styles.chipText, { color: theme.colors.muted }]}>#{tag}</Text>
                  </View>
                ))}
              </View>
            </View>
          )}
        </View>

        {/* Bottom padding for CTAs */}
        <View style={{ height: 120 }} />
      </Animated.ScrollView>

      {/* Sticky CTA bar */}
      <View
        style={[
          styles.ctaBar,
          {
            backgroundColor: theme.colors.background,
            borderTopColor: theme.colors.border,
            paddingBottom: Platform.OS === 'ios' ? 28 : 16,
          },
        ]}
      >
        {wallpaper.is_free && (
          <Pressable
            style={[styles.ctaSecondary, { borderColor: theme.colors.border }]}
            onPress={() => router.push(`/wallpaper/customize?slug=${wallpaper.slug}` as never)}
          >
            <Ionicons name="download-outline" size={18} color={theme.colors.foreground} />
            <Text style={[styles.ctaSecondaryText, { color: theme.colors.foreground }]}>
              Download
            </Text>
          </Pressable>
        )}
        <Pressable style={styles.ctaPrimary} onPress={handleSetWallpaper}>
          <Ionicons name="phone-portrait-outline" size={18} color="#0B0B0E" />
          <Text style={styles.ctaPrimaryText}>Set Wallpaper</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  scroll: { flexGrow: 1 },
  backBtn: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 56 : 28,
    left: 16,
    zIndex: 20,
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  shareBtn: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 56 : 28,
    right: 60,
    zIndex: 20,
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heartBtn: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 56 : 28,
    right: 16,
    zIndex: 20,
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stickyBar: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    height: Platform.OS === 'ios' ? 88 : 56,
    paddingTop: Platform.OS === 'ios' ? 50 : 12,
    paddingHorizontal: 56,
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: 10,
  },
  stickyTitle: { fontSize: 15, fontWeight: '600' },
  hero: { width: '100%', height: HEADER_HEIGHT },
  heroImage: { width: '100%', height: '100%' },
  heroOverlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(11,11,14,0.2)',
  },
  meta: { padding: 20 },
  badgeRow: { flexDirection: 'row', gap: 8, marginBottom: 12 },
  badge: { borderRadius: 6, paddingHorizontal: 8, paddingVertical: 3 },
  badgeText: { fontSize: 10, fontWeight: '700', letterSpacing: 0.8 },
  title: { fontSize: 22, fontWeight: '700', lineHeight: 28, marginBottom: 4 },
  artist: { fontSize: 13, marginBottom: 16 },
  paletteScroll: { marginBottom: 20 },
  paletteRow: { flexDirection: 'row', gap: 8 },
  swatch: { width: 28, height: 28, borderRadius: 14 },
  chipSection: { marginBottom: 16 },
  chipLabel: { fontSize: 10, fontWeight: '600', letterSpacing: 1, marginBottom: 8 },
  chipRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  chip: { borderRadius: 8, paddingHorizontal: 12, paddingVertical: 6 },
  chipText: { fontSize: 12, fontWeight: '500' },
  ctaBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    gap: 10,
    paddingHorizontal: 16,
    paddingTop: 12,
    borderTopWidth: StyleSheet.hairlineWidth,
  },
  ctaPrimary: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#818CF8',
    borderRadius: 14,
    paddingVertical: 14,
  },
  ctaPrimaryText: { color: '#0B0B0E', fontSize: 15, fontWeight: '700' },
  ctaSecondary: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    borderWidth: 1,
    borderRadius: 14,
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
  ctaSecondaryText: { fontSize: 14, fontWeight: '600' },
});
