import React, { useState } from 'react';
import { Pressable, Text, ActivityIndicator, View } from 'react-native';
import { colors } from '../../theme/colors';
import { useEnclaveLogin } from '../../hooks/enclave/useEnclaveLogin';
import { RootState } from '../../stores';
import { useSelector } from 'react-redux';

export const EnclaveSignInButton: React.FC = () => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { mutate: loginWithEnclave, isPending } =
    useEnclaveLogin(setErrorMessage);

  // Read directly from Redux (PersistGate already handled hydration)
  const deviceId = useSelector((state: RootState) => state.auth.deviceId);

  // If no deviceId, hide the button
  if (!deviceId) {
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
          loginWithEnclave();
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
            <Text className="text-xl">🔐</Text>
            <Text className="font-semibold" style={{ color: colors.text }}>
              Sign in with Hardware Key
            </Text>
          </View>
        )}
      </Pressable>
    </View>
  );
};
