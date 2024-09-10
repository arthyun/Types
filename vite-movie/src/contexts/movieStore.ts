/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface MovieStore {
  query: string;
  setQuery: (by: string) => void;
}

const store = (set, get) => ({
  query: '',
  setQuery: (by: string) => set((state) => ({ query: by })),
});

export const movieStore = create<MovieStore>()(
  devtools(store, {
    name: 'movieStore',
  })
);
