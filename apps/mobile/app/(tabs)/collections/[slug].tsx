import { Text, View } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

// Collection Detail — Phase 5: cover, name, description, curator credit, wallpaper grid
export default function CollectionDetailScreen() {
  const { slug } = useLocalSearchParams<{ slug: string }>();
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Collection: {slug}</Text>
    </View>
  );
}
