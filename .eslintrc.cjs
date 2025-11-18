module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true,
    jest: false,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:import/recommended',
    'prettier',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  settings: {
    react: { version: 'detect' },
    'import/resolver': {
      node: { extensions: ['.js', '.jsx'] },
      alias: {
        map: [['@', './src']],
        extensions: ['.js', '.jsx'],
      },
    },
  },
  rules: {
    'react/prop-types': 'off',
    'react/react-in-jsx-scope': 'off',
  },
};
