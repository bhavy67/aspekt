import { useEffect } from 'react';
import { Stack } from 'expo-router';
import * as Linking from 'expo-linking';
import { supabase } from '../lib/supabase';
import { AuthProvider } from '../context/auth-context';

export default function RootLayout() {
  // Handle deep link auth callbacks (e.g. aspekt://auth/callback#access_token=...)
  useEffect(() => {
    const handleUrl = async ({ url }: { url: string }) => {
      if (url.includes('auth/callback') || url.includes('access_token')) {
        const params = new URLSearchParams(url.split('#')[1] ?? url.split('?')[1] ?? '');
        const accessToken = params.get('access_token');
        const refreshToken = params.get('refresh_token');
        if (accessToken && refreshToken) {
          await supabase.auth.setSession({
            access_token: accessToken,
            refresh_token: refreshToken,
          });
        }
      }
    };

    const sub = Linking.addEventListener('url', handleUrl);
    Linking.getInitialURL().then((url) => {
      if (url) handleUrl({ url });
    });

    return () => sub.remove();
  }, []);

  return (
    <AuthProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="wallpaper/[slug]" />
        <Stack.Screen name="wallpaper/customize" />
        <Stack.Screen name="wallpaper/apply" options={{ presentation: 'modal' }} />
        <Stack.Screen name="auth/sign-in" options={{ presentation: 'modal' }} />
      </Stack>
    </AuthProvider>
  );
}
