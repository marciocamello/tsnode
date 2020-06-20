module.exports = {
  parser: "@typescript-eslint/parser",
  env: {
    es2020: true,
    node: true,
    jest: true
  },
  plugins: ["@typescript-eslint"],
  extends: [
    "plugin:@typescript-eslint/recommended", 
    "prettier/@typescript-eslint",
    "standard"
  ],
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly",
  },
  parserOptions: {
    ecmaVersion: 11,
    sourceType: "module",
  },
  rules: {
    "@typescript-eslint/no-var-requires": "off"
  },
}