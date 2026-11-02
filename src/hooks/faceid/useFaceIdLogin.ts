import { useMutation } from '@tanstack/react-query';
import { useNavigation } from '@react-navigation/native';
import * as Keychain from 'react-native-keychain';
import axiosInstance from '../../lib/http/nodeAuthClient';
import { useDispatch } from 'react-redux';
import { setRefreshTokenId, setToken } from '../../stores/auth-slice';

const loginWithFaceId = async (): Promise<{
  accessToken: string;
  refreshTokenId: string;
}> => {
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

  // 3. Save the new SESSION token to the session slot
  await Keychain.setGenericPassword(refreshTokenId, refreshToken, {
    service: 'session-tokens',
  });

  return { accessToken, refreshTokenId };
};

export const useFaceIdLogin = (
  setErrorMessage: React.Dispatch<React.SetStateAction<string | null>>,
) => {
  const navigation = useNavigation<any>();
  const dispatch = useDispatch();

  return useMutation({
    mutationFn: loginWithFaceId,
    onSuccess: data => {
      // Dispatch to Redux
      dispatch(setToken(data.accessToken));
      dispatch(setRefreshTokenId(data.refreshTokenId));
      navigation.replace('Root', { screen: 'HomeTab' });
    },
    onError: (error: any) => {
      if (error.message !== 'User canceled the operation.') {
        setErrorMessage(error.message || 'Face ID login failed');
      }
    },
  });
};
