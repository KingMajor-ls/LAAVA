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
            <span className='icon close_icon' onClick={OpenSidebar}>X</span>
        </div>
        <ul className='sidebar-list'>
            <li className='sidebar-list-item'>
                <Link to='/home'>
                    <span><BsHouseDoorFill  className='icon'/> Home</span>
                </Link>
            </li>
            <li className='sidebar-list-item'>
                <Link to='/dashboard'>
                    <span><BsGrid1X2Fill className='icon'/> Dashboard</span>
                </Link>
            </li>
            <li className='sidebar-list-item'>
                <Link to ="/chat">
                    <span><BsChatFill className='icon'/> Enter Query</span>
                </Link>
            </li>
            <li className='sidebar-list-item'>
                <Link to ="/weather">
                    <span><WiDayCloudy className='iconWeather'/> Weather</span>
                </Link>
            </li>
            <li className='sidebar-list-item'>
                <Link to="/community">
                    <span><BsPeopleFill className='icon'/> Community</span>
                </Link>
            </li>
            <li className='sidebar-list-item'>
                <Link to ="/prices">
                    <span><BsListCheck className='icon'/> Crop Prices</span>
                </Link>
            </li>
            <li className='sidebar-list-item'>
                <Link to ="/reports">
                    <span><BsMenuButtonWideFill className='icon'/> Reports</span>
                </Link>
            </li>
            <li className='sidebar-list-item'>
                <Link to="/settings" className='link'>
                    <span><BsFillGearFill className='icon'/> Settings</span>
                </Link>
            </li>
            <li className='sidebar-list-item'>
                <Link to="../login"> 
                    <span><BsPersonCircle className='icon_'/> Logout</span>
                </Link>
            </li>
        </ul>
    </aside>
  )
}

export default Sidebar

