import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native'; // <--- Add waitFor
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../../stores/auth-slice';
import { EnableFaceIdButton } from './EnableFaceIdButton';
import * as Keychain from 'react-native-keychain';

jest.mock('react-native-keychain', () => ({
  resetGenericPassword: jest.fn().mockResolvedValue(true),
  setGenericPassword: jest.fn().mockResolvedValue(true),
  ACCESS_CONTROL: { BIOMETRY_CURRENT_SET: 'mock-control' },
}));

jest.mock('../../hooks/faceid/useEnableFaceId', () => ({
  useEnableFaceId: () => ({
    enableFaceId: jest.fn().mockResolvedValue(undefined),
  }),
}));

describe('EnableFaceIdButton', () => {
  it('toggles Face ID off and updates Redux state', async () => {
    const store = configureStore({
      reducer: { auth: authReducer },
      preloadedState: {
        auth: {
          accessToken: '',
          refreshTokenId: '',
          otpToken: '',
          isFaceIdEnabled: true,
          deviceId: '',
        },
      },
    });

    const { getByRole } = await render(
      <Provider store={store}>
        <EnableFaceIdButton />
      </Provider>,
    );

    const switchElement = getByRole('switch');
    fireEvent(switchElement, 'valueChange', false);

    // 1. Wait for the async dispatch to finish
    await waitFor(() => {
      const state = store.getState();
      expect(state.auth.isFaceIdEnabled).toBe(false);
    });

    // 2. Check Keychain was called
    expect(Keychain.resetGenericPassword).toHaveBeenCalledWith({
      service: 'device-token',
    });
  });
});
