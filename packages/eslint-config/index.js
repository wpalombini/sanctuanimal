require('@rushstack/eslint-patch/modern-module-resolution');

// const OFF = 0;
// const WARN = 1;
const ERROR = 2;

module.exports = {
  root: true,
  env: {
    es6: true,
    jest: true,
    node: true,
  },
  parserOptions: { ecmaVersion: 9, sourceType: 'module' },
  extends: ['turbo', 'eslint:recommended', 'plugin:prettier/recommended'],
  plugins: ['import', 'simple-import-sort'],
  ignorePatterns: ['node_modules/*', 'dist/*'],
  rules: {
    'simple-import-sort/imports': ERROR,
    'simple-import-sort/exports': ERROR,
    'import/first': ERROR,
    'import/newline-after-import': ERROR,
    'import/no-duplicates': ERROR,
  },
  overrides: [
    {
      files: ['**/*.ts*'],
      env: {
        browser: true,
        es6: true,
        jest: true,
        node: true,
      },
      extends: [
        'plugin:@typescript-eslint/recommended',
        'plugin:import/errors',
        'plugin:import/warnings',
        'plugin:import/typescript',
        'plugin:promise/recommended',
        'plugin:typescript-sort-keys/recommended',
        'plugin:sonarjs/recommended',
      ],
    },
  ],
};
