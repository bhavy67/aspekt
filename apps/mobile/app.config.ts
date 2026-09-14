import type { ExpoConfig } from 'expo/config';

const config: ExpoConfig = {
  name: 'ASPEKT',
  slug: 'aspekt',
  version: '1.0.0',

  // Support all orientations — tablets, foldables, and landscape are first-class
  orientation: 'default',

  icon: './assets/images/icon.png',

  // Deep link scheme — aspekt:// is the custom URI scheme (always works).
  // Universal Links (https://aspekt.app/) are configured via associatedDomains (iOS)
  // and intentFilters (Android) below and activated in Phase 13 (domain verification).
  scheme: 'aspekt',

  userInterfaceStyle: 'automatic',

  ios: {
    // Placeholder bundle ID — replaced before App Store submission
    bundleIdentifier: 'com.placeholder.aspekt',
    supportsTablet: true,

    // Universal Links — Phase 13: activate after domain verification at aspekt.app
    associatedDomains: ['applinks:aspekt.app'],

    infoPlist: {
      // Required for saving processed wallpaper images to Photos (add-only access).
      // Used in Apply flow (Phase 5). See ADR-003.
      NSPhotoLibraryAddUsageDescription:
        'ASPEKT saves your customised wallpaper to Photos so you can set it as your wallpaper in iOS Settings.',
    },
  },

  android: {
    // Placeholder package name — replaced before Play Store submission
    package: 'com.placeholder.aspekt',
    adaptiveIcon: {
      // foregroundImage: './assets/images/adaptive-icon.png' — export from app-icon.svg at 1024×1024
      backgroundColor: '#0B0B0E',
    },
    // Predictive back gesture — Android 14+ (API 34+)
    predictiveBackGestureEnabled: true,
    // App Links — autoVerify enables Android App Link verification against aspekt.app
    // Phase 13: domain verification required before activation
    intentFilters: [
      {
        action: 'VIEW',
        autoVerify: true,
        data: [{ scheme: 'https', host: 'aspekt.app' }],
        category: ['BROWSABLE', 'DEFAULT'],
      },
    ],
    // SET_WALLPAPER is a normal (install-time) permission — no runtime dialog needed.
    // Added in Phase 5 (Core Wallpaper Experience). Listed here for documentation.
    permissions: [],
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
        backgroundColor: '#0B0B0E',
      },
    ],
    [
      'expo-media-library',
      {
        photosPermission:
          'ASPEKT saves your wallpaper to Photos so you can set it in iOS Settings.',
        savePhotosPermission: 'ASPEKT saves your wallpaper to your photo library.',
        isAccessMediaLocationEnabled: false,
      },
    ],
  ],

  experiments: {
    typedRoutes: true,
  },
};

export default config;
