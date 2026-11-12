import { useMutation } from '@tanstack/react-query';
import { useNavigation, useRoute } from '@react-navigation/native';
import axiosInstance from '../../lib/http/nodeAuthClient';

const updatePassword = async (
  email: string,
  otp: string,
  newPassword: string,
) => {
  const response = await axiosInstance.post('/mobile/auth/reset-password', {
    email,
    otp,
    newPassword,
  });
  return response.data;
};

export const useUpdatePassword = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const email = route.params?.email ?? '';
  const otp = route.params?.otp ?? '';

  return useMutation({
    mutationFn: (newPassword: string) =>
      updatePassword(email, otp, newPassword),
    onSuccess: () => {
      navigation.reset({ index: 0, routes: [{ name: 'SignIn' }] });
    },
    onError: (error: any) => {
      console.error(
        '[useUpdatePassword] error:',
        error?.response?.data?.message ?? error.message,
      );
    },
  });
};
