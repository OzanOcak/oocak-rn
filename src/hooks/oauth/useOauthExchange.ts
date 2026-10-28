import { useMutation } from '@tanstack/react-query';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Keychain from 'react-native-keychain';
import axiosInstance from '../../lib/http/nodeAuthClient';
import { useStore } from '../../stores/useStore';

type OauthExchangeData = { code: string };

const exchangeOauthCode = async (data: OauthExchangeData) => {
  const verifier = await AsyncStorage.getItem('pkce_verifier');
  if (!verifier) throw new Error('PKCE verifier not found');

  const response = await axiosInstance.post('/mobile/oauth/exchange', {
    code: data.code,
    code_verifier: verifier,
  });

  return response.data;
};

export const useOauthExchange = (
  setErrorMessage: React.Dispatch<React.SetStateAction<string | null>>,
) => {
  const navigation = useNavigation<any>();

  return useMutation({
    mutationFn: exchangeOauthCode,
    onSuccess: async data => {
      useStore.getState().setToken(data.accessToken);
      useStore.getState().setRefreshTokenId(data.refreshTokenId);

      await Keychain.setGenericPassword('refresh', data.refreshToken);
      await AsyncStorage.removeItem('pkce_verifier');

      navigation.replace('Root', { screen: 'HomeTab' });
    },
    onError: (error: any) => {
      console.error('OAuth exchange failed:', error);

      const message =
        error?.response?.data?.message ||
        error?.message ||
        'Sign in failed. Please try again.';

      setErrorMessage(message);
      AsyncStorage.removeItem('pkce_verifier');
    },
  });
};
