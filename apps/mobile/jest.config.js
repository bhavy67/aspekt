module.exports = {
  preset: 'jest-expo',
  // Allow Jest to transform workspace packages (they ship TypeScript source)
  transformIgnorePatterns: [
    'node_modules/(?!(' +
      '(jest-)?react-native' +
      '|@react-native(-community)?' +
      '|expo(nent)?' +
      '|@expo(nent)?/.*' +
      '|@expo-google-fonts/.*' +
      '|react-navigation' +
      '|@react-navigation/.*' +
      '|@aspekt/.*' +
      '))',
  ],
};
