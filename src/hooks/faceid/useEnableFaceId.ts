import * as Keychain from 'react-native-keychain';
import axiosInstance from '../../lib/http/nodeAuthClient';
import { useStore } from '../../stores/useStore';

export const useEnableFaceId = () => {
  const enableFaceId = async () => {
    try {
      const response = await axiosInstance.post(
        '/mobile/faceid-auth/device-token',
      );
      const { deviceToken, deviceTokenId } = response.data;

      // MUST INCLUDE service: 'device-token'
      await Keychain.setGenericPassword(deviceTokenId, deviceToken, {
        service: 'device-token',
        accessControl: Keychain.ACCESS_CONTROL.BIOMETRY_CURRENT_SET,
      });

      useStore.getState().setIsFaceIdEnabled(true); // Keep Zustand updated
      alert('Face ID successfully enabled!');
    } catch (error: any) {
      console.error('Failed to enable Face ID', error);
      alert(error.response?.data?.message || 'Failed to enable Face ID');
    }
  };

  return { enableFaceId };
};
