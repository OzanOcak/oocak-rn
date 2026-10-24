import { useQuery } from '@tanstack/react-query';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axiosInstance from '../../lib/http/nodeAuthClient';
import { generateCodeChallenge, generateCodeVerifier } from '../../lib/pkce';

export const useGoogleSignInUrl = (enabled: boolean) => {
  return useQuery({
    queryKey: ['googleSignInUrl'],
    queryFn: async () => {
      const verifier = generateCodeVerifier();
      const challenge = generateCodeChallenge(verifier);

      await AsyncStorage.setItem('pkce_verifier', verifier);

      const response = await axiosInstance.get('/oauth-mobile/url', {
        params: { code_challenge: challenge },
      });

      return response.data;
    },
    enabled,
    retry: false,
  });
};
