import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { GoogleSignInButton } from './GoogleSignInButton';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Provider } from 'react-redux';
import { store } from '../../stores';

// 1. Mock Native Browser
// (OpenAuth never resolves so the spinner stays visible for the test)
jest.mock('react-native-inappbrowser-reborn', () => ({
  isAvailable: jest.fn().mockResolvedValue(true),
  openAuth: jest.fn().mockImplementation(() => new Promise(() => {})),
}));

// 2. Mock React Navigation
jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    navigate: jest.fn(),
    replace: jest.fn(),
    goBack: jest.fn(),
  }),
}));

// 3. Mock Axios Client
jest.mock('../../lib/http/nodeAuthClient', () => ({
  __esModule: true,
  default: {
    get: jest
      .fn()
      .mockResolvedValue({ data: { url: 'https://fake-google-url.com' } }),
    post: jest.fn(),
  },
}));

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: false } },
});

const renderWithProviders = async (component: React.ReactElement) => {
  return await render(
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        {component}
      </QueryClientProvider>
    </Provider>,
  );
};

describe('GoogleSignInButton', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the Google button correctly', async () => {
    const { findByText } = await renderWithProviders(<GoogleSignInButton />);
    expect(await findByText('Sign in with Google')).toBeTruthy();
  });

  it('shows a loading spinner when clicked', async () => {
    const { getByText, queryByText } = await renderWithProviders(
      <GoogleSignInButton />,
    );

    const button = getByText('Sign in with Google');
    fireEvent.press(button);

    await waitFor(() => {
      // Since openAuth never resolves, the text should disappear forever
      expect(queryByText('Sign in with Google')).toBeNull();
    });
  });
});
