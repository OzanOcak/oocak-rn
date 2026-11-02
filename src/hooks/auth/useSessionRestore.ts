import { useEffect, useState } from 'react';
import * as Keychain from 'react-native-keychain';
import { useDispatch, useSelector } from 'react-redux'; // <--- Standard hooks
import axiosInstance from '../../lib/http/nodeAuthClient';
import { RootState } from '../../stores'; // Import the RootState type
import { setToken, setRefreshTokenId } from '../../stores/auth-slice';

export const useSessionRestore = () => {
  const [isRestoring, setIsRestoring] = useState(true);
  const dispatch = useDispatch();

  // Get the accessToken from Redux
  const accessToken = useSelector((state: RootState) => state.auth.accessToken);

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

        // 3. Update Redux
        dispatch(setToken(newAccess));
        dispatch(setRefreshTokenId(newId));

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
  }, [accessToken, dispatch]);

  return { isRestoring };
};
