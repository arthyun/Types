/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReactNode } from 'react';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface ModalStore {
  isModal: boolean;
  component: any;
  modalData: any;
  setIsModal: (by: boolean) => void;
  setComponent: (by: ReactNode) => void;
  setModalData: (by: any) => void;
}

const store = (
  set: (arg0: {
    (state: any): { isModal: any };
    (state: any): { component: any };
    (state: any): { modalData: any };
  }) => any,
  _get: any
) => ({
  isModal: false,
  component: null,
  modalData: [],
  // @ts-ignore
  setIsModal: (by: any) => set((_state) => ({ isModal: by })),
  // @ts-ignore
  setComponent: (by: any) => set((_state) => ({ component: by })),
  // @ts-ignore
  setModalData: (by: any) => set((_state) => ({ modalData: by })),
});

export const modalStore = create<ModalStore>()(
  devtools(store, {
    name: 'modalStore',
  })
);
