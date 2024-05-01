import '../../Styles/Dashboard.css'
import { WiDaySunny, WiDayCloudy } from 'weather-icons-react';
import { Link, useNavigate } from 'react-router-dom';

import { useState } from 'react';

import 
{ BsGrid1X2Fill,  BsPeopleFill, BsListCheck, BsMenuButtonWideFill,
   BsFillGearFill, BsPersonCircle, BsChatFill,BsHouseDoorFill  }
 from 'react-icons/bs';

function Sidebar({openSidebarToggle, OpenSidebar}) {
    const [user, setUser] = useState('');
     const navigate = useNavigate();
    // if(true){setUser(User);};

  return (
    <aside id="sidebar" className={openSidebarToggle ? "sidebar-responsive": ""}>

        
        <div className='sidebar-title'>
            <div className='icon close_icon' onClick={OpenSidebar}> <div><h2>LAAVA</h2></div></div>
        </div>
        <ul className='sidebar-list'>
            <li className='sidebar-list-item'>
                <Link to='/home'>
                    <span><BsHouseDoorFill  className='icon'/> Home</span>
                </Link>
            </li>
            <li className='sidebar-list-item'>
                <Link to="/home/dashboard">
                    <span><BsGrid1X2Fill className='icon'/> Dashboard</span>
                </Link>
            </li>
            <li className='sidebar-list-item'>
                <Link to ="/home/chat">
                    <span><BsChatFill className='icon'/> Enter Query</span>
                </Link>
            </li>
            <li className='sidebar-list-item' >
                <Link to ="/home/weather">
                    <span><WiDayCloudy className='iconWeather'/> Weather</span>
                </Link>
            </li>
            <li className='sidebar-list-item'>
                <Link to="/home/community">
                    <span><BsPeopleFill className='icon'/> Community</span>
                </Link>
            </li>
            <li className='sidebar-list-item'>
                <Link to ="/home/Enter-data">
                    <span><BsListCheck className='icon'/>Data Management</span>
                </Link>
            </li>
            <li className='sidebar-list-item'>
                <Link to ="/home/reports">
                    <span><BsMenuButtonWideFill className='icon'/> Reports</span>
                </Link>
            </li>
            <li className='sidebar-list-item'>
                <Link to="/home/settings" className='link'>
                    <span><BsFillGearFill className='icon'/>Account Settings</span>
                </Link>
            </li>
            <li className='sidebar-list-item'>
                <Link to="../login"> 
                    <span><BsPersonCircle className='icon_'/> Log-out</span>
                </Link>
            </li>
        </ul>
    </aside>
  )
}

export default Sidebar

