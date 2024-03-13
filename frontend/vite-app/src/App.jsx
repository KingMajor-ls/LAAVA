import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Login from './Components/Login';
import Dashboard from './Components/Dashboard/Dashboard';
import About from './Components/About';
import Chat from './Components/Dashboard/Chat';
import NewsFeed from './Components/Dashboard/CropPrices';
import Weather from './Components/Dashboard/Weather';
import Settings from './Components/Dashboard/Settings';
import Map from './Components/Dashboard/Map';
import Predict from './Components/Dashboard/Predict';
import CropPrices from './Components/Dashboard/CropPrices';
import Reports from './Components/Dashboard/Reports';
import Community from './Components/Dashboard/Community';

// import './Styles/App.css'

import Signup from './Components/Signup';
import Feeds from './Components/Dashboard/Feeds';
import Table from './Components/Dashboard/Table';

function App() {
  const user = useSelector(state => state.username);
  
  return ( 
    <div className='app'>
    <Router>
    
        <Routes>
          <Route path="/" Component={About} />
          <Route path="/chat" Component={Chat} />
          <Route path='/predict' Component={Predict}/>
          <Route path="/weather" Component={Weather} />
          <Route path="/map" Component={Map} />
          <Route path="/settings" Component={Settings} />
          {/* <Route path="/home" render={(props) => <Feeds {...props} user={user} />} /> */}

          <Route path="/home" Component={Feeds}/>
          {/* <ChatsPage user={user} /> */}
          <Route path='/signup' Component={Signup} /> 
          <Route path="/login" Component={Login} />
          <Route path="/dashboard" Component={() => <Dashboard />} />
          <Route path='/prices' Component={CropPrices} />
          <Route path='/reports' Component={Reports} />
          <Route path='/community' Component={Community}/>
          <Route path='/table' Component={Table}/>
        </Routes>
    </Router>
    </div>
  );
  
}
export default App;
