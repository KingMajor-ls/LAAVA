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
          <div className="header">
             <Header OpenSidebar={OpenSidebar} />
          </div>
          <div className='outlet'>
            <Outlet/>
          </div>
      </div>
    </div>
  );
};

export default Layout;