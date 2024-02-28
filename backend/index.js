const express = require('express');
const app = express();
const port = 8080;

const login_model = require('./models/login');
const { runChatModel } = require('./models/chat');
const weather_model = require('./models/weather');
const predict_model = require('./models/predict');

const multer = require('multer');
const upload = multer({ dest: 'uploads/' }); // Set the destination folder for uploaded images


app.use(express.json())
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers');
  next();
});


app.post('/predict', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded.' });
    }

    const imagePath = req.file.path;
    const predictions = await predict_model.predictImageObjectDetection(imagePath);

    // return predictions in response
    res.status(200).json({ predictions });
  } catch (error) {
    console.error('Error processing image:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
});



app.get('/farmers', (req, res) => {
  login_model.getUsers()
  .then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  })
});

app.post('/createFarmers', (req, res) => {
  login_model.createUsers(req.body)
  .then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  })
});

app.post('/chat', (req, res) => {
  const { query } = req.body;

  if (!query) {
    return res.status(400).send('Bad Request: Missing "query" in the request body');
  }

  const result = runChatModel(query);
  res.status(200).json({ answer: result });
});


// Handle weather request
app.get('/weather', async (req, res) => {
  const city = req.query.city;
  // const city = 'Maseru';

  if (!city) {
    return res.status(400).send('Bad Request: Missing "city" in the query parameters');
  }

  const weatherData = await weather_model.getWeather(city);
  res.json(weatherData);
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});