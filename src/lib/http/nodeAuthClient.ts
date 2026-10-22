import axios from 'axios';
import { useStore } from '../../stores/useStore';

const axiosInstance = axios.create({
  baseURL: __DEV__ ? 'http://localhost:3000/api' : 'https://api.oocak.com/api',
  // ❌ withCredentials removed — cookies don't work in RN
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor — attach access token
axiosInstance.interceptors.request.use(
  config => {
    const accessToken = useStore.getState().accessToken;
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

    if (axios.isAxiosError(error) && error.response?.status === 401) {
      // Ignore 401 from /login — let the login error surface
      if (originalRequest.url.includes('/login')) {
        return Promise.reject(error);
      }

      console.warn('* 401 interceptor...', error);

      try {
        const refreshTokenId = useStore.getState().refreshTokenId;

        const refreshResponse = await axiosInstance.post(
          '/refresh',
          {},
          {
            headers: {
              'refresh-token-id': refreshTokenId,
            },
          },
        );

        const newAccessToken =
          refreshResponse.headers['authorization']?.split(' ')[1];

        if (newAccessToken) {
          useStore.getState().setToken(newAccessToken);
          originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;

          const newRefreshTokenId = refreshResponse.data?.refreshTokenId;
          if (newRefreshTokenId) {
            useStore.getState().setRefreshTokenId(newRefreshTokenId);
          }

          // Retry the original request with the new token
          return axiosInstance(originalRequest);
        }
      } catch (refreshError) {
        console.error('Failed to refresh access token:', refreshError);
      }
    }

    return Promise.reject(error);
  },
);

export default axiosInstance;
