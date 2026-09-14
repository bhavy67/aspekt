import { Text, View } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

// Category Browse — Phase 5: wallpaper grid for a single category
export default function CategoryScreen() {
  const { slug } = useLocalSearchParams<{ slug: string }>();
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Category: {slug}</Text>
    </View>
  );
}
