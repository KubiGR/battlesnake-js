module.exports = {
  env: {
    browser: true,
    es2021: true,
    jest: true,
  },
  extends: ["google", "prettier"],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  rules: {
    "require-jsdoc": "off",
  },
};
