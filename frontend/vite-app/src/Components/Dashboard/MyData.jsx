import { useState } from 'react';
import '../../Styles/DataManagement.css';
import '../../Styles/Footer.css';
import { useSelector } from 'react-redux';

const MyData = () => {
  const userId = useSelector(state => state.userId);
  const [formData, setFormData] = useState({
    quarter: '',
    potato: '',
    tomato: '',
    maize: '',
    year: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const submitData = async () => {
    try {
      const requestData = {
        userId: userId,
        quarter: formData.quarter,
        year: formData.year,
        maizeUnits: formData.maize,
        tomatoUnits: formData.tomato,
        potatoUnits: formData.potato
      };
  
      const response = await fetch('http://localhost:8280/productions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });
  
      if (response.ok) {
        // Handle success
        alert('Data submitted successfully!');
        setFormData({
          quarter: '',
          potato: '',
          tomato: '',
          maize: '',
          year: '',
        });
      }
    } catch (error) {
      // Handle error
      console.error('Error submitting data:', error);
    }
  };
  
  
  return (
    <div className="data-area">
      <h1 className="section-title">Quarterly Production Units</h1>
      <div className="form-container">
        <div className="form-column1">
          <div className="form-group">
          <h3>Quarter/kotara</h3>

            <input
              type="number"
              id="quarter"
              name="quarter"
              value={formData.quarter}
              onChange={handleInputChange}
              placeholder="Enter quarter..."
            />
          </div>
          <div className="form-group">
          <h3>Potato/litapole</h3>

            <input
              type="number"
              id="potatoUnits"
              name="potato"
              value={formData.potato}
              onChange={handleInputChange}
              placeholder="Enter potato units...palo ea litapole"
            />
          </div>

          <div className="form-group">
          <h3>Year/selemo</h3>

            <input
              type="number"
              id="year"
              name="year"
              value={formData.year}
              onChange={handleInputChange}
              placeholder="Enter year...kenya selemo"
            />
          </div>
        </div>
        <div className="form-column2">

          <div className="form-group">
          <h3>Tomato/Tamati</h3>

            <input
              type="number"
              id="tomatoUnits"
              name="tomato"
              value={formData.tomato}
              onChange={handleInputChange}
              placeholder="Enter tomato units...Palo ea litamati"
            />
          </div>
          <div className="form-group">
            <h3>Maize/Poone</h3>
            <input
              type="number"
              id="maizeUnits"
              name="maize"
              value={formData.maize}
              onChange={handleInputChange}
              placeholder="Enter maize units...palo ea poone"
            />
          </div>
          <div className="form-group submit-btn-container">
            <button className="submit-btn" onClick={submitData}>
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyData;