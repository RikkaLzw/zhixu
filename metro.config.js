const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);
const defaults = Array.isArray(config.resolver.blockList)
  ? config.resolver.blockList
  : [config.resolver.blockList];
config.resolver.blockList = [
  ...defaults,
  /[\\/]\.android-sdk[\\/].*/,
  /[\\/]\.gradle-cache[\\/].*/,
  /[\\/]android[\\/](?:app[\\/])?build[\\/].*/,
  /[\\/]android[\\/]\.gradle[\\/].*/,
];

module.exports = config;
