import React, { useRef, useState, useEffect } from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  Pressable,
  BackHandler,
} from 'react-native';
import { WebView } from 'react-native-webview';
import { useRoute } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors } from '../theme/colors';

export default function BlogPostScreen() {
  const route = useRoute<any>();
  const insets = useSafeAreaInsets();
  const webViewRef = useRef<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { url } = route.params ?? {};

  // Android hardware back → go back in WebView history first
  useEffect(() => {
    const onBack = () => {
      if (webViewRef.current?.canGoBack?.()) {
        webViewRef.current.goBack();
        return true;
      }
      return false;
    };
    const sub = BackHandler.addEventListener('hardwareBackPress', onBack);
    return () => sub.remove();
  }, []);

  if (!url) {
    return (
      <View
        className="flex-1 items-center justify-center"
        style={{ backgroundColor: colors.bg }}
      >
        <Text style={{ color: colors.textMuted }}>No URL provided</Text>
      </View>
    );
  }

  return (
    <View
      className="flex-1"
      style={{
        backgroundColor: colors.bg,
        paddingHorizontal: 2,
        paddingBottom: insets.bottom - 24,
      }}
    >
      <View
        className="flex-1 rounded-2xl overflow-hidden border"
        style={{ borderColor: colors.border, backgroundColor: colors.bgMuted }}
      >
        <WebView
          ref={webViewRef}
          source={{ uri: url }}
          style={{ flex: 1, backgroundColor: colors.bg }}
          onLoadStart={() => setLoading(true)}
          onLoadEnd={() => setLoading(false)}
          onError={(e: any) => {
            setLoading(false);
            setError(e.nativeEvent?.description ?? 'Failed to load');
          }}
        />

        {/* Loading overlay */}
        {loading && !error ? (
          <View
            className="absolute inset-0 items-center justify-center"
            style={{ backgroundColor: colors.bg }}
            pointerEvents="none"
          >
            <ActivityIndicator color={colors.emerald} />
          </View>
        ) : null}

        {/* Error overlay */}
        {error ? (
          <View
            className="absolute inset-0 items-center justify-center p-6"
            style={{ backgroundColor: colors.bg }}
          >
            <Text
              className="text-base font-bold mb-2"
              style={{ color: colors.text }}
            >
              Couldn&apos;t load the page
            </Text>
            <Text
              className="text-xs mb-0 text-center"
              style={{ color: colors.textMuted }}
            >
              {error}
            </Text>
            <Pressable
              onPress={() => {
                setError(null);
                setLoading(true);
                webViewRef.current?.reload?.();
              }}
              className="px-2 py-2 rounded-lg"
              style={{ backgroundColor: colors.emerald }}
            >
              <Text className="text-white font-semibold">Retry</Text>
            </Pressable>
          </View>
        ) : null}
      </View>
    </View>
  );
}
