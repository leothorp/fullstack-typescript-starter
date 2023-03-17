module.exports = {
  extends: ["plugin:@typescript-eslint/recommended", "prettier"],
  rules: {
    "@typescript-eslint/no-unused-vars": "error",
    "@typescript-eslint/ban-ts-comment": "off",
    "@typescript-eslint/no-non-null-assertion": "off",
    "no-debugger": "error",
  },
};
