import type { NavigationProp } from '@react-navigation/native';
import { APP_SCREEN_REGISTRY } from './appScreens';

/**
 * Single entry point for "open app X".
 * Use from AppCard, HomeScreen featured cards, future search, deep links.
 *
 * - If the app has a custom page → navigate to that screen
 * - Otherwise → fall back to the generic AppDetail with the slug param
 */
export function openApp(navigation: NavigationProp<any>, slug: string) {
  const entry = APP_SCREEN_REGISTRY[slug];
  if (entry) {
    navigation.navigate('AppsTab', { screen: entry.screenName });
  } else {
    navigation.navigate('AppsTab', {
      screen: 'AppDetail',
      params: { slug },
    });
  }
}
