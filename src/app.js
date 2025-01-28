require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

// const destinationRoutes = require('./routes/destinationRoutes');
const errorHandler = require('./middlewares/errorHandler');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
// app.use('/api/destinations', destinationRoutes);

// Error Handling
app.use(errorHandler);

// Connect DB
connectDB();

module.exports = app;
