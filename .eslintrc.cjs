module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'plugin:svelte/recommended'],
  plugins: ['@typescript-eslint'],
  ignorePatterns: ['*.cjs', 'node_modules'],
  overrides: [
    {
      files: ['*.svelte'], parser: 'svelte-eslint-parser', parserOptions: {
        parser: '@typescript-eslint/parser'
      }
    },
    { files: ['*.ts', '*.svelte'], rules: { "no-undef": "off" } }
  ],
  settings: {
    'svelte3/typescript': require('typescript')
  },
  parserOptions: {
    project: 'tsconfig.json',
    sourceType: 'module',
    ecmaVersion: 2020,
    extraFileExtensions: ['.svelte']
  },
  rules: {
    // "@typescript-eslint/no-floating-promises": "error",
    "@typescript-eslint/await-thenable": "error",
    "@typescript-eslint/no-misused-promises": "error",
  },
  env: {
    browser: true,
    es2020: true,
    es6: true,
    node: true
  },
};
