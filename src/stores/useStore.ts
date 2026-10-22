import { create } from 'zustand';
import { createJSONStorage, devtools, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { subscribeWithSelector } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthSlice, createAuthSlice } from './auth-slice';

export type Store = AuthSlice;

export const useStore = create<Store>()(
  devtools(
    persist(
      subscribeWithSelector(
        immer(set => ({
          ...createAuthSlice(set),
        })),
      ),
      {
        name: 'store',
        storage: createJSONStorage(() => AsyncStorage),
      },
    ),
  ),
);
