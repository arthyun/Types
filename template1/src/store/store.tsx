import { atom } from "recoil";

interface LoginStore {
   key: string;
   default: boolean;
}

export const loginStore = atom({
   key: "loginStore",
   default: false as LoginStore["default"],
});
