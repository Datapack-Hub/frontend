// export default {
//   root: true,
//   parser: "@typescript-eslint/parser",
//   extends: [
//     "plugin:@typescript-eslint/recommended",
//     "plugin:svelte/recommended",
//     "plugin:unicorn/recommended"
//   ],
//   plugins: ["@typescript-eslint"],
//   ignorePatterns: ["*.cjs", "node_modules"],
//   overrides: [
//     {
//       files: ["*.svelte"],
//       parser: "svelte-eslint-parser",
//       parserOptions: {
//         parser: "@typescript-eslint/parser"
//       }
//     },
//     { files: ["*.ts", "*.svelte"], rules: { "no-undef": "off" } }
//   ],
//   settings: {
//     "svelte3/typescript": import("typescript")
//   },
//   parserOptions: {
//     project: "tsconfig.json",
//     sourceType: "module",
//     ecmaVersion: 2020,
//     extraFileExtensions: [".svelte"]
//   },
//   rules: {
//     // "@typescript-eslint/no-floating-promises": "error",
//     "@typescript-eslint/await-thenable": "error",
//     // "@typescript-eslint/indent": ["off"]   // You can enable this rule if you want
//     "unicorn/filename-case": ["warn"], // You can disable this rule if you want
//     "unicorn/no-document-cookie": "error",
//     "unicorn/prefer-top-level-await": ["off"] // You can enable this rule if you want
//   },
//   env: {
//     browser: true,
//     es2020: true,
//     es6: true,
//     node: true
//   }
// };

import tsEslintPlugin from "@typescript-eslint/eslint-plugin";
import tsEslintParser from "@typescript-eslint/parser";
import svelteEslintPlugin from "eslint-plugin-svelte";
import unicornPlugin from "eslint-plugin-unicorn";
import typescript from "typescript";
import eslintIgnoresAsJs from "./eslint-ignores-as-js.js";

export default [
  {
    plugins: {
      "@typescript-eslint": tsEslintPlugin,
      unicorn: unicornPlugin,
      svelte: svelteEslintPlugin
    },

    languageOptions: {
      parser: "svelte-eslint-parser",
      parserOptions: {
        parser: tsEslintParser
      }
    },
    ignores: eslintIgnoresAsJs,
    settings: {
      "svelte3/typescript": typescript
    },
    rules: {
      // "@typescript-eslint/no-floating-promises": "error",
      // "@typescript-eslint/indent": ["off"]   // You can enable this rule if you want
      "unicorn/no-document-cookie": "error",
      "unicorn/prefer-top-level-await": ["off"] // You can enable this rule if you want
    },
    languageOptions: {
      globals: {}
    }
  },
  {
    files: ["*.svelte"],
    parser: "svelte-eslint-parser",
    ignores: eslintIgnoresAsJs,
    parserOptions: {
      parser: "@typescript-eslint/parser"
    }
  },
  {
    files: ["*.ts", "*.svelte"],
    ignores: eslintIgnoresAsJs,
    rules: { "no-undef": "off" }
  }
];
