/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface LoadingStore {
  isLoading: boolean;
  setIsLoading: (by: boolean) => void;
}

const store = (
  set: (arg0: (state: any) => { isLoading: boolean }) => any,
  _get: any
) => ({
  isLoading: false,
  setIsLoading: (by: boolean) => set((_state) => ({ isLoading: by })),
});

export const loadingStore = create<LoadingStore>()(
  devtools(store, {
    name: 'loadingStore',
  })
);
