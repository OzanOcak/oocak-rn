module.exports = {
  preset: '@react-native/jest-preset',
  setupFilesAfterEnv: [
    '@testing-library/jest-native/extend-expect',
    '<rootDir>/jest.setup.js',
  ],
  transformIgnorePatterns: [
    'node_modules/(?!((jest-)?react-native|@react-native(-community)?|@react-navigation|react-native-safe-area-context|react-native-css-interop|@react-native-async-storage|@tanstack|react-redux|@reduxjs|immer|react-native-inappbrowser-reborn|react-native-keychain|nativewind|react-native-config|@noble|lucide-react-native)/)',
  ],
  moduleNameMapper: {
    '\\.(css)$': '<rootDir>/__mocks__/styleMock.js',
  },
};
