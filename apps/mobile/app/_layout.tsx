import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="wallpaper/[slug]" />
      <Stack.Screen name="wallpaper/customize" />
      <Stack.Screen name="wallpaper/apply" options={{ presentation: 'modal' }} />
    </Stack>
  );
}
