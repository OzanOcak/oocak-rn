import { useMutation } from '@tanstack/react-query';
import { useNavigation } from '@react-navigation/native';
import axiosInstance from '../../lib/http/nodeAuthClient';

type SignupDataType = {
  username: string;
  email: string;
  password: string;
};

const signupUser = async (data: SignupDataType) => {
  const response = await axiosInstance.post('mobile/auth/signup', data);

  if (response.status !== 201) {
    throw new Error(response.data?.message || 'Registration failed');
  }

  return response.data;
};

export const useSignup = (setErrorMessage?: (msg: string | null) => void) => {
  const navigation = useNavigation<any>();

  return useMutation({
    mutationFn: signupUser,
    onSuccess: () => {
      console.log('[signup] navigating to VerifyOtpRegistry');
      navigation.navigate('VerifyOtpRegistry');
    },
    onError: (error: any) => {
      const backendMessage =
        error?.response?.data?.message ||
        error?.message ||
        'Registration failed';
      console.error('Registration error:', backendMessage);
      setErrorMessage?.(backendMessage);
    },
  });
};
