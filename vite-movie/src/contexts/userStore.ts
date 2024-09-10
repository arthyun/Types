/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from 'zustand';
import { devtools, persist, createJSONStorage } from 'zustand/middleware';

interface UserStore {
  info: boolean;
  setInfo: (by: boolean) => void;
}

const store = (
  set: (arg0: (state: any) => { info: any }) => any,
  _get: any
) => ({
  info: false,
  setInfo: (by: any) => set((_state) => ({ info: by })),
});

export const userStore = create<UserStore>()(
  devtools(
    persist(store, {
      name: 'userStore',
      storage: createJSONStorage(() => sessionStorage),
    })
  )
);
