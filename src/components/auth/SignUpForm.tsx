import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  ActivityIndicator,
} from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { colors } from '../../theme/colors';
import { useSignup } from '../../hooks/auth/useSignup';

const signupSchema = z.object({
  username: z.string().min(3, 'Username is required').max(50),
  email: z.string().email('Invalid email address'),
  password: z
    .string()
    .min(6, 'Password must be at least 6 characters long')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number')
    .regex(
      /[!@#$%^&*(),.?":{}|<>]/,
      'Password must contain at least one special character',
    ),
});

type SignupFormInputs = z.infer<typeof signupSchema>;

export default function SignUpForm() {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const signupMutation = useSignup(setErrorMessage);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormInputs>({
    resolver: zodResolver(signupSchema),
    mode: 'onBlur',
    defaultValues: { username: '', email: '', password: '' },
  });

  const onSubmit = (data: SignupFormInputs) => {
    setErrorMessage(null);
    signupMutation.mutate({
      username: data.username,
      email: data.email,
      password: data.password,
    });
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
          Username
        </Text>
        <Controller
          control={control}
          name="username"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              className="px-4 py-3 rounded-md border"
              style={{
                backgroundColor: colors.bgMuted,
                borderColor: errors.username ? '#ef4444' : colors.border,
                color: colors.text,
              }}
              placeholder="Username"
              placeholderTextColor={colors.textDim}
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              autoCapitalize="none"
              autoCorrect={false}
              editable={!signupMutation.isPending}
            />
          )}
        />
        {errors.username ? (
          <Text className="text-xs mt-1" style={{ color: '#ef4444' }}>
            {errors.username.message}
          </Text>
        ) : (
          <Text className="text-xs mt-1" style={{ color: colors.textDim }}>
            At least 3 characters.
          </Text>
        )}
      </View>

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
              placeholder="Email"
              placeholderTextColor={colors.textDim}
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              editable={!signupMutation.isPending}
            />
          )}
        />
        {errors.email ? (
          <Text className="text-xs mt-1" style={{ color: '#ef4444' }}>
            {errors.email.message}
          </Text>
        ) : (
          <Text className="text-xs mt-1" style={{ color: colors.textDim }}>
            Please enter a valid email address.
          </Text>
        )}
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
              placeholder="Password"
              placeholderTextColor={colors.textDim}
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              secureTextEntry
              editable={!signupMutation.isPending}
            />
          )}
        />
        {errors.password ? (
          <Text className="text-xs mt-1" style={{ color: '#ef4444' }}>
            {errors.password.message}
          </Text>
        ) : (
          <Text className="text-xs mt-1" style={{ color: colors.textDim }}>
            At least 6 characters.
          </Text>
        )}
      </View>

      <Pressable
        onPress={() => handleSubmit(onSubmit)()}
        disabled={signupMutation.isPending}
        className="w-full py-2 rounded-md items-center mt-2"
        style={{
          backgroundColor: signupMutation.isPending ? '#1e40af' : '#2563eb',
        }}
      >
        {signupMutation.isPending ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text className="text-white font-semibold">Signup</Text>
        )}
      </Pressable>
    </View>
  );
}
