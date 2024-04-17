import { Routes, Route } from 'react-router-dom';
import Layout from './pages/common/Layout';
import Home from './pages/common/Home';
import Room from './pages/Room';

export default function AppRouter({ data }: { data: string }) {
  // console.log(data);

  return (
    <Routes>
      <Route path='/'>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path='room' element={<Room />} />
        </Route>
      </Route>
    </Routes>
  );
}
