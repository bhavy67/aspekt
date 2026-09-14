import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

/**
 * Phase 1 placeholder screen.
 * Real UI will be implemented in Phase 4 (UI Foundation)
 * and Phase 5 (Core Wallpaper Experience).
 */
export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>ASPEKT</Text>
        <Text style={styles.subtitle}>Phase 1 — Foundation</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    letterSpacing: 4,
    color: '#000000',
  },
  subtitle: {
    marginTop: 8,
    fontSize: 14,
    color: '#666666',
  },
});
