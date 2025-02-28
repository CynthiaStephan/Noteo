// Importing required modules
require('dotenv').config();
const express = require('express');
const passport = require('passport');
const cors = require('cors');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');

const app = express();

const corsOptions = {
  origin: ["http://localhost:3000", "http://127.0.0.1:3000"],
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
app.use(cors());
// Initializing Passport for authentication
app.use(passport.initialize());


app.get('/', (req, res) => {
    res.json({ message: 'Test réussi !' });
});

// Registering route modules for handling specific API paths
app.use('/auth', authRoutes);

// Exporting the configured Express app for use in other files
module.exports = app;
