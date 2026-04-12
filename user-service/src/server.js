const fs = require('fs');

// Load secrets from Vault (must be FIRST, before anything else)
const loadVaultSecrets = () => {
  const secretsPath = '/vault/secrets/config';
  try {
    if (fs.existsSync(secretsPath)) {
      const secrets = fs.readFileSync(secretsPath, 'utf8');
      secrets.split('\n').forEach(line => {
        const trimmedLine = line.trim();
        if (trimmedLine && trimmedLine.includes('=')) {
          const [key, ...valueParts] = trimmedLine.split('=');
          const value = valueParts.join('='); // Handle values with = in them
          if (key && value) {
            process.env[key.trim()] = value.trim();
          }
        }
      });
      console.log('✅ Loaded secrets from Vault');
    } else {
      console.log('⚠️ Vault secrets not found, using environment variables');
    }
  } catch (error) {
    console.error('❌ Error loading Vault secrets:', error.message);
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