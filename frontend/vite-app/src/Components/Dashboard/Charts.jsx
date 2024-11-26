
import { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { Link } from 'react-router-dom';

import '../../Styles/Menu.css';

function Charts() {
  const [sensorData, setSensorData] = useState([]);

  useEffect(() => {
    getSensorData();
  }, []);

  function getSensorData() {
    fetch('http://localhost:8280/sensorData')
      .then(response => response.json())
      .then(data => {
        setSensorData(data);
      })
      .catch(error => console.error('Error fetching data:', error));
  }

  return (
    <div className='chartT'>
       <Link to="../table">
            History/Nalane ea lijalo
            </Link>
      <h2>Sensor Data Charts/Boemo bo lijalong</h2>

      <div className="chart-container">
        <LineChart
          width={800}
          height={400}
          data={sensorData}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray='3 3' />
          <XAxis dataKey='timestamp' />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type='monotone' dataKey='soil_moisture' stroke='#8884d8' activeDot={{ r: 8 }} />
        </LineChart>
      </div>

      <div className="chart-container">
        <LineChart
          width={800}
          height={400}
          data={sensorData}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray='3 3' />
          <XAxis dataKey='timestamp' />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type='monotone' dataKey='temperature' stroke='#82ca9d' activeDot={{ r: 8 }} />
        </LineChart>
      </div>

      <div className="chart-container">
        <LineChart
          width={800}
          height={400}
          data={sensorData}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray='3 3' />
          <XAxis dataKey='timestamp' />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type='monotone' dataKey='humidity' stroke='#ff7300' activeDot={{ r: 8 }} />
        </LineChart>
      </div>

    </div>
  );
}

export default Charts;


