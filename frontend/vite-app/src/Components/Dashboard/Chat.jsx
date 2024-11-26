import { useState } from 'react';
import axios from 'axios';
import Layout from './Layout';
import '../../Styles/Chat.css';
import { FaRobot } from 'react-icons/fa';
import { AiOutlineRobot } from 'react-icons/ai';

function Chat() {
  const [prompt, setPrompt] = useState(""); // Current user input
  const [response, setResponse] = useState(""); // Current chatbot response
  const [reque, setReque] = useState(""); // Current user request
  const [prediction, setPrediction] = useState(""); // Prediction results
  const [selectedOption, setSelectedOption] = useState(""); // Dropdown value
  const [soilFileUploaded, setSoilFileUploaded] = useState(false); // Soil upload visibility
  const [cropFileUploaded, setCropFileUploaded] = useState(false); // Crop upload visibility
  const [chatHistory, setChatHistory] = useState([]); // To store chat history
  const [loading, setLoading] = useState(false); // Loading state

  const handleImageChangeDisease = async (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await fetch('http://localhost:8280/predictDisease', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();
      const predictions = result.predictions;

      if (predictions && predictions.length > 0) {
        setPrediction(predictions[0].displayName + ': ');
      } else {
        setPrediction('No predictions');
      }
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  const handleImageChangeSoil = async (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await fetch('http://localhost:8280/predictSoil', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();
      const predictions = result.predictions;

      if (predictions && predictions.length > 0) {
        setPrediction(predictions[0].displayName + ': ');
      } else {
        setPrediction('No predictions');
      }
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  const handleDropdownChange = (event) => {
    setSelectedOption(event.target.value);
    if (event.target.value === "Soil Prediction") {
      setCropFileUploaded(false);
      setSoilFileUploaded(true);
    } else if (event.target.value === "Crop Disease") {
      setSoilFileUploaded(false);
      setCropFileUploaded(true);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const query = prediction + prompt;
      const res = await axios.post("http://localhost:8280/chat", {
        query,
      });

      const botResponse = res.data.answer;

      // Update chat history
      setChatHistory((prevHistory) => [
        ...prevHistory,
        { user: prompt, bot: prediction ? `The image shows ${prediction}. ${botResponse}` : botResponse },
      ]);

      // Reset states for the current session
      setReque(prompt);
      setResponse(botResponse);
      setPrompt("");
      setPrediction("");
      setSelectedOption("");
      setSoilFileUploaded(false);
      setCropFileUploaded(false);
      setLoading(false);
    } catch (error) {
      console.error('Error handling the chat:', error);
      setLoading(false);
    }
  };

  return (
    <div>
      <div className='chat-container'>
        <div className='chat-box'>

          {/* Dropdown for file upload type */}
          <div>
            <select value={selectedOption} onChange={handleDropdownChange}>
              <option value="">Upload Image</option>
              <option value="Soil Prediction">Soil Prediction</option>
              <option value="Crop Disease">Crop Disease</option>
            </select>
          </div>

          {/* File upload input */}
          <div>{soilFileUploaded && <input type="file" accept="image/*" onChange={handleImageChangeSoil} />}</div>
          <div>{cropFileUploaded && <input type="file" accept="image/*" onChange={handleImageChangeDisease} />}</div>

          {/* Chat form */}
          <form className='chat-form' onSubmit={handleSubmit}>
            <div className='label'>
              <label>Ask anything?</label>
            </div>
            <div className='input-combine'>
              <div className='input-box'>
                <input
                  type='text'
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Type here..."
                />
              </div>
              <div className='submit-button'>
                <button type='submit' disabled={loading}>
                  {loading ? "Submitting..." : "Submit"}
                </button>
              </div>
            </div>
          </form>

          {/* Chat History */}
          <div className='chat-history'>
            {chatHistory.map((entry, index) => (
              <div key={index} className='chat-entry'>
                <p>
                  <FaRobot className='robot-icon' /> <strong>User:</strong> {entry.user}
                </p>
                <p>
                  <AiOutlineRobot className='ai-icon' /> <strong>Bot:</strong> {entry.bot}
                </p>
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
}

export default Chat;
