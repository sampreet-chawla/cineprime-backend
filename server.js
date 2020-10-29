require('dotenv').config();
const express = require('express');
const app = express();
const logger = require('morgan');
const { PORT = 4000, NODE_ENV = 'development' } = process.env;
const authRouter = require('./controllers/user');
const auth = require('./auth');
//CORS
const cors = require('cors');
const corsOptions = require('./configs/cors.js');

// Add the middleware code needed to accept incoming data and add it to req.body
NODE_ENV === 'production' ? app.use(cors(corsOptions)) : app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(logger('tiny'));
app.use('/auth', authRouter);

// Add Custom Routers

// Default route
app.get('/', (req, res) => {
	res.json({ status: 200, msg: 'Welcome to cine-prime backend.' });
});

const movieRouter = require('./controllers/movieRoutes');
app.use('/api/movies/', auth, movieRouter);

app.listen(PORT, () => console.log(`Server running on port ${PORT}!`));
