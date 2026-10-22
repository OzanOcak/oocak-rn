import { Store } from './useStore';

export type AuthSlice = {
  accessToken: string;
  refreshTokenId: string;
  setToken: (accessToken: string) => void;
  clearToken: () => void;
  setRefreshTokenId: (refreshTokenId: string) => void;
};

export const createAuthSlice = (
  set: (arg0: (state: Store) => void) => void,
): AuthSlice => ({
  accessToken: '',
  refreshTokenId: '',

  setToken: (accessToken: string) => {
    set(state => {
      state.accessToken = accessToken;
    });
  },

  clearToken: () => {
    set(state => {
      state.accessToken = '';
      state.refreshTokenId = '';
    });
  },

  setRefreshTokenId: (refreshTokenId: string) => {
    set(state => {
      state.refreshTokenId = refreshTokenId;
    });
  },
});
