// import { Outlet } from "react-router-dom";
// import Nav from "../Nav";

// interface LayoutProps {
//   loggedIn: boolean;
//   setLoggedIn: (loggedIn: boolean) => void;
// }

// const Layout: React.FC<LayoutProps> = ({ loggedIn, setLoggedIn, Isadmin, children }) => {
//   return (
//     <>
//       <Nav loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
//       <Outlet />
//     </>
//   );
// }

// export default Layout;

import { Outlet } from "react-router-dom";
import Nav from "../Nav";



const Layout: React.FC = () => {
  return (
    <>
      <Nav  />
      <Outlet />
    </>
  );
}

export default Layout;

