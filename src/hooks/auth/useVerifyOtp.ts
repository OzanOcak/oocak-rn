import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigation } from '@react-navigation/native';
import * as Keychain from 'react-native-keychain';
import axiosInstance from '../../lib/http/nodeAuthClient';
import { store } from '../../stores';
import { setToken, setRefreshTokenId } from '../../stores/auth-slice';

type VerifyArgs = { otp: string };

type VerifyResponse = {
  accessToken: string;
  refreshToken: string;
  refreshTokenId: string;
  username: string;
};

async function verifyOtp({ otp }: VerifyArgs): Promise<VerifyResponse> {
  const response = await axiosInstance.post<VerifyResponse>(
    '/mobile/auth/verify-email',
    { otp },
  );

  const { accessToken, refreshToken, refreshTokenId } = response.data;

  if (!accessToken || !refreshToken || !refreshTokenId) {
    throw new Error('Malformed token response');
  }

  // Persist first so a crash before dispatch still leaves a usable session
  await Keychain.setGenericPassword(refreshTokenId, refreshToken, {
    service: 'session-tokens',
  });

  store.dispatch(setToken(accessToken));
  store.dispatch(setRefreshTokenId(refreshTokenId));

  return response.data;
}

export const useVerifyOtp = (
  setErrorMessage?: (msg: string | null) => void,
) => {
  const navigation = useNavigation<any>();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: verifyOtp,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] });
      navigation.reset({ index: 0, routes: [{ name: 'Root' }] });
    },
    onError: (error: any) => {
      const message =
        error?.response?.data?.message ??
        error?.message ??
        'Verification failed';
      console.error('[useVerifyOtp] error:', message);
      setErrorMessage?.(message);
    },
  });
};
