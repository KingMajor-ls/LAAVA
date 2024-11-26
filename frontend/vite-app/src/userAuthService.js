// userAuthService.js
const storeUserData = (userData) => {
    localStorage.setItem('userData', JSON.stringify(userData));
  };
  
  const getUserData = () => {
    const userData = localStorage.getItem('userData');
    return userData ? JSON.parse(userData) : null;
  };
  
  const clearUserData = () => {
    localStorage.removeItem('userData');
  };
  
  const isUserAuthenticated = () => {
    const userData = getUserData();
    return !!userData; // Return true if userData exists, false otherwise
  };
  
  export { storeUserData, getUserData, clearUserData, isUserAuthenticated };