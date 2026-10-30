import { NativeModules } from 'react-native';

export const getDevHost = () => {
  const scriptURL = NativeModules.SourceCode?.scriptURL;
  if (scriptURL) {
    const host = scriptURL.split('://')[1].split(':')[0];

    // If it's the simulator (localhost), use your Mac's IP so the real phone works too.
    if (host === 'localhost' || host === '127.0.0.1') {
      return '10.0.0.213';
    }

    // If it's the real phone, it will grab your Mac's IP automatically.
    return host;
  }
  return '10.0.0.213';
};
