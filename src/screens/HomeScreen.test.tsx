import React from 'react';
import { render } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../stores/auth-slice';
import HomeScreen from './HomeScreen';

// 1. Mock lucide icons
jest.mock('lucide-react-native', () => ({
  Cpu: () => null,
  ShieldCheck: () => null,
}));

// 2. Mock React Navigation
jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    navigate: jest.fn(),
  }),
}));

// 3. Mock useLogout
jest.mock('../hooks/auth/useLogout', () => ({
  useLogout: () => ({
    mutate: jest.fn(),
    isPending: false,
  }),
}));

// 4. Mock FeatureCard
jest.mock('../components/FeatureCard', () => 'FeatureCard');

const createTestStore = (accessToken = '') => {
  return configureStore({
    reducer: { auth: authReducer },
    preloadedState: {
      auth: {
        accessToken,
        refreshTokenId: '',
        otpToken: '',
        isFaceIdEnabled: false,
        deviceId: '',
      },
    },
  });
};

describe('HomeScreen', () => {
  it('shows "Sign In" button when user is logged out', async () => {
    const store = createTestStore('');
    const { findByText } = await render(
      <Provider store={store}>
        <HomeScreen />
      </Provider>,
    );

    expect(await findByText('Sign In')).toBeTruthy();
  });

  it('shows "Sign Out" button when user is logged in', async () => {
    const store = createTestStore('fake-access-token-123');
    const { findByText, queryByText } = await render(
      <Provider store={store}>
        <HomeScreen />
      </Provider>,
    );

    expect(await findByText('Sign Out')).toBeTruthy();
    expect(queryByText('Sign In')).toBeNull();
  });
});
