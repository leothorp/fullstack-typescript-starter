module.exports = {
  root: true,
  // Load shared config from ./packages/eslint-config-shared.
  // individual workspaces can have their own .eslinrc files that also extend this.
  extends: ["shared"],
  rules: {
    "@typescript-eslint/no-unused-vars": "error",
  },
};
