module.exports = {
  presets: [['module:@react-native/babel-preset'], 'nativewind/babel'],
  plugins: [
    '@babel/plugin-transform-export-namespace-from', // Add this line
    // ... any other plugins (e.g., 'react-native-reanimated/plugin' should be LAST)
  ],
};
