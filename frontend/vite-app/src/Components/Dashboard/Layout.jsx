import Sidebar from './Sidebar';
import Header from './Header';
import '../../Styles/Layout.css';
import { Outlet } from 'react-router-dom';

const Layout = ({ children }) => {
  const [openSidebarToggle, setOpenSidebarToggle] = React.useState(false);

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  return (
    <div className="layout">
      <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar} />
      <div className="layout-content">
        <Header OpenSidebar={OpenSidebar} />
        <div className="main-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;