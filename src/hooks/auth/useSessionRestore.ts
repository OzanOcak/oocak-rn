import { useEffect, useState } from 'react';
import * as Keychain from 'react-native-keychain';
import axiosInstance from '../../lib/http/nodeAuthClient';
import { useStore } from '../../stores/useStore';

export const useSessionRestore = () => {
  const [isRestoring, setIsRestoring] = useState(true);
  const accessToken = useStore(state => state.accessToken);

  useEffect(() => {
    const restore = async () => {
      // If we already have an access token, no need to restore
      if (accessToken) {
        setIsRestoring(false);
        return;
      }

      try {
        // 1. Check the session token slot
        const credentials = await Keychain.getGenericPassword({
          service: 'session-tokens',
        });

        if (!credentials) {
          setIsRestoring(false);
          return; // No session, user must log in manually
        }

        // 2. We have a refresh token, get a new access token
        const refreshTokenId = credentials.username;
        const refreshResponse = await axiosInstance.post(
          '/mobile/oauth/refresh',
          {
            refreshToken: credentials.password,
            refreshTokenId,
          },
        );

        const {
          accessToken: newAccess,
          refreshToken: newRefresh,
          refreshTokenId: newId,
        } = refreshResponse.data;

        // 3. Update Zustand
        useStore.getState().setToken(newAccess);
        useStore.getState().setRefreshTokenId(newId);

        // 4. Save the rotated token
        await Keychain.setGenericPassword(newId, newRefresh, {
          service: 'session-tokens',
        });
      } catch (error) {
        console.error('Session restore failed:', error);
      } finally {
        setIsRestoring(false);
      }
    };

    restore();
  }, [accessToken]);

  return { isRestoring };
};
