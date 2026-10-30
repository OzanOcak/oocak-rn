import React, { useEffect, useRef, useState } from 'react';
import { Pressable, Text, ActivityIndicator, View } from 'react-native';
import InAppBrowser from 'react-native-inappbrowser-reborn';
import { useQueryClient } from '@tanstack/react-query'; // <--- ADD THIS
import AsyncStorage from '@react-native-async-storage/async-storage'; // <--- ADD THIS
import axiosInstance from '../../lib/http/nodeAuthClient'; // <--- ADD THIS
import { generateCodeChallenge, generateCodeVerifier } from '../../lib/pkce'; // <--- ADD THIS
import { useOauthExchange } from '../../hooks/oauth/useOauthExchange';
import { colors } from '../../theme/colors';
import { GoogleIcon } from './GoogleIcon';

export const GoogleSignInButton: React.FC = () => {
  const [isDisabled, setIsDisabled] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [url, setUrl] = useState<string | null>(null); // <--- LOCAL STATE FOR URL

  const browserOpening = useRef(false);
  const queryClient = useQueryClient(); // <--- GET QUERY CLIENT

  const { mutate: exchangeCode } = useOauthExchange(setErrorMessage);

  // FORCE A FRESH FETCH ON EVERY CLICK
  const handleClick = async () => {
    if (browserOpening.current || isDisabled) return;

    setErrorMessage(null);
    setIsClicked(true);
    setIsDisabled(true);

    try {
      const data = await queryClient.fetchQuery({
        queryKey: ['googleSignInUrl', Date.now()], // Date.now() bypasses cache
        queryFn: async () => {
          const verifier = generateCodeVerifier();
          const challenge = generateCodeChallenge(verifier);
          await AsyncStorage.setItem('pkce_verifier', verifier);
          const response = await axiosInstance.get('/mobile/oauth/url', {
            params: { code_challenge: challenge },
          });
          return response.data;
        },
      });

      setUrl(data.url); // Trigger the browser to open
    } catch (err: any) {
      setErrorMessage('Failed to generate sign-in URL' + err);
      setIsDisabled(false);
      setIsClicked(false);
    }
  };

  // OPEN BROWSER WHEN URL IS READY
  useEffect(() => {
    if (!url || !isClicked || browserOpening.current) return;

    browserOpening.current = true;

    const openBrowser = async () => {
      try {
        if (!(await InAppBrowser.isAvailable())) {
          throw new Error('In-app browser not available');
        }

        const result = await InAppBrowser.openAuth(
          url,
          'oocakrn://oauth-callback',
          {
            showTitle: false,
            enableUrlBarHiding: true,
            enableDefaultShare: false,
          },
        );

        if (result.type === 'success' && result.url) {
          const query = result.url.split('?')[1] ?? '';
          const params = Object.fromEntries(new URLSearchParams(query) as any);

          if (params.success === 'true' && params.code) {
            exchangeCode({ code: params.code });
          } else {
            setErrorMessage(
              `Google sign-in failed: ${params.reason ?? 'unknown'}`,
            );
            setIsDisabled(false);
            setIsClicked(false);
          }
        } else {
          setIsDisabled(false);
          setIsClicked(false);
        }
      } catch (err) {
        console.error('InAppBrowser error:', err);
        setErrorMessage('Sign in failed');
        setIsDisabled(false);
        setIsClicked(false);
      } finally {
        browserOpening.current = false;
        setUrl(null); // Clear the URL so it doesn't accidentally reopen
      }
    };

    void openBrowser();
  }, [url, isClicked, exchangeCode]);

  return (
    <View className="items-center">
      {errorMessage ? (
        <Text className="text-red-500 text-sm mb-2 text-center">
          {errorMessage}
        </Text>
      ) : null}

      <Pressable
        onPress={handleClick}
        disabled={isDisabled}
        className="flex-row items-center justify-center px-4 py-3 rounded-md border"
        style={{
          backgroundColor: colors.bgMuted,
          borderColor: colors.border,
          opacity: isDisabled ? 0.5 : 1,
        }}
      >
        {isDisabled ? (
          <ActivityIndicator color={colors.text} />
        ) : (
          <View className="flex-row items-center justify-center gap-2">
            <GoogleIcon size={20} />
            <Text className="font-semibold" style={{ color: colors.text }}>
              Sign in with Google
            </Text>
          </View>
        )}
      </Pressable>
    </View>
  );
};
