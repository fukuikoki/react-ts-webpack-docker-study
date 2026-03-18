import js from '@eslint/js';
import ts from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import importPlugin from 'eslint-plugin-import';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
  // 全体で無視したいパス
  {
    ignores: [
      'node_modules/',
      'dist/',
      'build/',
      'coverage/',
      '*.min.js',
    ],
  },
  js.configs.recommended,

  // jsx-a11y（flat config ネイティブ）
  ...(jsxA11y.flatConfigs?.recommended
    ? (Array.isArray(jsxA11y.flatConfigs.recommended)
        ? jsxA11y.flatConfigs.recommended
        : [jsxA11y.flatConfigs.recommended])
    : []),

  // メイン設定
  {
    files: ['**/*.{js,jsx,ts,tsx}'],

    plugins: {
      '@typescript-eslint': ts,
      import: importPlugin,
      'jsx-a11y': jsxA11y,
      react,
      'react-hooks': reactHooks,
    },

    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
        ecmaVersion: 12,
        project: './tsconfig.eslint.json',
        sourceType: 'module',
        tsconfigRootDir: __dirname,
      },
      globals: {
        // browser globals
        window: 'readonly',
        document: 'readonly',
        navigator: 'readonly',
        console: 'readonly',
      },
    },

    settings: {
      react: {
        version: 'detect',
      },
      'import/resolver': {
        node: {
          paths: ['src'],
        },
      },
    },

    rules: {
      // TypeScript の型チェックルール（recommended + recommended-requiring-type-checking 相当）
      ...ts.configs['recommended'].rules,
      ...ts.configs['recommended-requiring-type-checking'].rules,

      // react/recommended 相当
      ...react.configs.recommended.rules,

      // react-hooks
      ...reactHooks.configs.recommended.rules,

      // カスタムルール
      'no-use-before-define': 'off',
      '@typescript-eslint/no-use-before-define': ['error'],

      'lines-between-class-members': [
        'error',
        'always',
        { exceptAfterSingleLine: true },
      ],

      'no-void': [
        'error',
        { allowAsStatement: true },
      ],

      'padding-line-between-statements': [
        'error',
        {
          blankLine: 'always',
          prev: '*',
          next: 'return',
        },
      ],

      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          vars: 'all',
          args: 'after-used',
          argsIgnorePattern: '_',
          ignoreRestSiblings: false,
          varsIgnorePattern: '_',
        },
      ],

      'import/extensions': [
        'error',
        'ignorePackages',
        {
          js: 'never',
          jsx: 'never',
          ts: 'never',
          tsx: 'never',
        },
      ],

      'react/jsx-filename-extension': [
        'error',
        {
          extensions: ['.jsx', '.tsx'],
        },
      ],

      'react/jsx-props-no-spreading': [
        'error',
        {
          html: 'enforce',
          custom: 'enforce',
          explicitSpread: 'ignore',
        },
      ],

      'react/react-in-jsx-scope': 'off',
    },
  },

  // .tsx ファイル専用の上書き設定
  {
    files: ['**/*.tsx'],
    rules: {
      'react/prop-types': 'off',
    },
  },
];
