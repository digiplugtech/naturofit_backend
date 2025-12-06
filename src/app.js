const express = require('express');
const cors = require('cors');
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Basic Health Check Route
app.get('/', (req, res) => {
    res.status(200).json({ 
      message: 'Welcome to NaturoFit API',
      status: 'healthy' 
    });
  });


module.exports = app;