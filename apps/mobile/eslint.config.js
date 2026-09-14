const tseslint = require('typescript-eslint');

module.exports = tseslint.config(
  // CJS config files (metro, babel, jest) are excluded — they must use require()
  {
    ignores: [
      'node_modules/**',
      '.expo/**',
      'android/**',
      'ios/**',
      '*.config.js',
      'babel.config.js',
      'metro.config.js',
      'jest.config.js',
    ],
  },
  {
    files: ['**/*.{ts,tsx}'],
    extends: [...tseslint.configs.recommended],
    languageOptions: {
      parserOptions: {
        tsconfigRootDir: __dirname,
      },
    },
    rules: {
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/consistent-type-imports': 'error',
    },
  },
);
