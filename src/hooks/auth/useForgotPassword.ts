import { useMutation } from '@tanstack/react-query';
import { useNavigation } from '@react-navigation/native';
import axiosInstance from '../../lib/http/nodeAuthClient';

type ForgotPasswordData = { email: string };

const forgotPassword = async (data: ForgotPasswordData) => {
  const response = await axiosInstance.post(
    '/mobile/auth/forgot-password',
    data,
  );
  return response.data;
};

export const useForgotPassword = () => {
  const navigation = useNavigation<any>();

  return useMutation({
    mutationFn: forgotPassword,
    onSuccess: (_data, variables) => {
      navigation.navigate('VerifyOtpRecovery', { email: variables.email });
    },
    onError: (error: any) => {
      console.error(
        '[useForgotPassword] error:',
        error?.response?.data?.message ?? error.message,
      );
    },
  });
};
