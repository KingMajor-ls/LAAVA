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
      <div className='HeaderSideBar'>
        <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar} />
        <Header OpenSidebar={OpenSidebar} />F
      </div>

      <div className="layout-content">
        <div className="main-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;