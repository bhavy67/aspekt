import { Text, useColorScheme } from 'react-native';
import { Screen } from '../../../components/screen';
import { darkTheme, lightTheme } from '../../../lib/theme';

// Collections List — Phase 5: curated ASPEKT collections only (no user-created in V1)
export default function CollectionsScreen() {
  const scheme = useColorScheme();
  const theme = scheme === 'dark' ? darkTheme : lightTheme;

  return (
    <Screen>
      <Text style={{ color: theme.colors.muted, textAlign: 'center', marginTop: 40 }}>
        Collections
      </Text>
    </Screen>
  );
}
