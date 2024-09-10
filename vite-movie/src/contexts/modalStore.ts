/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReactNode } from 'react';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface ModalStore {
  isModal: boolean;
  component: null;
  modalData: any;
  setIsModal: (by: boolean) => void;
  setComponent: (by: ReactNode) => void;
  setModalData: (by: any) => void;
}

const store = (set, get) => ({
  isModal: false,
  component: null,
  modalData: [],
  setIsModal: (by: boolean) => set((state) => ({ isModal: by })),
  setComponent: (by: ReactNode) => set((state) => ({ component: by })),
  setModalData: (by: any) => set((state) => ({ modalData: by })),
});

export const modalStore = create<ModalStore>()(
  devtools(store, {
    name: 'modalStore',
  })
);
