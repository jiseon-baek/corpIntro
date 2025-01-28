require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const errorHandler = require('./middlewares/errorHandler');
const routes = require('./routes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', routes.authRoutes);

// Error Handling
app.use(errorHandler);

connectDB();

module.exports = app;
