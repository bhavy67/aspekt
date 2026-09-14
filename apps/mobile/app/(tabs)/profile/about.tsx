import {
  Linking,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Constants from 'expo-constants';
import { Screen } from '../../../components/screen';
import { darkTheme, lightTheme } from '../../../lib/theme';

const LINKS = [
  {
    label: 'Privacy Policy',
    icon: 'shield-checkmark-outline' as const,
    url: 'https://aspekt.app/privacy',
  },
  {
    label: 'Terms of Service',
    icon: 'document-text-outline' as const,
    url: 'https://aspekt.app/terms',
  },
  {
    label: 'Open Source Licenses',
    icon: 'code-slash-outline' as const,
    url: 'https://aspekt.app/licenses',
  },
];

export default function AboutScreen() {
  const router = useRouter();
  const scheme = useColorScheme();
  const theme = scheme === 'dark' ? darkTheme : lightTheme;
  const version = Constants.expoConfig?.version ?? '1.0.0';

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
        <Text style={[styles.title, { color: fg }]}>About</Text>
        <View style={{ width: 36 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {/* App identity */}
        <View style={[styles.appCard, { backgroundColor: surface, borderColor: border }]}>
          <View style={[styles.appIcon, { backgroundColor: 'rgba(129,140,248,0.12)' }]}>
            <Text style={styles.appIconText}>A</Text>
          </View>
          <Text style={[styles.appName, { color: fg }]}>ASPEKT</Text>
          <Text style={[styles.appVersion, { color: muted }]}>Version {version}</Text>
          <Text style={[styles.appTagline, { color: muted }]}>
            Beautiful wallpapers for every screen.
          </Text>
        </View>

        {/* Links */}
        <Text style={[styles.section, { color: muted }]}>LEGAL & LICENSES</Text>
        {LINKS.map((link) => (
          <Pressable
            key={link.label}
            style={[styles.linkRow, { backgroundColor: surface, borderColor: border }]}
            onPress={() => Linking.openURL(link.url)}
          >
            <Ionicons name={link.icon} size={18} color={muted} />
            <Text style={[styles.linkLabel, { color: fg }]}>{link.label}</Text>
            <Ionicons name="open-outline" size={14} color={muted} />
          </Pressable>
        ))}

        <Text style={[styles.copyright, { color: muted }]}>
          © {new Date().getFullYear()} ASPEKT. All rights reserved.
        </Text>
        <Text style={[styles.note, { color: theme.colors.subtle }]}>
          Development images sourced from picsum.photos.
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
  content: { padding: 16, paddingBottom: 40, alignItems: 'stretch' },
  appCard: {
    borderRadius: 20,
    borderWidth: 1,
    padding: 24,
    alignItems: 'center',
    marginBottom: 28,
  },
  appIcon: {
    width: 64,
    height: 64,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  appIconText: { color: '#818CF8', fontSize: 28, fontWeight: '800' },
  appName: { fontSize: 20, fontWeight: '800', letterSpacing: 2, marginBottom: 4 },
  appVersion: { fontSize: 12, marginBottom: 8 },
  appTagline: { fontSize: 13, textAlign: 'center' },
  section: { fontSize: 11, fontWeight: '600', letterSpacing: 1, marginBottom: 8 },
  linkRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    borderRadius: 14,
    borderWidth: 1,
    padding: 14,
    marginBottom: 8,
  },
  linkLabel: { flex: 1, fontSize: 14, fontWeight: '500' },
  copyright: { fontSize: 12, textAlign: 'center', marginTop: 24 },
  note: { fontSize: 11, textAlign: 'center', marginTop: 6 },
});
