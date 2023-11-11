import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import About from "./components/About";
import Topic from "./components/Topic";
import TailwindComponent from "./components/TailwindComponent";

const AppRouter = () => {
   return (
      <Routes>
         <Route
            path="/"
            element={<Home />}
         ></Route>
         <Route
            path="/about"
            element={<About />}
         ></Route>
         <Route
            path="/topic"
            element={<Topic />}
         ></Route>
         <Route
            path="/tailwind"
            element={<TailwindComponent />}
         ></Route>
      </Routes>
   );
};

export default AppRouter;
