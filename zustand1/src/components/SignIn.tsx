import { ChangeEvent, FormEvent, useState } from 'react';
import styled from 'styled-components';
// import logo from './naver.png';

// Zustand
import { create, StateCreator, StoreMutatorIdentifier } from 'zustand';
import { devtools, createJSONStorage, persist } from 'zustand/middleware';

//style
const FormTag = styled.form`
  max-width: 550px;
  margin: 40vh auto;
  padding: 1.75rem 1rem;
  border-radius: 15px;
  box-shadow: rgba(99, 99, 99, 0.3) 0px 2px 8px 0px;
  /* overflow: hidden; */
  text-align: center;
  box-sizing: border-box;
  position: relative;
  h1 {
    background: url('./naver.png') no-repeat;
    background-size: cover;
    width: 300px;
    height: 60px;
    text-indent: -9999px;
    color: red;
    overflow: hidden;
    position: absolute;
    top: -100px;
    left: 130px;
  }
  input {
    width: 90%;
    padding: 0.75rem 0;
    padding-left: 10px;
    margin: 0 0 15px 0;
    border: none;
    border-bottom: 1px solid #333;
    font-size: 1.25rem;
    box-sizing: border-box;
  }
  button {
    width: 90%;
    background: #00c210;
    margin-top: 20px;
    padding: 1rem 0;
    border: none;
    font-size: 1.5rem;
    color: #fff;
    transition: all 0.3s;
    &:hover {
      background: #005a21;
      font-weight: bold;
    }
  }
`;

// Devtools, Persist 합치기 ***
type MyMiddlewares = <T, Mps extends [StoreMutatorIdentifier, unknown][] = [], Mcs extends [StoreMutatorIdentifier, unknown][] = []>(
  f: StateCreator<T, [...Mps, ['zustand/devtools', never], ['zustand/persist', unknown]], Mcs>
) => StateCreator<T, Mps, [['zustand/devtools', never], ['zustand/persist', T], ...Mcs]>;

const myMiddleWares = ((f) => devtools(persist(f, { name: 'userStore', storage: createJSONStorage(() => sessionStorage) }))) as MyMiddlewares;

// Types
interface UserTypes {
  userInfo: unknown;
  setUserInfo: (userData: { userId: string; userPass: string | number }) => void;
  userConfirm: boolean;
  setUserConfirm: () => void;
}

// Store
export const userInfoStore = create<UserTypes>()(
  myMiddleWares((set) => ({
    userInfo: {},
    setUserInfo: (userData) => set(() => ({ userInfo: { userId: userData.userId, userPass: userData.userPass } })),
    userConfirm: false,
    setUserConfirm: () => set(() => ({ userConfirm: true }))
  }))
);

const SignIn = () => {
  const [id, setId] = useState<string>('');
  const [password, setPassword] = useState<string | number>('');

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { userInfo, setUserInfo, userConfirm, setUserConfirm } = userInfoStore();

  const onChangeUserInfo = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'id') setId(value);
    if (name === 'password') setPassword(value);
  };

  interface NewObjType {
    [key: string]: string | number;
    userId: string;
    userPass: string | number;
  }
  const onLogin = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newObject: NewObjType = {
      userId: id,
      userPass: password
    };

    const valiCheckArr: string[] = [];

    for (const key in newObject) {
      if (!newObject[key]) {
        valiCheckArr.push(key);
      }
    }

    if (valiCheckArr.length === 0) {
      const metaData: NewObjType = {
        userId: import.meta.env.VITE_APP_ID,
        userPass: import.meta.env.VITE_APP_PASS
      };
      let result: boolean = false;
      for (const key in metaData) {
        const metaArr: string[] = [];
        if (metaData[key] !== id && metaData[key] !== password) {
          metaArr.push(key);
          alert(`${metaArr}가 일치하지 않습니다.`);
          result = false;
        } else {
          result = true;
        }
      }
      if (result) {
        alert('로그인 성공');
        setUserInfo(newObject);
        setUserConfirm();
      }
    } else {
      // valiCheckArr.forEach((item) => alert(`${item}를 확인해 주세요.`));
      alert('Field를 입력하세요...');
    }
  };

  return (
    <>
      <FormTag onSubmit={onLogin}>
        <h1>Logo</h1>
        <input type="text" name="id" value={id} onChange={onChangeUserInfo} placeholder="아이디" />
        <input type="password" name="password" value={password} onChange={onChangeUserInfo} placeholder="비밀번호" />
        <button type="submit">로그인</button>
      </FormTag>
    </>
  );
};

export default SignIn;
