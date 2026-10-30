import React, { useState, useEffect } from 'react';
import { Pressable, Text, ActivityIndicator, View } from 'react-native';
import { colors } from '../../theme/colors';
import { useFaceIdLogin } from '../../hooks/faceid/useFaceIdLogin';
import { useStore } from '../../stores/useStore';

export const FaceIdSignInButton: React.FC = () => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { mutate: loginWithFaceId, isPending } =
    useFaceIdLogin(setErrorMessage);

  // 1. Get the value from Zustand
  const isFaceIdEnabled = useStore(state => state.isFaceIdEnabled);

  // 2. Set up the hydration gate
  const [hasHydrated, setHasHydrated] = useState(
    useStore.persist.hasHydrated(),
  );

  useEffect(() => {
    const unsubscribe = useStore.persist.onFinishHydration(() => {
      setHasHydrated(true);
    });

    // In case hydration finished before this component mounted
    setHasHydrated(useStore.persist.hasHydrated());

    return unsubscribe;
  }, []);

  // 3. Wait for hydration, then check the boolean
  if (!hasHydrated || !isFaceIdEnabled) {
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
