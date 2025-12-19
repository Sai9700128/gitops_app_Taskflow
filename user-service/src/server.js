require('dotenv').config();

const app = require('./app');
const { testConnection } = require('./config/db');
const User = require('./models/userModel');

const PORT = process.env.PORT || 3001;

const startServer = async () => {
  try {
    // Test database connection
    await testConnection();
    
    // Initialize tables
    await User.initialize();
    
    // Start server
    app.listen(PORT, () => {
      console.log(`🚀 User Service running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();