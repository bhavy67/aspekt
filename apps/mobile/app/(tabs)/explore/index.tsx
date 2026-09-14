import { Text, useColorScheme } from 'react-native';
import { Screen } from '../../../components/screen';
import { darkTheme, lightTheme } from '../../../lib/theme';

// Explore Hub — Phase 5: search bar, categories grid, moods grid, trending tags
export default function ExploreScreen() {
  const scheme = useColorScheme();
  const theme = scheme === 'dark' ? darkTheme : lightTheme;

  return (
    <Screen>
      <Text style={{ color: theme.colors.muted, textAlign: 'center', marginTop: 40 }}>
        Explore Hub
      </Text>
    </Screen>
  );
}
