import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Image,
  Platform,
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import type { Wallpaper } from '@aspekt/types';
import { getWallpaper } from '../../lib/queries';

type FitMode = 'fill' | 'fit' | 'stretch' | 'center' | 'tile';

const FIT_MODES: { key: FitMode; label: string }[] = [
  { key: 'fill', label: 'Fill' },
  { key: 'fit', label: 'Fit' },
  { key: 'stretch', label: 'Stretch' },
  { key: 'center', label: 'Center' },
  { key: 'tile', label: 'Tile' },
];

const FIT_RESIZE_MODE: Record<FitMode, 'cover' | 'contain' | 'stretch' | 'center' | 'repeat'> = {
  fill: 'cover',
  fit: 'contain',
  stretch: 'stretch',
  center: 'center',
  tile: 'repeat',
};

export default function CustomizeScreen() {
  const { slug } = useLocalSearchParams<{ slug: string }>();
  const router = useRouter();
  const { width, height } = useWindowDimensions();
  const [wallpaper, setWallpaper] = useState<Wallpaper | null>(null);
  const [loading, setLoading] = useState(true);
  const [mode, setMode] = useState<FitMode>('fill');

  useEffect(() => {
    if (slug) {
      getWallpaper(slug).then((data) => {
        setWallpaper(data);
        setLoading(false);
      });
    }
  }, [slug]);

  if (loading || !wallpaper) {
    return (
      <View style={[styles.root, { backgroundColor: '#0B0B0E' }]}>
        <StatusBar barStyle="light-content" />
        <ActivityIndicator color="#818CF8" />
      </View>
    );
  }

  return (
    <View style={[styles.root, { backgroundColor: '#0B0B0E' }]}>
      <StatusBar barStyle="light-content" />

      {/* Full-screen preview */}
      <Image
        source={{ uri: wallpaper.image_url }}
        style={[styles.preview, { width, height }]}
        resizeMode={FIT_RESIZE_MODE[mode]}
      />

      {/* Dim overlay for controls legibility */}
      <View style={StyleSheet.absoluteFill} pointerEvents="none">
        <View style={styles.topGradient} />
        <View style={styles.bottomGradient} />
      </View>

      {/* Top nav */}
      <View style={[styles.topBar, { paddingTop: Platform.OS === 'ios' ? 56 : 28 }]}>
        <Pressable style={styles.iconBtn} onPress={() => router.back()} hitSlop={12}>
          <Ionicons name="chevron-back" size={22} color="#EDEDF2" />
        </Pressable>
        <Text style={styles.topTitle}>Fit & Preview</Text>
        <View style={{ width: 40 }} />
      </View>

      {/* Bottom controls */}
      <View style={[styles.bottomBar, { paddingBottom: Platform.OS === 'ios' ? 36 : 20 }]}>
        {/* Fit mode selector */}
        <View style={styles.modeRow}>
          {FIT_MODES.map(({ key, label }) => (
            <Pressable
              key={key}
              style={[styles.modeChip, key === mode && styles.modeChipActive]}
              onPress={() => setMode(key)}
            >
              <Text style={[styles.modeLabel, { color: key === mode ? '#0B0B0E' : '#EDEDF2' }]}>
                {label}
              </Text>
            </Pressable>
          ))}
        </View>

        {/* Apply CTA */}
        <Pressable
          style={styles.applyBtn}
          onPress={() =>
            router.push(`/wallpaper/apply?slug=${wallpaper.slug}&mode=${mode}` as never)
          }
        >
          <Ionicons name="checkmark" size={18} color="#0B0B0E" />
          <Text style={styles.applyText}>Apply Wallpaper</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  preview: { position: 'absolute', top: 0, left: 0 },
  topGradient: {
    height: 120,
    backgroundColor: 'rgba(11,11,14,0.55)',
  },
  bottomGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 200,
    backgroundColor: 'rgba(11,11,14,0.65)',
  },
  topBar: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingBottom: 12,
  },
  iconBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(11,11,14,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  topTitle: { color: '#EDEDF2', fontSize: 16, fontWeight: '600' },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 16,
    paddingTop: 16,
    gap: 14,
  },
  modeRow: {
    flexDirection: 'row',
    gap: 8,
    justifyContent: 'center',
  },
  modeChip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(237,237,242,0.15)',
  },
  modeChipActive: {
    backgroundColor: '#818CF8',
  },
  modeLabel: { fontSize: 13, fontWeight: '600' },
  applyBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#818CF8',
    borderRadius: 16,
    paddingVertical: 16,
  },
  applyText: { color: '#0B0B0E', fontSize: 16, fontWeight: '700' },
});
