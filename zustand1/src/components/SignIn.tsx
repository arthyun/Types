import { ChangeEvent, FormEvent, useState } from 'react';
import styled from 'styled-components';

// Zustand
import { create, StateCreator, StoreMutatorIdentifier } from 'zustand';
import { devtools, createJSONStorage, persist } from 'zustand/middleware';

// Devtools, persist 합치기 ***
type MyMiddlewares = <T, Mps extends [StoreMutatorIdentifier, unknown][] = [], Mcs extends [StoreMutatorIdentifier, unknown][] = []>(
  f: StateCreator<T, [...Mps, ['zustand/devtools', never], ['zustand/persist', unknown]], Mcs>
) => StateCreator<T, Mps, [['zustand/devtools', never], ['zustand/persist', T], ...Mcs]>;

const myMiddlewares = ((f) => devtools(persist(f, { name: 'userStore', storage: createJSONStorage(() => sessionStorage) }))) as MyMiddlewares;

// Types
interface userTypes {
  userInfo: unknown;
  setUserInfo: (data: object) => void;
}

// Store
const userInfoStore = create<userTypes>()(
  myMiddlewares((set) => ({
    userInfo: {},
    setUserInfo: (data) => console.log(data)
  }))
);

//style
const FormTag = styled.form`
  max-width: 550px;
  margin: 40vh auto;
  padding: 1rem;
  border-radius: 15px;
  box-shadow: rgba(99, 99, 99, 0.5) 0px 2px 8px 0px;
  overflow: hidden;
  box-sizing: border-box;
  input {
    width: 100%;
    padding: 0.75rem 0;
    padding-left: 10px;
    margin: 0 0 12px 0;
    border: none;
    border-bottom: 1px solid #333;
    font-size: 1.25rem;
    box-sizing: border-box;
  }
  button {
    width: 100%;
    background: #0300cc;
    padding: 1rem 0;
    border: none;
    font-size: 1.5rem;
    color: #fff;
    transition: all 0.3s;
    &:hover {
      background: #0081cc;
    }
  }
`;

const SignIn = () => {
  const [id, setId] = useState<string>('');
  const [password, setPassword] = useState<string | number>('');

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { userInfo, setUserInfo } = userInfoStore();
  // console.log(userInfo);

  const onChangeUserInfo = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'id') setId(value);
    if (name === 'password') setPassword(value);
  };

  const onLogin = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // console.log('입력한 아이디: ' + id);
    // console.log('입력한 비밀번호: ' + password);
    const newObject = {
      userId: id,
      userPass: password
    };
    setUserInfo(newObject);
  };

  return (
    <FormTag onSubmit={onLogin}>
      <input type="text" name="id" value={id} onChange={onChangeUserInfo} placeholder="아이디" />
      <input type="password" name="password" value={password} onChange={onChangeUserInfo} placeholder="비밀번호" />
      <button>로그인</button>
    </FormTag>
  );
};

export default SignIn;
