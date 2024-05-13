
import Layout from './Layout';
import '../../Styles/Footer.css';
import '../../Styles/Reports.css';
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';


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

  const groupDataByYear = (data) => {
    return data.reduce((acc, curr) => {
      const year = curr.year;
      if (!acc[year]) {
        acc[year] = [];
      }
      acc[year].push(curr);
      return acc;
    }, {});
  };

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

  const renderProductionChart = (productionType,yearData) => {
    const data = yearData.map(entry => ({
      name: entry.quarter,
      units: entry[`${productionType}_units`],
    }));

    return (
      <BarChart width={500} height={300} data={data}>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="units" fill="white" />

      </BarChart>
    );
  }
  function renderProductionPieChart(productionType,yearData) {
    const data = yearData.map(entry => ({
      name: entry.quarter,
      value: entry[`${productionType}_units`],
    }));
    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042']; // Customize colors as needed

    return (
      <PieChart width={500} height={300}>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          outerRadius={100}
          fill="#8884d8"
          label
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    );
  }


  return (
    <div className='table'>
      <div className='table-data'>
        <h2 className="section-title">Production Data Table</h2>
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

        <h2 className="section-title">Production Data Charts</h2>
         {/* Render sections for each year */}
      {Object.entries(groupDataByYear(productions)).map(([year, yearData]) => (
        <div key={year} className="year-section">
          <h2 className="year-title">{year}</h2>
          <div className="grid-container">
            {/* First Column (Bar Charts) */}
            <div className="grid-column">
              <div className="grid-item">
                <h3 className="chart-title">Maize</h3>
                {renderProductionChart('maize', yearData)}
                <div className="axis-label">Quarterly</div>
              </div>
              <div className="grid-item">
                <h3 className="chart-title">Tomato</h3>
                {renderProductionChart('tomato', yearData)}
                <div className="axis-label">Quarterly</div>
              </div>
              <div className="grid-item">
                <h3 className="chart-title">Potato</h3>
                {renderProductionChart('potato', yearData)}
                <div className="axis-label">Quarterly</div>
              </div>
            </div>

            {/* Second Column (Pie Charts) */}
            <div className="grid-column">
              <div className="grid-item">
                <h3 className="chart-title">Maize</h3>
                {renderProductionPieChart('maize', yearData)}
                <div className="axis-label">Quarterly</div>
              </div>
              <div className="grid-item">
                <h3 className="chart-title">Tomato</h3>
                {renderProductionPieChart('tomato', yearData)}
                <div className="axis-label">Quarterly</div>
              </div>
              <div className="grid-item">
                <h3 className="chart-title">Potato</h3>
                {renderProductionPieChart('potato', yearData)}
                <div className="axis-label">Quarterly</div>
              </div>
            </div>
          </div>
        </div>
      ))}
      </div>
    </div>
  );
}
export default Reports;
