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
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { darkTheme, lightTheme } from '../../lib/theme';
import { signInWithApple, signInWithGoogle } from '../../lib/auth';

export default function SignInScreen() {
  const router = useRouter();
  const scheme = useColorScheme();
  const theme = scheme === 'dark' ? darkTheme : lightTheme;
  const [loading, setLoading] = useState<'google' | 'apple' | null>(null);
  const [errorMsg, setErrorMsg] = useState('');

  async function handleGoogle() {
    setLoading('google');
    setErrorMsg('');
    const { error } = await signInWithGoogle();
    setLoading(null);
    if (error && error !== 'Cancelled') setErrorMsg(error);
    else if (!error) router.back();
  }

  async function handleApple() {
    setLoading('apple');
    setErrorMsg('');
    const { error } = await signInWithApple();
    setLoading(null);
    if (error && error !== 'Cancelled') setErrorMsg(error);
    else if (!error) router.back();
  }

  const fg = theme.colors.foreground;
  const muted = theme.colors.muted;
  const surface = theme.colors.surface;
  const border = theme.colors.border;
  const bg = theme.colors.background;

  return (
    <View style={[styles.root, { backgroundColor: bg }]}>
      {/* Handle bar */}
      <View style={[styles.handle, { backgroundColor: border }]} />

      {/* Close */}
      <Pressable style={styles.closeBtn} onPress={() => router.back()} hitSlop={12}>
        <Ionicons name="close" size={22} color={muted} />
      </Pressable>

      <View style={styles.content}>
        {/* Brand mark */}
        <View style={[styles.brandMark, { backgroundColor: 'rgba(129,140,248,0.12)' }]}>
          <Text style={styles.brandLetter}>A</Text>
        </View>

        <Text style={[styles.title, { color: fg }]}>Sign in to ASPEKT</Text>
        <Text style={[styles.subtitle, { color: muted }]}>
          Save favourites, sync across devices, and build your personal collection.
        </Text>

        {errorMsg ? (
          <View style={[styles.errorBanner, { backgroundColor: 'rgba(239,68,68,0.1)' }]}>
            <Text style={styles.errorText}>{errorMsg}</Text>
          </View>
        ) : null}

        <View style={styles.buttons}>
          {/* Google */}
          <Pressable
            style={[styles.authBtn, { backgroundColor: surface, borderColor: border }]}
            onPress={handleGoogle}
            disabled={loading !== null}
          >
            {loading === 'google' ? (
              <ActivityIndicator size="small" color="#818CF8" />
            ) : (
              <Ionicons name="logo-google" size={20} color={fg} />
            )}
            <Text style={[styles.authBtnText, { color: fg }]}>Continue with Google</Text>
          </Pressable>

          {/* Apple — iOS only */}
          {Platform.OS === 'ios' && (
            <Pressable
              style={[styles.authBtn, { backgroundColor: surface, borderColor: border }]}
              onPress={handleApple}
              disabled={loading !== null}
            >
              {loading === 'apple' ? (
                <ActivityIndicator size="small" color="#818CF8" />
              ) : (
                <Ionicons name="logo-apple" size={20} color={fg} />
              )}
              <Text style={[styles.authBtnText, { color: fg }]}>Continue with Apple</Text>
            </Pressable>
          )}
        </View>

        <Text style={[styles.legal, { color: theme.colors.subtle }]}>
          By continuing you agree to our Terms of Service and Privacy Policy.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, paddingTop: 12 },
  handle: { width: 36, height: 4, borderRadius: 2, alignSelf: 'center', marginBottom: 8 },
  closeBtn: { position: 'absolute', top: 20, right: 20, padding: 4 },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
    gap: 0,
  },
  brandMark: {
    width: 64,
    height: 64,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  brandLetter: { color: '#818CF8', fontSize: 28, fontWeight: '800' },
  title: { fontSize: 22, fontWeight: '700', marginBottom: 8, textAlign: 'center' },
  subtitle: { fontSize: 14, lineHeight: 20, textAlign: 'center', marginBottom: 28 },
  errorBanner: { borderRadius: 10, padding: 12, marginBottom: 16, width: '100%' },
  errorText: { color: '#EF4444', fontSize: 13, textAlign: 'center' },
  buttons: { width: '100%', gap: 12, marginBottom: 28 },
  authBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    borderWidth: 1,
    borderRadius: 14,
    paddingVertical: 14,
  },
  authBtnText: { fontSize: 15, fontWeight: '600' },
  legal: { fontSize: 11, textAlign: 'center', lineHeight: 17 },
});
