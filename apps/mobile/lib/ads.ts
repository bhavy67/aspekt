import { Platform } from 'react-native';
import {
  AdEventType,
  RewardedAd,
  RewardedAdEventType,
  TestIds,
} from 'react-native-google-mobile-ads';

// Test IDs from Google — replace both values with real ad unit IDs before production.
// Real IDs are created at https://admob.google.com under your registered app.
const AD_UNIT_ID = Platform.select({
  ios: TestIds.REWARDED,
  android: TestIds.REWARDED,
  default: TestIds.REWARDED,
});

/**
 * Shows a rewarded ad and resolves true if the user earned the reward,
 * false if they dismissed early or if the ad failed to load.
 *
 * This is a native-only function — it requires a custom dev/prod build,
 * not Expo Go.
 */
export function showRewardedAd(): Promise<boolean> {
  return new Promise((resolve) => {
    const ad = RewardedAd.createForAdRequest(AD_UNIT_ID, {
      requestNonPersonalizedAdsOnly: true,
    });

    let earned = false;
    const cleanupFns: Array<() => void> = [];

    function cleanup() {
      cleanupFns.forEach((fn) => fn());
    }

    cleanupFns.push(
      ad.addAdEventListener(AdEventType.LOADED, () => {
        ad.show();
      }),
    );

    cleanupFns.push(
      ad.addAdEventListener(RewardedAdEventType.EARNED_REWARD, () => {
        earned = true;
      }),
    );

    cleanupFns.push(
      ad.addAdEventListener(AdEventType.CLOSED, () => {
        cleanup();
        resolve(earned);
      }),
    );

    cleanupFns.push(
      ad.addAdEventListener(AdEventType.ERROR, () => {
        cleanup();
        resolve(false);
      }),
    );

    ad.load();
  });
}
