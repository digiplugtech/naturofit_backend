const express = require('express');
const cors = require('cors');
const customerRoutes = require('./routes/customerRoutes'); // Import routes

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/customers', customerRoutes); // Mount routes

// Basic Health Check Route
app.get('/', (req, res) => {
    res.status(200).json({ 
      message: 'Welcome to NaturoFit API',
      status: 'healthy' 
    });
  });


module.exports = app;