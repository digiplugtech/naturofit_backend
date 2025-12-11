const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Doctor = sequelize.define('Doctor', {
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
    validate: { isEmail: true }
  },
  contactNumber: {
    type: DataTypes.STRING,
    allowNull: false
  },
  age: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  gender: {
    type: DataTypes.ENUM('male', 'female', 'other'),
    allowNull: false
  },
  education: {
    type: DataTypes.STRING, // e.g., "MBBS, MD"
    allowNull: false
  },
  experienceYears: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  clinicLocation: {
    type: DataTypes.STRING,
    allowNull: false
  },
  specialization: {
    type: DataTypes.ENUM(
      'Naturopathy', 
      'Homeopathy', 
      'Diet Therapy', 
      'Acupuncture', 
      'Yoga Therapy', 
      'Hydrotherapy', 
      'Massage Therapy', 
      'Herbal Medicine'
    ),
    allowNull: false
  },
  consultationType: {
    type: DataTypes.ENUM('online', 'in-person', 'both'),
    allowNull: false
  },
  certificateUrl: {
    type: DataTypes.STRING, // Store path/URL to uploaded file
    allowNull: true
  },
  profilePhotoUrl: {
    type: DataTypes.STRING, // Store path/URL to uploaded file
    allowNull: true
  },
  bio: {
    type: DataTypes.TEXT,
    allowNull: true
  }
}, {
  tableName: 'doctors',
  timestamps: true
});

module.exports = Doctor;
