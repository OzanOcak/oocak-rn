import React from 'react';
import { View, Text, Switch, ActivityIndicator } from 'react-native';
import { colors } from '../../theme/colors';
import { useEnclaveEnrollment } from '../../hooks/enclave/useEnclaveEnrollment';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../stores';
import { setDeviceId } from '../../stores/auth-slice';

export const EnableEnclaveButton: React.FC = () => {
  const { mutate: enrollDevice, isPending } = useEnclaveEnrollment();
  const dispatch = useDispatch();

  const deviceId = useSelector((state: RootState) => state.auth.deviceId);

  const toggleSwitch = () => {
    if (deviceId) {
      // DISABLE: Clear the device ID from Zustand
      dispatch(setDeviceId(''));
      // alert('Hardware Enclave Login disabled.');
    } else {
      // ENABLE: Generate key and register with backend
      enrollDevice();
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
          Hardware Enclave Login
        </Text>
        <Text className="text-xs" style={{ color: colors.textMuted }}>
          Sign in with Secure Enclave
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
          value={!!deviceId}
        />
      )}
    </View>
  );
};
