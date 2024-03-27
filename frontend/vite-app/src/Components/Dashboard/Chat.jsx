import  { useState } from 'react';
import axios from 'axios';
import Layout from './Layout';
import '../../Styles/Chat.css';
import { FaRobot } from 'react-icons/fa'; 
import { AiOutlineRobot } from 'react-icons/ai'; 



function Chat() {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [reque, setReque] = useState("");
  const [prediction, setPrediction] = useState('');

  const handleImageChange = async (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await fetch('http://localhost:8080/predict', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();
      const predictions = result.predictions;

      if (predictions && predictions.length > 0) {
        const displayName = predictions[0].displayName;
        setPrediction(displayName + ': ');
      } else {
        setPrediction('No predictions');
      }

    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8080/chat", {
        query: prediction + prompt
      });
      setResponse(res.data.answer);

      // Clear the input text
      setReque(prompt);
      setPrompt("");
      setPrediction("");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
        <div className='chat-container'>
          <div className='chat-box'>
            <input type="file" accept="image/*" onChange={handleImageChange} />
            <form className='chat-form' onSubmit={handleSubmit}>
              <div className='label'>
                <label>Ask anything?</label>
              </div>
              <div className='input-combine'>
                <div className='input-box'>
                  <input type='text' value={prompt} onChange={(e) => setPrompt(e.target.value)} placeholder="Type here..." />
                </div>
                <div className='submit-button'>
                  <button type='submit'>Submit</button>
                </div>
              </div>
            </form>
            <div className='user-request'>
              <p>{reque ? <FaRobot className='robot-icon' /> : ""} {reque}</p> {/* Using robot icon */}
            </div>
            <div className='chat-response'>
              <p>{response ? <AiOutlineRobot className='ai-icon' /> : ""} {response}</p> {/* Using AI icon */}
            </div>
          </div>
        </div>
    </div>
  );
}

export default Chat;
