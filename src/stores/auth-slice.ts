import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface AuthState {
  accessToken: string;
  refreshTokenId: string;
  otpToken: string;
  isFaceIdEnabled: boolean;
  deviceId: string;
}

const initialState: AuthState = {
  accessToken: '',
  refreshTokenId: '',
  otpToken: '',
  isFaceIdEnabled: false,
  deviceId: '',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      state.accessToken = action.payload;
    },
    setRefreshTokenId: (state, action: PayloadAction<string>) => {
      state.refreshTokenId = action.payload;
    },
    setOtpToken: (state, action: PayloadAction<string>) => {
      state.otpToken = action.payload;
    },
    setIsFaceIdEnabled: (state, action: PayloadAction<boolean>) => {
      state.isFaceIdEnabled = action.payload;
    },
    setDeviceId: (state, action: PayloadAction<string>) => {
      state.deviceId = action.payload;
    },
    clearToken: state => {
      state.accessToken = '';
      state.refreshTokenId = '';
      state.otpToken = '';
    },
  },
});

export const {
  setToken,
  setRefreshTokenId,
  setOtpToken,
  setIsFaceIdEnabled,
  setDeviceId,
  clearToken,
} = authSlice.actions;

export default authSlice.reducer;
