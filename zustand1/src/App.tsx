import React from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';

// zustand
import { create } from 'zustand';
import { devtools, createJSONStorage, persist } from 'zustand/middleware';

// Types
interface Count {
  count: number;
  setCount: (value: number) => void;
}
interface NewCount {
  newCount: number;
  setNewCount: (value: number) => void;
}

// Store
const countStore = create<Count>()(
  devtools(
    persist(
      (set, get) => ({
        count: 0,
        setCount: (value) => set({ count: get().count + value })
        // setCount: (value) => set({ count: get().count + value }, true) // 덮어쓰기가 하고 싶을때
      }),
      {
        name: 'count-store', // 저장소 key값
        storage: createJSONStorage(() => sessionStorage), // 저장소 선택
        version: 1.1
      }
    )
  )
);
const newCountStore = create<NewCount>()(
  devtools((set, get) => ({
    newCount: 0,
    setNewCount: (value) => set({ newCount: get().newCount + value })
  }))
);

// components
function App() {
  const { count, setCount } = countStore();
  const { newCount, setNewCount } = newCountStore();

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
        <button type="button" onClick={() => setCount(3)}>
          App Count is {count}
        </button>
        <br />
        <br />
        <button type="button" onClick={() => setNewCount(3)}>
          App NewCount is {newCount}
        </button>
        <div>💼💼💼💼💼</div>
        <div>💼💼💼💼💼</div>
        <div>💼💼💼💼💼</div>

        <Card />
      </div>
    </>
  );
}

function Card() {
  return (
    <div className="card">
      {/* <button type="button" onClick={setCount2}>
        Card Count is {count2}
      </button> */}
    </div>
  );
}

export default App;
