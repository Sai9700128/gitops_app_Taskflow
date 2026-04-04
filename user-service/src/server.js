const fs = require('fs');

// Load secrets from Vault (must be FIRST, before dotenv)
const loadVaultSecrets = () => {
  const secretsPath = '/vault/secrets/config';
  if (fs.existsSync(secretsPath)) {
    const secrets = fs.readFileSync(secretsPath, 'utf8');
    secrets.split('\n').forEach(line => {
      const [key, value] = line.split('=');
      if (key && value) {
        process.env[key.trim()] = value.trim();
      }
    });
    console.log('✅ Loaded secrets from Vault');
  } else {
    console.log('⚠️ Vault secrets not found, using environment variables');
  }
};

loadVaultSecrets();

// Now load dotenv (for local development fallback)
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