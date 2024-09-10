import classes from '@/assets/styles/common.module.scss';
import { Outlet } from 'react-router-dom';
import { userStore } from '@/contexts/userStore.ts';
import Header from '@/common/components/Header.tsx';
import Footer from '@/common/components/Footer.tsx';

const Layout = () => {
  const info = userStore((state: { info: boolean }) => state.info);
  // console.log(info);

  return (
    <div className={classes.layout}>
      {info ? <Header /> : null}
      <Outlet />
      {info ? <Footer /> : null}
    </div>
  );
};

export default Layout;
