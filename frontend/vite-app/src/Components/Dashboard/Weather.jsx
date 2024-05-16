import { useState } from 'react';
import { WiThermometer, WiHumidity, WiStrongWind, WiBarometer, WiCelsius, WiDayCloudyWindy } from 'react-icons/wi';
// import { FcCloudy } from 'react-icons/fc';
import Layout from './Layout';
import '../../Styles/Menu.css';
import '../../Styles/Footer.css';
import Footer from '../Footer';


const Weather = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

  const handleCityChange = (e) => {
    setCity(e.target.value);
  };

  const fetchWeatherData = async () => {
    try {
      const response = await fetch(`http://localhost:8280/weather?city=${city}`);
      const data = await response.json();

      if (response.ok) {
        setWeatherData(data.weather);
        setError(null);
      } else {
        setWeatherData(null);
        setError(data.error || 'Error fetching weather data');
      }
    } catch (error) {
      setWeatherData(null);
      setError('Error fetching weather data. Please try again.');
    }
  };

  return (
      <div className='weatherBody'>
        <div className='weatherHeader'>
          <h1 className='weatherHeading'>See weather forecasts in different areas.</h1>
          <input className='weatherInput'
            type="text"
            placeholder="Enter city"
            value={city}
            onChange={handleCityChange}
          />
          <button className='weatherButtton' onClick={fetchWeatherData}>Get Weather</button>

          {weatherData && (
            <div className='weatherInfo'>
              <h2>Weather in {city}</h2>
              {/* Display other weather information with icons */}
              <p><WiThermometer className='weatherIcon'/> Temperature: {weatherData.main.temp}&deg;F</p>
              <p><WiThermometer className='weatherIcon'/> Min Temperature: {weatherData.main.temp_min}&deg;F</p>
              <p><WiThermometer className='weatherIcon'/> Max Temperature: {weatherData.main.temp_max}&deg;F</p>
              <p><WiBarometer className='weatherIcon'/> Pressure: {weatherData.main.pressure} hPa</p>
              <p><WiHumidity className='weatherIcon'/> Humidity: {weatherData.main.humidity}%</p>
              <p><WiStrongWind className='weatherIcon'/> Wind Speed: {weatherData.wind.speed} m/s</p>
              <p><WiDayCloudyWindy className='weatherIcon'/> Weather Description: {weatherData.weather[0].description}</p>
            </div>
          )}

          {error && <p>Error: {error}</p>}
        </div>
      </div>
  );
};

export default Weather;
