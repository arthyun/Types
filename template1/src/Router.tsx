import React from "react";
import MainLayout from "components/common/MainLayout";
import Dashboard from "components/Dashboard";
import ChartPage from "components/SubPages/ChartPage";
import EditorPage from "components/SubPages/EditorPage";
import DataGridPage from "components/SubPages/DataGridPage";
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
                  path="Chart"
                  element={<ChartPage />}
               />
               <Route
                  path="Editor"
                  element={<EditorPage />}
               />
               <Route
                  path="DataGrid"
                  element={<DataGridPage />}
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
