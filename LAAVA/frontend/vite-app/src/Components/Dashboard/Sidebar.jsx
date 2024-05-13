import '../../Styles/Dashboard.css';
import { WiDaySunny, WiDayCloudy } from 'weather-icons-react';
import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { BsGrid1X2Fill, BsPeopleFill, BsListCheck, BsMenuButtonWideFill, BsFillGearFill, BsPersonCircle, BsChatFill, BsHouseDoorFill } from 'react-icons/bs';

function Sidebar({ openSidebarToggle, OpenSidebar }) {
    const location = useLocation();

    return (
        <aside id="sidebar" className={openSidebarToggle ? "sidebar-responsive" : ""}>
            <div className='sidebar-title'>
                <div className='icon close_icon' onClick={OpenSidebar}><div><h2>LAAVA</h2></div></div>
            </div>
            <ul className='sidebar-list'>
                <li className={`sidebar-list-item ${location.pathname === '/home' ? 'active' : ''}`}>
                    <Link to='/home'>
                        <span><BsHouseDoorFill className='icon'/> Home</span>
                    </Link>
                </li>
                <li className={`sidebar-list-item ${location.pathname === '/home/dashboard' ? 'active' : ''}`}>
                    <Link to="/home/dashboard">
                        <span><BsGrid1X2Fill className='icon'/> Dashboard</span>
                    </Link>
                </li>
                <li className={`sidebar-list-item ${location.pathname === '/home/chat' ? 'active' : ''}`}>
                    <Link to="/home/chat">
                        <span><BsChatFill className='icon'/> Enter Query</span>
                    </Link>
                </li>
                <li className={`sidebar-list-item ${location.pathname === '/home/weather' ? 'active' : ''}`}>
                    <Link to="/home/weather">
                        <span><WiDayCloudy className='iconWeather'/> Weather</span>
                    </Link>
                </li>
                <li className={`sidebar-list-item ${location.pathname === '/home/community' ? 'active' : ''}`}>
                    <Link to="/home/community">
                        <span><BsPeopleFill className='icon'/> Community</span>
                    </Link>
                </li>
                <li className={`sidebar-list-item ${location.pathname === '/home/Enter-data' ? 'active' : ''}`}>
                    <Link to="/home/Enter-data">
                        <span><BsListCheck className='icon'/>Data Management</span>
                    </Link>
                </li>
                <li className={`sidebar-list-item ${location.pathname === '/home/reports' ? 'active' : ''}`}>
                    <Link to="/home/reports">
                        <span><BsMenuButtonWideFill className='icon'/> Reports</span>
                    </Link>
                </li>
                <li className={`sidebar-list-item ${location.pathname === '/home/settings' ? 'active' : ''}`}>
                    <Link to="/home/settings" className='link'>
                        <span><BsFillGearFill className='icon'/>Account Settings</span>
                    </Link>
                </li>
                <li className={`sidebar-list-item ${location.pathname === '/login' ? 'active' : ''}`}>
                    <Link to="/login">
                        <span><BsPersonCircle className='icon_'/> Log-out</span>
                    </Link>
                </li>
            </ul>
        </aside>
    );
}

export default Sidebar;
