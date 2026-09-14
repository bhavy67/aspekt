import { useEffect, useState } from 'react';
import { Image, Pressable, ScrollView, StyleSheet, Text, useColorScheme, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Screen } from '../../../components/screen';
import { darkTheme, lightTheme } from '../../../lib/theme';
import { useAuth } from '../../../context/auth-context';
import { signOut } from '../../../lib/auth';
import { getCoinBalance } from '../../../lib/coins';

const LOCKED_FEATURES = [
  {
    icon: 'heart-outline' as const,
    label: 'Favourites',
    desc: 'Save wallpapers you love',
    route: '/(tabs)/profile/favourites',
  },
  {
    icon: 'logo-bitcoin' as const,
    label: 'Coins',
    desc: 'Earn and spend coins',
    route: '/(tabs)/profile/coins',
  },
  { icon: 'time-outline' as const, label: 'History', desc: 'Your recent downloads', route: null },
  {
    icon: 'albums-outline' as const,
    label: 'My Collections',
    desc: 'Build personal collections',
    route: null,
  },
];

const MENU_ITEMS = [
  { icon: 'settings-outline' as const, label: 'Settings', route: '/(tabs)/profile/settings' },
  { icon: 'information-circle-outline' as const, label: 'About', route: '/(tabs)/profile/about' },
];

export default function ProfileScreen() {
  const scheme = useColorScheme();
  const theme = scheme === 'dark' ? darkTheme : lightTheme;
  const router = useRouter();
  const { user, loading } = useAuth();
  const [coinBalance, setCoinBalance] = useState<number | null>(null);

  useEffect(() => {
    if (user) getCoinBalance(user.id).then(setCoinBalance);
    else setCoinBalance(null);
  }, [user]);

  const fg = theme.colors.foreground;
  const muted = theme.colors.muted;
  const surface = theme.colors.surface;
  const border = theme.colors.border;

  async function handleSignOut() {
    await signOut();
  }

  return (
    <Screen edges={['top']}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={[styles.heading, { color: fg }]}>Profile</Text>

        {!loading && user ? (
          /* ── Signed-in state ───────────────────────────── */
          <>
            {/* User card */}
            <View style={[styles.userCard, { backgroundColor: surface, borderColor: border }]}>
              {user.user_metadata?.avatar_url ? (
                <Image
                  source={{ uri: user.user_metadata.avatar_url as string }}
                  style={styles.avatar}
                />
              ) : (
                <View
                  style={[styles.avatarPlaceholder, { backgroundColor: 'rgba(129,140,248,0.15)' }]}
                >
                  <Text style={styles.avatarInitial}>
                    {((user.user_metadata?.full_name as string | undefined) ??
                      user.email ??
                      'U')[0]?.toUpperCase() ?? 'U'}
                  </Text>
                </View>
              )}
              <View style={styles.userInfo}>
                <Text style={[styles.userName, { color: fg }]} numberOfLines={1}>
                  {(user.user_metadata?.full_name as string) ??
                    user.email?.split('@')[0] ??
                    'Account'}
                </Text>
                <Text style={[styles.userEmail, { color: muted }]} numberOfLines={1}>
                  {user.email}
                </Text>
                {coinBalance !== null && (
                  <Text style={styles.coinBadge}>⬡ {coinBalance} coins</Text>
                )}
              </View>
              <Pressable onPress={handleSignOut} hitSlop={8}>
                <Ionicons name="log-out-outline" size={20} color={muted} />
              </Pressable>
            </View>

            {/* Quick links */}
            <Text style={[styles.section, { color: muted }]}>LIBRARY</Text>
            {LOCKED_FEATURES.map((f) => (
              <Pressable
                key={f.label}
                style={[
                  styles.menuRow,
                  { backgroundColor: surface, borderColor: border },
                  !f.route && styles.dimmed,
                ]}
                onPress={() => f.route && router.push(f.route as never)}
                disabled={!f.route}
              >
                <Ionicons name={f.icon} size={20} color={f.route ? muted : theme.colors.subtle} />
                <View style={styles.featureText}>
                  <Text style={[styles.menuLabel, { color: f.route ? fg : muted }]}>{f.label}</Text>
                  {!f.route && (
                    <Text style={[styles.comingSoon, { color: theme.colors.subtle }]}>
                      Coming soon
                    </Text>
                  )}
                </View>
                <Ionicons
                  name="chevron-forward"
                  size={16}
                  color={f.route ? theme.colors.subtle : 'transparent'}
                />
              </Pressable>
            ))}
          </>
        ) : !loading ? (
          /* ── Guest state ───────────────────────────────── */
          <>
            <View style={[styles.ctaCard, { backgroundColor: surface, borderColor: border }]}>
              <Text style={[styles.ctaTitle, { color: fg }]}>Sign in to ASPEKT</Text>
              <Text style={[styles.ctaDesc, { color: muted }]}>
                Create an account to save favourites, sync your history, and build collections.
              </Text>
              <Pressable
                style={styles.ctaButton}
                onPress={() => router.push('/auth/sign-in' as never)}
              >
                <Text style={styles.ctaButtonText}>Sign in</Text>
              </Pressable>
            </View>

            <Text style={[styles.section, { color: muted }]}>COMING IN A FUTURE UPDATE</Text>
            {LOCKED_FEATURES.map((f) => (
              <View
                key={f.label}
                style={[styles.featureRow, { backgroundColor: surface, borderColor: border }]}
              >
                <Ionicons name={f.icon} size={20} color={theme.colors.subtle} />
                <View style={styles.featureText}>
                  <Text style={[styles.featureLabel, { color: fg }]}>{f.label}</Text>
                  <Text style={[styles.featureDesc, { color: muted }]}>{f.desc}</Text>
                </View>
              </View>
            ))}
          </>
        ) : null}

        {/* Settings / About — always visible */}
        <Text style={[styles.section, { color: muted, marginTop: 24 }]}>GENERAL</Text>
        {MENU_ITEMS.map((item) => (
          <Pressable
            key={item.label}
            style={[styles.menuRow, { backgroundColor: surface, borderColor: border }]}
            onPress={() => router.push(item.route as never)}
          >
            <Ionicons name={item.icon} size={20} color={muted} />
            <Text style={[styles.menuLabel, { color: fg }]}>{item.label}</Text>
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
  userCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    borderRadius: 16,
    borderWidth: 1,
    padding: 16,
    marginBottom: 24,
  },
  avatar: { width: 44, height: 44, borderRadius: 22 },
  avatarPlaceholder: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarInitial: { color: '#818CF8', fontSize: 18, fontWeight: '700' },
  userInfo: { flex: 1, gap: 2 },
  userName: { fontSize: 15, fontWeight: '600' },
  userEmail: { fontSize: 12 },
  coinBadge: { fontSize: 11, color: '#818CF8', fontWeight: '600', marginTop: 3 },
  ctaCard: { borderRadius: 16, borderWidth: 1, padding: 20, marginBottom: 24 },
  ctaTitle: { fontSize: 16, fontWeight: '700', marginBottom: 6 },
  ctaDesc: { fontSize: 13, lineHeight: 18, marginBottom: 16 },
  ctaButton: {
    alignItems: 'center',
    backgroundColor: '#818CF8',
    borderRadius: 10,
    paddingVertical: 12,
  },
  ctaButtonText: { color: '#0B0B0E', fontSize: 14, fontWeight: '700' },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    borderRadius: 12,
    borderWidth: 1,
    padding: 14,
    marginBottom: 8,
    opacity: 0.5,
  },
  featureText: { flex: 1 },
  featureLabel: { fontSize: 14, fontWeight: '600' },
  featureDesc: { fontSize: 12, marginTop: 2 },
  comingSoon: { fontSize: 11, marginTop: 1 },
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
  dimmed: { opacity: 0.6 },
});
