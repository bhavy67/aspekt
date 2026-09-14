import { defineConfig, globalIgnores } from 'eslint/config';
import nextTs from 'eslint-config-next/typescript';

// Note: eslint-config-next/core-web-vitals is intentionally excluded.
// It bundles eslint-plugin-react@7.x which calls context.getFilename(),
// an API removed in ESLint 10. Switch to core-web-vitals once
// eslint-config-next ships an eslint-plugin-react version that supports ESLint 10.
const eslintConfig = defineConfig([
  ...nextTs,
  {
    languageOptions: {
      parserOptions: {
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  globalIgnores(['.next/**', 'out/**', 'build/**', 'next-env.d.ts']),
]);

export default eslintConfig;
