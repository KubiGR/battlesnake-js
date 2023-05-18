module.exports = {
  env: {
    node: true,
    es2021: true,
    jest: true,
  },
  plugins: ["jest"],
  extends: ["eslint:recommended", "prettier"],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  rules: {},
};
