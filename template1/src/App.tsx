import React, { useEffect, useState } from "react";
import SignIn from "components/SignIn";
import AppRouter from "./Router";
import { loginStore } from "store/store";
import { useRecoilValue } from "recoil";
import LoadingSplash from "components/LoadingSplash";
import axios from "axios";

const App = () => {
   const isLogin = useRecoilValue<boolean>(loginStore);
   const [isLoading, setIsLoading] = useState<boolean>(false);

   useEffect(() => {
      axios.interceptors.request.use(
         (config) => {
            if (config.url !== undefined && config.url.includes("/users")) {
               setIsLoading(true);
            }
            return config;
         },
         (error) => {
            // 에러 팝업 혹은 콘솔 표출
            return Promise.reject(error);
         },
      );

      axios.interceptors.response.use(
         (response) => {
            setIsLoading(false);
            // const data = JSON.parse(JSON.stringify(response.data).replace(/\"ATV\"/g, '"8VSB"'));
            // return { ...response, data };
            return response;
         },
         (error) => {
            setIsLoading(false);
            // 에러 팝업 혹은 콘솔 표출
            return Promise.reject(error);
         },
      );
   }, []);

   return (
      <div className="App">
         {isLogin ? <AppRouter /> : <SignIn />}
         {isLoading && <LoadingSplash />}
      </div>
   );
};

export default App;
