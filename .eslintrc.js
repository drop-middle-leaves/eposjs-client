module.exports = {
  env: {
    node: true,
    browser: true,
    es2021: true,
  },
  extends: ['plugin:vue/vue3-recommended', 'prettier', 'airbnb-base'],
  parserOptions: {
    ecmaVersion: 13,
    sourceType: 'module',
  },
  rules: {
    'prettier/prettier': 'error',
  },
  plugins: ['plugin:vue/vue3-recommended', 'prettier'],
};
