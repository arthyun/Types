/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from 'zustand';
import { devtools, persist, createJSONStorage } from 'zustand/middleware';

interface UserStore {
  info: boolean;
  setInfo: (by: boolean) => void;
}

const store = (set, get) => ({
  info: false,
  setInfo: (by: any) => set((state) => ({ info: by })),
});

export const userStore = create<UserStore>()(
  devtools(
    persist(store, {
      name: 'userStore',
      storage: createJSONStorage(() => sessionStorage),
    })
  )
);
