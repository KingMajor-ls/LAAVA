
import Layout from './Layout';
import '../../Styles/Footer.css';
import '../../Styles/Reports.css';
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Reports() {
  const [productions, setProductions] = useState([]);
  const userId = useSelector(state => state.userId);


  useEffect(() => {
    getProductions();
  }, []);

  function getProductions() {
    fetch(`http://localhost:8280/productions/${userId}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log(data);
        setProductions(data);
      })
      .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
      });
  }

  const renderTableHeader = () => {
    if (productions.length === 0) return null;

    const header = Object.keys(productions[0]);
    return header.map((key, index) => <th key={index}>{key.toUpperCase()}</th>);
  };

  const renderTableData = () => {
    return productions.map((entry, index) => (
      <tr key={index}>
        <td>{entry.id}</td>
        <td>{entry.user_id}</td>
        <td>{entry.quarter}</td>
        <td>{entry.maize_units}</td>
        <td>{entry.tomato_units}</td>
        <td>{entry.potato_units}</td>
        <td>{entry.year}</td>

      </tr>
    ));
  };

  return (
    <div className='table'>
      <div className='table-data'>
        <h2>Production Data Table</h2>
        {productions.length > 0 ? (
          <table className='data-table'>
            <thead className='headings'>
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

export default Reports;
