import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './components/common/Home.tsx';
import Header from './components/common/Header.tsx';
import Redirect from './components/common/Redirect.tsx';
import SignIn from './components/SignIn.tsx';

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/">
        <Route element={<Header />}>
          <Route index element={<Home />} />
        </Route>
        <Route path="/signin" element={<SignIn />} />
        <Route path="/*" element={<Redirect />} />
      </Route>
    </Routes>
  );
};

export default AppRouter;
