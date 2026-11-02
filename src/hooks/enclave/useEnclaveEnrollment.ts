import { useMutation } from '@tanstack/react-query';
import { NativeModules } from 'react-native';
import axiosInstance from '../../lib/http/nodeAuthClient';
import { useDispatch } from 'react-redux';
import { setDeviceId } from '../../stores/auth-slice';

const { SecureEnclaveModule } = NativeModules;

const enrollDevice = async (): Promise<string> => {
  // 1. Generate key (This does NOT trigger Face ID yet, just creates it)
  const publicKey = await SecureEnclaveModule.generateKey();

  // 2. Send public key to backend
  const response = await axiosInstance.post('/mobile/enclave/register', {
    publicKey,
  });

  return response.data.deviceId;
};

export const useEnclaveEnrollment = () => {
  const dispatch = useDispatch();

  return useMutation({
    mutationFn: enrollDevice,
    onSuccess: deviceId => {
      dispatch(setDeviceId(deviceId));
      //alert('Hardware Login Enabled!');
    },
    onError: (error: any) => {
      console.error('Enrollment error:', error.response?.data || error);
      // alert('Failed to enable hardware login');
    },
  });
};
