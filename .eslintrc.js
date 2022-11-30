module.exports = {
  root: true,
  // This root config loads the shared config from ./packages/eslint-config-shared.
  // individual workspaces can have their own .eslinrc.js files that will have their contents merged with this.
  extends: ["shared"],
};
