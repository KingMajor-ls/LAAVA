import '../../Styles/Dashboard.css'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { BsFillBellFill, BsFillEnvelopeFill, BsPersonCircle, BsSearch, BsJustify }
  from 'react-icons/bs'

function Header({ OpenSidebar }) {
  const User = useSelector(state => state.username);
  //     // Persist user data in local storage
  //   React.useEffect(() => {
  //     localStorage.setItem('loggedInUser', User);
  //   }, [User]);

  //   // Retrieve user data from local storage on component mount
  //   React.useEffect(() => {
  //     const loggedInUser = localStorage.getItem('loggedInUser');
  //     if (loggedInUser) {
  //       dispatch({ type: 'SET_USERNAME', username: loggedInUser });
  //     }
  //     }, []);

  return (
    <header className='header'>
      <div className='menu-icon'>
        <BsJustify className='icon' onClick={OpenSidebar} />
      </div>
      <div className='header-left'>
        <input
          type="text"
          placeholder="Search Trends, Donations..."
          className="search-input"
        />
        {/* Use the BsSearch component directly */}
        <BsSearch className='iconSearch' />
      </div>

      <div className='headerRight'>
        <div className='sidebar-brand'>
          <BsPersonCircle  /> {User}
        </div>
        <div className='notification'>
          <BsFillBellFill />Notifications
        </div>
      </div>

    </header>
  )
}

export default Header