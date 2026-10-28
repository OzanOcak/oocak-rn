import { useMutation } from '@tanstack/react-query';
import { useNavigation } from '@react-navigation/native';
import * as Keychain from 'react-native-keychain';
import axiosInstance from '../../lib/http/nodeAuthClient';
import { useStore } from '../../stores/useStore';

type LoginData = {
  email: string;
  password: string;
};

const loginUser = async (data: LoginData): Promise<void> => {
  const response = await axiosInstance.post('/mobile/auth/login', data);

  const { accessToken, refreshToken, refreshTokenId } = response.data;

  if (!accessToken) throw new Error('Access token not received');
  if (!refreshTokenId) throw new Error('Refresh token ID not received');
  if (!refreshToken) throw new Error('Refresh token not received');

  useStore.getState().setToken(accessToken);
  useStore.getState().setRefreshTokenId(refreshTokenId);

  await Keychain.setGenericPassword('refresh', refreshToken);
};

export const useLogin = (
  setErrorMessage: React.Dispatch<React.SetStateAction<string | null>>,
) => {
  const navigation = useNavigation<any>();

  return useMutation({
    mutationFn: loginUser,
    onSuccess: () => {
      navigation.goBack();
    },
    onError: (error: Error) => {
      console.error('Login failed:', error.message);
      setErrorMessage('Incorrect Credentials, Please Try again ...');
    },
  });
};
