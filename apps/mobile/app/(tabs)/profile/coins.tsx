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
import { AD_DAILY_LIMIT, COIN_PACKS, COIN_REWARDS } from '@aspekt/core';
import { Screen } from '../../../components/screen';
import { darkTheme, lightTheme } from '../../../lib/theme';
import { useAuth } from '../../../context/auth-context';
import {
  awardCoins,
  claimDailyCheckin,
  getAdWatchCountToday,
  getCoinBalance,
  hasClaimedToday,
} from '../../../lib/coins';
import { showRewardedAd } from '../../../lib/ads';
import {
  getOffering,
  purchaseCoinPack,
  restorePurchases,
  type PurchaseResult,
} from '../../../lib/purchases';
import { supabase } from '../../../lib/supabase';
import type { PurchasesPackage } from 'react-native-purchases';

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
  const [adsWatched, setAdsWatched] = useState(0);
  const [adLoading, setAdLoading] = useState(false);
  const [adError, setAdError] = useState('');
  const [packages, setPackages] = useState<PurchasesPackage[]>([]);
  const [packagesLoading, setPackagesLoading] = useState(true);
  const [purchasingId, setPurchasingId] = useState<string | null>(null);
  const [purchaseError, setPurchaseError] = useState('');
  const [restoring, setRestoring] = useState(false);

  const fg = theme.colors.foreground;
  const muted = theme.colors.muted;
  const surface = theme.colors.surface;
  const border = theme.colors.border;

  const load = useCallback(async () => {
    if (!user) return;
    setLoadingBalance(true);
    const [bal, alreadyClaimed, adCount] = await Promise.all([
      getCoinBalance(user.id),
      hasClaimedToday(user.id),
      getAdWatchCountToday(user.id),
    ]);
    setBalance(bal);
    setClaimed(alreadyClaimed);
    setAdsWatched(adCount);
    setLoadingBalance(false);
  }, [user]);

  useEffect(() => {
    load();
  }, [load]);

  useEffect(() => {
    setPackagesLoading(true);
    getOffering()
      .then(setPackages)
      .finally(() => setPackagesLoading(false));
  }, []);

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

  async function handleWatchAd() {
    if (!user || adLoading || adsWatched >= AD_DAILY_LIMIT) return;
    setAdLoading(true);
    setAdError('');
    try {
      const earned = await showRewardedAd();
      if (earned) {
        const newBalance = await awardCoins(user.id, 'rewarded_ad');
        setBalance(newBalance);
        setAdsWatched((n) => n + 1);
      } else {
        setAdError('No ad available right now. Try again later.');
      }
    } catch {
      setAdError('Something went wrong. Try again.');
    } finally {
      setAdLoading(false);
    }
  }

  async function handlePurchase(pkg: PurchasesPackage, coins: number) {
    if (!user || purchasingId) return;
    setPurchasingId(pkg.product.identifier);
    setPurchaseError('');
    const result: PurchaseResult = await purchaseCoinPack(pkg);
    if (result.status === 'success') {
      const { data, error } = await supabase.rpc('record_iap_purchase', {
        p_user_id: user.id,
        p_transaction_id: result.transactionId,
        p_product_id: pkg.product.identifier,
        p_coins: coins,
      });
      if (!error) setBalance(data as number);
      else setPurchaseError('Purchase recorded but balance update failed. Contact support.');
    } else if (result.status === 'error') {
      setPurchaseError(result.message);
    }
    setPurchasingId(null);
  }

  async function handleRestore() {
    if (restoring) return;
    setRestoring(true);
    setPurchaseError('');
    try {
      await restorePurchases();
    } catch {
      setPurchaseError('Could not restore purchases. Try again.');
    } finally {
      setRestoring(false);
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

        {/* Watch Ad */}
        <View
          style={[
            styles.claimCard,
            { backgroundColor: surface, borderColor: border, marginTop: 8 },
          ]}
        >
          <View style={styles.claimLeft}>
            <Ionicons name="play-circle-outline" size={22} color="#818CF8" />
            <View>
              <Text style={[styles.claimTitle, { color: fg }]}>Watch an Ad</Text>
              <Text style={[styles.claimDesc, { color: muted }]}>
                {adsWatched >= AD_DAILY_LIMIT
                  ? 'Limit reached · come back tomorrow'
                  : `${adsWatched} / ${AD_DAILY_LIMIT} watched today`}
              </Text>
            </View>
          </View>
          <Pressable
            style={[styles.claimBtn, adsWatched >= AD_DAILY_LIMIT && styles.claimBtnDone]}
            onPress={handleWatchAd}
            disabled={adLoading || adsWatched >= AD_DAILY_LIMIT}
          >
            {adLoading ? (
              <ActivityIndicator size="small" color="#0B0B0E" />
            ) : (
              <Text style={[styles.claimBtnText, adsWatched >= AD_DAILY_LIMIT && { color: muted }]}>
                {adsWatched >= AD_DAILY_LIMIT ? '✓ Done' : `+${COIN_REWARDS.rewarded_ad} Watch`}
              </Text>
            )}
          </Pressable>
        </View>
        {adError ? <Text style={styles.claimError}>{adError}</Text> : null}

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

        {/* Buy Coins */}
        <Text style={[styles.section, { color: muted, marginTop: 24 }]}>BUY COINS</Text>
        {packagesLoading ? (
          <ActivityIndicator color="#818CF8" style={{ marginVertical: 16 }} />
        ) : (
          <>
            <View style={styles.packsGrid}>
              {COIN_PACKS.map((pack) => {
                const rcPkg = packages.find((p) => p.product.identifier === pack.productId);
                const price = rcPkg?.product.priceString ?? pack.fallbackPrice;
                const isMega = pack.label === 'Mega';
                const isPurchasing = purchasingId === pack.productId;
                return (
                  <Pressable
                    key={pack.productId}
                    style={[
                      styles.packCard,
                      { backgroundColor: surface, borderColor: isMega ? '#818CF8' : border },
                    ]}
                    onPress={() => rcPkg && handlePurchase(rcPkg, pack.coins)}
                    disabled={!!purchasingId || !rcPkg}
                  >
                    {isMega && (
                      <View style={styles.bestValueBadge}>
                        <Text style={styles.bestValueText}>Best Value</Text>
                      </View>
                    )}
                    <Text style={[styles.packLabel, { color: fg }]}>{pack.label}</Text>
                    <Text style={styles.packCoins}>{pack.coins}</Text>
                    <Text style={[styles.packCoinsLabel, { color: muted }]}>coins</Text>
                    <View style={[styles.packPriceRow]}>
                      {isPurchasing ? (
                        <ActivityIndicator size="small" color="#818CF8" />
                      ) : (
                        <Text style={[styles.packPrice, !rcPkg && { color: muted }]}>
                          {rcPkg ? price : 'Coming soon'}
                        </Text>
                      )}
                    </View>
                  </Pressable>
                );
              })}
            </View>
            {purchaseError ? (
              <Text style={[styles.claimError, { marginTop: 8 }]}>{purchaseError}</Text>
            ) : null}
            <Pressable
              style={[styles.restoreBtn, { borderColor: border }]}
              onPress={handleRestore}
              disabled={restoring}
            >
              <Text style={[styles.restoreText, { color: muted }]}>
                {restoring ? 'Restoring…' : 'Restore Purchases'}
              </Text>
            </Pressable>
          </>
        )}
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
  packsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  packCard: {
    flex: 1,
    minWidth: '45%',
    borderRadius: 16,
    borderWidth: 1,
    padding: 16,
    alignItems: 'center',
    position: 'relative',
    overflow: 'hidden',
  },
  bestValueBadge: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: '#818CF8',
    borderBottomLeftRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  bestValueText: { color: '#0B0B0E', fontSize: 9, fontWeight: '800', letterSpacing: 0.5 },
  packLabel: { fontSize: 12, fontWeight: '600', marginBottom: 8, marginTop: 4 },
  packCoins: { fontSize: 32, fontWeight: '800', color: '#818CF8', letterSpacing: -1 },
  packCoinsLabel: { fontSize: 11, marginTop: 2, marginBottom: 12 },
  packPriceRow: { height: 24, justifyContent: 'center', alignItems: 'center' },
  packPrice: { fontSize: 14, fontWeight: '700', color: '#818CF8' },
  restoreBtn: {
    marginTop: 16,
    borderWidth: 1,
    borderRadius: 12,
    padding: 14,
    alignItems: 'center',
  },
  restoreText: { fontSize: 13 },
});
