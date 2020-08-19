module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  parser: "babel-eslint",
  extends: [
    "eslint:recommended"
  ],
  parserOptions: {
    ecmaVersion: 2019,
    sourceType: "module",
  },
  plugins: [],
  globals: {},
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off'
  },
}