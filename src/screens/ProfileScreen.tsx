import React from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  ScrollView,
  Switch,
} from 'react-native';
import { colors } from '../theme/colors';
import { useUserName } from '../hooks/roles/useUserName';
import { EnableFaceIdButton } from '../components/faceid/EnableFaceIdButton';
import { useEnclaveEnrollment } from '../hooks/enclave/useEnclaveEnrollment';
import { useStore } from '../stores/useStore';

export default function ProfileScreen() {
  const { data: profile, isLoading, error } = useUserName();
  const deviceId = useStore(state => state.deviceId);
  const { mutate: enrollDevice, isPending: isEnrolling } =
    useEnclaveEnrollment();

  if (isLoading) {
    return (
      <View
        className="flex-1 items-center justify-center"
        style={{ backgroundColor: colors.bg }}
      >
        <ActivityIndicator color={colors.emerald} />
      </View>
    );
  }

  if (error) {
    return (
      <View
        className="flex-1 items-center justify-center p-6"
        style={{ backgroundColor: colors.bg }}
      >
        <Text
          className="text-base font-bold mb-2"
          style={{ color: colors.text }}
        >
          Couldn't load profile
        </Text>
        <Text className="text-xs" style={{ color: colors.textMuted }}>
          {(error as any)?.message}
        </Text>
      </View>
    );
  }

  return (
    <ScrollView className="flex-1 p-6" style={{ backgroundColor: colors.bg }}>
      <Text className="text-2xl font-bold mb-6" style={{ color: colors.text }}>
        Profile
      </Text>

      <View
        className="p-4 rounded-lg mb-3"
        style={{ backgroundColor: colors.bgMuted }}
      >
        <Text
          className="text-[10px] font-mono uppercase mb-1"
          style={{ color: colors.textMuted }}
        >
          Username
        </Text>
        <Text
          className="text-base font-semibold"
          style={{ color: colors.text }}
        >
          {profile?.username ?? '—'}
        </Text>
      </View>

      <View
        className="p-4 rounded-lg mb-3"
        style={{ backgroundColor: colors.bgMuted }}
      >
        <Text
          className="text-[10px] font-mono uppercase mb-1"
          style={{ color: colors.textMuted }}
        >
          Email
        </Text>
        <Text className="text-base" style={{ color: colors.text }}>
          {profile?.email ?? '—'}
        </Text>
      </View>

      <View
        className="p-4 rounded-lg"
        style={{ backgroundColor: colors.bgMuted }}
      >
        <Text
          className="text-[10px] font-mono uppercase mb-1"
          style={{ color: colors.textMuted }}
        >
          Role
        </Text>
        <Text className="text-base" style={{ color: colors.text }}>
          {profile?.role ?? '—'}
        </Text>
      </View>
      {/* Face ID Section */}
      <Text className="text-lg font-bold mb-4" style={{ color: colors.text }}>
        Security
      </Text>

      <EnableFaceIdButton />

      <View
        className="flex-row items-center justify-between p-4 rounded-lg mb-3 mt-4"
        style={{ backgroundColor: colors.bgMuted }}
      >
        <View>
          <Text
            className="text-base font-semibold"
            style={{ color: colors.text }}
          >
            Hardware Enclave Login
          </Text>
          <Text className="text-xs" style={{ color: colors.textMuted }}>
            Sign in with Secure Enclave
          </Text>
        </View>
        <Switch
          trackColor={{ false: '#767577', true: colors.emerald }}
          onValueChange={() => enrollDevice()}
          value={!!deviceId}
          disabled={isEnrolling || !!deviceId}
        />
      </View>
    </ScrollView>
  );
}
