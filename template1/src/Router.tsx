import React from "react";
import MainLayout from "components/common/MainLayout";
import Dashboard from "components/Dashboard";
import SUB1 from "components/SubPages/SUB1";
import SUB2 from "components/SubPages/SUB2";
import SUB3 from "components/SubPages/SUB3";
import SUB4 from "components/SubPages/SUB4";
import SUB5 from "components/SubPages/SUB5";
import { Routes, Route } from "react-router-dom";
import RedirectPage from "components/common/RedirectPage";

const AppRouter = () => {
   return (
      <Routes>
         <Route path="/">
            <Route element={<MainLayout />}>
               <Route
                  index
                  element={<Dashboard />}
               />
               <Route
                  path="SUB1"
                  element={<SUB1 />}
               />
               <Route
                  path="SUB2"
                  element={<SUB2 />}
               />
               <Route
                  path="SUB3"
                  element={<SUB3 />}
               />
               <Route
                  path="SUB4"
                  element={<SUB4 />}
               />
               <Route
                  path="SUB5"
                  element={<SUB5 />}
               />
            </Route>
            <Route
               path="/*"
               element={<RedirectPage />}
            />
         </Route>
      </Routes>
   );
};

export default AppRouter;
