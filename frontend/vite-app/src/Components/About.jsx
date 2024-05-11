<<<<<<< HEAD
import  { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from './Header';
import "../Styles/About.css"
import Footer from './Footer';

// Import your images

import image3 from '../assets/image3.jpg';
import image4 from '../assets/image4.jpg';


function About() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = [image3,image4]; // Array of your images
=======
// import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from './Header';

import "../Styles/About.css"
import Footer from './Footer';

function About() {
>>>>>>> f81730a2b63c02735b5737425c937e87ab16f566

  const handleLoginClick = () => {
    navigator('/');
  };

<<<<<<< HEAD
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(interval); // Clean up the interval on component unmount
  }, [images.length]);

  return (
    <div style={{ backgroundImage: `url(${images[currentImageIndex]})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
=======
  return (
    <div >
>>>>>>> f81730a2b63c02735b5737425c937e87ab16f566
      <div>
        <Header />
      </div>
      <div className='about'>
<<<<<<< HEAD
        <h4 className='openStatment'>
          Welcome to Lesotho Al Agricultural Virtual Assistant, your ultimate companion in revolutionizing farming practices. Harnessing the power of machine learning and cutting-edge Al technology, our system is tailored to elevate farmers' efficiency and amplify crop yields.
=======
        <h4 className='openStatment'>Welcome to Lesotho Al Agricultural Virtual Assistant,
          your ultimate companion in revolutionizing farming practices.
          Harnessing the power of machine learning and cutting-edge Al technology,
          our system is tailored to elevate farmers' efficiency and amplify crop yields.
>>>>>>> f81730a2b63c02735b5737425c937e87ab16f566
        </h4>
        <div className='links'>
          <div className='loginLink'>
            <Link to="/Login" onClick={handleLoginClick}>
              <button>
<<<<<<< HEAD
                <h3>Login / SignUp</h3>
=======
                <h3 >Login / SignUp</h3>
>>>>>>> f81730a2b63c02735b5737425c937e87ab16f566
              </button>
            </Link>
          </div>
        </div>
      </div>
      <div className='footer'>
        <Footer />
      </div>
    </div>
  )
}
<<<<<<< HEAD

export default About;
=======
export default About

>>>>>>> f81730a2b63c02735b5737425c937e87ab16f566
