import { Text, View } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

// Wallpaper Detail — Phase 5: CDN preview, title, artist, category, mood tags,
// resolution, free/premium label, "Set Wallpaper" CTA, "Download" CTA (free only)
// Accessible from all tabs via root Stack (tab bar hidden during wallpaper flow)
export default function WallpaperDetailScreen() {
  const { slug } = useLocalSearchParams<{ slug: string }>();
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Wallpaper: {slug}</Text>
    </View>
  );
}
