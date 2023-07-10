import Nav from '../Nav';
import { Outlet } from 'react-router-dom';

function Layout() {
  return (
    <>
      <Nav />
      <Outlet />
    </>
  );
};

export default Layout;

