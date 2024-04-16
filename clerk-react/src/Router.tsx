import { Routes, Route } from 'react-router-dom';
import Layout from './pages/layouts/Layout';
import Home from './pages/layouts/Home';
import Sub1 from './pages/Sub1';

export default function AppRouter() {
  return (
    <Routes>
      <Route path='/'>
        <Route element={<Layout />}>
          <Route index element={<Home />} />

          <Route path='sub1' element={<Sub1 />} />
        </Route>
      </Route>
    </Routes>
  );
}
