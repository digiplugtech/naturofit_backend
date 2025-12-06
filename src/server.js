const app = require('./app');
const { connectDB, sequelize }  = require('./config/db');
require('dotenv').config();

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  
    await connectDB();

    // Sync DB models (use false in production)
    await sequelize.sync({ alter: true });

    // Start Server
    app.listen(PORT, () => {
        console.log(`🚀 Server running on port ${PORT} in ${process.env.NODE_ENV || 'development'} mode`);
    });
};

startServer();