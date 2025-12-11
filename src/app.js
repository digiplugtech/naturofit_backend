const express = require('express');
const cors = require('cors');
const customerRoutes = require('./routes/customerRoutes'); // Import routes
const doctorRoutes = require('./routes/doctorRoutes'); // Add this line
const trackUserActivity = require('./middlewares/trackingMiddleware');
const morgan = require('morgan'); // Import morgan
const logger = require('./config/logger'); // Import our logger

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Use morgan to log requests to our winston logger
const morganFormat = ':method :url :status :response-time ms';
app.use(
  morgan(morganFormat, {
    stream: {
      write: (message) => {
        const logObject = {
          method: message.split(' ')[0],
          url: message.split(' ')[1],
          status: message.split(' ')[2],
          responseTime: message.split(' ')[3],
        };
        logger.http(JSON.stringify(logObject));
      },
    },
  })
);

// Apply Tracking Middleware Globaly
app.use(trackUserActivity);

// Routes
app.use('/api/customers', customerRoutes); // Mount routes
app.use('/api/doctors', doctorRoutes); // Add this line

// Basic Health Check Route
app.get('/', (req, res) => {
    res.status(200).json({ 
      message: 'Welcome to NaturoFit API',
      status: 'healthy' 
    });
  });


module.exports = app;