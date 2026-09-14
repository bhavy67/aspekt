import { Pressable, ScrollView, StyleSheet, Text, useColorScheme, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Screen } from '../../../components/screen';
import { darkTheme, lightTheme } from '../../../lib/theme';

// Profile Hub — V1: honest guest shell
// Shows sign-in CTA + preview of future features (Favourites, History, Collections, Coins)
// Settings and About are fully functional in V1
// Authentication implemented in Phase 8

const PREVIEW_FEATURES = [
  { icon: 'heart-outline' as const, label: 'Favourites', desc: 'Save wallpapers you love' },
  { icon: 'time-outline' as const, label: 'History', desc: 'Your recent downloads' },
  { icon: 'albums-outline' as const, label: 'My Collections', desc: 'Build personal collections' },
];

const MENU_ITEMS = [
  { icon: 'settings-outline' as const, label: 'Settings', route: '/(tabs)/profile/settings' },
  { icon: 'information-circle-outline' as const, label: 'About', route: '/(tabs)/profile/about' },
];

export default function ProfileScreen() {
  const scheme = useColorScheme();
  const theme = scheme === 'dark' ? darkTheme : lightTheme;
  const router = useRouter();

  return (
    <Screen edges={['top']}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={[styles.heading, { color: theme.colors.foreground }]}>Profile</Text>

        {/* Guest sign-in CTA */}
        <View
          style={[
            styles.ctaCard,
            { backgroundColor: theme.colors.surface, borderColor: theme.colors.border },
          ]}
        >
          <Text style={[styles.ctaTitle, { color: theme.colors.foreground }]}>
            Sign in to ASPEKT
          </Text>
          <Text style={[styles.ctaDesc, { color: theme.colors.muted }]}>
            Create an account to save favourites, sync your history, and build collections.
          </Text>
          <Pressable style={styles.ctaButton}>
            <Text style={styles.ctaButtonText}>Sign in — coming soon</Text>
          </Pressable>
        </View>

        {/* Preview features */}
        <Text style={[styles.section, { color: theme.colors.muted }]}>
          COMING IN A FUTURE UPDATE
        </Text>
        {PREVIEW_FEATURES.map((f) => (
          <View
            key={f.label}
            style={[
              styles.featureRow,
              { backgroundColor: theme.colors.surface, borderColor: theme.colors.border },
            ]}
          >
            <Ionicons name={f.icon} size={20} color={theme.colors.subtle} />
            <View style={styles.featureText}>
              <Text style={[styles.featureLabel, { color: theme.colors.foreground }]}>
                {f.label}
              </Text>
              <Text style={[styles.featureDesc, { color: theme.colors.muted }]}>{f.desc}</Text>
            </View>
          </View>
        ))}

        {/* Settings / About */}
        <Text style={[styles.section, { color: theme.colors.muted, marginTop: 24 }]}>GENERAL</Text>
        {MENU_ITEMS.map((item) => (
          <Pressable
            key={item.label}
            style={[
              styles.menuRow,
              { backgroundColor: theme.colors.surface, borderColor: theme.colors.border },
            ]}
            onPress={() => router.push(item.route as never)}
          >
            <Ionicons name={item.icon} size={20} color={theme.colors.muted} />
            <Text style={[styles.menuLabel, { color: theme.colors.foreground }]}>{item.label}</Text>
            <Ionicons name="chevron-forward" size={16} color={theme.colors.subtle} />
          </Pressable>
        ))}
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, paddingBottom: 40 },
  heading: { fontSize: 22, fontWeight: '700', marginBottom: 20 },
  section: { fontSize: 11, fontWeight: '600', letterSpacing: 1.2, marginBottom: 8 },
  ctaCard: { borderRadius: 16, borderWidth: 1, padding: 20, marginBottom: 24 },
  ctaTitle: { fontSize: 16, fontWeight: '700', marginBottom: 6 },
  ctaDesc: { fontSize: 13, lineHeight: 18, marginBottom: 16 },
  ctaButton: {
    alignItems: 'center',
    backgroundColor: 'rgba(129,140,248,0.12)',
    borderRadius: 10,
    paddingVertical: 12,
  },
  ctaButtonText: { color: '#818CF8', fontSize: 14, fontWeight: '600' },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    borderRadius: 12,
    borderWidth: 1,
    padding: 14,
    marginBottom: 8,
    opacity: 0.6,
  },
  featureText: { flex: 1 },
  featureLabel: { fontSize: 14, fontWeight: '600' },
  featureDesc: { fontSize: 12, marginTop: 2 },
  menuRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    borderRadius: 12,
    borderWidth: 1,
    padding: 14,
    marginBottom: 8,
  },
  menuLabel: { flex: 1, fontSize: 14, fontWeight: '500' },
});
