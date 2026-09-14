import { useCallback, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Screen } from '../../../components/screen';
import { darkTheme, lightTheme } from '../../../lib/theme';
import { useAuth } from '../../../context/auth-context';
import { claimDailyCheckin, getCoinBalance, hasClaimedToday } from '../../../lib/coins';

const EARN_ACTIONS = [
  {
    icon: 'sunny-outline' as const,
    label: 'Daily Check-in',
    desc: 'Open the app once per day',
    coins: 5,
    key: 'daily_checkin',
  },
  {
    icon: 'share-social-outline' as const,
    label: 'Share a Wallpaper',
    desc: 'Use the share button on any wallpaper',
    coins: 3,
    key: 'share',
  },
  {
    icon: 'phone-portrait-outline' as const,
    label: 'Apply a Wallpaper',
    desc: 'Save a wallpaper to your Photos',
    coins: 1,
    key: 'apply',
  },
];

export default function CoinsScreen() {
  const scheme = useColorScheme();
  const theme = scheme === 'dark' ? darkTheme : lightTheme;
  const router = useRouter();
  const { user } = useAuth();

  const [balance, setBalance] = useState(0);
  const [loadingBalance, setLoadingBalance] = useState(true);
  const [claimed, setClaimed] = useState(false);
  const [claiming, setClaiming] = useState(false);
  const [claimError, setClaimError] = useState('');

  const fg = theme.colors.foreground;
  const muted = theme.colors.muted;
  const surface = theme.colors.surface;
  const border = theme.colors.border;

  const load = useCallback(async () => {
    if (!user) return;
    setLoadingBalance(true);
    const [bal, alreadyClaimed] = await Promise.all([
      getCoinBalance(user.id),
      hasClaimedToday(user.id),
    ]);
    setBalance(bal);
    setClaimed(alreadyClaimed);
    setLoadingBalance(false);
  }, [user]);

  useEffect(() => {
    load();
  }, [load]);

  async function handleClaim() {
    if (!user || claiming || claimed) return;
    setClaiming(true);
    setClaimError('');
    try {
      const newBalance = await claimDailyCheckin(user.id);
      setBalance(newBalance);
      setClaimed(true);
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : '';
      if (msg.includes('already_claimed_today')) {
        setClaimed(true);
      } else {
        setClaimError('Could not claim reward. Try again.');
      }
    } finally {
      setClaiming(false);
    }
  }

  if (!user) {
    return (
      <Screen edges={['top']}>
        <View style={styles.center}>
          <Text style={[styles.emptyText, { color: muted }]}>Sign in to earn and spend coins.</Text>
          <Pressable style={styles.signInBtn} onPress={() => router.push('/auth/sign-in' as never)}>
            <Text style={styles.signInText}>Sign In</Text>
          </Pressable>
        </View>
      </Screen>
    );
  }

  return (
    <Screen edges={['top']}>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        <Pressable style={styles.backRow} onPress={() => router.back()} hitSlop={8}>
          <Ionicons name="chevron-back" size={20} color={muted} />
          <Text style={[styles.backText, { color: muted }]}>Profile</Text>
        </Pressable>

        <Text style={[styles.heading, { color: fg }]}>Coins</Text>

        {/* Balance card */}
        <View
          style={[
            styles.balanceCard,
            { backgroundColor: 'rgba(129,140,248,0.1)', borderColor: 'rgba(129,140,248,0.25)' },
          ]}
        >
          {loadingBalance ? (
            <ActivityIndicator color="#818CF8" />
          ) : (
            <>
              <Text style={styles.balanceNumber}>{balance}</Text>
              <Text style={[styles.balanceLabel, { color: muted }]}>coins available</Text>
            </>
          )}
        </View>

        {/* Daily claim */}
        <View style={[styles.claimCard, { backgroundColor: surface, borderColor: border }]}>
          <View style={styles.claimLeft}>
            <Ionicons name="sunny" size={22} color="#F59E0B" />
            <View>
              <Text style={[styles.claimTitle, { color: fg }]}>Daily Check-in</Text>
              <Text style={[styles.claimDesc, { color: muted }]}>Come back tomorrow for more</Text>
            </View>
          </View>
          <Pressable
            style={[styles.claimBtn, claimed && styles.claimBtnDone]}
            onPress={handleClaim}
            disabled={claimed || claiming}
          >
            {claiming ? (
              <ActivityIndicator size="small" color="#0B0B0E" />
            ) : (
              <Text style={[styles.claimBtnText, claimed && { color: muted }]}>
                {claimed ? '✓ Claimed' : '+5 Claim'}
              </Text>
            )}
          </Pressable>
        </View>
        {claimError ? <Text style={styles.claimError}>{claimError}</Text> : null}

        {/* Earn actions */}
        <Text style={[styles.section, { color: muted }]}>HOW TO EARN</Text>
        {EARN_ACTIONS.map((action) => (
          <View
            key={action.key}
            style={[styles.earnRow, { backgroundColor: surface, borderColor: border }]}
          >
            <View style={[styles.earnIcon, { backgroundColor: 'rgba(129,140,248,0.1)' }]}>
              <Ionicons name={action.icon} size={18} color="#818CF8" />
            </View>
            <View style={styles.earnText}>
              <Text style={[styles.earnLabel, { color: fg }]}>{action.label}</Text>
              <Text style={[styles.earnDesc, { color: muted }]}>{action.desc}</Text>
            </View>
            <View style={styles.coinPill}>
              <Text style={styles.coinPillText}>+{action.coins}</Text>
            </View>
          </View>
        ))}

        {/* Spend info */}
        <Text style={[styles.section, { color: muted, marginTop: 24 }]}>HOW TO SPEND</Text>
        <View style={[styles.earnRow, { backgroundColor: surface, borderColor: border }]}>
          <View style={[styles.earnIcon, { backgroundColor: 'rgba(129,140,248,0.1)' }]}>
            <Ionicons name="diamond-outline" size={18} color="#818CF8" />
          </View>
          <View style={styles.earnText}>
            <Text style={[styles.earnLabel, { color: fg }]}>Premium Wallpapers</Text>
            <Text style={[styles.earnDesc, { color: muted }]}>
              Unlock premium wallpapers using coins
            </Text>
          </View>
          <View style={[styles.coinPill, { backgroundColor: 'rgba(129,140,248,0.15)' }]}>
            <Text style={styles.coinPillText}>10</Text>
          </View>
        </View>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, paddingBottom: 48 },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24 },
  emptyText: { fontSize: 14, marginBottom: 16, textAlign: 'center' },
  signInBtn: {
    backgroundColor: '#818CF8',
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 32,
  },
  signInText: { color: '#0B0B0E', fontSize: 14, fontWeight: '700' },
  backRow: { flexDirection: 'row', alignItems: 'center', gap: 4, marginBottom: 16 },
  backText: { fontSize: 14 },
  heading: { fontSize: 22, fontWeight: '700', marginBottom: 20 },
  balanceCard: {
    borderRadius: 20,
    borderWidth: 1,
    padding: 28,
    alignItems: 'center',
    marginBottom: 16,
  },
  balanceNumber: { fontSize: 52, fontWeight: '800', color: '#818CF8', letterSpacing: -1 },
  balanceLabel: { fontSize: 13, marginTop: 4 },
  claimCard: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 16,
    borderWidth: 1,
    padding: 16,
    marginBottom: 4,
    gap: 12,
  },
  claimLeft: { flex: 1, flexDirection: 'row', alignItems: 'center', gap: 12 },
  claimTitle: { fontSize: 14, fontWeight: '600' },
  claimDesc: { fontSize: 12, marginTop: 2 },
  claimBtn: {
    backgroundColor: '#818CF8',
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 14,
    minWidth: 80,
    alignItems: 'center',
  },
  claimBtnDone: { backgroundColor: 'transparent', borderWidth: 1, borderColor: '#3F3F50' },
  claimBtnText: { color: '#0B0B0E', fontSize: 13, fontWeight: '700' },
  claimError: { color: '#EF4444', fontSize: 12, marginBottom: 12, paddingLeft: 4 },
  section: { fontSize: 11, fontWeight: '600', letterSpacing: 1.2, marginBottom: 8, marginTop: 24 },
  earnRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    borderRadius: 12,
    borderWidth: 1,
    padding: 14,
    marginBottom: 8,
  },
  earnIcon: {
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  earnText: { flex: 1 },
  earnLabel: { fontSize: 14, fontWeight: '600' },
  earnDesc: { fontSize: 12, marginTop: 2 },
  coinPill: {
    backgroundColor: '#818CF8',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  coinPillText: { color: '#0B0B0E', fontSize: 12, fontWeight: '700' },
});
