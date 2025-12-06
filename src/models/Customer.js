const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

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
  }
}, {
  tableName: 'customers',
  timestamps: true // Adds createdAt and updatedAt automatically
});

module.exports = Customer;
