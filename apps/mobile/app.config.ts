import type { ExpoConfig } from 'expo/config';

const config: ExpoConfig = {
  name: 'ASPEKT',
  slug: 'aspekt',
  version: '1.0.0',

  // Support all orientations — tablets, foldables, and landscape are first-class
  orientation: 'default',

  icon: './assets/images/icon.png',

  // Deep link scheme — will be finalised before store submission
  scheme: 'aspekt',

  // Respect system light/dark preference
  userInterfaceStyle: 'automatic',

  ios: {
    // Placeholder bundle ID — will be replaced before App Store submission
    bundleIdentifier: 'com.placeholder.aspekt',
    supportsTablet: true,
  },

  android: {
    // Placeholder package name — will be replaced before Play Store submission
    package: 'com.placeholder.aspekt',
    adaptiveIcon: {
      backgroundColor: '#FFFFFF',
    },
    predictiveBackGestureEnabled: false,
  },

  web: {
    output: 'static',
    favicon: './assets/images/favicon.png',
  },

  plugins: [
    'expo-router',
    'expo-font',
    [
      'expo-splash-screen',
      {
        backgroundColor: '#FFFFFF',
      },
    ],
  ],

  experiments: {
    typedRoutes: true,
  },
};

export default config;
