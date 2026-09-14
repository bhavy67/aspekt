import { Text, View } from 'react-native';

// Fit/Customize — Phase 5: full-screen canvas, fit mode selector
// (Fill / Fit / Stretch / Center / Tile), pan/zoom position, background colour picker
// Core ASPEKT principle: "The wallpaper should adapt to the screen, not the other way around"
// Fill is the default mode
export default function CustomizeScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Fit / Customize</Text>
    </View>
  );
}
