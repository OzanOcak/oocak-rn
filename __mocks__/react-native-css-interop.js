const React = require('react');
const ReactNative = require('react-native');

// Create a proper React component that renders a native View
const MockComponent = React.forwardRef((props, ref) => {
  // Strip out NativeWind-specific props that React Native doesn't understand
  const { className, ...rest } = props;
  return React.createElement(ReactNative.View, { ...rest, ref });
});

// Add display names to prevent React warnings
MockComponent.displayName = 'MockComponent';

module.exports = {
  styled: () => MockComponent,
  cssInterop: () => MockComponent,
  remapProps: () => MockComponent,
  createInteropElement: (Type, props, ...children) => {
    return React.createElement(Type || MockComponent, props, ...children);
  },
  View: MockComponent,
  Text: MockComponent,
  TextInput: MockComponent,
  ScrollView: MockComponent,
  Pressable: MockComponent,
};
