import { Platform } from 'react-native';
import Purchases, { LOG_LEVEL, type PurchasesPackage } from 'react-native-purchases';

// RevenueCat API keys — replace with real keys from https://app.revenuecat.com
// Steps: create a project → add iOS and Android apps → copy the API keys here.
// These placeholder values will show "Configuration error" in the RevenueCat SDK.
const RC_API_KEY = Platform.select({
  ios: 'appl_REPLACE_WITH_REAL_IOS_RC_KEY',
  android: 'goog_REPLACE_WITH_REAL_ANDROID_RC_KEY',
  default: 'appl_REPLACE_WITH_REAL_IOS_RC_KEY',
}) as string;

export function initPurchases(userId?: string | null) {
  if (__DEV__) Purchases.setLogLevel(LOG_LEVEL.DEBUG);
  Purchases.configure({ apiKey: RC_API_KEY, appUserID: userId ?? undefined });
}

export async function identifyUser(userId: string) {
  await Purchases.logIn(userId);
}

export async function resetUser() {
  await Purchases.logOut().catch(() => {});
}

export async function getOffering(): Promise<PurchasesPackage[]> {
  try {
    const offerings = await Purchases.getOfferings();
    return offerings.current?.availablePackages ?? [];
  } catch {
    return [];
  }
}

export type PurchaseResult =
  | { status: 'success'; transactionId: string }
  | { status: 'cancelled' }
  | { status: 'error'; message: string };

export async function purchaseCoinPack(pkg: PurchasesPackage): Promise<PurchaseResult> {
  try {
    await Purchases.purchasePackage(pkg);
    // Client-generated dedup key: sufficient for development.
    // For production, use RevenueCat webhooks to credit coins server-side
    // instead of trusting the client (webhook → Supabase Edge Function → record_iap_purchase).
    const transactionId = `${Platform.OS}-${pkg.product.identifier}-${Date.now()}`;
    return { status: 'success', transactionId };
  } catch (e: unknown) {
    const err = e as { code?: string; userCancelled?: boolean; message?: string };
    const cancelCode = Purchases.PURCHASES_ERROR_CODE.PURCHASE_CANCELLED_ERROR;
    if (err.code === cancelCode || err.userCancelled === true) {
      return { status: 'cancelled' };
    }
    return { status: 'error', message: err.message ?? 'Purchase failed.' };
  }
}

export async function restorePurchases(): Promise<void> {
  await Purchases.restorePurchases();
}
