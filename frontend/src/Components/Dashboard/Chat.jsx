import { useState } from 'react';
import axios from 'axios';
import Layout from './Layout';
import '../../Styles/Menu.css';

function Chat() {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [reque, setReque] = useState("");

  //Handle Image
  const [image, setImage] = useState(null);
  const [prediction, setPrediction] = useState('');

  let shouldPredict = false;

const handleImageChange = async (event) => {
  const file = event.target.files[0];
  setImage(file);

  const formData = new FormData();
  formData.append('image', file);

  try {
    const response = await fetch('http://localhost:8080/predict', {
      method: 'POST',
      body: formData,
    });

    const result = await response.json();
    console.log(result); // Handle the result as needed
     console.log(result.predictions);
    console.log(result.predictions[0].displayName);
    const predictions = result.predictions;

    if (predictions && predictions.length > 0) {
      const displayName = predictions[0].displayName;
      console.log(displayName);
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
    console.log('Form submitted');
    try {
      const res = await axios.post("http://localhost:8080/chat", {
         query: prediction + prompt
         });
      setResponse(res.data.answer);

      // Clear the input text by setting prompt to an empty string
      setReque(prompt);
      setPrompt("");
      setPrediction("");
      fileInput.value = '';
    } catch (err) {
      console.error(err);
    }
};

  return (
    <div >
      <Layout>
        <div className='chat'>
          <div className='chat2'>
            <input type="file" accept="image/*" onChange={handleImageChange} />
            {/* <button onClick={handlePredict}>Predict</button> */}
            <form className='formChat' onSubmit={handleSubmit}>
              <div className='lable'>
                <label>Ask anything?</label>
              </div>
            <div className='combine'> 
                <div className='inputBox'>
                  <input type='text' value={prompt} onChange={(e) => setPrompt(e.target.value)} />
                </div>
                <div className='buttonSubmit'>
                  <button type='submit'>submit</button>
                </div>
              </div>
            </form>
            {/* <p>{prediction} And {prompt}</p> */}
            <div className='request'>
              <p>{reque ? "Me: " : ""} {reque}</p>
            </div>
            <div className='response'>
              <p>{response ? "Chat: " : ""} {response}</p>
            </div>
          </div>
          <div className='bottom-text'>
            <h3>"Farming looks mighty when your plow is a pencil, and you're a thousand miles from the corn field."</h3>
          </div>
        </div>
      </Layout>
    </div>
  );
}

export default Chat;
