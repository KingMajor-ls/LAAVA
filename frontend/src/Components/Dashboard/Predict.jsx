// Predict.jsx

import { useState } from 'react';
import axios from 'axios';

const Predict = () => {
  const [image, setImage] = useState(null);
  const [prediction, setPrediction] = useState('');

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setImage(file);
  };

  const handlePredict = async () => {
  const formData = new FormData();
  formData.append('image', image);

  try {
    const response = await axios.post('http://localhost:8080/predict', formData);
    // const response = await axios.post('/predict', formData);

    console.log(response.data);
    console.log(response.data.predictions);
    console.log(response.data.predictions[0].displayName);


    const predictions = response.data.predictions;

    if (predictions.length > 0) {
      console.log("TRUE")        
      const displayName = predictions[0].displayName;
      console.log(displayName);
      setPrediction(displayName);
    } else {
      setPrediction('No predictions');
    }
  } catch (error) {
    console.error('Error predicting image:', error);
  }
};


  return (
    <div>
      <input type="file" accept="image/*" onChange={handleImageChange} />
      <button onClick={handlePredict}>Predict</button>
      {prediction && (
        <div>
          <h3>Prediction:</h3>
          <p>{prediction}</p>
        </div>
      )}
    </div>
  );
};

export default Predict;
