<<<<<<< HEAD
import  { useState,useEffect } from 'react';
import Header from './Header';
import { Link, useNavigate } from 'react-router-dom';
import '../Styles/Signup.css';
import '../Styles/Footer.css';
import Footer from './Footer';
import image3 from '../assets/image3.jpg';
import image4 from '../assets/image4.jpg';

function Signup() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = [image3,image4]; // Array of your images
=======
import { useEffect, useState } from 'react'
import Header from './Header';
import { Link, useNavigate} from 'react-router-dom';
import '../Styles/Signup.css'
import '../Styles/Footer.css'
import Footer from './Footer';


function Signup() {
>>>>>>> f81730a2b63c02735b5737425c937e87ab16f566
  const [surname, setSurname] = useState('');
  const [name, setFirstName] = useState('');
  const [username, setUserName] = useState('');
  const [phone_number, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
<<<<<<< HEAD
  const [home_address, setHomeAdress] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(interval); // Clean up the interval on component unmount
  }, [images.length]);

  const handleFormSubmit = (e) => {
    e.preventDefault();

    // Form validation
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

=======
  const [home_address, setHomeAdress] = useState([]);
  const [password, setPassword] = useState('');
  const navigate = useNavigate();


  const handleFormSubmit = e => {
    e.preventDefault();
    console.log("Checking form filds.");
    // Form validation and submission logic
    if (surname.trim() === '' || name.trim() === '' ||
     username.trim() === '' || phone_number.trim() === '' ||
     email.trim() === '' || home_address.trim() === '' ||
     password.trim() === ''
     ) {
      alert('Please fill in all the fields');
      return;
    }
>>>>>>> f81730a2b63c02735b5737425c937e87ab16f566
    // Submit the form data
    fetch('http://localhost:8280/createFarmers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, surname, home_address, username, email, phone_number, password }),
<<<<<<< HEAD
    })
      .then((response) => response.text())
      .then((data) => {
=======

    })
      .then(response => response.text())
      .then(data => {
>>>>>>> f81730a2b63c02735b5737425c937e87ab16f566
        alert(data);
        // Reset form fields
        setSurname('');
        setFirstName('');
        setUserName('');
        setEmail('');
        setPhoneNumber('');
        setPassword('');
        setHomeAdress('');
<<<<<<< HEAD
        navigate('/home');
      });
  };

  return (
    <div  style={{ backgroundImage: `url(${images[currentImageIndex]})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <Header />
      <div className="signup">
       
        <form onSubmit={handleFormSubmit} className="signForm">
          <div>
            <input type="text" placeholder="Surname" value={surname} onChange={(e) => setSurname(e.target.value)} />
          </div>
          <div>
            <input type="text" placeholder="First name" value={name} onChange={(e) => setFirstName(e.target.value)} />
          </div>
          <div>
            <input type="text" placeholder="Username" value={username} onChange={(e) => setUserName(e.target.value)} />
          </div>
          <div>
            <input type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div>
            <input type="text" placeholder="Phone number" value={phone_number} onChange={(e) => setPhoneNumber(e.target.value)} />
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
=======
      });
      navigate('/home');

  };

  return (
    <div>
        <div>
            <Header/>
        </div>
      <div className='signup'> 
        <h1>Welcome to our website. Please fill the form. </h1>

        <form onSubmit={handleFormSubmit} className='signForm'>
          <div>
            <input type="text" placeholder='Surname' value={surname} onChange={e => setSurname(e.target.value)} />
          </div>

          <div>
            <input type="text" placeholder='First name' value={name} onChange={e => setFirstName(e.target.value)} />
          </div>

          <div>
            <input type="text" placeholder='Username' value={username} onChange={e => setUserName(e.target.value)} />
          </div>

          <div>
              <input type="text" placeholder='Email' value={email} onChange={e => setEmail(e.target.value)} />
          </div>

          <div>
            <input type="text" placeholder='Phone number' value={phone_number} onChange={e => setPhoneNumber(e.target.value)} />
          </div>

          <div>
            <input type="text" placeholder='Home address' value={home_address} onChange={e => setHomeAdress(e.target.value)} />
          </div>

          <div>
            <input type="text" placeholder='password' value={password} onChange={e => setPassword(e.target.value)} />
          </div>
          <div className='butt'>
            <Link to="/Login">
            <button className="btnAbout">Back</button>
            </Link>
            <button  type="submit">Submit</button>

          </div>
          
        </form>
      </div>
       <div className='footer'>
        <Footer /></div>
>>>>>>> f81730a2b63c02735b5737425c937e87ab16f566
    </div>
  );
}

<<<<<<< HEAD
export default Signup;
=======

export default Signup
>>>>>>> f81730a2b63c02735b5737425c937e87ab16f566
