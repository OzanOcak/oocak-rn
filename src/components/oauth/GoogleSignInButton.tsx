import React, { useEffect, useState } from 'react';
import { Pressable, Text, ActivityIndicator, View } from 'react-native';
import InAppBrowser from 'react-native-inappbrowser-reborn';
import { useGoogleSignInUrl } from '../../hooks/oauth/useGoogleSignInUrl';
import { useOauthExchange } from '../../hooks/oauth/useOauthExchange';
import { colors } from '../../theme/colors';

export const GoogleSignInButton: React.FC = () => {
  const [isDisabled, setIsDisabled] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const { data, error } = useGoogleSignInUrl(isClicked);
  const oauthExchange = useOauthExchange(setErrorMessage);

  useEffect(() => {
    if (!data?.url) return;

    (async () => {
      try {
        if (!(await InAppBrowser.isAvailable())) {
          setErrorMessage('In-app browser not available');
          setIsDisabled(false);
          return;
        }

        const result = await InAppBrowser.openAuth(
          data.url,
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

          const success = params.success === 'true';
          const code = params.code ?? '';

          if (success && code) {
            oauthExchange.mutate({ code });
          } else {
            setErrorMessage(
              'Google sign-in failed: ' + (params.reason ?? 'unknown'),
            );
            setIsDisabled(false);
            setIsClicked(false);
          }
        } else {
          setIsDisabled(false);
          setIsClicked(false);
        }
      } catch (err: any) {
        console.error('InAppBrowser error:', err);
        setErrorMessage('Sign in failed');
        setIsDisabled(false);
        setIsClicked(false);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

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
    if (isDisabled) return;
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
        className="flex-row items-center justify-center px-4 py-2 rounded-md border"
        style={{
          backgroundColor: colors.bgMuted,
          borderColor: colors.border,
          opacity: isDisabled ? 0.5 : 1,
        }}
      >
        {isDisabled ? (
          <ActivityIndicator color={colors.text} />
        ) : (
          <Text className="font-semibold" style={{ color: colors.text }}>
            Sign in with Google
          </Text>
        )}
      </Pressable>
    </View>
  );
};
