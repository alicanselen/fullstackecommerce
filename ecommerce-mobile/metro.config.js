const { getDefaultConfig } = require('expo/metro-config');
const { withNativeWind } = require('nativewind/metro');
const path = require('path');

const config = getDefaultConfig(__dirname);
config.resolver.extraNodeModules = {
    'react-native-svg': path.resolve(__dirname, 'node_modules', 'react-native-svg')
};

module.exports = withNativeWind(config, { input: './global.css' });