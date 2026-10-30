import React, { useState } from 'react';
import { View, Text, Switch, ActivityIndicator } from 'react-native';
import * as Keychain from 'react-native-keychain';
import { colors } from '../../theme/colors';
import { useEnableFaceId } from '../../hooks/faceid/useEnableFaceId';
import { useStore } from '../../stores/useStore';

export const EnableFaceIdButton: React.FC = () => {
  const { enableFaceId } = useEnableFaceId();
  const isEnabled = useStore(state => state.isFaceIdEnabled);
  const setIsFaceIdEnabled = useStore(state => state.setIsFaceIdEnabled);

  const [isPending, setIsPending] = useState(false);

  const toggleSwitch = async () => {
    if (isEnabled) {
      // User wants to DISABLE Face ID
      try {
        setIsPending(true);
        // 1. Remove the token from Keychain
        await Keychain.resetGenericPassword({ service: 'device-token' });

        // 2. Update Zustand
        setIsFaceIdEnabled(false);
      } catch (error) {
        console.error('Failed to disable Face ID', error);
      } finally {
        setIsPending(false);
      }
    } else {
      // User wants to ENABLE Face ID
      setIsPending(true);
      await enableFaceId(); // Your hook handles the Keychain and Zustand update
      setIsPending(false);
    }
  };

  return (
    <View
      className="flex-row items-center justify-between p-4 rounded-lg mb-3"
      style={{ backgroundColor: colors.bgMuted }}
    >
      <View>
        <Text
          className="text-base font-semibold"
          style={{ color: colors.text }}
        >
          Sign in with Face ID
        </Text>
        <Text className="text-xs" style={{ color: colors.textMuted }}>
          Use Face ID to log in quickly
        </Text>
      </View>

      {isPending ? (
        <ActivityIndicator color={colors.emerald} />
      ) : (
        <Switch
          trackColor={{ false: '#767577', true: colors.emerald }}
          thumbColor={'#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
      )}
    </View>
  );
};
