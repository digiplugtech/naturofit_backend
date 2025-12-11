const app = require('./app');
const { connectDB, sequelize }  = require('./config/db');
const Customer = require('./models/Customer'); 
require('dotenv').config();

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  
    await connectDB();

    // Sync DB models (use false in production)
    // 2. Sync Models
    // Change force: false to true if you want to drop and recreate tables (WARNING: data loss)
    // Or use alter: true to update schema without data loss
    
    await sequelize.sync({ alter: true }); 

    // Start Server
    app.listen(PORT, () => {
        console.log(`🚀 Server running on port ${PORT} in ${process.env.NODE_ENV || 'development'} mode`);
    });
};

startServer();