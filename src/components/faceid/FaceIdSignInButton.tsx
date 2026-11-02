import React, { useState } from 'react';
import { Pressable, Text, ActivityIndicator, View } from 'react-native';
import { colors } from '../../theme/colors';
import { useFaceIdLogin } from '../../hooks/faceid/useFaceIdLogin';
import { useSelector } from 'react-redux';
import { RootState } from '../../stores';

export const FaceIdSignInButton: React.FC = () => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { mutate: loginWithFaceId, isPending } =
    useFaceIdLogin(setErrorMessage);

  // Read directly from Redux
  const isFaceIdEnabled = useSelector(
    (state: RootState) => state.auth.isFaceIdEnabled,
  );

  // If not enabled, hide the button
  if (!isFaceIdEnabled) {
    return null;
  }

  return (
    <View className="items-center mt-4">
      {errorMessage ? (
        <Text className="text-red-500 text-sm mb-2 text-center">
          {errorMessage}
        </Text>
      ) : null}
      <Pressable
        onPress={() => {
          setErrorMessage(null);
          loginWithFaceId();
        }}
        disabled={isPending}
        className="flex-row items-center justify-center px-4 py-3 rounded-md border w-full"
        style={{
          backgroundColor: colors.bgMuted,
          borderColor: colors.border,
          opacity: isPending ? 0.5 : 1,
        }}
      >
        {isPending ? (
          <ActivityIndicator color={colors.text} />
        ) : (
          <View className="flex-row items-center justify-center gap-2">
            <Text className="text-xl">👤</Text>
            <Text className="font-semibold" style={{ color: colors.text }}>
              Sign in with Face ID
            </Text>
          </View>
        )}
      </Pressable>
    </View>
  );
};
