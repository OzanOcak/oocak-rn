import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigation } from '@react-navigation/native';
import * as Keychain from 'react-native-keychain';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import Config from 'react-native-config';
import { getDevHost } from '../../lib/http/getDevHost';

// Redux Imports
import { store } from '../../stores';
import { clearToken } from '../../stores/auth-slice';

// Raw axios — no interceptors. Logout must never trigger a refresh.
const rawAxios = axios.create({
  baseURL: __DEV__ ? `http://${getDevHost()}:3000/api` : Config.API_URL,
  headers: { 'Content-Type': 'application/json' },
});

const logoutUser = async (): Promise<void> => {
  const refreshTokenId = store.getState().auth.refreshTokenId;

  if (!refreshTokenId) return;

  try {
    await rawAxios.post('/mobile/auth/logout', { refreshTokenId });
  } catch (error) {
    console.warn('Backend logout failed (ignoring):', error);
  }
};

export const useLogout = () => {
  const navigation = useNavigation<any>();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: logoutUser,
    mutationKey: ['logout'],
    onSettled: async () => {
      // Delete ONLY the session token
      await Keychain.resetGenericPassword({ service: 'session-tokens' });
      //  await Keychain.resetGenericPassword();
      await AsyncStorage.removeItem('pkce_verifier');

      // Dispatch to Redux instead of Zustand
      store.dispatch(clearToken());

      queryClient.removeQueries({ queryKey: ['user'] });
      navigation.reset({ index: 0, routes: [{ name: 'HomeTab' }] });
    },
  });
};
