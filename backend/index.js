const express = require('express');
const app = express();
const cors = require('cors'); // Import the cors package

const port = 8280;
const fs = require('fs');
const jwt = require('jsonwebtoken');
const userService = require('./models/userService');
const { runChatModel } = require('./models/chat');
const weather_model = require('./models/weather');
// const predict_model = require('./models/predict');
const sensor_model = require('./models/getSensorData');
const questionService = require('./models/questionService');
const reportsService = require('./models/reportsService');
const searchService = require('./models/searchService');

const crypto = require('crypto');
const postService = require('./models/postService'); // Import the postService module
const multer = require('multer');
const path = require('path'); // Add this line to require the path module


const { predictImageObjectDetection } = require('./models/predict');
const { predictImage } = require('./models/predict');


require('./models/fetchDataFromThingSpeak');
require('./models/notification');
// const upload = multer({ dest: 'uploads/' }); // Set the destination folder for uploaded images
const uploadsDir = path.join(__dirname, 'uploads');
fs.mkdirSync(uploadsDir, { recursive: true });

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
// Secret key for JWT
const secretKey = crypto.randomBytes(32).toString('hex'); // 32 bytes = 256 bits
console.log(secretKey);
// Middleware for parsing JSON request bodies
app.use(cors());
app.use(express.json());



// Helper function to generate JWT token
function generateToken(user) {
  return jwt.sign({ userId: user.id, role: user.role }, secretKey, { expiresIn: '1h' });
}

// Middleware for role-based authorization
function authorize(roles = []) {
  return [
    // Authenticate JWT token
    (req, res, next) => {
      const token = req.headers.authorization?.split(' ')[1];

      if (!token) {
        return res.status(401).json({ message: 'No token provided' });
      }

      jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
          return res.status(403).json({ message: 'Failed to authenticate token' });
        }

        req.user = decoded;
        next();
      });
    },

    // Authorize based on user role
    (req, res, next) => {
      if (roles.length && !roles.includes(req.user.role)) {
        return res.status(403).json({ message: 'Insufficient permissions' });
      }
      next();
    },
  ];
}

// app.use(function (req, res, next) {
//   res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
//   res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
//   res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers');
//   next();
// });
// Allow requests from a specific origin
app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));


// app.post('/predict', upload.single('image'), async (req, res) => {
//   try {
//     if (!req.file) {
//       return res.status(400).json({ error: 'No file uploaded.' });
//     }

//     const imagePath = req.file.path;
//     const predictions = await predict_model.predictImageObjectDetection(imagePath);

//     // return predictions in response
//     res.status(200).json({ predictions });
//   } catch (error) {
//     console.error('Error processing image:', error);
//     res.status(500).json({ error: 'Internal server error.' });
//   }
// });



// Handle image upload and prediction
app.post('/predictDisease', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded.' });
    }

    const imagePath = req.file.path; // Get the path of the uploaded image
    const predictions = await predictImageObjectDetection(imagePath);

    // Return predictions in response
    res.status(200).json({ predictions });
  } catch (error) {
    console.error('Error processing image:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

app.post('/predictSoil', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded.' });
    }

    const imagePath = req.file.path; // Get the path of the uploaded image
    const predictions = await predictImage(imagePath);

    // Return predictions in response
    res.status(200).json({ predictions });
  } catch (error) {
    console.error('Error processing image:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
});



// Authentication route
// Authentication route
// Authentication route
app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await userService.authenticate(username, password);

    if (!user) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    const token = generateToken(user);
    // Check if user is not null or undefined before destructuring
    if (user) {
      const { password, ...userData } = user;
      res.json({ token, user: userData });
    } else {
      res.status(500).json({ message: 'Internal server error' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
});
// Create a new question
app.post('/questions', async (req, res) => {
  try {
    const { question, userId } = req.body;
    const newQuestion = await questionService.createQuestion(question, userId);
    res.status(201).json(newQuestion);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Add an answer to a question
app.post('/questions/:id/answers', async (req, res) => {
  try {
    const questionId = req.params.id;
    const { answer, userId } = req.body;
    const newAnswer = await questionService.createAnswer(answer, questionId, userId);
    res.status(201).json(newAnswer);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
// Endpoint to like a question or answer// Endpoint to like a question


// Endpoint to like an answer to a question
app.put('/questions/:questionId/answers/:answerId/like', async (req, res) => {
  try {
    const questionId = req.params.questionId;
    const answerId = req.params.answerId;
    const userId = req.body.userId; // Assuming you're sending the userId in the request body

    // Update the like count for the answer in the database
    const updatedAnswer = await questionService.likeAnswer(questionId, answerId, userId);
    res.status(200).json(updatedAnswer);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/questions', async (req, res) => {
  try {
    const questions = await questionService.getAllQuestions(); // Assuming you have a method in questionService to fetch all questions
    res.json(questions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
app.get('/farmers', async (req, res) => {
  try {
    const users = await userService.getAllUsers();
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
});


app.post('/createFarmer', async (req, res) => {
  try {
    const farmer = await userService.createFarmer(req.body);
    res.status(201).json(farmer);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/chat', (req, res) => {
  const { query } = req.body;

  if (!query) {
    return res.status(400).send('Bad Request: Missing "query" in the request body');
  }

  const result = runChatModel(query);
  res.status(200).json({ answer: result });
});

//Handle SensorData Request
app.get('/sensorData', (req, res) => {
  sensor_model.getSensor()
    .then(response => {
      res.status(200).send(response);
    })
    .catch(error => {
      res.status(500).send(error);
    })
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


// POST /productions
app.post('/productions', async (req, res) => {
  try {
    const { userId, quarter, year, maizeUnits, tomatoUnits, potatoUnits } = req.body;
    const production = await reportsService.insertProduction(userId, quarter, year, maizeUnits, tomatoUnits, potatoUnits);
    res.status(201).json({ message: 'Production data inserted successfully' ,production});
  } catch (error) {
    console.error('Error inserting production data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// GET /productions/:userId
app.get('/productions/:userId', async (req, res) => {
  try {
    const userId = parseInt(req.params.userId);
    const productions = await reportsService.getProductionsByUserId(userId);
    res.status(200).json(productions);
  } catch (error) {
    console.error('Error fetching production data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// GET /farmers/:userId
app.get('/farmers/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    const farmer = await userService.getFarmerByUserId(userId);

    if (!farmer) {
      return res.status(404).json({ error: 'Farmer not found' });
    }

    res.json(farmer);
  } catch (error) {
    console.error('Error fetching farmer:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


app.put('/farmers/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    const updatedData = req.body;

    const updatedFarmer = await userService.updateFarmer(userId, updatedData);

    if (!updatedFarmer) {
      return res.status(404).json({ error: 'Farmer not found' });
    }

    res.json(updatedFarmer);
  } catch (error) {
    console.error('Error updating farmer:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
app.get('/api/users/:userId', async (req, res) => {
  const userId = req.params.userId;

  try {
    const user = await userService.getFarmerByUserId(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


// Route to create a new post
app.post('/api/posts', upload.single('image'), async (req, res) => {
  const { text, userId } = req.body;
  const image = req.file ? req.file.filename : null;

  try {
    const newPost = await postService.createPost({ text, userId, image });
    res.json(newPost);
  } catch (error) {
    console.error('Error creating post:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


// Route to like a post
app.post('/api/posts/:postId/likes', async (req, res) => {
  const { postId } = req.params;
  const { userId } = req.body;

  try {
    const likedPost = await postService.likePost(postId, userId);
    res.json(likedPost);
  } catch (error) {
    console.error('Error liking post:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Route to comment on a post
// app.post('/api/posts/:postId/comments', async (req, res) => {
//   const { postId } = req.params;
//   const { userId, text } = req.body;

//   try {
//     const commentedPost = await postService.commentOnPost(postId, userId, text);
//     res.json(commentedPost);
//   } catch (error) {
//     console.error('Error commenting on post:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });

app.post('/api/posts/:postId/comments', async (req, res) => {
  const { postId } = req.params;
  const { userId, text } = req.body;

  try {
    const commentedPost = await postService.commentOnPost(postId, userId, text);
    res.json(commentedPost);
  } catch (error) {
    console.error('Error commenting on post:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
// Route to get comments for a specific post
app.get('/api/posts/:postId/comments', async (req, res) => {
  const { postId } = req.params;

  try {
    const comments = await postService.getCommentsForPost(postId); // Assuming you have a method in postService to fetch comments for a post
    res.json(comments);
  } catch (error) {
    console.error('Error fetching comments:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


// Add a new route to fetch all posts
app.get('/api/posts', async (req, res) => {
  try {
    console.log('GET request received for /api/posts');
    const posts = await postService.getPosts(); // Fetch all posts using the postService
    res.json(posts);
  } catch (error) {
    console.error('Error fetching posts:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
app.post('/api/search', async (req, res) => {
  const { query } = req.body;
  console.log('Received search query:', query); // Add this line

  try {
    // Call the search service to perform the search
    const searchResults = await searchService.search(query);
    console.log('Search results:', searchResults); // Add this line
    res.json({ success: true, results: searchResults });
  } catch (error) {
    console.error('Error performing search:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});


app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

