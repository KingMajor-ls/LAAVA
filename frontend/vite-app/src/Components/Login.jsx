
// import { useState, useEffect } from "react";
// import { Link, useNavigate } from 'react-router-dom';
// import Header from './Header';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
// import { useDispatch } from 'react-redux';
// import { setUsername, setUserId } from './Reducer';
// import '../Styles/Login.css';
// import Footer from './Footer';
// import '../Styles/Footer.css';


// import image3 from '../assets/image3.jpg';
// import image4 from '../assets/image4.jpg';

// const Login = () => {
//   const [currentImageIndex, setCurrentImageIndex] = useState(0);
//   const images = [image3, image4]; // Array of your images
//   const [usernameInput, setUsernameInput] = useState('');
//   const [passwordInput, setPasswordInput] = useState('');
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
//     }, 3000); // Change image every 3 seconds

//     return () => clearInterval(interval); // Clean up the interval on component unmount
//   }, [images.length]);

//   // handle password visibility
//   const [passwordVisible, setPasswordVisible] = useState(false);
//   const togglePasswordVisibility = () => {
//     setPasswordVisible(!passwordVisible);
//   };

//   const handleLoginClick = (event) => {
//     event.preventDefault();

//     // Fetch request to the login endpoint
//     fetch('http://localhost:8280/login', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify({ username: usernameInput, password: passwordInput })
//     })
//       .then(response => {
//         if (!response.ok) {
//           // If response status is not OK (e.g., 401 Unauthorized), throw an error
//           throw new Error('Invalid username or password');
//         }
//         return response.json();
//       })
//       .then(data => {
//         // Store the token in localStorage
//         localStorage.setItem('token', data.token);
//         // console.log(data.token);
//         // console.log(data);
//         // Optionally, you can store the username in Redux
//         dispatch(setUsername(usernameInput));
//         dispatch(setUserId(data.user.id));
//         // Navigate to the desired page after successful login
//         navigate('/home');
//       })
//       .catch(error => {
//         console.error('Error:', error);
//         // Handle login error (e.g., display an error message or navigate to login page)
//         navigate('/login'); // Navigate to login page on error
//       });
//   };


//   return (
//     <div style={{ backgroundImage: `url(${images[currentImageIndex]})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
//       <div>
//         <Header />
//       </div>
//       <div className="login">
//         <div className='background'>
//           <form onSubmit={handleLoginClick}>
//             <input
//               type="text"
//               placeholder="Username"
//               className="username"
//               value={usernameInput}
//               onChange={(e) => setUsernameInput(e.target.value)}
//             />
//             <div className="password-container">
//               <input
//                 type={passwordVisible ? 'text' : 'password'}
//                 placeholder="Password"
//                 className="password"
//                 value={passwordInput}
//                 onChange={(e) => setPasswordInput(e.target.value)}
//               />

//             </div>
//             <div className="homepage">
//               <button type="submit" className="btn1"> Login </button>
//               <a href="#" className="forgot-password"> Forgot password? </a>
//             </div>
//             <div className='forgot-password'>
//               <Link to="/Signup">
//                 <h4 > Don't have an account ? Signup</h4>
//               </Link>
//             </div>
//           </form>
//         </div>
//       </div>
//       <div className='footer'>
//         <Footer />
//       </div>
//     </div>
//   );
// };

// export default Login;

import { useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import Header from './Header';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { useDispatch } from 'react-redux';
import { setUsername, setUserId } from './Reducer';
import '../Styles/Login.css';
import Footer from './Footer';
import '../Styles/Footer.css';
import image3 from '../assets/image3.jpg';
import image1 from '../assets/image1.jpg';
import image2 from '../assets/image2.jpg';
import image4 from '../assets/image4.jpg';
import { storeUserData } from '../userAuthService'; // Import the storeUserData function

const Login = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = [image3, image4,image2,image1];
  const [usernameInput, setUsernameInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [images.length]);

  const [passwordVisible, setPasswordVisible] = useState(false);
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleLoginClick = (event) => {
    event.preventDefault();

    fetch('http://localhost:8280/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username: usernameInput, password: passwordInput })
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Invalid username or password');
        }
        return response.json();
      })
      .then(data => {
        // Store the user data in localStorage
        storeUserData(data); // Pass the user data to the storeUserData function

        dispatch(setUsername(usernameInput));
        dispatch(setUserId(data.user.id));
        navigate('/home');
      })
      .catch(error => {
        console.error('Error:', error);
        navigate('/login');
      });
  };
  return (
    <div style={{ backgroundImage: `url(${images[currentImageIndex]})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <div>
        <Header />
      </div>
      <div className="login">
        <div className='background'>
          <form onSubmit={handleLoginClick}>
            <input
              type="text"
              placeholder="Username/mabitso"
              className="username"
              value={usernameInput}
              onChange={(e) => setUsernameInput(e.target.value)}
            />
            <div className="password-container">
              <input
                type={passwordVisible ? 'text' : 'password'}
                placeholder="Mantsoe a lekunutu/Password"
                className="password"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
              />

            </div>
            <div className="homepage">
              <button type="submit" className="btn1"> Login </button>
              <a href="#" className="forgot-password"> U lebetse mantsoe a lekunutu? </a>
            </div>
            <div className='forgot-password'>
              <Link to="/Signup">
                <h4 > Ngolisa/Signup</h4>
              </Link>
            </div>
          </form>
        </div>
      </div>
      <div className='footer'>
        <Footer />
      </div>
    </div>
  );
}

export default Login;