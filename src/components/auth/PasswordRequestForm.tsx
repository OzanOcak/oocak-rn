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
import { useForgotPassword } from '../../hooks/auth/useForgotPassword';

const emailSchema = z.object({
  email: z.string().email('Invalid email address').min(1, 'Email is required'),
});

type EmailFormInputs = z.infer<typeof emailSchema>;

export default function PasswordRequestForm() {
  const navigation = useNavigation<any>();
  const [message, setMessage] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const forgotPasswordMutation = useForgotPassword();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<EmailFormInputs>({
    resolver: zodResolver(emailSchema),
    defaultValues: { email: '' },
  });

  const onSubmit = (data: EmailFormInputs) => {
    setMessage(null);

    forgotPasswordMutation.mutate(
      { email: data.email },
      {
        onSuccess: () => {
          setIsSuccess(true);
          setMessage('Verification link sent to your email!');
        },
        onError: (error: any) => {
          setIsSuccess(false);
          setMessage(
            error?.response?.data?.message ||
              error?.message ||
              'Request failed',
          );
        },
      },
    );
  };

  return (
    <View>
      {/* Message */}
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

      {/* Email */}
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
              editable={!forgotPasswordMutation.isPending}
            />
          )}
        />
        {errors.email ? (
          <Text className="text-xs mt-1" style={{ color: '#ef4444' }}>
            {errors.email.message}
          </Text>
        ) : (
          <Text className="text-xs mt-1" style={{ color: colors.textDim }}>
            We will send a verification link to this email.
          </Text>
        )}
      </View>

      {/* Buttons */}
      <View className="gap-4 mt-2">
        <Pressable
          onPress={() => handleSubmit(onSubmit)()}
          disabled={forgotPasswordMutation.isPending}
          className="w-full py-2 rounded-md items-center"
          style={{
            backgroundColor: forgotPasswordMutation.isPending
              ? '#1e40af'
              : '#2563eb',
          }}
        >
          {forgotPasswordMutation.isPending ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text className="text-white font-semibold">
              Send Verification Link
            </Text>
          )}
        </Pressable>

        <Pressable
          onPress={() => navigation.replace('SignIn')}
          className="w-full py-2 rounded-md items-center"
          style={{ backgroundColor: '#16a34a' }}
        >
          <Text className="text-white font-semibold">Back to Login</Text>
        </Pressable>
      </View>
    </View>
  );
}
