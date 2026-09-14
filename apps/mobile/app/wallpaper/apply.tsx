import { Text, View } from 'react-native';

// Apply Flow — Phase 5
//
// iOS: PHPhotoLibrary (add-only) + in-app step-by-step guide → user sets in Settings
//   CTA: "Save & Set Wallpaper"
//   ASPEKT can only confirm image saved to Photos, not that wallpaper was applied
//   See ADR-003 for full iOS apply architecture
//
// Android: WallpaperManager with FLAG_SYSTEM / FLAG_LOCK / FLAG_BOTH
//   SET_WALLPAPER is a normal permission (no runtime dialog)
//   Check isSetWallpaperAllowed() before calling
//   MIUI 11+: FLAG_LOCK silently fails — show graceful fallback message
//
// States: Destination Picker → Progress → Success / Failure / Permission Request
export default function ApplyScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Apply Wallpaper</Text>
    </View>
  );
}
