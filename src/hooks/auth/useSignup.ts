import { useMutation } from '@tanstack/react-query';
import { useNavigation } from '@react-navigation/native';
import axiosInstance from '../../lib/http/nodeAuthClient';
import { useStore } from '../../stores/useStore';

type SignupResponse = {
  token: string;
  response: {
    message: string;
  };
};

type SignupDataType = {
  username: string;
  email: string;
  password: string;
};

const signupUser = async (data: SignupDataType): Promise<SignupResponse> => {
  const response = await axiosInstance.post('/signup', data);

  if (response.status !== 201) {
    throw new Error(response.data?.message || 'Registration failed');
  }

  const authorizationHeader =
    response.headers['authorization'] || response.headers['Authorization'];
  const accessToken = authorizationHeader?.split(' ')[1];

  return { response: response.data, token: accessToken };
};

export const useSignup = (setErrorMessage?: (msg: string | null) => void) => {
  const navigation = useNavigation<any>();

  return useMutation({
    mutationFn: signupUser,
    onSuccess: data => {
      console.log('data', data);
      console.log('User registered successfully!');
      // Web: localStorage.setItem('xg8a', data.token) → RN: Zustand
      if (data.token) {
        useStore.getState().setToken(data.token);
      }
      // Web: router.push('/verify-otp-registration') → RN: PrivateAuth nested screen
      navigation.navigate('PrivateAuth', { screen: 'VerifyOtpRegistry' });
    },
    onError: (error: any) => {
      // console.error('Registration error:', error.message);
      // console.error('Backend said:', error.response?.data);
      // console.error('Status:', error.response?.status);
      console.error('Registration error:', error.message);
      setErrorMessage?.(error.message || 'Registration failed');
    },
  });
};
