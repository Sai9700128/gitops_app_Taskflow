require('dotenv').config();

const app = require('./app');
const { testConnection } = require('./config/db');
const Task = require('./models/taskModel');

const PORT = process.env.PORT || 3002;

const startServer = async () => {
  try {
    // Test database connection
    await testConnection();
    
    // Initialize tables
    await Task.initialize();
    
    // Start server
    app.listen(PORT, () => {
      console.log(`🚀 Task Service running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();