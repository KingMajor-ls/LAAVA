import { useEffect, useState } from 'react'
import Header from './Header';
import { Link, useNavigate} from 'react-router-dom';
import '../Styles/Signup.css'
import '../Styles/Footer.css'
import Footer from './Footer';


function Signup() {
  const [surname, setSurname] = useState('');
  const [name, setFirstName] = useState('');
  const [username, setUserName] = useState('');
  const [phone_number, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
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
    // Submit the form data
    fetch('http://localhost:8080/createFarmers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, surname, home_address, username, email, phone_number, password }),

    })
      .then(response => response.text())
      .then(data => {
        alert(data);
        // Reset form fields
        setSurname('');
        setFirstName('');
        setUserName('');
        setEmail('');
        setPhoneNumber('');
        setPassword('');
        setHomeAdress('');
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
    </div>
  );
}


export default Signup