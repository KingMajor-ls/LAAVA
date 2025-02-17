// import  { useState, useEffect } from 'react';
// import Header from './Header';
// import { Link, useNavigate } from 'react-router-dom';
// import '../Styles/Signup.css';
// import '../Styles/Footer.css';
// import Footer from './Footer';
// import image3 from '../assets/image3.jpg';
// import image4 from '../assets/image4.jpg';

// function Signup() {
//   const [currentImageIndex, setCurrentImageIndex] = useState(0);
//   const images = [image3, image4]; // Array of your images

//   const [surname, setSurname] = useState('');
//   const [name, setFirstName] = useState('');
//   const [username, setUserName] = useState('');
//   const [phone_number, setPhoneNumber] = useState('');
//   const [email, setEmail] = useState('');
//   const [home_address, setHomeAdress] = useState('');
//   const [password, setPassword] = useState('');
//   const navigate = useNavigate();

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
//     }, 3000); // Change image every 3 seconds

//     return () => clearInterval(interval); // Clean up the interval on component unmount
//   }, [images.length]);

//   const handleFormSubmit = (e) => {
//     e.preventDefault();

//     // Form validation
//     if (
//       surname.trim() === '' ||
//       name.trim() === '' ||
//       username.trim() === '' ||
//       phone_number.trim() === '' ||
//       email.trim() === '' ||
//       home_address.trim() === '' ||
//       password.trim() === ''
//     ) {
//       alert('Please fill in all the fields');
//       return;
//     }

//     // Submit the form data
//     fetch('http://localhost:8280/createFarmer', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ name, surname, home_address, username, email, phone_number, password }),
//     })
//       .then((response) => response.text())
//       .then((data) => {
//         alert(data);
//         localStorage.removeItem('token'); // or similar for clearing cookies

//         // Reset form fields
//         setSurname('');
//         setFirstName('');
//         setUserName('');
//         setEmail('');
//         setPhoneNumber('');
//         setPassword('');
//         setHomeAdress('');
//         navigate('/home');
//       });
//   };

//   return (
//     <div style={{ backgroundImage: `url(${images[currentImageIndex]})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
//       <Header />
//       <div className="signup">
//         <form onSubmit={handleFormSubmit} className="signForm">
//           <div>
//             <input type="text" placeholder="Surname" value={surname} onChange={(e) => setSurname(e.target.value)} />
//           </div>
//           <div>
//             <input type="text" placeholder="First name" value={name} onChange={(e) => setFirstName(e.target.value)} />
//           </div>
//           <div>
//             <input type="text" placeholder="Username" value={username} onChange={(e) => setUserName(e.target.value)} />
//           </div>
//           <div>
//             <input type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
//           </div>
//           <div>
//             <input type="text" placeholder="Phone number" value={phone_number} onChange={(e) => setPhoneNumber(e.target.value)} />
//           </div>
//           <div>
//             <input type="text" placeholder="Home address" value={home_address} onChange={(e) => setHomeAdress(e.target.value)} />
//           </div>
//           <div>
//             <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
//           </div>
//           <div className="button-container">
//             <Link to="/Login">
//               <button className="btnAbout">Back</button>
//             </Link>
//             <button type="submit">Submit</button>
//           </div>
//         </form>
//       </div>
//       <div className="footer">
//         <Footer />
//       </div>
//     </div>
//   );
// }

// export default Signup;

import { useState, useEffect } from 'react';
import Header from './Header';
import { Link, useNavigate } from 'react-router-dom';
import '../Styles/Signup.css';
import '../Styles/Footer.css';
import Footer from './Footer';
import image3 from '../assets/image3.jpg';
import image1 from '../assets/image1.jpg';
import image2 from '../assets/image2.jpg';
import image4 from '../assets/image4.jpg';
import { storeUserData } from '../userAuthService'; // Import the storeUserData function

function Signup() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = [image3, image4,image1,image2];

  const [surname, setSurname] = useState('');
  const [name, setFirstName] = useState('');
  const [username, setUserName] = useState('');
  const [phone_number, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [home_address, setHomeAdress] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [images.length]);

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (
      surname.trim() === '' ||
      name.trim() === '' ||
      username.trim() === '' ||
      phone_number.trim() === '' ||
      email.trim() === '' ||
      home_address.trim() === '' ||
      password.trim() === ''
    ) {
      alert('Please fill in all the fields');
      return;
    }

    fetch('http://localhost:8280/createFarmer', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, surname, home_address, username, email, phone_number, password }),
    })
      .then((response) => response.json())
      .then((data) => {
        // Store the user data in localStorage
        storeUserData(data); // Pass the user data to the storeUserData function

        alert(data.message); // Assuming the server returns a message property
        localStorage.removeItem('token'); // or similar for clearing cookies

        setSurname('');
        setFirstName('');
        setUserName('');
        setEmail('');
        setPhoneNumber('');
        setPassword('');
        setHomeAdress('');
        navigate('/home');
      })
      .catch((error) => {
        console.error('Error:', error);
        // Handle signup error (e.g., display an error message or navigate to signup page)
      });
  };

  // Render the Signup component
  // ...
  return (
    <div style={{ backgroundImage: `url(${images[currentImageIndex]})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <Header />
      <div className="signup">
        <form onSubmit={handleFormSubmit} className="signForm">
          <div>
            <input type="text" placeholder="Surname/fane" value={surname} onChange={(e) => setSurname(e.target.value)} />
          </div>
          <div>
            <input type="text" placeholder="First name/Lebitso la pele" value={name} onChange={(e) => setFirstName(e.target.value)} />
          </div>
          <div>
            <input type="text" placeholder="Username/lebitso leo utla tsebahala ka lona" value={username} onChange={(e) => setUserName(e.target.value)} />
          </div>
          <div>
            <input type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div>
            <input type="text" placeholder="Linomoro tsa mohala" value={phone_number} onChange={(e) => setPhoneNumber(e.target.value)} />
          </div>
          <div>
            <input type="text" placeholder="Home address" value={home_address} onChange={(e) => setHomeAdress(e.target.value)} />
          </div>
          <div>
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <div className="button-container">
            <Link to="/Login">
              <button className="btnAbout">Back</button>
            </Link>
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
      <div className="footer">
        <Footer />
      </div>
    </div>
  );
}

export default Signup;