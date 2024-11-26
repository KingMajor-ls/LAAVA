import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { isUserAuthenticated, getUserData } from './userAuthService';
import Login from './Components/Login';
import Dashboard from './Components/Dashboard/Dashboard';
import About from './Components/About';
import Chat from './Components/Dashboard/Chat';
import Weather from './Components/Dashboard/Weather';
import Settings from './Components/Dashboard/Settings';
import Map from './Components/Dashboard/Map';
import Predict from './Components/Dashboard/Predict';
import MyData from './Components/Dashboard/MyData';
import Reports from './Components/Dashboard/Reports';
import Community from './Components/Dashboard/Community';
import Search from './Components/Dashboard/Search';
import Signup from './Components/Signup';
import Feeds from './Components/Dashboard/Feeds';
import Table from './Components/Dashboard/Table';
import Layout from './Components/Dashboard/Layout';
import Market from './Components/Dashboard/Market';
import ErrorBoundary from './Components/Dashboard/ErrorBoundary';
import NotificationTab from './Components/Dashboard/Notifications';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const isAuth = isUserAuthenticated();
    setIsAuthenticated(isAuth);

    if (isAuth) {
      const storedUserData = getUserData();
      setUserData(storedUserData);
    }
  }, []);

  const ProtectedRoute = ({ children }) => {
    if (!isAuthenticated) {
      return <Navigate to="/login" replace />;
    }

    return children;
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Feeds />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="chat" element={<Chat />} />
          <Route path="weather" element={<Weather />} />
          <Route path="settings" element={<Settings />} />
          <Route path="map" element={<Map />} />
          <Route path="predict" element={<Predict />} />
          <Route path="Enter-data" element={<MyData />} />
          <Route path="reports" element={<Reports />} />
          <Route path="community" element={<Community />} />
          <Route path="feeds" element={<Feeds />} />
          <Route path="table" element={<Table />} />
          <Route path="search" element={<Search />} />
          <Route path="notifications" element={<NotificationTab />} />
          <Route path="market" element={<Market />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
