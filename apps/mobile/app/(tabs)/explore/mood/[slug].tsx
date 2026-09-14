import { Text, View } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

// Mood Browse — Phase 5: wallpaper grid for a single mood
export default function MoodScreen() {
  const { slug } = useLocalSearchParams<{ slug: string }>();
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Mood: {slug}</Text>
    </View>
  );
}
