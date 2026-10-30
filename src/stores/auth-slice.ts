import { Store } from './useStore';

export type AuthSlice = {
  accessToken: string;
  refreshTokenId: string;
  otpToken: string;
  isFaceIdEnabled: boolean;

  setToken: (accessToken: string) => void;
  clearToken: () => void;
  setRefreshTokenId: (refreshTokenId: string) => void;
  setOtpToken: (otpToken: string) => void;
  setIsFaceIdEnabled: (enabled: boolean) => void;
};

export const createAuthSlice = (
  set: (arg0: (state: Store) => void) => void,
): AuthSlice => ({
  accessToken: '',
  refreshTokenId: '',
  otpToken: '',
  isFaceIdEnabled: false,

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

  setIsFaceIdEnabled: (enabled: boolean) => {
    set(state => {
      state.isFaceIdEnabled = enabled;
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
