import { Store } from './useStore';

export type AuthSlice = {
  accessToken: string;
  refreshTokenId: string;
  otpToken: string;
  setToken: (accessToken: string) => void;
  clearToken: () => void;
  setRefreshTokenId: (refreshTokenId: string) => void;
  setOtpToken: (otpToken: string) => void;
};

export const createAuthSlice = (
  set: (arg0: (state: Store) => void) => void,
): AuthSlice => ({
  accessToken: '',
  refreshTokenId: '',
  otpToken: '',

  setToken: (accessToken: string) => {
    set(state => {
      state.accessToken = accessToken;
    });
  },

  setRefreshTokenId: (refreshTokenId: string) => {
    set(state => {
      state.refreshTokenId = refreshTokenId;
    });
  },

  setOtpToken: (otpToken: string) => {
    set(state => {
      state.otpToken = otpToken;
    });
  },

  clearToken: () => {
    set(state => {
      state.accessToken = '';
      state.refreshTokenId = '';
      state.otpToken = '';
    });
  },
});
