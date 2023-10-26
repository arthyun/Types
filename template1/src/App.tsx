import React, { useState } from "react";
import SignIn from "components/SignIn";
import Dashboard from "components/Dashboard";
import { loginStore } from "store/store";
import { useRecoilValue } from "recoil";

const App = () => {
   const isLogin = useRecoilValue<boolean>(loginStore);

   return <div className="App">{isLogin ? <Dashboard /> : <SignIn />}</div>;
};

export default App;
