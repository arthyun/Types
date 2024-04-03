import { Routes, Route } from 'react-router-dom';
import Layout from './pages/common/Layout';
import Home from './pages/common/Home';
import Chart from './pages/chart/Chart';
import Redirect from './pages/common/Redirect';

export default function AppRouter() {
  return (
    <Routes>
      <Route path='/'>
        <Route element={<Layout />}>
          {/* Home */}
          <Route index element={<Home />} />
          {/* Chart */}
          <Route path='chart' element={<Chart />} />
        </Route>
        {/* NotFound */}
        <Route path='/*' element={<Redirect />} />
      </Route>
    </Routes>
  );
}
