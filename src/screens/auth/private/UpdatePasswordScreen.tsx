import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  ScrollView,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { colors } from '../../../theme/colors';

const passwordSchema = z
  .object({
    newPassword: z
      .string()
      .min(6, 'Password must be at least 6 characters long'),
    confirmPassword: z
      .string()
      .min(6, 'Password must be at least 6 characters long'),
  })
  .refine(d => d.newPassword === d.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

type PasswordInputs = z.infer<typeof passwordSchema>;

export default function UpdatePasswordScreen() {
  const navigation = useNavigation<any>();
  const insets = useSafeAreaInsets();
  const [message, setMessage] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<PasswordInputs>({
    resolver: zodResolver(passwordSchema),
    defaultValues: { newPassword: '', confirmPassword: '' },
  });

  const onSubmit = async (data: PasswordInputs) => {
    setMessage(null);
    setSubmitting(true);

    try {
      // TODO: useUpdateUserPassword.mutate({ newPassword, confirmPassword, otps: true })
      await new Promise<void>(r => setTimeout(r, 1000));
      console.log('update password:', data.newPassword);
      setIsSuccess(true);
      setMessage('Password updated successfully!');
    } catch (err: any) {
      setIsSuccess(false);
      setMessage(err?.message ?? 'Update failed');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <KeyboardAvoidingView
      className="flex-1"
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={{ backgroundColor: colors.bg }}
    >
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: 'center',
          padding: 24,
          paddingBottom: insets.bottom + 24,
        }}
        keyboardShouldPersistTaps="handled"
      >
        <Text
          className="text-2xl font-bold text-center mb-6"
          style={{ color: colors.text }}
        >
          Update Password
        </Text>

        {message ? (
          <View
            className="px-4 py-3 rounded-md mb-4 border"
            style={{
              backgroundColor: isSuccess ? '#064e3b22' : '#7f1d1d22',
              borderColor: isSuccess ? '#22c55e' : '#ef4444',
            }}
          >
            <Text
              className="text-sm"
              style={{ color: isSuccess ? '#6ee7b7' : '#fca5a5' }}
            >
              {message}
            </Text>
          </View>
        ) : null}

        <View className="mb-4">
          <Text className="text-sm mb-2" style={{ color: colors.textMuted }}>
            New Password
          </Text>
          <Controller
            control={control}
            name="newPassword"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                className="px-4 py-2 rounded-md border"
                style={{
                  backgroundColor: colors.bgMuted,
                  borderColor: errors.newPassword ? '#ef4444' : colors.border,
                  color: colors.text,
                }}
                placeholder="Enter your new password"
                placeholderTextColor={colors.textDim}
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                secureTextEntry
                editable={!submitting}
              />
            )}
          />
          {errors.newPassword ? (
            <Text className="text-xs mt-1" style={{ color: '#ef4444' }}>
              {errors.newPassword.message}
            </Text>
          ) : (
            <Text className="text-xs mt-1" style={{ color: colors.textDim }}>
              At least 6 characters.
            </Text>
          )}
        </View>

        <View className="mb-4">
          <Text className="text-sm mb-2" style={{ color: colors.textMuted }}>
            Confirm Password
          </Text>
          <Controller
            control={control}
            name="confirmPassword"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                className="px-4 py-2 rounded-md border"
                style={{
                  backgroundColor: colors.bgMuted,
                  borderColor: errors.confirmPassword
                    ? '#ef4444'
                    : colors.border,
                  color: colors.text,
                }}
                placeholder="Confirm your new password"
                placeholderTextColor={colors.textDim}
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                secureTextEntry
                editable={!submitting}
              />
            )}
          />
          {errors.confirmPassword ? (
            <Text className="text-xs mt-1" style={{ color: '#ef4444' }}>
              {errors.confirmPassword.message}
            </Text>
          ) : (
            <Text className="text-xs mt-1" style={{ color: colors.textDim }}>
              Must match the new password.
            </Text>
          )}
        </View>

        <View className="gap-4 mt-2">
          <Pressable
            onPress={() => handleSubmit(onSubmit)()}
            disabled={submitting}
            className="w-full py-2 rounded-md items-center"
            style={{ backgroundColor: submitting ? '#1e40af' : '#2563eb' }}
          >
            {submitting ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text className="text-white font-semibold">Update</Text>
            )}
          </Pressable>

          <Pressable
            onPress={() => navigation.navigate('SignIn')}
            className="w-full py-2 rounded-md items-center"
            style={{ backgroundColor: '#16a34a' }}
          >
            <Text className="text-white font-semibold">Back to Login</Text>
          </Pressable>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
