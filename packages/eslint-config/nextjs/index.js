module.exports = {
  root: true,
  extends: ['next/core-web-vitals', '../index.js'],
  settings: {
    'import/resolver': {
      node: true,
      typescript: {
        alwaysTryTypes: true,
        project: ['apps/*/tsconfig.json', 'packages/*/tsconfig.json', './tsconfig.json'],
      },
    },
  },
};
