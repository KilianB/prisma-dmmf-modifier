import globals from "globals";
import typescriptParser from "@typescript-eslint/parser";
import typescriptEslint from "@typescript-eslint/eslint-plugin";
// import typescript from "@typescript-eslint/eslint-plugin"

export default [
  {
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        sourceType: "module",
      },
      globals: {
        // ...globals.browser,
        ...globals.node,
        ...globals.es2017,
      },
    },
    linterOptions: {
      reportUnusedDisableDirectives: true,
    },

    settings: {
      "import/resolver": {
        node: {
          paths: ["src"],
          extensions: [".js", ".ts", ".jsx", ".tsx"],
        },
      },
    },
    plugins: {
      "@typescript-eslint": typescriptEslint,
    },
    rules: {
      // Note: Disable base rule to avoid incorrect errors
      "no-use-before-define": "off",
      "@typescript-eslint/no-use-before-define": ["error"],
      "import/extensions": "off",
    },
    ignores: ["node_modules/**"],
  },
  {
    files: ["**/*.js", "**/*.ts"],
  },
];
