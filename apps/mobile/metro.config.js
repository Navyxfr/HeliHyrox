const path = require("path");
const { getDefaultConfig } = require("expo/metro-config");

const projectRoot = __dirname;
const workspaceRoot = path.resolve(projectRoot, "../..");

const config = getDefaultConfig(projectRoot);

config.watchFolders = [workspaceRoot];
config.resolver.nodeModulesPaths = [
  path.resolve(projectRoot, "node_modules"),
  path.resolve(workspaceRoot, "node_modules")
];
config.resolver.disableHierarchicalLookup = true;
config.resolver.extraNodeModules = {
  react: path.resolve(workspaceRoot, "node_modules/react"),
  "react-native": path.resolve(workspaceRoot, "node_modules/react-native"),
  "react-native-safe-area-context": path.resolve(
    workspaceRoot,
    "node_modules/react-native-safe-area-context"
  ),
  "react-native-screens": path.resolve(
    workspaceRoot,
    "node_modules/react-native-screens"
  ),
  "react-native-gesture-handler": path.resolve(
    workspaceRoot,
    "node_modules/react-native-gesture-handler"
  ),
  "@react-navigation/native": path.resolve(
    workspaceRoot,
    "node_modules/@react-navigation/native"
  ),
  "@react-navigation/native-stack": path.resolve(
    workspaceRoot,
    "node_modules/@react-navigation/native-stack"
  ),
  "@react-navigation/bottom-tabs": path.resolve(
    workspaceRoot,
    "node_modules/@react-navigation/bottom-tabs"
  ),
  "expo-router": path.resolve(workspaceRoot, "node_modules/expo-router")
};

module.exports = config;
