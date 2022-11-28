module.exports = {
  root: true,
  // Load shared config from ./packages/eslint-config-shared.
  // individual workspaces can have their own .eslinrc files that also extend this.
  plugins: ["react-hooks"],
  extends: ["shared"],
  rules: {
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn",
  },
};
