import * as Keychain from 'react-native-keychain';
import axiosInstance from '../../lib/http/nodeAuthClient';
import { useDispatch } from 'react-redux';
import { setIsFaceIdEnabled } from '../../stores/auth-slice';

export const useEnableFaceId = () => {
  const dispatch = useDispatch();

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

      // Dispatch to Redux
      dispatch(setIsFaceIdEnabled(true));
    } catch (error: any) {
      console.error('Failed to enable Face ID', error);
      //alert(error.response?.data?.message || 'Failed to enable Face ID');
    }
  };

  return { enableFaceId };
};
