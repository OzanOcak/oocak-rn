import { useMutation } from '@tanstack/react-query';
import { useNavigation } from '@react-navigation/native';
import * as Keychain from 'react-native-keychain';
import axiosInstance from '../../lib/http/nodeAuthClient';
import { useStore } from '../../stores/useStore';

const loginWithFaceId = async (): Promise<void> => {
  // 1. Get from the DEVICE TOKEN slot (Prompts Face ID)
  const credentials = await Keychain.getGenericPassword({
    service: 'device-token',
    authenticationPrompt: { title: 'Log in with Face ID' },
  });

  if (!credentials || !credentials.password) throw new Error('No device token');

  // 2. Hits the backend
  const response = await axiosInstance.post(
    '/mobile/faceid-auth/device-login',
    {
      deviceToken: credentials.password,
    },
  );

  const { accessToken, refreshToken, refreshTokenId } = response.data;

  useStore.getState().setToken(accessToken);
  useStore.getState().setRefreshTokenId(refreshTokenId);

  // 3. Save the new SESSION token to the session slot
  await Keychain.setGenericPassword(refreshTokenId, refreshToken, {
    service: 'session-tokens',
  });
};

export const useFaceIdLogin = (
  setErrorMessage: React.Dispatch<React.SetStateAction<string | null>>,
) => {
  const navigation = useNavigation<any>();
  return useMutation({
    mutationFn: loginWithFaceId,
    onSuccess: () => navigation.replace('Root', { screen: 'HomeTab' }),
    onError: (error: any) => {
      if (error.message !== 'User canceled the operation.') {
        setErrorMessage(error.message || 'Face ID login failed');
      }
    },
  });
};
