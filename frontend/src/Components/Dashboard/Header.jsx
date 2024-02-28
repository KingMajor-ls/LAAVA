import '../../Styles/Dashboard.css'
import { useSelector } from 'react-redux';

import 
 {BsFillBellFill, BsFillEnvelopeFill, BsPersonCircle, BsSearch, BsJustify}
 from 'react-icons/bs'

function Header({OpenSidebar}) {
      const User = useSelector(state => state.username);

  return (
    <header className='header'>
        <div className='menu-icon'>
            <BsJustify className='icon' onClick={OpenSidebar}/>
        </div>
        <div><h2>LAAVA</h2></div>
        <div className='header-left'>
            <input
            type="text"
            placeholder="Search Trends, Donations..."
            className="search-input"
            />
            <a href=''><BsSearch  className='iconSearch'/></a>
        </div>
        <div className='sidebar-brand'>
                <BsPersonCircle  className='icon_header_login'/> { User}
        </div>
        <div className='header-right'>
            <BsFillBellFill className='icon'/>
        </div>

    </header>
  )
}

export default Header