module.exports = {
  env: {
    node: true,
    es2021: true,
    'jest/globals': true,
  },
  globals: {
    NodeJS: true,
  },
  extends: ['airbnb', 'prettier', 'plugin:prettier/recommended'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 13,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint', 'prettier', 'import', 'jest'],
  rules: {
    'import/no-unresolved': 'error',
    'import/extensions': 'off',
    'no-shadow': 'off',
    '@typescript-eslint/no-shadow': 'error',
    'import/prefer-default-export': 'off',
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': 'error',
    'no-use-before-define': 'off',
    '@typescript-eslint/no-use-before-define': ['error'],
  },
  settings: {
    'import/parsers': {
      // 使用 TypeScript parser
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
    'import/resolver': {
      // 默认使用根目录 tsconfig.json
      typescript: {
        // 从 <roo/>@types 读取类型定义
        alwaysTryTypes: true,
      },
    },
    react: {
      version: 'latest',
    },
  },
};
