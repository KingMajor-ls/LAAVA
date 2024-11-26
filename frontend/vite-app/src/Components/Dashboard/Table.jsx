import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Layout from './Layout';
import '../../Styles/Footer.css';
import '../../Styles/Table.css';
import Footer from '../Footer';




function Table() {
  const [humidityAndTemp, setHumidityAndTemp] = useState([]);

  useEffect(() => {
    getHumidityAndTemp();
  }, []);

  function getHumidityAndTemp() {
    fetch('http://localhost:8280/sensorData')
      .then(response => response.json())
      .then(data => {
        setHumidityAndTemp(data);
      })
      .catch(error => console.error('Error fetching data:', error));
  }


  const renderTableHeader = () => {
    if (humidityAndTemp.length === 0) return null;

    const header = Object.keys(humidityAndTemp[0]);
    const filteredHeader = header.filter(key => key !== 'station_id');

    return filteredHeader.map((key, index) => <th key={index}className="table-headings">{key.toUpperCase()}</th>);
  };


  const renderTableData = () => {
    return humidityAndTemp.map((entry, index) => (
      <tr key={index}>
        <td>{entry.id}</td>
        <td>{entry.soil_moisture}</td>
        <td>{entry.temperature}</td>
        <td>{entry.humidity}</td>
        <td>{new Date(entry.timestamp).toLocaleString('en-US', {
          year: 'numeric',
          month: 'numeric',
          day: 'numeric',
          hour: 'numeric',
          minute: 'numeric',
          second: 'numeric',
          timeZoneName: 'short',
        })}</td>
      </tr>
    ));
  };


  return (
    <div className='table'>
      <div className='table-data'>
        <Link to="../dashboard" >
          see charts
        </Link>
        <h2> Sensor Data Table</h2>
        {humidityAndTemp.length > 0 ? (
          <table className='data-table'>
            <thead className='table-headings'>
              <tr>{renderTableHeader()}</tr>
            </thead>
            <tbody>{renderTableData()}</tbody>
          </table>
        ) : (
          <p>Data is currently unavailable!</p>
        )}
      </div>

    </div>

  );
}

export default Table;

////////////////////////////////////////////////////////////////////////
