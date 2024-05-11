// import  { useState } from 'react';
// import axios from 'axios';
// import Layout from './Layout';
// import '../../Styles/Chat.css';
// import { FaRobot } from 'react-icons/fa'; 
// import { AiOutlineRobot } from 'react-icons/ai'; 



// function Chat() {
//   const [prompt, setPrompt] = useState("");
//   const [response, setResponse] = useState("");
//   const [reque, setReque] = useState("");
//   const [prediction, setPrediction] = useState('');

//   const handleImageChangeDisease = async (event) => {
//     const file = event.target.files[0];
//     const formData = new FormData();
//     formData.append('image', file);

//     try {
//       const response = await fetch('http://localhost:8280/predictDisease', {
//         method: 'POST',
//         body: formData,
//       });

//       const result = await response.json();
//       const predictions = result.predictions;

//       if (predictions && predictions.length > 0) {
//         const displayName = predictions[0].displayName;
//         setPrediction(displayName + ': ');
//       } else {
//         setPrediction('No predictions');
//       }

//     } catch (error) {
//       console.error('Error uploading image:', error);
//     }
//   };



//     const handleImageChangeSoil = async (event) => {
//     const file = event.target.files[0];
//     const formData = new FormData();
//     formData.append('image', file);

//     try {
//       const response = await fetch('http://localhost:8280/predictSoil', {
//         method: 'POST',
//         body: formData,
//       });

//       const result = await response.json();
//       const predictions = result.predictions;

//       if (predictions && predictions.length > 0) {
//         const displayName = predictions[0].displayName;
//         setPrediction(displayName + ': ');
//       } else {
//         setPrediction('No predictions');
//       }

//     } catch (error) {
//       console.error('Error uploading image:', error);
//     }
//   };


//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await axios.post("http://localhost:8280/chat", {
//         query: prediction + prompt
//       });
//       setResponse(res.data.answer);

//       // Clear the input text
//       setReque(prompt);
//       setPrompt("");
//       setPrediction("");
//     } catch (err) {
//       console.error(err);
//     }
//   };

  
//   return (
//     <div>
//         <div className='chat-container'>
//           <div className='chat-box'>
//           <input type="file" accept="image/*" onChange={handleImageChangeSoil} />
//             <form className='chat-form' onSubmit={handleSubmit}>
//               <div className='label'>
//                 <label>Ask anything?</label>
//               </div>
//               <div className='input-combine'>
//                 <div className='input-box'>
//                   <input type='text' value={prompt} onChange={(e) => setPrompt(e.target.value)} placeholder="Type here..." />
//                 </div>
//                 <div className='submit-button'>
//                   <button type='submit'>Submit</button>
//                 </div>
//               </div>
//             </form>
//             <div className='user-request'>
//               <p>{reque ? <FaRobot className='robot-icon' /> : ""} {reque}</p> {/* Using robot icon */}
//             </div>
//             <div className='chat-response'>
//               <p>{response ? <AiOutlineRobot className='ai-icon' /> : ""} {response}</p> {/* Using AI icon */}
//             </div>
//           </div>
//         </div>
//     </div>
//   );
// }

// export default Chat;
/*****************************************************************************************************************************************
 * **********************************************************************************************************************************
 */


import { useState } from 'react';
import axios from 'axios';
import Layout from './Layout';
import '../../Styles/Chat.css';
import { FaRobot } from 'react-icons/fa';
import { AiOutlineRobot } from 'react-icons/ai';

function Chat() {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [reque, setReque] = useState("");
  const [prediction, setPrediction] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const [soilFileUploaded, setSoilFileUploaded] = useState(false);
  const [cropFileUploaded, setCropFileUploaded] = useState(false);
  const [loading, setLoading] = useState(false);

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
        // const displayName = predictions[0].displayName;
        // setPrediction(displayName + ': ');
        // console.log (prediction);
        console.log(predictions);
        setPrediction(predictions + ':  ');
        console.log(prediction);
        console.log("Find abovve");
        
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

      console.log(predictions);
      if (predictions && predictions.length > 0) {
        // const displayName = predictions[0].displayName;
        // setPrediction(displayName + ': COde code ');

        console.log(predictions);
        setPrediction(predictions + ':  ');
        console.log(prediction);
        console.log("Find abovve");
      } else {
        setPrediction('No predictions');
      }

    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  const handleDropdownChange = (event) => {
    setSelectedOption(event.target.value);
    console.log('handle called');
    if (event.target.value === "Soil Prediction") {
      // setFileHandler(handleImageChangeSoil);
      console.log('called');
      setCropFileUploaded(false);
      setSoilFileUploaded(true);
    } else if (event.target.value === "Crop Disease") {
      // setFileHandler(handleImageChangeDisease);
      setSoilFileUploaded(false);
      setCropFileUploaded(true);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setReque(prompt);
      setResponse("Loading ... ");
      const res = await axios.post("http://localhost:8280/chat", {
        query: prediction + prompt
      });
      if(prediction){
        setResponse('The uploaded image shows ' + prediction + res.data.answer);

      }else{
        setResponse(res.data.answer);
      }
      
      // Clear the input text
      // setReque(prompt);
      setPrompt("");
      setPrediction("");
      setCropFileUploaded(false);
      setSoilFileUploaded(false);
      setSelectedOption("");

    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <div className='chat-container'>
        <div className='chat-box'>

          <div>
            <select value={selectedOption} onChange={handleDropdownChange}>
              <option value="">Upload Image</option>
              <option value="Soil Prediction">Soil Prediction</option>
              <option value="Crop Disease">Crop Disease</option>
            </select>
          </div>

          <div>{soilFileUploaded && <input type="file" accept="image/*" onChange={handleImageChangeSoil} />}</div>
          <div>{cropFileUploaded && <input type="file" accept="image/*" onChange={handleImageChangeDisease} />}</div>

          <form className='chat-form' onSubmit={handleSubmit}>
            <div className='label'>
              <label>Ask anything?</label>
              {/* <h4>{prediction}</h4> */}
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
