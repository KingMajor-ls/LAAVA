import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { BsFillBellFill, BsPersonCircle, BsSearch, BsJustify } from 'react-icons/bs';
import '../../Styles/Dashboard.css';

function Header({ OpenSidebar }) {
  const User = useSelector(state => state.username);

  return (
    <header className='header'>
      <div className='menu-icon'>
        <BsJustify className='icon' onClick={OpenSidebar} />
      </div>
      <div className='header-left'>
        <div className="spark"></div>
        {/* Use the BsSearch component directly */}
        <Link to="search">
          <BsSearch className='iconSearch' />
        </Link>
      </div>
      <div className='headerRight'>
        <div className='sidebar-brand'>
          <BsPersonCircle /> {User}
        </div>
        <div className='notification'>
          <Link to="/home/notifications">
            <span><BsFillBellFill className='bell' /></span>
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Header;
