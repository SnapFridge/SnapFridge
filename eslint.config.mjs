import eslint from "@eslint/js";
import tseslint from "typescript-eslint";

export default tseslint.config(
  {
    ignores: ["*", "!src/**"],
  },

  // Recommended ruleset
  eslint.configs.recommended,
  tseslint.configs.recommended,

  // Rules override
  {
    rules: {
      // You wouldn't wanna convert every single string template expression to string explicitly
      "@typescript-eslint/restrict-template-expressions": 0,
      "@typescript-eslint/no-non-null-assertion": 0,

      // Why are we failing builds because of a single unused variable?
      "@typescript-eslint/no-unused-vars": 1,
      // We don't want duplicate warnings
      "no-unused-vars": 0,
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
  }
);
