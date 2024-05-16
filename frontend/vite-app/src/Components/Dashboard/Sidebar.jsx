import { useLocation, useNavigate } from 'react-router-dom';
import { WiDayCloudy } from 'weather-icons-react';
import { BsGrid1X2Fill, BsPeopleFill, BsListCheck, BsMenuButtonWideFill, BsFillGearFill, BsPersonCircle, BsChatFill, BsHouseDoorFill } from 'react-icons/bs';

function SidebarItem({ icon, label, path }) {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = location.pathname === path;

  const handleClick = () => {
    if (!isActive) {
      navigate(path);
    }
  };

  return (
    <li className={`sidebar-list-item ${isActive ? 'active' : ''}`} onClick={handleClick}>
      {icon}
      <span>{label}</span>
    </li>
  );
}

function Sidebar({ openSidebarToggle, OpenSidebar }) {
  return (
    <aside id="sidebar" className={openSidebarToggle ? "sidebar-responsive" : ""}>
      <div className='sidebar-title'>
        <div className='icon close_icon' onClick={OpenSidebar}><div><h2>LAAVA</h2></div></div>
      </div>
      <ul className='sidebar-list'>
        <SidebarItem icon={<BsHouseDoorFill />} label="Home" path="/home" />
        <SidebarItem icon={<BsGrid1X2Fill />} label="Dashboard" path="/home/dashboard" />
        <SidebarItem icon={<BsChatFill />} label="Enter Query" path="/home/chat" />
        <SidebarItem icon={<WiDayCloudy />} label="Weather" path="/home/weather" />
        <SidebarItem icon={<BsPeopleFill />} label="Community" path="/home/community" />
        <SidebarItem icon={<BsListCheck />} label="Data Management" path="/home/Enter-data" />
        <SidebarItem icon={<BsMenuButtonWideFill />} label="Reports" path="/home/reports" />
        <SidebarItem icon={<BsFillGearFill />} label="Account Settings" path="/home/settings" />
        <SidebarItem icon={<BsPersonCircle />} label="Log-out" path="/login" />
      </ul>
    </aside>
  );
}

export default Sidebar;
