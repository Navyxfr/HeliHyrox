const path = require("path");
const { getDefaultConfig } = require("expo/metro-config");

const projectRoot = __dirname;
const workspaceRoot = path.resolve(projectRoot, "../..");

const config = getDefaultConfig(projectRoot);

// Monorepo: watch the whole workspace so shared packages are visible
config.watchFolders = [workspaceRoot];

// Resolve from root first — overrides in root package.json
// guarantee a single version of every native module
config.resolver.nodeModulesPaths = [
  path.resolve(workspaceRoot, "node_modules"),
  path.resolve(projectRoot, "node_modules")
];

config.resolver.disableHierarchicalLookup = true;

module.exports = config;
