import  { useState, useEffect } from 'react';
import '../../Styles/Settings.css';
import { FaArrowRightLong } from "react-icons/fa6";
import { useSelector } from 'react-redux';

const Settings = () => {
  const userId = useSelector(state => state.userId);
  const [userData, setUserData] = useState({
    id: '',
    name: '',
    surname: '',
    homeAddress: '',
    username: '',
    email: '',
    phoneNumber: '',
    password: '',
    role: '',
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`http://localhost:8280/farmers/${userId}`);
        const data = await response.json();
        if (response.ok) {
          setUserData({
            id: data.id,
            name: data.name,
            surname: data.surname,
            homeAddress: data.home_address,
            username: data.username,
            email: data.email,
            phoneNumber: data.phone_number,
            password: data.password,
            role: data.role,
          });
        } else {
          console.error('Error fetching user data:', data.error);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [userId]);

  const handleInputChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:8280/farmers/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
      const data = await response.json();
      if (response.ok) {
        console.log('User data updated successfully');
      } else {
        console.error('Error updating user data:', data.error);
      }
    } catch (error) {
      console.error('Error updating user data:', error);
    }
  };

  return (
    <div className="settings">
      <h1>Account settings</h1>
      <div className="information">
        <div className="update">
          <h2>General Information</h2>
        </div>
        <div className="border">
          <div className="section1">
            <div>
              <h3>User-name</h3>
              <input
                type="text"
                name="username"
                value={userData.username}
                onChange={handleInputChange}
                placeholder="change user name"
              />
            </div>
            <div>
              <h3>Name</h3>
              <input
                type="text"
                name="name"
                value={userData.name}
                onChange={handleInputChange}
                placeholder="change name"
              />
            </div>
            <div>
              <h3>Surname</h3>
              <input
                type="text"
                name="surname"
                value={userData.surname}
                onChange={handleInputChange}
                placeholder="change surname"
              />
            </div>
            <div>
              <h3>Email</h3>
              <input
                type="text"
                name="email"
                value={userData.email}
                onChange={handleInputChange}
                placeholder="change email"
              />
            </div>
            <div>
              <h3>Phone</h3>
              <input
                type="text"
                name="phoneNumber"
                value={userData.phoneNumber}
                onChange={handleInputChange}
                placeholder="change phone"
              />
            </div>
            <div>
              <h3>Home-Address</h3>
              <input
                type="text"
                name="homeAddress"
                value={userData.homeAddress}
                onChange={handleInputChange}
                placeholder="change address"
              />
            </div>
          </div>
        </div>
        <button className="button23" onClick={handleSubmit}>
          Update
        </button>
        <h2>Change Password</h2>
        <div className="section2">
          <div>
            <h3>Old Password</h3>
            <div>
              <input
                type="password"
                name="oldPassword"
                value={userData.password}
                onChange={handleInputChange}
                placeholder="old password"
              />
            </div>
          </div>
          <div className="arrow">
            <FaArrowRightLong />
          </div>
          <div>
            <h3>New Password</h3>
            <div>
              <input
                type="password"
                name="password"
                value={userData.password}
                onChange={handleInputChange}
                placeholder="new password"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;