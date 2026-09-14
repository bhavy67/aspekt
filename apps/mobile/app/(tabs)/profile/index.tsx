import { Text, useColorScheme } from 'react-native';
import { Screen } from '../../../components/screen';
import { darkTheme, lightTheme } from '../../../lib/theme';

// Profile Hub — V1: honest guest shell
// Shows sign-in CTA + preview of future features (Favourites, History, Collections, Coins)
// Settings and About are fully functional in V1
// Authentication implemented in Phase 8
export default function ProfileScreen() {
  const scheme = useColorScheme();
  const theme = scheme === 'dark' ? darkTheme : lightTheme;

  return (
    <Screen>
      <Text style={{ color: theme.colors.muted, textAlign: 'center', marginTop: 40 }}>Profile</Text>
    </Screen>
  );
}
