import { useMutation } from '@tanstack/react-query';
import { NativeModules } from 'react-native';
import * as Keychain from 'react-native-keychain';
import { useNavigation } from '@react-navigation/native';
import axiosInstance from '../../lib/http/nodeAuthClient';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../stores';
import { setRefreshTokenId, setToken } from '../../stores/auth-slice';

const { SecureEnclaveModule } = NativeModules;

const loginWithEnclave = async (
  deviceId: string,
): Promise<{ accessToken: string; refreshTokenId: string }> => {
  if (!deviceId)
    throw new Error('No device ID found. Please re-enable hardware login.');

  // 1. Get challenge from backend
  const challengeRes = await axiosInstance.post('/mobile/enclave/challenge', {
    deviceId,
  });
  const challenge = challengeRes.data.challenge;

  // 2. Sign it (Triggers Face ID)
  const signature = await SecureEnclaveModule.signChallenge(challenge);

  // 3. Verify on backend
  const verifyRes = await axiosInstance.post('/mobile/enclave/verify', {
    deviceId,
    challenge,
    signature,
  });

  const { accessToken, refreshToken, refreshTokenId } = verifyRes.data;

  // 4. Save the session to Keychain (Redux dispatch happens in onSuccess)
  await Keychain.setGenericPassword(refreshTokenId, refreshToken, {
    service: 'session-tokens',
  });
  // Return data to onSuccess
  return { accessToken, refreshTokenId };
};

export const useEnclaveLogin = (
  setErrorMessage: React.Dispatch<React.SetStateAction<string | null>>,
) => {
  const navigation = useNavigation<any>();
  const dispatch = useDispatch();

  // Read deviceId from Redux
  const deviceId = useSelector((state: RootState) => state.auth.deviceId);

  return useMutation({
    mutationFn: () => loginWithEnclave(deviceId),
    onSuccess: data => {
      // Dispatch to Redux
      dispatch(setToken(data.accessToken));
      dispatch(setRefreshTokenId(data.refreshTokenId));

      navigation.replace('Root', { screen: 'HomeTab' });
    },
    onError: (error: any) => {
      if (error.message !== 'User canceled the operation.') {
        console.error('Enclave login failed:', error);
        setErrorMessage(error.message || 'Enclave login failed');
      }
    },
  });
};
