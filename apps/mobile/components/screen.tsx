import type { ReactNode } from 'react';
import { StyleSheet, useColorScheme, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { darkTheme, lightTheme } from '../lib/theme';

interface ScreenProps {
  children: ReactNode;
  edges?: ('top' | 'bottom' | 'left' | 'right')[];
}

export function Screen({ children, edges = ['top', 'bottom'] }: ScreenProps) {
  const scheme = useColorScheme();
  const theme = scheme === 'dark' ? darkTheme : lightTheme;

  return (
    <SafeAreaView style={[styles.root, { backgroundColor: theme.colors.background }]} edges={edges}>
      <View style={[styles.fill, { backgroundColor: theme.colors.background }]}>{children}</View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  fill: { flex: 1 },
});
