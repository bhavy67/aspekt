import { useEffect, useRef } from 'react';
import { Animated, StyleSheet, useColorScheme, View } from 'react-native';

function ShimmerBox({ style }: { style: object }) {
  const scheme = useColorScheme();
  const opacity = useRef(new Animated.Value(0.4)).current;

  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, { toValue: 1, duration: 700, useNativeDriver: true }),
        Animated.timing(opacity, { toValue: 0.4, duration: 700, useNativeDriver: true }),
      ]),
    );
    loop.start();
    return () => loop.stop();
  }, [opacity]);

  const bg = scheme === 'dark' ? '#22222E' : '#E4E4F0';

  return <Animated.View style={[style, { backgroundColor: bg, opacity }]} />;
}

export function WallpaperCardSkeleton() {
  return <ShimmerBox style={styles.card} />;
}

export function WallpaperGridSkeleton({ count = 12 }: { count?: number }) {
  return (
    <View style={styles.grid}>
      {Array.from({ length: count }).map((_, i) => (
        <WallpaperCardSkeleton key={i} />
      ))}
    </View>
  );
}

export function CategoryCardSkeleton() {
  return <ShimmerBox style={styles.categoryCard} />;
}

export function CategoryGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <View style={styles.categoryGrid}>
      {Array.from({ length: count }).map((_, i) => (
        <CategoryCardSkeleton key={i} />
      ))}
    </View>
  );
}

export function CollectionCardSkeleton() {
  return <ShimmerBox style={styles.collectionCard} />;
}

export function CollectionListSkeleton({ count = 4 }: { count?: number }) {
  return (
    <View style={styles.collectionList}>
      {Array.from({ length: count }).map((_, i) => (
        <CollectionCardSkeleton key={i} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  card: { flex: 1, borderRadius: 12, aspectRatio: 16 / 9, marginBottom: 8 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, padding: 8 },
  categoryCard: { width: '31%', aspectRatio: 1, borderRadius: 12 },
  categoryGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  collectionCard: { borderRadius: 16, aspectRatio: 16 / 9 },
  collectionList: { gap: 12, padding: 16 },
});
