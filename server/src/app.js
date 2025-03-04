// Importing required modules
require('dotenv').config();
const express = require('express');
const passport = require('passport');
const cors = require('cors');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');

// Routes imports
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');
const questionnaireRoutes = require('./routes/questionnaireRoutes');
const questionRoutes = require('./routes/questionRoutes');
const answerRoutes = require('./routes/answerRoutes')


const app = express();

const corsOptions = {
  origin: ['http://localhost:5173', 'http://127.0.0.1:5173'],
  methods: "GET,POST,PUT,DELETE",
  allowedHeaders: "Content-Type",
  credentials: true
};

// API documentation with Swagger
// app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
// Middleware to parse JSON requests
app.use(express.json());
// Middleware to parse cookies (sets req.cookies)
app.use(cookieParser());
// Middleware to parse URL-encoded data
app.use(express.urlencoded({ extended: true }));
// Adding security headers with Helmet
app.use(helmet());
// Enabling CORS for cross-origin requests
app.use(cors({
  origin: ['http://localhost:5173', 'http://127.0.0.1:5173'], // Autorise uniquement les requêtes provenant de cette origine
  credentials: true // Autorise l'envoi des cookies entre le frontend et le backend
}));

// Initializing Passport for authentication
app.use(passport.initialize());

app.get('/', (req, res) => {
    res.json({ message: 'Test réussi !' });
});

// Registering route modules for handling specific API paths
app.use('/auth', authRoutes);
app.use('/user', userRoutes);
app.use('/questionnaire', questionnaireRoutes);
app.use('/question', questionRoutes);
app.use('/answer', answerRoutes);

// Exporting the configured Express app for use in other files
module.exports = app;
