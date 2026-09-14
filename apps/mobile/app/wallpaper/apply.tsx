import { useState } from 'react';
import {
  ActivityIndicator,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { File, Paths } from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';
import * as IntentLauncher from 'expo-intent-launcher';
import { darkTheme, lightTheme } from '../../lib/theme';
import { getWallpaper } from '../../lib/queries';

type Destination = 'lock' | 'home' | 'both';
type Stage = 'picker' | 'saving' | 'success' | 'error';

const DESTINATIONS: {
  key: Destination;
  label: string;
  icon: React.ComponentProps<typeof Ionicons>['name'];
}[] = [
  { key: 'lock', label: 'Lock Screen', icon: 'lock-closed-outline' },
  { key: 'home', label: 'Home Screen', icon: 'home-outline' },
  { key: 'both', label: 'Both Screens', icon: 'phone-portrait-outline' },
];

const IOS_STEPS = [
  'Open the Photos app and find your wallpaper.',
  'Tap the Share button (↑) in the bottom-left.',
  'Scroll down and tap "Use as Wallpaper".',
  'Choose Lock Screen, Home Screen, or Both.',
  'Tap "Set" to confirm.',
];

export default function ApplyScreen() {
  const { slug } = useLocalSearchParams<{ slug: string; mode: string }>();
  const router = useRouter();
  const scheme = useColorScheme();
  const theme = scheme === 'dark' ? darkTheme : lightTheme;
  const [destination, setDestination] = useState<Destination>('both');
  const [stage, setStage] = useState<Stage>('picker');
  const [errorMsg, setErrorMsg] = useState('');

  async function handleApply() {
    setStage('saving');

    const { status } = await MediaLibrary.requestPermissionsAsync();
    if (status !== 'granted') {
      setErrorMsg('Photo library access is required to save your wallpaper.');
      setStage('error');
      return;
    }

    try {
      const wallpaper = await getWallpaper(slug!);
      if (!wallpaper) throw new Error('Wallpaper not found.');

      const downloaded = await File.downloadFileAsync(wallpaper.image_url, Paths.cache);
      await MediaLibrary.saveToLibraryAsync(downloaded.uri);

      if (Platform.OS === 'android') {
        await IntentLauncher.startActivityAsync(
          IntentLauncher.ActivityAction.WALLPAPER_SETTINGS,
        ).catch(() => {});
      }

      setStage('success');
    } catch {
      setErrorMsg('Something went wrong while saving the wallpaper. Please try again.');
      setStage('error');
    }
  }

  const bg = theme.colors.background;
  const fg = theme.colors.foreground;
  const muted = theme.colors.muted;
  const surface = theme.colors.surface;
  const border = theme.colors.border;

  if (stage === 'saving') {
    return (
      <View style={[styles.root, { backgroundColor: bg }]}>
        <ActivityIndicator size="large" color="#818CF8" />
        <Text style={[styles.savingText, { color: muted }]}>Saving to Photos…</Text>
      </View>
    );
  }

  if (stage === 'success') {
    return (
      <View style={[styles.root, { backgroundColor: bg }]}>
        <View style={[styles.iconCircle, { backgroundColor: 'rgba(34,211,238,0.12)' }]}>
          <Ionicons name="checkmark-circle" size={48} color="#22D3EE" />
        </View>
        <Text style={[styles.successTitle, { color: fg }]}>Saved to Photos</Text>

        {Platform.OS === 'ios' ? (
          <View style={styles.stepsCard}>
            <Text style={[styles.stepsHeading, { color: muted }]}>
              NOW SET IT AS YOUR WALLPAPER
            </Text>
            {IOS_STEPS.map((step, i) => (
              <View key={i} style={styles.stepRow}>
                <View style={[styles.stepNum, { backgroundColor: 'rgba(129,140,248,0.15)' }]}>
                  <Text style={styles.stepNumText}>{i + 1}</Text>
                </View>
                <Text style={[styles.stepText, { color: fg }]}>{step}</Text>
              </View>
            ))}
          </View>
        ) : (
          <Text style={[styles.androidNote, { color: muted }]}>
            The wallpaper picker has opened. Select your saved wallpaper to apply it.
          </Text>
        )}

        <Pressable style={styles.doneBtn} onPress={() => router.push('/(tabs)' as never)}>
          <Text style={styles.doneBtnText}>Back to Browse</Text>
        </Pressable>
      </View>
    );
  }

  if (stage === 'error') {
    return (
      <View style={[styles.root, { backgroundColor: bg }]}>
        <View style={[styles.iconCircle, { backgroundColor: 'rgba(239,68,68,0.12)' }]}>
          <Ionicons name="alert-circle" size={48} color="#EF4444" />
        </View>
        <Text style={[styles.successTitle, { color: fg }]}>Something went wrong</Text>
        <Text style={[styles.errorMsg, { color: muted }]}>{errorMsg}</Text>
        <Pressable style={styles.retryBtn} onPress={() => setStage('picker')}>
          <Text style={styles.retryText}>Try Again</Text>
        </Pressable>
        <Pressable onPress={() => router.back()} style={styles.cancelLink}>
          <Text style={[styles.cancelText, { color: muted }]}>Cancel</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={[styles.root, styles.pickerRoot, { backgroundColor: bg }]}>
      <View style={[styles.handle, { backgroundColor: border }]} />

      <Text style={[styles.pickerTitle, { color: fg }]}>Apply Wallpaper</Text>
      <Text style={[styles.pickerSubtitle, { color: muted }]}>
        {Platform.OS === 'ios'
          ? "We'll save the wallpaper to your Photos library. You'll then set it in iOS Settings."
          : 'Choose where to apply your wallpaper.'}
      </Text>

      <View style={styles.destList}>
        {DESTINATIONS.map(({ key, label, icon }) => (
          <Pressable
            key={key}
            style={[
              styles.destRow,
              {
                backgroundColor: surface,
                borderColor: key === destination ? '#818CF8' : border,
                borderWidth: key === destination ? 1.5 : 1,
              },
            ]}
            onPress={() => setDestination(key)}
          >
            <Ionicons name={icon} size={20} color={key === destination ? '#818CF8' : muted} />
            <Text
              style={[
                styles.destLabel,
                {
                  color: key === destination ? fg : muted,
                  fontWeight: key === destination ? '600' : '400',
                },
              ]}
            >
              {label}
            </Text>
            {key === destination && <Ionicons name="checkmark-circle" size={18} color="#818CF8" />}
          </Pressable>
        ))}
      </View>

      <Pressable style={styles.applyBtn} onPress={handleApply}>
        <Text style={styles.applyText}>
          {Platform.OS === 'ios' ? 'Save & Continue' : 'Apply Wallpaper'}
        </Text>
      </Pressable>

      <Pressable onPress={() => router.back()} style={styles.cancelLink}>
        <Text style={[styles.cancelText, { color: muted }]}>Cancel</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24 },
  pickerRoot: { justifyContent: 'flex-start', paddingTop: 16 },
  handle: { width: 36, height: 4, borderRadius: 2, marginBottom: 24 },
  iconCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  savingText: { marginTop: 16, fontSize: 15 },
  successTitle: { fontSize: 20, fontWeight: '700', marginBottom: 8, textAlign: 'center' },
  stepsCard: { width: '100%', marginTop: 16 },
  stepsHeading: { fontSize: 10, fontWeight: '600', letterSpacing: 1, marginBottom: 12 },
  stepRow: { flexDirection: 'row', alignItems: 'flex-start', gap: 12, marginBottom: 12 },
  stepNum: {
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  stepNumText: { color: '#818CF8', fontSize: 12, fontWeight: '700' },
  stepText: { flex: 1, fontSize: 13, lineHeight: 19 },
  androidNote: { fontSize: 14, lineHeight: 20, textAlign: 'center', marginTop: 8 },
  doneBtn: {
    marginTop: 28,
    backgroundColor: '#818CF8',
    borderRadius: 14,
    paddingVertical: 14,
    paddingHorizontal: 40,
  },
  doneBtnText: { color: '#0B0B0E', fontSize: 15, fontWeight: '700' },
  errorMsg: { fontSize: 14, textAlign: 'center', lineHeight: 20, marginTop: 4 },
  retryBtn: {
    marginTop: 24,
    backgroundColor: '#818CF8',
    borderRadius: 14,
    paddingVertical: 14,
    paddingHorizontal: 40,
  },
  retryText: { color: '#0B0B0E', fontSize: 15, fontWeight: '700' },
  cancelLink: { marginTop: 16, padding: 8 },
  cancelText: { fontSize: 14 },
  pickerTitle: { fontSize: 20, fontWeight: '700', marginBottom: 8, alignSelf: 'flex-start' },
  pickerSubtitle: { fontSize: 13, lineHeight: 19, marginBottom: 24, alignSelf: 'flex-start' },
  destList: { width: '100%', gap: 10, marginBottom: 24 },
  destRow: { flexDirection: 'row', alignItems: 'center', gap: 12, borderRadius: 14, padding: 16 },
  destLabel: { flex: 1, fontSize: 14 },
  applyBtn: {
    width: '100%',
    backgroundColor: '#818CF8',
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
  },
  applyText: { color: '#0B0B0E', fontSize: 15, fontWeight: '700' },
});
