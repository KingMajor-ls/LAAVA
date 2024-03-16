// import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from './Header';

import "../Styles/About.css"
import Footer from './Footer';

function About() {

  const handleLoginClick = () => {
    navigator('/');
  };

  return (
    <div >
      <div>
        <Header />
      </div>
      <div className='about'>
        <h4 className='openStatment'>Welcome to Lesotho Al Agricultural Virtual Assistant,
          your ultimate companion in revolutionizing farming practices.
          Harnessing the power of machine learning and cutting-edge Al technology,
          our system is tailored to elevate farmers' efficiency and amplify crop yields.
        </h4>
        <div className='links'>
          <div className='loginLink'>
            <Link to="/Login" onClick={handleLoginClick}>
              <button>
                <h3 >Login / SignUp</h3>
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
export default About

