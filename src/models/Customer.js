const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const requestIp = require('request-ip');
const useragent = require('useragent');

const Customer = sequelize.define('Customer', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  },
  gender: {
    type: DataTypes.ENUM('male', 'female', 'other'),
    allowNull: false
  },
  contactNumber: {
    type: DataTypes.STRING,
    allowNull: false
  },
  preferredDate: {
    type: DataTypes.DATEONLY, // Stores date without time (YYYY-MM-DD)
    allowNull: false
  },
  preferredTime: {
    type: DataTypes.STRING, // Stores time (HH:MM:SS)
    allowNull: false
  },
  consultationType: {
    type: DataTypes.ENUM('online', 'in-person'),
    allowNull: false
  },
  paymentStatus: {
    type: DataTypes.ENUM('pending', 'completed', 'failed','refunded'),
    defaultValue: 'pending'
  },
  symptoms: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  ipAddress: {
    type: DataTypes.STRING,
    allowNull: true
  },
  deviceInfo: {
    type: DataTypes.STRING,
    allowNull: true
  }
}, {
  tableName: 'customers',
  timestamps: true // Adds createdAt and updatedAt automatically
});

const trackUserActivity = (req, res, next) => {
  // 1. Get Client IP
  const clientIp = requestIp.getClientIp(req); 

  // 2. Parse User Agent (Browser, OS, Device)
  const agent = useragent.parse(req.headers['user-agent']);
  
  // Attach data to the request object so controllers can use it
  req.tracking = {
    ip: clientIp,
    browser: agent.toAgent(),       // e.g. "Chrome 50.0.2661"
    os: agent.os.toString(),        // e.g. "Windows 10.0.0"
    device: agent.device.toString() // e.g. "iPhone" or "Other"
  };

  // Optional: Log it immediately (or save to DB here)
  console.log(`[Tracking] IP: ${clientIp} | OS: ${agent.os} | Browser: ${agent.toAgent()}`);

  next();
};

module.exports = { Customer, trackUserActivity };
