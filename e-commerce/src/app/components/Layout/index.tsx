import { Outlet } from "react-router-dom";
import Nav from "../Nav";

interface LayoutProps {
  loggedIn: boolean;
  setLoggedIn: (loggedIn: boolean) => void;
}

const Layout: React.FC<LayoutProps> = ({ loggedIn, setLoggedIn }) => {
  return (
    <>
      <Nav loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
      <Outlet />
    </>
  );
}

export default Layout;
