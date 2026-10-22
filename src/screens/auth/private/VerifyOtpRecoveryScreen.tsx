import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors } from '../../../theme/colors';

const OTP_LENGTH = 6;
const INITIAL_TIME = 255;

export default function VerifyOtpRecoveryScreen() {
  const navigation = useNavigation<any>();
  const insets = useSafeAreaInsets();

  const [otp, setOtp] = useState<string[]>(Array(OTP_LENGTH).fill(''));
  const [loading, setLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState(INITIAL_TIME);
  const [countdownFinished, setCountdownFinished] = useState(false);
  const inputsRef = useRef<Array<any>>([]);

  useEffect(() => {
    const id = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(id);
          setCountdownFinished(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    setTimeout(() => inputsRef.current[0]?.focus(), 300);
  }, []);

  const handleChange = (index: number, value: string) => {
    const digit = value.replace(/\D/g, '').slice(0, 1);
    const next = [...otp];
    next[index] = digit;
    setOtp(next);
    if (digit && index < OTP_LENGTH - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (index: number, key: string) => {
    if (key === 'Backspace') {
      if (otp[index]) {
        const next = [...otp];
        next[index] = '';
        setOtp(next);
      } else if (index > 0) {
        inputsRef.current[index - 1]?.focus();
      }
    }
  };

  const handleSubmit = async () => {
    if (countdownFinished) {
      Alert.alert("Time's up", 'Please try again.');
      return;
    }
    const code = otp.join('');
    if (code.length !== OTP_LENGTH || otp.some(d => d === '')) {
      Alert.alert('Incomplete', 'Please enter a complete OTP.');
      return;
    }

    setLoading(true);
    try {
      // TODO: useOtpVerify.mutate(code)
      await new Promise<void>(r => setTimeout(r, 1000));
      console.log('recovery OTP:', code);
      navigation.replace('UpdatePassword');
    } catch (err: any) {
      Alert.alert('Error', err?.message ?? 'OTP verification failed');
    } finally {
      setLoading(false);
    }
  };

  const mm = Math.floor(timeLeft / 60);
  const ss = String(timeLeft % 60).padStart(2, '0');

  return (
    <View
      className="flex-1 justify-center px-6"
      style={{ backgroundColor: colors.bg, paddingBottom: insets.bottom + 24 }}
    >
      <View className="mb-6 items-center">
        <Text
          className="text-2xl font-bold text-center mb-2"
          style={{ color: colors.text }}
        >
          Verify OTP
        </Text>
        <Text
          className="text-lg"
          style={{ color: timeLeft <= 60 ? '#ef4444' : '#3b82f6' }}
        >
          Time left: {mm}:{ss}
        </Text>
      </View>

      <View className="flex-row justify-between mb-6">
        {otp.map((digit, i) => (
          <TextInput
            key={i}
            ref={el => {
              inputsRef.current[i] = el;
            }}
            style={{
              width: 48,
              height: 48,
              textAlign: 'center',
              backgroundColor: colors.bgMuted,
              borderWidth: 1,
              borderColor: digit ? '#3b82f6' : colors.border,
              borderRadius: 6,
              color: colors.text,
              fontSize: 20,
              fontWeight: '600',
            }}
            value={digit}
            onChangeText={v => handleChange(i, v)}
            onKeyPress={({ nativeEvent }) => handleKeyPress(i, nativeEvent.key)}
            keyboardType="number-pad"
            maxLength={1}
            selectTextOnFocus
            editable={!loading && !countdownFinished}
          />
        ))}
      </View>

      {countdownFinished ? (
        <>
          <Pressable
            onPress={() => navigation.replace('ForgotPassword')}
            className="py-2 rounded-lg items-center"
            style={{ backgroundColor: '#2563eb' }}
          >
            <Text className="text-white font-semibold">
              Back to Password Request
            </Text>
          </Pressable>
          <Text
            className="text-sm mt-4 text-center"
            style={{ color: '#ef4444' }}
          >
            Time is up! Please try again.
          </Text>
        </>
      ) : (
        <Pressable
          onPress={handleSubmit}
          disabled={loading}
          className="py-2 rounded-lg items-center"
          style={{ backgroundColor: loading ? '#1e40af' : '#2563eb' }}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text className="text-white font-semibold">Verify OTP</Text>
          )}
        </Pressable>
      )}
    </View>
  );
}
