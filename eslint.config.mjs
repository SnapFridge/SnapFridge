import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  {
    ignores: [
      "*",
      "!src/**",
    ],
  },

  // Recommended ruleset
  eslint.configs.recommended,
  tseslint.configs.strictTypeChecked,

  // Rules override
  {
    rules: {

      // You wouldn't wanna convert every single string template expression
      // to string explicitly
      "@typescript-eslint/restrict-template-expressions": 0
    },
  },

  // Type-checked osettings
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },               
);