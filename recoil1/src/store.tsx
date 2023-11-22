import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist({
  key: 'countSession', // 고유한 key 값
  storage: sessionStorage
});

export const countStore = atom({
  key: 'countStore',
  default: 0,
  effects_UNSTABLE: [persistAtom]
});
