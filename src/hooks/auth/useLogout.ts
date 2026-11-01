import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigation } from '@react-navigation/native';
import * as Keychain from 'react-native-keychain';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useStore } from '../../stores/useStore';
import Config from 'react-native-config';
import { getDevHost } from '../../lib/http/getDevHost';

// Raw axios — no interceptors. Logout must never trigger a refresh.
const rawAxios = axios.create({
  baseURL: __DEV__ ? `http://${getDevHost()}:3000/api` : Config.API_URL,
  headers: { 'Content-Type': 'application/json' },
});

const logoutUser = async (): Promise<void> => {
  const refreshTokenId = useStore.getState().refreshTokenId;

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
      // 1. Delete ONLY the session token from Keychain
      await Keychain.resetGenericPassword({ service: 'session-tokens' });

      // 2. Clean up PKCE
      await AsyncStorage.removeItem('pkce_verifier');

      // 3. Clear memory tokens (accessToken, refreshTokenId)
      useStore.getState().clearToken();

      // 4. REMOVED: useStore.persist.clearStorage();
      // We keep the storage so deviceId and isFaceIdEnabled survive.

      // 5. Clear React Query cache
      queryClient.removeQueries({ queryKey: ['user'] });

      // 6. Navigate back
      navigation.reset({ index: 0, routes: [{ name: 'HomeTab' }] });
    },
  });
};
