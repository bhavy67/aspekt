import { Platform } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import * as Linking from 'expo-linking';
import { supabase } from './supabase';

WebBrowser.maybeCompleteAuthSession();

const REDIRECT_URL = Linking.createURL('/auth/callback');

export async function signInWithGoogle(): Promise<{ error: string | null }> {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: REDIRECT_URL,
      skipBrowserRedirect: true,
    },
  });

  if (error || !data.url) return { error: error?.message ?? 'No OAuth URL returned' };

  const result = await WebBrowser.openAuthSessionAsync(data.url, REDIRECT_URL);

  if (result.type === 'success') {
    const url = result.url;
    const params = new URLSearchParams(url.split('#')[1] ?? url.split('?')[1] ?? '');
    const accessToken = params.get('access_token');
    const refreshToken = params.get('refresh_token');
    if (accessToken && refreshToken) {
      await supabase.auth.setSession({ access_token: accessToken, refresh_token: refreshToken });
      return { error: null };
    }
    // PKCE flow: let onAuthStateChange handle it via the URL
    return { error: null };
  }

  if (result.type === 'cancel') return { error: 'Cancelled' };
  return { error: 'Unknown error' };
}

export async function signInWithApple(): Promise<{ error: string | null }> {
  if (Platform.OS !== 'ios') return { error: 'Apple Sign In is only available on iOS' };

  try {
    // Lazy import so Android builds don't fail (module is iOS-only)
    const AppleAuth = await import('expo-apple-authentication');
    const credential = await AppleAuth.signInAsync({
      requestedScopes: [
        AppleAuth.AppleAuthenticationScope.FULL_NAME,
        AppleAuth.AppleAuthenticationScope.EMAIL,
      ],
    });

    if (!credential.identityToken) return { error: 'No identity token from Apple' };

    const { error } = await supabase.auth.signInWithIdToken({
      provider: 'apple',
      token: credential.identityToken,
    });

    return { error: error?.message ?? null };
  } catch (err: unknown) {
    const code = (err as { code?: string }).code;
    if (code === 'ERR_REQUEST_CANCELED') return { error: 'Cancelled' };
    return { error: (err as Error).message };
  }
}

export async function signOut(): Promise<void> {
  await supabase.auth.signOut();
}
