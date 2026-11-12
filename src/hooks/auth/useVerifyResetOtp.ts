import { useMutation } from '@tanstack/react-query';
import { useNavigation, useRoute } from '@react-navigation/native';
import axiosInstance from '../../lib/http/nodeAuthClient';

type VerifyData = { email: string; otp: string };

const verifyResetOtp = async (data: VerifyData) => {
  const response = await axiosInstance.post(
    '/mobile/auth/verify-reset-otp',
    data,
  );
  return response.data;
};

export const useVerifyResetOtp = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const email = route.params?.email ?? '';

  return useMutation({
    mutationFn: (otp: string) => verifyResetOtp({ email, otp }),
    onSuccess: (_data, otp) => {
      navigation.replace('UpdatePassword', { email, otp });
    },
    onError: (error: any) => {
      console.error(
        '[useVerifyResetOtp] error:',
        error?.response?.data?.message ?? error.message,
      );
    },
  });
};
