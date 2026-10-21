/**
 * Token storage stub.
 *
 * Holds the access token in memory for now.
 * When real auth lands, swap for AsyncStorage or react-native-keychain:
 *
 *   import AsyncStorage from '@react-native-async-storage/async-storage';
 *   export const getAccessToken = () => AsyncStorage.getItem('xg8a');
 *   export const setAccessToken = (t: string) => AsyncStorage.setItem('xg8a', t);
 *   export const clearAccessToken = () => AsyncStorage.removeItem('xg8a');
 */

let accessToken: string | null = null;

export const getAccessToken = (): string | null => accessToken;

export const setAccessToken = (token: string): void => {
  accessToken = token;
};

export const clearAccessToken = (): void => {
  accessToken = null;
};

export const hasAccess = (): boolean => {
  // TODO: replace with !!accessToken when auth is wired
  return true;
};
