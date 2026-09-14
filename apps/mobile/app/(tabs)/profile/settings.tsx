import { useState } from 'react';
import { Alert, Pressable, ScrollView, StyleSheet, Text, useColorScheme, View } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Directory, File, Paths } from 'expo-file-system';
import { Screen } from '../../../components/screen';
import { darkTheme, lightTheme } from '../../../lib/theme';

type GridSize = 'compact' | 'comfortable';

export default function SettingsScreen() {
  const router = useRouter();
  const scheme = useColorScheme();
  const theme = scheme === 'dark' ? darkTheme : lightTheme;
  const [gridSize, setGridSize] = useState<GridSize>('comfortable');
  const [clearing, setClearing] = useState(false);

  async function handleClearCache() {
    Alert.alert(
      'Clear Cache',
      'This will delete all cached images. They will reload on next use.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Clear',
          style: 'destructive',
          onPress: async () => {
            setClearing(true);
            try {
              const cacheDir = new Directory(Paths.cache);
              const entries = cacheDir.list();
              for (const entry of entries) {
                if (entry instanceof File && entry.uri.includes('aspekt-')) {
                  entry.delete();
                }
              }
              Alert.alert('Cache cleared', 'Downloaded files have been removed.');
            } catch {
              Alert.alert('Error', 'Could not clear cache. Please try again.');
            } finally {
              setClearing(false);
            }
          },
        },
      ],
    );
  }

  const fg = theme.colors.foreground;
  const muted = theme.colors.muted;
  const surface = theme.colors.surface;
  const border = theme.colors.border;

  return (
    <Screen edges={['top']}>
      <View style={[styles.header, { borderBottomColor: border }]}>
        <Pressable style={styles.backBtn} onPress={() => router.back()} hitSlop={12}>
          <Ionicons name="chevron-back" size={22} color={fg} />
        </Pressable>
        <Text style={[styles.title, { color: fg }]}>Settings</Text>
        <View style={{ width: 36 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={[styles.section, { color: muted }]}>DISPLAY</Text>

        <View style={[styles.card, { backgroundColor: surface, borderColor: border }]}>
          <Text style={[styles.rowLabel, { color: fg }]}>Grid Layout</Text>
          <View style={styles.segmented}>
            {(['comfortable', 'compact'] as GridSize[]).map((size) => (
              <Pressable
                key={size}
                style={[
                  styles.segment,
                  { borderColor: border },
                  gridSize === size && { backgroundColor: '#818CF8' },
                ]}
                onPress={() => setGridSize(size)}
              >
                <Text
                  style={[styles.segmentText, { color: gridSize === size ? '#0B0B0E' : muted }]}
                >
                  {size.charAt(0).toUpperCase() + size.slice(1)}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>

        <Text style={[styles.section, { color: muted, marginTop: 24 }]}>STORAGE</Text>

        <Pressable
          style={[styles.card, styles.actionRow, { backgroundColor: surface, borderColor: border }]}
          onPress={handleClearCache}
          disabled={clearing}
        >
          <Ionicons name="trash-outline" size={18} color="#EF4444" />
          <Text style={[styles.rowLabel, { color: '#EF4444' }]}>
            {clearing ? 'Clearing…' : 'Clear Download Cache'}
          </Text>
          <Ionicons name="chevron-forward" size={16} color={muted} />
        </Pressable>

        <Text style={[styles.hint, { color: muted }]}>
          Clears wallpaper files cached during the apply flow. App data and preferences are not
          affected.
        </Text>
      </ScrollView>
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
  content: { padding: 16, paddingBottom: 40 },
  section: { fontSize: 11, fontWeight: '600', letterSpacing: 1, marginBottom: 8 },
  card: { borderRadius: 14, borderWidth: 1, padding: 14, marginBottom: 8 },
  rowLabel: { fontSize: 14, fontWeight: '500', flex: 1 },
  actionRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  segmented: { flexDirection: 'row', gap: 8, marginTop: 10 },
  segment: {
    flex: 1,
    borderRadius: 8,
    borderWidth: 1,
    paddingVertical: 8,
    alignItems: 'center',
  },
  segmentText: { fontSize: 13, fontWeight: '600' },
  hint: { fontSize: 11, lineHeight: 17, paddingHorizontal: 4 },
});
