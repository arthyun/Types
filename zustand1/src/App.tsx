/* eslint-disable */
import React from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';

// Zustand
import { create, StateCreator, StoreMutatorIdentifier } from 'zustand';
import { devtools, createJSONStorage, persist } from 'zustand/middleware';

// Types
interface BearState {
  bears: number;
  increase: (by: number) => void;
}

// Devtools, persist 합치기 ***
type MyMiddlewares = <T, Mps extends [StoreMutatorIdentifier, unknown][] = [], Mcs extends [StoreMutatorIdentifier, unknown][] = []>(
  f: StateCreator<T, [...Mps, ['zustand/devtools', never], ['zustand/persist', unknown]], Mcs>
) => StateCreator<T, Mps, [['zustand/devtools', never], ['zustand/persist', T], ...Mcs]>;

const myMiddlewares = ((f) => devtools(persist(f, { name: 'bearStore', storage: createJSONStorage(() => sessionStorage) }))) as MyMiddlewares;

// Store
const useBearStore = create<BearState>()(
  myMiddlewares((set, get) => ({
    bears: 0,
    increase: (by) => set({ bears: get().bears + by })
  }))
);

// Components
const App = () => {
  const { bears, increase } = useBearStore();

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button type="button" onClick={() => increase(3)}>
          App bears is {bears}
        </button>
      </div>
    </>
  );
};

export default App;
