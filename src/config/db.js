const { Sequelize } = require('sequelize');
const path = require('path');
const dotenv = require('dotenv');

const envFile = process.env.NODE_ENV ? `.env.${process.env.NODE_ENV}` : '.env';
const envPath = path.resolve(__dirname, '../../', envFile);
dotenv.config({ path: envPath });

const sequelize = new Sequelize(
    process.env.DB_NAME, 
    process.env.DB_USER, 
    process.env.DB_PASSWORD, 
    {
        host: process.env.DB_HOST,
        dialect: 'mysql',
        port: process.env.DB_PORT,
        logging: process.env.DB_LOGGING === 'true' ? console.log : false,
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        }
    });

const connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log("✅ MySQL connected successfully");
    } catch (error) {
        console.error("❌ MySQL connection failed:", error.message);
        process.exit(1);
    }
    };

module.exports = {
    sequelize,
    connectDB
};