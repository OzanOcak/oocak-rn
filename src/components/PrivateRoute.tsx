import React, { useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../theme/colors';
import { useStore } from '../stores/useStore';

type Props = {
  children: React.ReactNode;
  redirectTo?: string;
};

export default function PrivateRoute({
  children,
  redirectTo = 'SignIn',
}: Props) {
  const navigation = useNavigation<any>();
  const accessToken = useStore(s => s.accessToken);
  // !! converts the value to boolean
  const authed = !!accessToken;

  useEffect(() => {
    if (!authed) {
      navigation.replace(redirectTo);
    }
  }, [authed, navigation, redirectTo]);

  if (!authed) {
    return (
      <View
        className="flex-1 items-center justify-center"
        style={{ backgroundColor: colors.bg }}
      >
        <ActivityIndicator color={colors.emerald} />
      </View>
    );
  }

  return <>{children}</>;
}
