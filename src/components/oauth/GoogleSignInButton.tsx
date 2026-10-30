import React, { useEffect, useRef, useState } from 'react';
import { Pressable, Text, ActivityIndicator, View } from 'react-native';
import InAppBrowser from 'react-native-inappbrowser-reborn';
import { useGoogleSignInUrl } from '../../hooks/oauth/useGoogleSignInUrl';
import { useOauthExchange } from '../../hooks/oauth/useOauthExchange';
import { colors } from '../../theme/colors';
import { GoogleIcon } from './GoogleIcon';

export const GoogleSignInButton: React.FC = () => {
  const [isDisabled, setIsDisabled] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const browserOpening = useRef(false); //  synchronous lock against concurrent browser launches

  const { data, error } = useGoogleSignInUrl(isClicked);
  const { mutate: exchangeCode } = useOauthExchange(setErrorMessage);

  const url = data?.url; // CHANGED: extract URL for effect dependency

  useEffect(() => {
    if (!url || !isClicked || browserOpening.current) return; // CHANGED: added isClicked and ref guards

    browserOpening.current = true; // ADDED: acquire lock before opening browser

    const openBrowser = async () => {
      // CHANGED: extracted async logic into a function
      try {
        if (!(await InAppBrowser.isAvailable())) {
          throw new Error('In-app browser not available');
        }

        const result = await InAppBrowser.openAuth(
          url, // CHANGED: previously data.url
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
        browserOpening.current = false; // ADDED: release lock when browser operation finishes
      }
    };

    void openBrowser(); // CHANGED: invoke extracted function
  }, [url, isClicked, exchangeCode]); // CHANGED: previously [data]

  useEffect(() => {
    if (error) {
      const message = (error as Error).message;
      setErrorMessage(
        message.includes('429')
          ? 'Too many sign-in attempts. Please wait and try again.'
          : message,
      );
      setIsDisabled(false);
      setIsClicked(false);
    }
  }, [error]);

  const handleClick = () => {
    if (browserOpening.current || isDisabled) return;
    setErrorMessage(null);
    setIsClicked(true);
    setIsDisabled(true);
  };

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
