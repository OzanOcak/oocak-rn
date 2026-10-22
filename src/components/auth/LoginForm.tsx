import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { colors } from '../../theme/colors';
import { useLogin } from '../../hooks/auth/useLogin';

const loginSchema = z.object({
  email: z
    .string()
    .email('Invalid email address')
    .min(3, 'Email is required')
    .max(50),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
});

type LoginFormInputs = z.infer<typeof loginSchema>;

export default function LoginForm() {
  const navigation = useNavigation<any>();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const loginMutation = useLogin(setErrorMessage);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  });

  const onSubmit = async (data: LoginFormInputs) => {
    setErrorMessage(null);
    loginMutation.mutate({ email: data.email, password: data.password });
  };

  return (
    <View>
      {errorMessage ? (
        <View
          className="px-4 py-3 rounded-md mb-4 border"
          style={{ backgroundColor: '#7f1d1d22', borderColor: '#ef4444' }}
        >
          <Text className="text-sm" style={{ color: '#fca5a5' }}>
            {errorMessage}
          </Text>
        </View>
      ) : null}

      <View className="mb-4">
        <Text className="text-sm mb-2" style={{ color: colors.textMuted }}>
          Email
        </Text>
        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              className="px-4 py-3 rounded-md border"
              style={{
                backgroundColor: colors.bgMuted,
                borderColor: errors.email ? '#ef4444' : colors.border,
                color: colors.text,
              }}
              placeholder="Enter your email"
              placeholderTextColor={colors.textDim}
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              editable={!loginMutation.isPending}
            />
          )}
        />
        {errors.email ? (
          <Text className="text-xs mt-1" style={{ color: '#ef4444' }}>
            {errors.email.message}
          </Text>
        ) : null}
      </View>

      <View className="mb-4">
        <Text className="text-sm mb-2" style={{ color: colors.textMuted }}>
          Password
        </Text>
        <Controller
          control={control}
          name="password"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              className="px-4 py-3 rounded-md border"
              style={{
                backgroundColor: colors.bgMuted,
                borderColor: errors.password ? '#ef4444' : colors.border,
                color: colors.text,
              }}
              placeholder="Enter your password"
              placeholderTextColor={colors.textDim}
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              secureTextEntry
              editable={!loginMutation.isPending}
            />
          )}
        />
        {errors.password ? (
          <Text className="text-xs mt-1" style={{ color: '#ef4444' }}>
            {errors.password.message}
          </Text>
        ) : null}
      </View>

      <View className="gap-4 mt-2">
        <Pressable
          onPress={() => handleSubmit(onSubmit)()}
          disabled={loginMutation.isPending}
          className="w-full py-2 rounded-md items-center"
          style={{
            backgroundColor: loginMutation.isPending ? '#1e40af' : '#2563eb',
          }}
        >
          {loginMutation.isPending ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text className="text-white font-semibold">Sign in</Text>
          )}
        </Pressable>

        <Pressable
          onPress={() => navigation.replace('SignUp')}
          className="w-full py-2 rounded-md items-center"
          style={{ backgroundColor: '#16a34a' }}
        >
          <Text className="text-white font-semibold">Create a new account</Text>
        </Pressable>
      </View>
    </View>
  );
}
