import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface AuthState {
  accessToken: string;
  refreshTokenId: string;
  otpToken: string;
  isFaceIdEnabled: boolean;
  deviceId: string;
  passwordResetToken: string;
  passwordResetUserId: number;
}

const initialState: AuthState = {
  accessToken: '',
  refreshTokenId: '',
  otpToken: '',
  isFaceIdEnabled: false,
  deviceId: '',
  passwordResetToken: '',
  passwordResetUserId: 0,
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
    setPasswordResetToken: (state, action: PayloadAction<string>) => {
      state.passwordResetToken = action.payload;
    },
    setPasswordResetUserId: (state, action: PayloadAction<number>) => {
      state.passwordResetUserId = action.payload;
    },
    clearToken: state => {
      state.accessToken = '';
      state.refreshTokenId = '';
      state.otpToken = '';
      // Also clear password reset fields on logout
      state.passwordResetToken = '';
      state.passwordResetUserId = 0;
    },
  },
});

export const {
  setToken,
  setRefreshTokenId,
  setOtpToken,
  setIsFaceIdEnabled,
  setDeviceId,
  setPasswordResetToken,
  setPasswordResetUserId,
  clearToken,
} = authSlice.actions;

export default authSlice.reducer;
