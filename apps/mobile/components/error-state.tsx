import { Pressable, StyleSheet, Text, useColorScheme, View } from 'react-native';
import { darkTheme, lightTheme } from '../lib/theme';

type Props = {
  message?: string;
  onRetry?: () => void;
};

export function ErrorState({ message = 'Something went wrong.', onRetry }: Props) {
  const scheme = useColorScheme();
  const theme = scheme === 'dark' ? darkTheme : lightTheme;

  return (
    <View style={styles.container}>
      <Text style={[styles.message, { color: theme.colors.muted }]}>{message}</Text>
      {onRetry && (
        <Pressable
          style={({ pressed }) => [styles.button, { opacity: pressed ? 0.7 : 1 }]}
          onPress={onRetry}
        >
          <Text style={styles.buttonText}>Try again</Text>
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 32, gap: 16 },
  message: { fontSize: 14, textAlign: 'center', lineHeight: 20 },
  button: {
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 999,
    backgroundColor: '#818CF8',
  },
  buttonText: { color: '#0B0B0E', fontSize: 14, fontWeight: '600' },
});
