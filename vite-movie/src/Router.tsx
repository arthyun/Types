import React from 'react';
import { Routes, Route } from 'react-router-dom';
import NotFound from '@/common/components/NotFound';
import Layout from '@/common/components/Layout';
import Home from '@/common/components/Home';
import MovieList from '@/pages/movie_list';

const Router = () => {
  return (
    <Routes>
      <Route path='/'>
        <Route element={<Layout />}>
          <Route index element={<Home />} />

          {/* Movie List */}
          <Route path='movielist' element={<MovieList />} />
        </Route>

        <Route path='*' element={<NotFound />} />
      </Route>
    </Routes>
  );
};

export default Router;
