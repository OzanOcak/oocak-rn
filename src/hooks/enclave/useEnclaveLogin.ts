import { useMutation } from '@tanstack/react-query';
import { NativeModules } from 'react-native';
import * as Keychain from 'react-native-keychain';
import { useNavigation } from '@react-navigation/native';
import axiosInstance from '../../lib/http/nodeAuthClient';
import { useStore } from '../../stores/useStore';

const { SecureEnclaveModule } = NativeModules;

const loginWithEnclave = async (deviceId: string): Promise<void> => {
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

  // 4. Save the session to Zustand and Keychain
  useStore.getState().setToken(accessToken);
  useStore.getState().setRefreshTokenId(refreshTokenId);

  await Keychain.setGenericPassword(refreshTokenId, refreshToken, {
    service: 'session-tokens',
  });
};

export const useEnclaveLogin = (
  setErrorMessage: React.Dispatch<React.SetStateAction<string | null>>,
) => {
  const navigation = useNavigation<any>();
  const deviceId = useStore(state => state.deviceId);

  return useMutation({
    mutationFn: () => loginWithEnclave(deviceId),
    onSuccess: () => {
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
