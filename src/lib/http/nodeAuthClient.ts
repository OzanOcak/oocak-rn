import axios from 'axios';
import * as Keychain from 'react-native-keychain';
import Config from 'react-native-config';
import { getDevHost } from './getDevHost';

// Redux Imports
import { store } from '../../stores';
import {
  setToken,
  setRefreshTokenId,
  clearToken,
} from '../../stores/auth-slice';

const axiosInstance = axios.create({
  baseURL: __DEV__ ? `http://${getDevHost()}:3000/api` : Config.API_URL,
  // withCredentials removed — cookies don't work in RN
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor — attach access token
axiosInstance.interceptors.request.use(
  config => {
    // Read from Redux
    const accessToken = store.getState().auth.accessToken;
    if (accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken}`;
    }
    return config;
  },
  error => {
    console.error('Request Error:', error);
    return Promise.reject(error);
  },
);

// Response interceptor — refresh on 401
axiosInstance.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;
    const url = originalRequest?.url ?? '';

    // Skip auth-flow routes — they handle their own errors
    if (
      url.includes('/login') ||
      url.includes('/signup') ||
      url.includes('/refresh') ||
      url.includes('/mobile/oauth') ||
      url.includes('/mobile/auth') ||
      url.includes('/verify-otp') ||
      url.includes('/verify-email') ||
      url.includes('/forgot-password')
    ) {
      return Promise.reject(error);
    }

    if (
      axios.isAxiosError(error) &&
      error.response?.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      console.warn('* 401 interceptor...', error);

      try {
        // Read from Redux
        const refreshTokenId = store.getState().auth.refreshTokenId;

        const credentials = await Keychain.getGenericPassword({
          service: 'session-tokens',
        });

        if (!credentials) {
          store.dispatch(clearToken());
          return Promise.reject(error);
        }

        const refreshResponse = await axiosInstance.post(
          '/mobile/oauth/refresh',
          {
            refreshToken: credentials.password,
            refreshTokenId,
          },
        );

        const {
          accessToken,
          refreshToken,
          refreshTokenId: newId,
        } = refreshResponse.data;

        // Dispatch to Redux
        store.dispatch(setToken(accessToken));
        store.dispatch(setRefreshTokenId(newId));

        await Keychain.setGenericPassword(newId, refreshToken, {
          service: 'session-tokens',
        });

        originalRequest.headers['Authorization'] = `Bearer ${accessToken}`;
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        console.error('Failed to refresh access token:', refreshError);
        store.dispatch(clearToken());
        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  },
);

export default axiosInstance;
