import { useQuery } from '@tanstack/react-query';
import axiosInstance from '../../lib/http/nodeAuthClient';

const fetchUserName = async () => {
  const response = await axiosInstance.get('/profile');
  return response.data.profile;
};

export const useUserName = () => {
  return useQuery({
    queryKey: ['user'],
    queryFn: fetchUserName,
    staleTime: 5 * 60 * 1000,
    retry: false,
  });
};
