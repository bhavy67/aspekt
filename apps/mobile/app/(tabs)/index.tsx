import { Text, useColorScheme } from 'react-native';
import { Screen } from '../../components/screen';
import { darkTheme, lightTheme } from '../../lib/theme';

// Home Feed — Phase 5: Core Wallpaper Experience
export default function HomeScreen() {
  const scheme = useColorScheme();
  const theme = scheme === 'dark' ? darkTheme : lightTheme;

  return (
    <Screen>
      <Text style={{ color: theme.colors.muted, textAlign: 'center', marginTop: 40 }}>
        Home Feed
      </Text>
    </Screen>
  );
}
