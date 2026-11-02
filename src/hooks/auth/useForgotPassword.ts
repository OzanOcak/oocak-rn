import { useMutation } from '@tanstack/react-query';
import { useNavigation } from '@react-navigation/native';
import axiosInstance from '../../lib/http/nodeAuthClient';
import { useDispatch } from 'react-redux';
import { setOtpToken } from '../../stores/auth-slice';

type ForgotPasswordData = {
  email: string;
};

type ForgotPasswordResponse = {
  token: string;
  response: {
    message: string;
    userId: number;
    username: string;
  };
};

const forgotPassword = async (
  data: ForgotPasswordData,
): Promise<ForgotPasswordResponse> => {
  const response = await axiosInstance.post('/forgot-password', data);

  if (response.status !== 200) {
    throw new Error(response.data?.message || 'Forgot password request failed');
  }

  const authorizationHeader =
    response.headers['authorization'] || response.headers['Authorization'];
  const accessToken = authorizationHeader?.split(' ')[1];

  return { response: response.data, token: accessToken };
};

export const useForgotPassword = () => {
  const navigation = useNavigation<any>();
  const dispatch = useDispatch(); // Initialize Redux dispatch

  return useMutation({
    mutationFn: forgotPassword,
    onSuccess: data => {
      // Dispatch to Redux
      dispatch(setOtpToken(data.token));
      navigation.replace('PrivateAuth', { screen: 'VerifyOtpRecovery' });
    },
    onError: (error: Error) => {
      console.error('Forgot password error:', error.message);
    },
  });
};
