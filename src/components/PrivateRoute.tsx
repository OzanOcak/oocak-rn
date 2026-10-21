import React, { useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { hasAccess } from '../lib/auth/token';
import { colors } from '../theme/colors';

type Props = {
  children: React.ReactNode;
  redirectTo?: string;
};

export default function PrivateRoute({
  children,
  redirectTo = 'SignIn',
}: Props) {
  const navigation = useNavigation<any>();
  const authed = hasAccess();

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
