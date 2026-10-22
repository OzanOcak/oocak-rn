import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigation } from '@react-navigation/native';
import { useStore } from '../../stores/useStore';
import axiosInstance from '../../lib/http/nodeAuthClient';

const logoutUser = async (): Promise<void> => {
  const refreshTokenId = useStore.getState().refreshTokenId;

  if (!refreshTokenId) return;

  try {
    await axiosInstance.post(
      '/logout',
      {},
      {
        headers: {
          'refresh-token-id': refreshTokenId,
        },
      },
    );
  } catch (error) {
    console.error('Logout failed:', error);
  }
};

export const useLogout = () => {
  const navigation = useNavigation<any>();
  const clearToken = useStore(state => state.clearToken);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: logoutUser,
    mutationKey: ['logout'],
    onSettled: () => {
      clearToken();
      useStore.persist.clearStorage();
      queryClient.removeQueries({ queryKey: ['user'] });
      navigation.navigate('HomeTab');
    },
    onError: (error: Error) => {
      console.error('Logout failed:', error.message);
    },
  });
};
