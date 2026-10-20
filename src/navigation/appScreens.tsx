import React from 'react';
import SmartWordsScreen from '../screens/apps/SmartWordsScreen';
import GoFrenchScreen from '../screens/apps/GoFrenchScreen';
import AuthFlowScreen from '../screens/apps/AuthFlowScreen';
import FrontendProScreen from '../screens/apps/FrontendProScreen';
import MacCleanerScreen from '../screens/apps/MacCleanerScreen';
import MarkleScreen from '../screens/apps/MarkleScreen';

export type AppScreenEntry = {
  screenName: string;
  title: string;
  component: React.ComponentType<any>;
};

/**
 * The registry of every app that has a custom native landing page.
 * Slugs NOT in this map fall back to the generic AppDetail screen.
 *
 * Adding a new app page = add ONE entry here. Nothing else changes.
 */
export const APP_SCREEN_REGISTRY: Record<string, AppScreenEntry> = {
  smartwords: {
    screenName: 'SmartWords',
    title: 'Smart Words Dictionary',
    component: SmartWordsScreen,
  },
  gofrench: {
    screenName: 'GoFrench',
    title: 'Go French',
    component: GoFrenchScreen,
  },
  authflow: {
    screenName: 'AuthFlow',
    title: 'AuthFlow',
    component: AuthFlowScreen,
  },
  frontendpro: {
    screenName: 'FrontendPro',
    title: 'Frontend Pro',
    component: FrontendProScreen,
  },
  maccleaner: {
    screenName: 'MacCleaner',
    title: 'Mac Cleaner for Devs',
    component: MacCleanerScreen,
  },
  markle: {
    screenName: 'Markle',
    title: 'Markle',
    component: MarkleScreen,
  },
};
