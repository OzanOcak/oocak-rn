import { useMutation } from '@tanstack/react-query';
import { useNavigation } from '@react-navigation/native';
import axiosInstance from '../../lib/http/nodeAuthClient';
import { useStore } from '../../stores/useStore';

type LoginData = {
  email: string;
  password: string;
};

// Function to handle user login
const loginUser = async (data: LoginData): Promise<void> => {
  const response = await axiosInstance.post('/login', data);

  if (response.status !== 200) {
    throw new Error(response.data?.message || 'Login failed');
  }

  const authorizationHeader =
    response.headers['authorization'] || response.headers['Authorization'];
  const accessToken = authorizationHeader?.split(' ')[1];

  if (accessToken) {
    useStore.getState().setToken(accessToken);
  } else {
    throw new Error('Access token not received');
  }

  const refreshTokenId =
    response.headers['refresh-token-id'] ||
    response.headers['Refresh-Token-ID'];

  if (refreshTokenId) {
    try {
      useStore.getState().setRefreshTokenId(refreshTokenId);
    } catch (error) {
      console.error('Error storing refresh token ID:', error);
    }
  } else {
    throw new Error('Refresh token ID not received');
  }
};

// Custom hook for login
export const useLogin = (
  setErrorMessage: React.Dispatch<React.SetStateAction<string | null>>,
) => {
  const navigation = useNavigation<any>();

  return useMutation({
    mutationFn: loginUser,
    onSuccess: () => {
      // Web: router.push(redirectUser(role))
      // RN: for now, just close the modal
      navigation.goBack();
      setTimeout(() => navigation.navigate('Profile'), 100);
    },
    onError: (error: Error) => {
      console.error('Login failed:', error.message);
      setErrorMessage('Incorrect Credentials, Please Try again ...');
    },
  });
};
